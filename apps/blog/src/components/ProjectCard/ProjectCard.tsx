'use client'

import Image from 'next/image'
import {
	HiOutlineArrowTopRightOnSquare,
	HiOutlineCodeBracket,
	HiOutlineCloudArrowDown,
} from 'react-icons/hi2'

export default function ProjectCard({
	project,
	priority = false,
}: {
	project: ProjectType
	priority?: boolean
}) {
	const tags = project.tags.split(',').map((tag) => tag.trim())
	const actions = [
		project.previewUrl
			? {
					label: 'Preview',
					href: project.previewUrl,
					icon: HiOutlineArrowTopRightOnSquare,
				}
			: null,
		project.downloadUrl
			? {
					label: 'Download',
					href: project.downloadUrl,
					icon: HiOutlineCloudArrowDown,
				}
			: null,
		{
			label: 'Code',
			href: project.gitUrl,
			icon: HiOutlineCodeBracket,
		},
	].filter(Boolean) as Array<{
		label: string
		href: string
		icon: typeof HiOutlineCodeBracket
	}>

	return (
		<article className='brutal-card flex h-full flex-col overflow-hidden bg-[var(--surface)]'>
			<div className='relative h-64 overflow-hidden bg-[var(--accent-muted)]'>
				<span className='brutal-tag absolute left-4 top-4 z-10'>Featured</span>
				<Image
					src={project.image}
					alt={project.name}
					fill
					sizes='(max-width: 1024px) 100vw, 50vw'
					priority={priority}
					className='object-cover transition-transform duration-300 hover:scale-[1.03]'
				/>
			</div>
			<div className='flex flex-1 flex-col gap-5 p-7'>
				<div>
					<p className='meta-label'>Project</p>
					<h3 className='display-heading mt-2 text-2xl md:text-3xl'>
						{project.name}
					</h3>
				</div>
				<p className='text-base leading-7 text-[var(--text-secondary)]'>
					{project.description}
				</p>
				<div className='flex flex-wrap gap-2'>
					{tags.map((tag) => (
						<span key={tag} className='brutal-tag'>
							{tag}
						</span>
					))}
				</div>
				<div className='mt-auto flex flex-wrap gap-2 pt-2'>
					{actions.map((action) => (
						<a
							key={action.label}
							href={action.href}
							target='_blank'
							rel='noopener noreferrer'
							className='brutal-button brutal-button-secondary px-3.5 py-2.5 text-sm'
						>
							<action.icon className='text-lg' />
							{action.label}
						</a>
					))}
				</div>
			</div>
		</article>
	)
}
