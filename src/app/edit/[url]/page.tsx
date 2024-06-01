import { getServerSession } from 'next-auth'
import ArticleEditor from '../../../components/ArticleEditor/ArticleEditor'
import db from '../../../drizzle/db'

export const dynamic = 'force-dynamic'
// export const runtime = 'edge'

export default async function EditPost({
	params,
}: {
	params: {
		url: string
	}
}) {
	const session = await getServerSession()

	const article = await db.query.articles.findFirst({
		where: (articles, { eq, and }) => {
			if (
				session?.user?.email &&
				session?.user?.email === 'mail@vineelsai.com'
			) {
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
				<h1 className='text-center text-3xl dark:text-white '>404</h1>
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
	const articles = await db.query.articles.findMany({
		columns: {
			url: true,
		},
	})

	let paths: { params: { url: string } }[] = []

	articles.forEach((article) => {
		paths.push({ params: { url: article.url } })
	})

	return paths
}
