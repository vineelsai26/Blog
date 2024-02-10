import { ArticleType, ArticleURLType } from '../../../types/article'
import ArticleEditor from '../../../components/ArticleEditor/ArticleEditor'
import prisma from '../../../prisma/prisma'
import { getServerSession } from 'next-auth'

export const dynamic = 'force-dynamic'

export default async function EditPost({
	params,
}: {
	params: {
		url: string
	}
}) {
	let result = false
	const session = await getServerSession()
	if (session?.user?.email && session?.user?.email === 'mail@vineelsai.com') {
		result = true
	}

	const article = (await prisma.articles.findUnique({
		where: {
			url: params.url,
			private: result,
		},
	})) as ArticleType

	if (!article) {
		return (
			<div className='relative'>
				<h1 className='text-center text-3xl dark:text-white '>404</h1>
			</div>
		)
	}

	const user = await prisma.users.findUnique({
		where: {
			email: article?.createdBy,
		},
		select: {
			email: true,
			name: true,
			profilePicture: true,
			password: false,
		},
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
