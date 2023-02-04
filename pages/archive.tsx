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

export default function Archive({
	analytics,
	setAnalytics,
}: {
	analytics: boolean
	setAnalytics: Dispatch<SetStateAction<boolean>>
}) {
	return (
		<div className={`${kalam.className} bg-slate-200 dark:bg-gray-600`}>
			<Head>
				<title>Vineel Sai</title>
				<meta name='description' content='Archive of Portfolios of Vineel Sai' />
			</Head>

			<Navbar
				showSearch={false}
				setArticles={null}
				setLoading={null}
				analytics={analytics}
				setAnalytics={setAnalytics}
			/>

			<div className='min-h-screen'>
				<div id='projects' className='min-h-screen w-full'>
					<div className='w-full'>
						<h1 className='m-5 p-2 text-center text-4xl font-semibold'>
							My Projects
						</h1>
						<div
							className='flex w-full flex-wrap items-center justify-center'
							style={{ margin: 0, width: '100%' }}
						>
							{archive.map((project, index) => {
								return (
									<ProjectCard
										key={index}
										project={project}
									/>
								)
							})}
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</div>
	)
}
