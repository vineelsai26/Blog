import Article from '../../components/ArticleCard/ArticleCard'
import Pagination from '../../components/Pagination/Pagination'
import { ArticleType } from '../../types/article'
import prisma from '../../prisma/prisma'
import { cookies } from 'next/headers'
import bcrypt from 'bcrypt'

const pageLimit = 100

export const metadata = {
	title: 'Blog',
	description: 'Blog by Vineel Sai',
}

export const revalidate = 3600
// export const runtime = 'edge'

export default async function Blog() {
	const page = 0
	const cookieStore = cookies()

	const email = cookieStore.get('email')?.value
	const password = cookieStore.get('password')?.value
	let result = false

	if (email && password) {
		const user = await prisma.users.findUnique({
			where: {
				email: email,
			},
		})

		result = await bcrypt.compare(password, user!.password)
	}

	const articles = (await prisma.articles.findMany({
		where: result ? {
			private: result,
		} : {},
		select: {
			title: true,
			url: true,
			imageUrl: true,
			description: true,
			createdAt: true,
			createdBy: true,
			tags: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
		skip: page * pageLimit,
		take: pageLimit,
	})) as ArticleType[]

	const count = await prisma.articles.count()

	const pageCount = Math.ceil(count / pageLimit)

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
