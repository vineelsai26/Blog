import Image from 'next/image'
import { useState } from 'react'

export default function ProjectCard({ project }: { project: any }) {
	const [showButtons, setShowButtons] = useState(false)
	return (
		<div className='relative bg-white rounded-lg flex flex-col w-full md:w-2/5 lg:w-3/12 m-10 h-auto overflow-hidden dark:bg-gray-800' >
			<div className='relative h-64' onMouseEnter={() => { setShowButtons(true) }} onMouseLeave={() => { setShowButtons(false) }}>
				<div className='flex flex-row justify-evenly p-4 absolute z-10 w-full top-1/2 -translate-y-1/2' >
					{
						project.downloadUrl && (
							<button
								className="w-1/3 relative bg-transparent hover:bg-blue-500 text-blue-700 font-semibold duration-300 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
								onClick={() => window.open(project.downloadUrl, '_blank')}
								hidden={!showButtons}
							>
								Download
							</button>
						)
					}
					{
						project.previewUrl && (
							<button
								className="w-1/3 relative bg-transparent hover:bg-blue-500 text-blue-700 font-semibold duration-300 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
								onClick={() => window.open(project.previewUrl, '_blank')}
								hidden={!showButtons}
							>
								Preview
							</button>
						)
					}
					<button
						className="w-1/3 relative bg-transparent hover:bg-blue-500 text-blue-700 font-semibold duration-300 hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
						onClick={() => window.open(project.gitUrl, '_blank')}
						hidden={!showButtons}
					>
						View Code
					</button>
				</div>
				<Image
					src={project.image}
					alt={project.name}
					fill
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					className='rounded-t-md relative w-full h-full object-cover'
				/>
			</div>
			<div className='p-10 pt-0' style={{ height: '450px' }}>
				<h1 className='text-6xl font-semibold text-center my-10 dark:text-white'>{project.name}</h1>
				<p className='text-2xl text-center my-10 font-semibold dark:text-white'>{project.description}</p>
				<Image src={`https://skillicons.dev/icons?i=${project.tags}`} alt={project.tags} width={400} height={100} className='h-12 m-auto' />
			</div>
		</div>
	)
}
