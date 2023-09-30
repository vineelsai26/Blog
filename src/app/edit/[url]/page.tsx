import { ArticleType, ArticleURLType } from '../../../types/article'
import ArticleEditor from '../../../components/ArticleEditor/ArticleEditor'
import prisma from '../../../prisma/prisma'

export default async function EditPost({
	params,
}: {
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
			<ArticleEditor
				articleFetch={article as ArticleType}
				editMode={true}
			/>
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
