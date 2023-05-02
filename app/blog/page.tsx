import Article from '../../src/ArticleCard/ArticleCard'
import { ArticleType } from '../../types/article'

export const metadata = {
	title: 'Vineel Sai',
	description: 'Blog by Vineel Sai',
}

export const revalidate = 3600
export const runtime = 'edge'

export default async function Blog() {
	const response = await fetch(`https://api.notion.com/v1/databases/${process.env.DATABASE_ID}/query`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${process.env.NEXT_NOTION_TOKEN}`,
			'Content-Type': 'application/json',
			'Notion-Version': '2022-02-22',
		},
		body: JSON.stringify({}),
	})

	const articles = await response.json()

	console.log(articles)

	return (
		<div>
			<div className='min-h-screen'>
				{articles.results.length > 0 && (
					<div className='flex flex-col items-center'>
						{
							articles.results.map((article: ArticleType) => (
								<Article key={article.id} article={article} />
							))
						}
					</div>
				)}
			</div>

			{/* <div className='flex flex-col'>
				{pageCount > 1 && (
					<Pagination
						page={page}
						pageCount={pageCount}
					/>
				)}
			</div> */}
		</div>
	)
}
