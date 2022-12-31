import Head from 'next/head'
import { ArticleType } from '../types/article'
import Link from 'next/link'
import Footer from '../src/Footer/Footer'
import Navbar from '../src/Navbar/Navbar'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Pagination from '../src/Pagination/Pagination'

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
        <div>
            <Head>
                <title>Vineel Sai | Blog</title>
                <meta name="description" content="Blog by Vineel Sai"></meta>
                <link rel="icon" href="/logo.png" />
            </Head>

            <Navbar />

            <div className='main'>
                {
                    articles.map(article => (
                        <Link href={"post/" + article.url} className='card' key={article.url}>
                            <Image src={article.imageUrl} className='image' alt="image" width={50} height={50} />
                            <h3>{article.title}</h3>
                            <p>{article.description.substring(0, 100)}</p>
                        </Link>
                    ))
                }
            </div>

            <Pagination
                pageCount={pageCount}
                setPage={setPage}
                page={page}
            />

            <Footer />
        </div >
    )
}
