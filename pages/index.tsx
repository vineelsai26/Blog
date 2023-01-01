import Head from 'next/head'
import { ArticleType } from '../types/article'
import Link from 'next/link'
import Footer from '../src/Footer/Footer'
import Navbar from '../src/Navbar/Navbar'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Pagination from '../src/Pagination/Pagination'
import Loader from '../src/Loader/Loader'
import mongoose from 'mongoose'
import Articles from '../models/article'

export default function Home({ articleProps, pageProps, pageCountProp }: { articleProps: ArticleType[], pageProps: number, pageCountProp: number }) {
	const [articles, setArticles] = useState<ArticleType[]>(articleProps)
	const [page, setPage] = useState(pageProps)
	const [pageLimit, setPageLimit] = useState(10)
	const [pageCount, setPageCount] = useState(pageCountProp)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (localStorage.getItem('pageLimit')) {
			setPageLimit(parseInt(localStorage.getItem('pageLimit')!))
		}
	}, [])

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

		getArticles()

		localStorage.setItem('pageLimit', JSON.stringify(pageLimit))
	}, [page, pageLimit])

	return (
		<div className='bg-slate-200'>
			<Head>
				<title>Vineel Sai | Blog</title>
				<meta name="description" content="Blog by Vineel Sai"></meta>
				<link rel="icon" href="/logo.png" />
			</Head>

			<Navbar />

			<div className='min-h-screen'>
				{
					articles.length > 0 && (
						<div className='main flex items-center'>
							{
								articles.map(article => (
									<Link href={"post/" + article.url} className='card bg-white w-4/5 flex flex-row border-2 border-slate-400' key={article.url}>
										<Image
											src={article.imageUrl}
											alt="image"
											width={200}
											height={200}
											priority
											style={{width: 'auto', height: 'auto'}}
										/>
										<div>
											<h2 className='font-bold leading-tight text-3xl m-4'>{article.title}</h2>
											<h4 className='m-2 p-2 font-normal leading-tight text-xl'>{article.description.substring(0, 100)}</h4>
										</div>
									</Link>
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
				<Pagination
					page={page}
					setPage={setPage}
					pageCount={pageCount}
					setPageLimit={setPageLimit}
				/>

				<Footer />
			</div>
		</div >
	)
}

export async function getStaticProps() {
	try {
		mongoose.connect(process.env.NEXT_MONGODB_URL!)
		console.log("connected")
	} catch (error) {
		console.log(error)
	}

	const articles = await Articles.find({}).sort({ createdAt: -1 }).limit(10)

	const count = await Articles.count({})

	// mongoose.disconnect()

	return {
		props: {
			articleProps: JSON.parse(JSON.stringify(articles)),
			pageProps: 0,
			pageCountProp: Math.ceil(count / 10)
		},
		revalidate: process.env.NEXT_REVALIDATE_TIMEOUT ? parseInt(process.env.NEXT_REVALIDATE_TIMEOUT) : 60
	}
}
