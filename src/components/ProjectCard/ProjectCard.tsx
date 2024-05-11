'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function ProjectCard({ project }: { project: ProjectType }) {
	const [showButtons, setShowButtons] = useState(false)
	return (
		<div className='relative m-10 flex h-auto w-full flex-col overflow-hidden rounded-lg bg-white md:w-2/5 lg:w-3/12 dark:bg-gray-800'>
			<div
				className='relative h-64'
				onMouseEnter={() => {
					setShowButtons(true)
				}}
				onMouseLeave={() => {
					setShowButtons(false)
				}}
			>
				<div
					className='absolute top-1/2 z-10 flex w-full -translate-y-1/2 flex-row justify-evenly p-4'
					hidden={!showButtons}
				>
					{project.downloadUrl && (
						<button
							className='relative w-2/5 rounded border border-blue-500 bg-blue-500 bg-transparent px-4 py-2 font-semibold text-white duration-300 hover:border-blue-200 hover:border-transparent hover:bg-blue-700'
							onClick={() =>
								window.open(project.downloadUrl, '_blank')
							}
							hidden={!showButtons}
						>
							Download
						</button>
					)}
					{project.previewUrl && (
						<button
							className='relative w-2/5 rounded border border-blue-500 bg-blue-500 bg-transparent px-4 py-2 font-semibold text-white duration-300 hover:border-blue-200 hover:border-transparent hover:bg-blue-700'
							onClick={() =>
								window.open(project.previewUrl, '_blank')
							}
							hidden={!showButtons}
						>
							Preview
						</button>
					)}
					<button
						className='relative w-2/5 rounded border border-blue-500 bg-blue-500 bg-transparent px-4 py-2 font-semibold text-white duration-300 hover:border-blue-200 hover:border-transparent hover:bg-blue-700'
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
					className={
						'relative h-full w-full rounded-t-md object-cover' +
						(showButtons ? ' animate-pulse blur' : '')
					}
				/>
			</div>
			<div className='p-2'>
				<h1 className='my-6 text-center text-5xl font-semibold dark:text-white'>
					{project.name}
				</h1>
			</div>
			<div className='h-[250px] p-8 pt-0'>
				<p className='my-6 text-center text-xl font-semibold dark:text-white'>
					{project.description}
				</p>
				<Image
					src={`https://icons.vineelsai.com/icons?i=${project.tags}`}
					alt={project.tags}
					width={400}
					height={100}
					className='m-auto h-12'
				/>
			</div>
		</div>
	)
}
