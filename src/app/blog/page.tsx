import Article from '../../components/ArticleCard/ArticleCard'
import Pagination from '../../components/Pagination/Pagination'
import { ArticleType } from '../../types/article'
import { articles as articlesD } from '../../drizzle/schema/articles'
import db from '../../drizzle/db'
import { count } from 'drizzle-orm'

const pageLimit = 100

export const metadata = {
	title: 'Blog',
	description: 'Blog by Vineel Sai',
}

export const revalidate = 3600
export const runtime = 'edge'

export default async function Blog() {
	const page = 0

	let result = false

	const articles = await db.query.articles.findMany({
		where: (articles, { eq }) => eq(articles.private, result),
		orderBy: (articles, { desc }) => [desc(articles.createdAt)],
	})

	const articleCount = (
		await db.select({ count: count() }).from(articlesD)
	)[0].count

	const pageCount = Math.ceil(articleCount / pageLimit)

	return (
		<div>
			<div className='min-h-screen'>
				{articles.length > 0 && (
					<div className='flex flex-col items-center'>
						{articles.map((article) => (
							<Article
								key={article.url}
								article={article as ArticleType}
							/>
						))}
					</div>
				)}
			</div>

			<div className='flex flex-col'>
				{pageCount > 1 && (
					<Pagination page={page} pageCount={pageCount} />
				)}
			</div>
		</div>
	)
}
