import Head from 'next/head'
import Footer from '../src/Footer/Footer'
import Navbar from '../src/Navbar/Navbar'
import Image from 'next/image'
import Typewriter from 'typewriter-effect'
import { Kalam } from '@next/font/google'

import projects from '../data/projects'
import ProjectCard from '../src/ProjectCard/ProjectCard'

const kalam = Kalam({
	weight: '400',
	subsets: ['latin'],
})

export default function Home() {
	return (
		<div className={`${kalam.className} bg-slate-200`}>
			<Head>
				<title>Vineel Sai</title>
				<meta name="description" content="Portfolio of Vineel Sai" />
				<link rel="icon" href="/logo.png" />
			</Head>

			<div className='absolute w-full'>
				<Navbar showSearch={false} setArticles={null} setLoading={null} />
			</div>

			<div className='min-h-screen'>
				<div className='min-h-screen w-full'>
					<Image src='/background.jpg' alt='Vineel Sai' width={1920} height={1080} className='h-screen' />

					<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
						<Image src='/profile.png' alt='Vineel Sai' width={200} height={200} className='m-auto w-40 rounded-full' />
						<h1 className='text-4xl text-center font-semibold text-orange-600 p-2'>Vineel Sai</h1>
						<span className='text-white text-center text-xl my-1'>
							<Typewriter
								options={{
									strings: ['Software Engineer', 'Full Stack Web Developer', 'Open Source Contributor', 'Blogger', 'Linux Enthusiast'],
									autoStart: true,
									loop: true,
								}}
							/>
						</span>
					</div>
				</div>

				<div id='projects' className='min-h-screen w-full'>
					<div className='w-full'>
						<h1 className='text-4xl text-center font-semibold p-2 m-5'>My Projects</h1>
						<div className='flex items-center justify-center flex-wrap w-full' style={{ margin: 0, width: '100%' }}>
							{
								projects.map((project, index) => {
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
