import Image from 'next/image'
import Link from 'next/link'
import { HiArrowLongRight, HiOutlineArrowUpRight } from 'react-icons/hi2'

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

export default function Home() {
	return (
		<div className='section-shell !pt-8'>
			<div className='site-container surface-stack'>
				<section id='home' className='hero-grid enter-rise'>
					<div className='surface-stack gap-10'>
						<div className='hero-panel'>
							<p className='meta-label mb-5'>Software · systems · writing</p>
							<h1 className='hero-title'>
								Vineel
								<br />
								<span className='text-[var(--accent)]'>Sai</span>
							</h1>
							<div className='divider-rule mt-6' />
							<p className='hero-copy mt-6'>
								I build backend systems, developer tooling, and web products
								that stay fast, reliable, and easy to maintain.
							</p>
							<div className='mt-9 flex flex-col gap-3 sm:flex-row sm:items-center'>
								<Link href='/#projects' className='brutal-button'>
									View projects
									<HiArrowLongRight className='text-xl' />
								</Link>
								<a
									href='/resume/resume.pdf'
									target='_blank'
									rel='noopener noreferrer'
									className='brutal-button brutal-button-secondary'
								>
									Open resume
									<HiOutlineArrowUpRight className='text-xl' />
								</a>
							</div>
						</div>

						<div className='grid gap-3 md:grid-cols-3'>
							{[
								{
									label: 'Blog',
									value: 'Read posts and notes',
									href: '/blog',
								},
								{
									label: 'Tools',
									value: 'Browser utilities',
									href: '/tools',
								},
								{
									label: 'Resume',
									value: 'Full experience',
									href: '/resume/resume.pdf',
								},
							].map((item) => (
								<a
									key={item.label}
									href={item.href}
									target={
										item.href.startsWith('/resume') ? '_blank' : undefined
									}
									rel={
										item.href.startsWith('/resume')
											? 'noopener noreferrer'
											: undefined
									}
									className='hero-note transition-transform hover:-translate-y-0.5'
								>
									<p className='meta-label'>{item.label}</p>
									<p className='display-heading mt-2 text-xl text-[var(--text-primary)]'>
										{item.value}
									</p>
								</a>
							))}
						</div>
					</div>

					<div className='brutal-card hero-portrait'>
						<div className='absolute inset-0 bg-[url("/background.webp")] bg-cover bg-center opacity-35' />
						<div className='absolute inset-0 z-10 flex flex-col items-center justify-end gap-5 p-6 pb-8 text-center'>
							<div className='relative h-40 w-40 overflow-hidden rounded-full shadow-[var(--shadow)] ring-4 ring-[var(--surface)]'>
								<Image
									src='/profile.webp'
									alt='Vineel Sai'
									fill
									sizes='160px'
									className='object-cover'
								/>
							</div>
							<div className='frost-panel'>
								<p className='meta-label'>Current focus</p>
								<p className='mt-2 text-sm leading-6 text-[var(--text-secondary)]'>
									Building software across backend, tooling, and web with an
									emphasis on reliability and clear execution.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section id='projects' className='section-shell'>
					<div className='section-heading'>
						<div className='section-eyebrow'>Selected work</div>
						<h2 className='section-title'>Projects</h2>
						<div className='divider-rule' />
						<p className='section-copy'>
							Products, tools, and infrastructure across web, desktop, mobile,
							and cloud.
						</p>
					</div>
					<div className='grid gap-6 lg:grid-cols-2'>
						{projects.map((project, index) => (
							<ProjectCard
								key={project.name}
								project={project}
								priority={index < 2}
							/>
						))}
					</div>
				</section>

				<section id='experience' className='section-shell'>
					<div className='section-heading'>
						<div className='section-eyebrow'>Timeline</div>
						<h2 className='section-title'>Experience</h2>
						<div className='divider-rule' />
						<p className='section-copy'>
							Roles focused on backend engineering, infrastructure, and product
							delivery.
						</p>
					</div>
					<div className='surface-stack'>
						{workExperience.map((work) => (
							<WorkCard key={`${work.companyName}-${work.from}`} work={work} />
						))}
					</div>
				</section>

				<Contact />
			</div>
		</div>
	)
}
