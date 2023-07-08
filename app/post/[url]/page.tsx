import { ArticleURLType, ArticleType } from '../../../types/article'
import ArticlePreview from '../../../src/ArticlePreview/ArticlePreview'
import prisma from '../../../prisma/prisma'

export const revalidate = 3600
// export const runtime = 'edge'

export default async function Post({
	params
} : {
		params: {
		url: string
	}
}) {
	const article = (await prisma.articles.findUnique({
		where: {
			url: params.url,
		},
	})) as ArticleType

	const user = await prisma.users.findUnique({
		where: {
			email: article?.createdBy,
		},
		select: {
			email: true,
			name: true,
			profilePicture: true,
			password: false,
		}
	})

	article!.createdBy = user!

	return (
		<div>
			<ArticlePreview article={article} />
		</div>
	)
}

export async function generateStaticParams() {
	const articles = await prisma.articles.findMany({
		select: {
			url: true,
		},
	})

	let paths: { params: { url: string } }[] = []

	articles.forEach((article: ArticleURLType) => {
		paths.push({ params: { url: article.url } })
	})

	return paths
}
