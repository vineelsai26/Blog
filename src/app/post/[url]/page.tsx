import ArticlePreview from '../../../components/ArticlePreview/ArticlePreview'
import { Metadata } from 'next'
import db from '../../../drizzle/db'

export const dynamic = 'force-dynamic'
// export const runtime = 'edge'

export default async function Post({
	params,
}: {
	params: {
		url: string
	}
}) {
	let result = false

	const article = await db.query.articles.findFirst({
		where: (articles, { eq, and }) =>
			and(eq(articles.url, params.url), eq(articles.private, result)),
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
			{article && user && (
				<ArticlePreview article={article} user={user} />
			)}
		</div>
	)
}

export async function generateMetadata({
	params,
}: {
	params: {
		url: string
	}
}): Promise<Metadata> {
	const article = await db.query.articles.findFirst({
		where: (articles, { eq }) => eq(articles.url, params.url),
		columns: {
			title: true,
			description: true,
		},
	})

	if (!article) {
		return {
			title: 'Article not found',
			description: 'Article not found',
		}
	}

	return {
		title: article.title,
		description: article.description,
	}
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
