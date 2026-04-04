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
			<div className='relative h-72 overflow-hidden border-b-[3px] border-[var(--border)] bg-[var(--accent-muted)]'>
				<div className='surface-default absolute left-4 top-4 z-10 brutal-tag'>
					Featured project
				</div>
				<Image
					src={project.image}
					alt={project.name}
					fill
					sizes='(max-width: 1024px) 100vw, 50vw'
					priority={priority}
					className='object-cover transition-transform duration-300 hover:scale-[1.04]'
				/>
			</div>
			<div className='flex flex-1 flex-col gap-6 p-8'>
				<div className='flex items-start justify-between gap-4'>
					<div>
						<p
							className='text-xs font-bold uppercase tracking-[0.24em] text-[var(--text-secondary)]'
							style={{ fontFamily: 'var(--font-mono)' }}
						>
							Build
						</p>
						<h3 className='mt-3 text-3xl font-black uppercase tracking-[-0.05em]'>
							{project.name}
						</h3>
					</div>
					<div className='inverse-surface hidden rounded-full border-2 border-[var(--border)] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] sm:block'>
						{actions.length} links
					</div>
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
				<div className='mt-auto flex flex-wrap gap-3 pt-4'>
					{actions.map((action) => (
						<a
							key={action.label}
							href={action.href}
							target='_blank'
							rel='noopener noreferrer'
							className='brutal-button brutal-button-secondary px-4 py-3 text-sm'
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
