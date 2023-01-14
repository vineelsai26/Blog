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

			<Navbar
				showSearch={false}
				setArticles={null}
				setLoading={null}
			/>

			<ArticlePreview article={article} />

			<Footer />
		</div>
	)
}

export async function getServerSideProps(context: { query: { url: string } }) {
	try {
		await mongoose.connect(process.env.NEXT_MONGODB_URL!)
	} catch (error) {
		console.log(error)
	}

	const article = await Article.findOne({ url: context.query.url })

	mongoose.disconnect()
	return {
		props: {
			article: JSON.parse(JSON.stringify(article)) as ArticleType
		}
	}
}
