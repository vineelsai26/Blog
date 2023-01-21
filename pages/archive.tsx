import Head from 'next/head'
import Footer from '../src/Footer/Footer'
import Navbar from '../src/Navbar/Navbar'
import { Kalam } from '@next/font/google'

import archive from '../data/archive'
import ProjectCard from '../src/ProjectCard/ProjectCard'
import { Dispatch, SetStateAction } from 'react'

const kalam = Kalam({
	weight: '400',
	subsets: ['latin'],
})

export default function Archive({ analytics, setAnalytics }: { analytics: boolean, setAnalytics: Dispatch<SetStateAction<boolean>> }) {
	return (
		<div className={`${kalam.className} bg-slate-200`}>
			<Head>
				<title>Vineel Sai</title>
				<meta name="description" content="Portfolio of Vineel Sai" />
				<link rel="icon" href="/logo.png" />
			</Head>

			<Navbar showSearch={false} setArticles={null} setLoading={null} analytics={analytics} setAnalytics={setAnalytics} />

			<div className='min-h-screen'>
				<div id='projects' className='min-h-screen w-full'>
					<div className='w-full'>
						<h1 className='text-4xl text-center font-semibold p-2 m-5'>My Projects</h1>
						<div className='flex items-center justify-center flex-wrap w-full' style={{ margin: 0, width: '100%' }}>
							{
								archive.map((project, index) => {
									return <ProjectCard key={index} project={project} />
								})
							}
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div >
	)
}
