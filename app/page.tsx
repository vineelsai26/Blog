import Image from 'next/image'

import projects from '../data/projects'
import Contact from '../src/Contact/Contact'
import ProjectCard from '../src/ProjectCard/ProjectCard'
import TypeWriter from '../src/TypeWriter/TypeWriter'

export const metadata = {
	title: 'Vineel Sai',
	description: 'Portfolio of Vineel Sai',
}

export const revalidate = 3600

export default function Home() {
	return (
		<div >
			<div className='min-h-screen'>
				<div
					className='min-h-screen w-full bg-fixed'
					style={{ backgroundImage: 'url(/background.jpg)' }}
				>
					<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
						<Image
							src='/profile.png'
							alt='Vineel Sai'
							width={160}
							height={160}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							className='m-auto h-auto w-40 rounded-full'
							priority
						/>
						<h1 className='p-2 text-center text-4xl font-semibold text-orange-600'>
							Vineel Sai
						</h1>
						<TypeWriter />
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
			</div>

			<Contact />
		</div>
	)
}
