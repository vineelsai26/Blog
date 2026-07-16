import { getServerSession } from 'next-auth'
import ArticleEditor from '../../../components/ArticleEditor/ArticleEditor'
import db from '../../../drizzle/db'
import { authOptions, isAdmin } from '../../../lib/auth'

export const dynamic = 'force-dynamic'
// export const runtime = 'edge'

export default async function EditPost(props: {
	params: Promise<{
		url: string
	}>
}) {
	const params = await props.params
	const session = await getServerSession(authOptions)

	const article = await db.query.articles.findFirst({
		where: (articles, { eq, and }) => {
			if (isAdmin(session)) {
				return eq(articles.url, params.url)
			} else {
				return and(
					eq(articles.url, params.url),
					eq(articles.private, false)
				)
			}
		},
	})

	if (!article) {
		return (
			<div className='relative'>
				<h1 className='text-center text-3xl dark:text-white'>404</h1>
			</div>
		)
	}

	const user = await db.query.users.findFirst({
		where: (users, { eq }) => eq(users.email, article.createdBy),
	})

	return (
		<div>
			<ArticleEditor
				articleFetch={article}
				user={user ? user : null}
				editMode={true}
			/>
		</div>
	)
}

export async function generateStaticParams() {
	return []
}
