import Image from 'next/image'

import projects from '../data/projects'
import Contact from '../components/Contact/Contact'
import ProjectCard from '../components/ProjectCard/ProjectCard'
import workExperience from '../data/work'
import WorkCard from '../components/WorkCard/WorkCard'

export const metadata = {
	title: 'Vineel Sai',
	description: 'Portfolio of Vineel Sai',
}

export const revalidate = 3600
export const runtime = 'edge'

export default function Home() {
	return (
		<div>
			<div className='min-h-screen w-full'>
				<div
					className='relative max-h-screen min-h-screen w-full bg-fixed'
					style={{ backgroundImage: 'url(/background.webp)' }}
				>
					<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
						<Image
							src='/profile.webp'
							alt='Vineel Sai'
							width={160}
							height={160}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							className='m-auto h-auto w-auto rounded-full'
						/>
						<h1 className='p-2 text-center text-4xl font-semibold text-orange-600'>
							Vineel Sai
						</h1>
						<p className='p-2 text-center text-xl font-semibold text-white'>
							Hi, Welcome to my Portfolio, Scroll down to findout
							more about me
						</p>
					</div>
				</div>

				<div id='projects' className='min-h-screen w-full'>
					<div className='w-full'>
						<h1 className='m-5 p-2 text-center text-4xl font-semibold dark:text-white'>
							My Projects
						</h1>
						<p className='m-2 text-center text-xl dark:text-white'>
							Hear are the Projects I Worked on.
						</p>
						<div
							className='flex w-full flex-wrap items-center justify-center'
							style={{ margin: 0, width: '100%' }}
						>
							{projects.map((project, index) => {
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

				<div id='projects' className='min-h-screen w-full'>
					<div className='w-full'>
						<h1 className='m-5 p-2 text-center text-4xl font-semibold dark:text-white'>
							Work Experience
						</h1>
						<p className='m-2 text-center text-xl dark:text-white'>
							Hear are the Companies I Worked for/with.
						</p>
						<p className='m-2 text-center text-xl dark:text-white'>
							For details on what I did at each company, please
							check out my{' '}
							<a
								className='text-blue-400'
								href='/resume/resume.pdf'
							>
								resume
							</a>
							.
						</p>
						<div
							className='flex w-full flex-wrap items-center justify-center'
							style={{ margin: 0, width: '100%' }}
						>
							{workExperience.map((work, index) => {
								return <WorkCard key={index} work={work} />
							})}
						</div>
					</div>
				</div>
			</div>

			<Contact />
		</div>
	)
}
