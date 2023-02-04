import Head from 'next/head'
import { ArticleType } from '../../types/article'
import Footer from '../../src/Footer/Footer'
import ArticlePreview from '../../src/ArticlePreview/ArticlePreview'
import Navbar from '../../src/Navbar/Navbar'
import { Dispatch, SetStateAction } from 'react'
import prisma from '../../prisma/prisma'

export default function Post({
	article,
	analytics,
	setAnalytics,
}: {
	article: ArticleType
	analytics: boolean
	setAnalytics: Dispatch<SetStateAction<boolean>>
}) {
	return (
		<div>
			<Head>
				<title>{article.title}</title>
				<meta name='description' content={article.description} />
			</Head>

			<div className='sticky top-0 z-50 w-full'>
				<Navbar
					showSearch={false}
					setArticles={null}
					setLoading={null}
					analytics={analytics}
					setAnalytics={setAnalytics}
				/>
			</div>

			<ArticlePreview article={article} />

			<Footer />
		</div>
	)
}

export async function getStaticPaths() {
	const articles = await prisma.articles.findMany({
		select: {
			url: true,
		},
	})

	let paths: { params: { url: string } }[] = []

	articles.forEach((article) => {
		paths.push({ params: { url: article.url } })
	})

	return {
		paths: paths,
		fallback: false,
	}
}

export async function getStaticProps(context: { params: { url: string } }) {
	const article = (await prisma.articles.findUnique({
		where: {
			url: context.params.url,
		},
	})) as ArticleType

	const user = await prisma.users.findUnique({
		where: {
			email: article?.createdBy,
		},
	})

	article!.createdBy = user!

	return {
		props: {
			article: JSON.parse(JSON.stringify(article)) as ArticleType,
			user: JSON.parse(JSON.stringify(user)),
		},
		revalidate: process.env.NEXT_REVALIDATE_TIMEOUT
			? parseInt(process.env.NEXT_REVALIDATE_TIMEOUT)
			: 60,
	}
}
