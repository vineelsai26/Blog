import Head from 'next/head'
import Footer from '../src/Footer/Footer'
import Navbar from '../src/Navbar/Navbar'

export default function Apps() {
	return (
		<div className='bg-slate-200'>
			<Head>
				<title>Vineel Sai | Blog</title>
				<meta name="description" content="Blog by Vineel Sai"></meta>
				<link rel="icon" href="/logo.png" />
			</Head>

			<Navbar showSearch={false} setArticles={null} setLoading={null} />

			<div className='min-h-screen'>
			</div>

			<Footer />
		</div >
	)
}
