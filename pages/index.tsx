import Head from 'next/head'
import { ArticleType } from '../types/article'
import Link from 'next/link'
import Footer from '../src/Footer/Footer'
import Navbar from '../src/Navbar/Navbar'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Pagination from '../src/Pagination/Pagination'
import Loader from '../src/Loader/Loader'

export default function Home() {
	const [articles, setArticles] = useState<ArticleType[]>([])
	const [page, setPage] = useState(0)
	const [pageLimit, setPageLimit] = useState(10)
	const [pageCount, setPageCount] = useState(0)

	useEffect(() => {
		const getArticles = async () => {
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
		}
		getArticles()
	}, [page, pageLimit])

	return (
		<div className='bg-slate-200'>
			<Head>
				<title>Vineel Sai | Blog</title>
				<meta name="description" content="Blog by Vineel Sai"></meta>
				<link rel="icon" href="/logo.png" />
			</Head>

			<Navbar />

			{
				articles.length > 0 ? (
					<div className='main flex items-center'>
						{
							articles.map(article => (
								<Link href={"post/" + article.url} className='card bg-white w-4/5 flex flex-row border-2 border-slate-400' key={article.url}>
									<Image src={article.imageUrl} alt="image" width={200} height={200} />
									<div>
										<h2 className='font-bold leading-tight text-3xl m-4'>{article.title}</h2>
										<h4 className='m-2 p-2 font-normal leading-tight text-xl'>{article.description.substring(0, 100)}</h4>
									</div>
								</Link>
							))
						}
					</div>
				) : (
					<Loader />
				)
			}

			<div className='flex flex-col'>
				{
					pageCount > 1 &&
					<Pagination
						page={page}
						setPage={setPage}
						pageCount={pageCount}
					/>
				}

				<Footer />
			</div>
		</div >
	)
}
