import Article from '../../src/ArticleCard/ArticleCard'
import Pagination from '../../src/Pagination/Pagination'
import { ArticleType } from '../../types/article'

const pageLimit = 100

export const metadata = {
	title: 'Vineel Sai',
	description: 'Blog by Vineel Sai',
}

export const revalidate = 3600
export const runtime = 'edge'

export default async function Blog() {
	const page = 0

	const response = await fetch('http://localhost:3000/api/articles', {
		method: 'POST',
		body: JSON.stringify({
			page,
			pageLimit,
		}),
	})

	const { articles, pageCount } = await response.json() as {
		articles: ArticleType[],
		pageCount: number,
	}

	return (
		<div>
			<div className='min-h-screen'>
				{articles.length > 0 && (
					<div className='flex flex-col items-center'>
						{articles.map((article) => (
							<Article key={article.url} article={article as ArticleType} />
						))}
					</div>
				)}
			</div>

			<div className='flex flex-col'>
				{pageCount > 1 && (
					<Pagination
						page={page}
						pageCount={pageCount}
					/>
				)}
			</div>
		</div>
	)
}
