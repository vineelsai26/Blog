import Head from 'next/head'
import mongoose from 'mongoose'
import Articles from '../models/article'
import { ArticleType } from '../types/article'
import Link from 'next/link'
import Footer from '../src/Footer/Footer'
import Navbar from '../src/Navbar/Navbar'
import Image from 'next/image'

export default function Home({ articles }: { articles: ArticleType[] }) {
	return (
		<div>
			<Head>
				<title>Vineel Sai | Blog</title>
				<meta name="description" content="Blog by Vineel Sai"></meta>
				<link rel="icon" href="/logo.png" />
			</Head>

			<Navbar />

			<main className='main'>
				{
					articles.map(article => (
						<Link href={"post/" + article.url} className='card' key={article.url}>
							<Image src={article.imageUrl} className='image' alt="image" width={50} height={50} />
							<h3>{article.title}</h3>
							<p>{article.description.substring(0, 100)}</p>
						</Link>
					))
				}
			</main>

			<Footer />
		</div >
	)
}

export async function getServerSideProps() {
	try {
		mongoose.connect(process.env.NEXT_MONGODB_URL!)
		console.log("connected")
	} catch (error) {
		console.log(error)
	}
	const articles = await Articles.find()
	return {
		props: {
			articles: JSON.parse(JSON.stringify(articles)) as ArticleType[]
		}
	}
}
