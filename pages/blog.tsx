import Head from 'next/head'
import { ArticleType } from '../types/article'
import Footer from '../src/Footer/Footer'
import Navbar from '../src/Navbar/Navbar'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Pagination from '../src/Pagination/Pagination'
import Loader from '../src/Loader/Loader'
import mongoose from 'mongoose'
import Articles from '../models/article'
import Article from '../src/ArticleCard/ArticleCard'

const pageLimit = 10

export default function Blog({ articleProps, pageCountProp, analytics, setAnalytics }: { articleProps: ArticleType[], pageCountProp: number, analytics: boolean, setAnalytics: Dispatch<SetStateAction<boolean>> }) {
	const [articles, setArticles] = useState<ArticleType[]>(articleProps)
	const [page, setPage] = useState(-1)
	const [pageCount, setPageCount] = useState(pageCountProp)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		const getArticles = async () => {
			setLoading(true)
			const res = await fetch('/api/articles', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					page: page,
					pageLimit: pageLimit
				})
			})
			if (res.ok) {
				const data = await res.json()
				setArticles(data.articles)
				setPageCount(data.pageCount)
			} else {
				console.log('error')
			}
			setLoading(false)
		}

		if (page >= 0) {
			getArticles()
		}
	}, [page])

	return (
		<div className='bg-slate-200'>
			<Head>
				<title>Vineel Sai | Blog</title>
				<meta name="description" content="Blog by Vineel Sai"></meta>
				<link rel="icon" href="/logo.png" />
			</Head>

			<div className='w-full sticky top-0 z-50'>
				<Navbar showSearch={true} setArticles={setArticles} setLoading={setLoading} analytics={analytics} setAnalytics={setAnalytics} />
			</div>


			<div className='min-h-screen'>
				{
					articles.length > 0 && (
						<div className='flex flex-col items-center'>
							{
								articles.map(article => (
									<Article key={article.url} article={article} />
								))
							}
						</div>
					)
				}
				{
					loading && (
						<Loader />
					)
				}
			</div>

			<div className='flex flex-col'>
				{
					pageCount > 1 && (
						<Pagination
							page={page}
							setPage={setPage}
							pageCount={pageCount}
						/>
					)
				}

				<Footer />
			</div>
		</div >
	)
}

export async function getStaticProps() {
	try {
		await mongoose.connect(process.env.NEXT_MONGODB_URL!)
		console.log("connected")
	} catch (error) {
		console.log(error)
	}

	const articles = await Articles.find({}).select({ _id: 0, longDescription: 0 }).sort({ createdAt: -1 }).limit(10)

	const count = await Articles.count({})

	mongoose.disconnect()

	return {
		props: {
			articleProps: JSON.parse(JSON.stringify(articles)),
			pageCountProp: Math.ceil(count / pageLimit),
		},
		revalidate: process.env.NEXT_REVALIDATE_TIMEOUT ? parseInt(process.env.NEXT_REVALIDATE_TIMEOUT) : 60
	}
}
