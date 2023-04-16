import prisma from '../../prisma/prisma'
import Article from '../../src/ArticleCard/ArticleCard'
import Pagination from '../../src/Pagination/Pagination'
import { ArticleType } from '../../types/article'

const pageLimit = 100

export const metadata = {
	title: 'Vineel Sai',
	description: 'Blog by Vineel Sai',
}

export const revalidate = 3600

export default async function Blog() {
	const page = 1

	const articles = await prisma.articles.findMany({
		select: {
			title: true,
			url: true,
			imageUrl: true,
			description: true,
			tags: true,
			createdAt: true,
			createdBy: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
		skip: 0,
		take: pageLimit,
	})

	const pageCount = Math.round((await prisma.articles.count()) / pageLimit) + 1

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
