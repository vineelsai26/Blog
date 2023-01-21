import Head from 'next/head'
import mongoose from 'mongoose'
import Article from '../../models/article'
import { ArticleType } from '../../types/article'
import Footer from '../../src/Footer/Footer'
import ArticlePreview from '../../src/ArticlePreview/ArticlePreview'
import Navbar from '../../src/Navbar/Navbar'
import GoogleAdSense from '../../src/Ads/GoogleAdSense'

export default function Post({ article }: { article: ArticleType }) {
	return (
		<div>
			<Head>
				<title>{article.title}</title>
				<link rel="icon" href="/logo.png" />
				<meta name="description" content={article.description} />
				<GoogleAdSense />
			</Head>

			<div className='w-full sticky top-0 z-50'>
				<Navbar showSearch={false} setArticles={null} setLoading={null} />
			</div>

			<ArticlePreview article={article} />

			<Footer />
		</div>
	)
}

export async function getStaticPaths() {
	try {
		await mongoose.connect(process.env.NEXT_MONGODB_URL!)
	} catch (error) {
		console.log(error)
	}

	const articles = await Article.find({}).select({ url: 1 })

	let paths: { params: { url: string } }[] = []

	articles.forEach(article => {
		paths.push({ params: { url: article.url } })
	})

	mongoose.disconnect()

	return {
		paths: paths,
		fallback: false,
	}
}

export async function getStaticProps(context: { params: { url: string } }) {
	try {
		await mongoose.connect(process.env.NEXT_MONGODB_URL!)
	} catch (error) {
		console.log(error)
	}

	const article = await Article.findOne({ url: context.params.url })

	mongoose.disconnect()
	return {
		props: {
			article: JSON.parse(JSON.stringify(article)) as ArticleType
		},
		revalidate: process.env.NEXT_REVALIDATE_TIMEOUT ? parseInt(process.env.NEXT_REVALIDATE_TIMEOUT) : 60
	}
}
