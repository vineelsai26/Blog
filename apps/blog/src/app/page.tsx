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
		<div className='section-shell'>
			<div className='site-container surface-stack'>
				<section id='home' className='hero-grid enter-rise'>
					<div className='surface-stack'>
						<div
							className='section-eyebrow'
							style={{ fontFamily: 'var(--font-mono)' }}
						>
							System.Init() // Software Developer
						</div>
						<div className='brutal-card hero-panel'>
							<p
								className='mb-6 text-sm font-bold uppercase tracking-[0.28em] text-[var(--text-secondary)]'
								style={{ fontFamily: 'var(--font-mono)' }}
							>
								Backend systems · web apps · writing
							</p>
							<h1 className='hero-title'>
								Vineel <br />
								<span className='text-[var(--accent)]'>Sai.</span>
							</h1>
							<p className='hero-copy mt-8'>
								I build backend systems, developer tooling, and web
								products that stay fast, reliable, and easy to maintain.
							</p>
							<div className='mt-10 flex flex-col gap-4 sm:flex-row'>
								<Link href='/#projects' className='brutal-button'>
									View Projects
									<HiArrowLongRight className='text-xl' />
								</Link>
								<a
									href='/resume/resume.pdf'
									target='_blank'
									rel='noopener noreferrer'
									className='brutal-button brutal-button-secondary'
								>
									Open Resume
									<HiOutlineArrowUpRight className='text-xl' />
								</a>
							</div>
						</div>

						<div className='grid gap-4 md:grid-cols-3'>
							{[
								{
									label: 'View Blog',
									value: 'Read posts and notes',
									href: '/blog',
								},
								{
									label: 'Explore Tools',
									value: 'Open browser utilities',
									href: '/tools',
								},
								{
									label: 'Open Resume',
									value: 'See full experience',
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
									className='hero-note transition-transform hover:-translate-y-1'
								>
									<p
										className='text-xs font-bold uppercase tracking-[0.22em] text-[var(--text-secondary)]'
										style={{ fontFamily: 'var(--font-mono)' }}
									>
										{item.label}
									</p>
									<p className='mt-3 text-2xl font-black uppercase tracking-tight'>
										{item.value}
									</p>
								</a>
							))}
						</div>
					</div>

					<div className='brutal-card hero-portrait'>
						<div className='surface-default absolute right-4 top-4 z-10 border-2 border-[var(--border)] px-3 py-2 text-xs font-bold uppercase tracking-[0.22em]'>
							Open to building useful things
						</div>
						<div className='absolute inset-0 bg-[url("/background.webp")] bg-cover bg-center opacity-25' />
						<div className='absolute inset-0 flex flex-col items-center justify-center gap-6 p-6 text-center'>
							<div className='surface-default relative h-44 w-44 overflow-hidden rounded-full border-[4px] border-[var(--border)] shadow-[8px_8px_0_0_#111111]'>
								<Image
									src='/profile.webp'
									alt='Vineel Sai'
									fill
									sizes='176px'
									className='object-cover'
								/>
							</div>
							<div className='surface-default max-w-sm brutal-card-soft p-5'>
								<p
									className='text-xs font-bold uppercase tracking-[0.22em] text-[var(--text-secondary)]'
									style={{ fontFamily: 'var(--font-mono)' }}
								>
									Current focus
								</p>
								<p className='mt-3 text-left text-base leading-7 text-[var(--text-secondary)]'>
									Building software across backend, tooling, and web
									with an emphasis on reliability and clear execution.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section id='projects' className='section-shell'>
					<div className='section-heading'>
						<div
							className='section-eyebrow'
							style={{ fontFamily: 'var(--font-mono)' }}
						>
							Things I&apos;ve Built
						</div>
						<h2 className='section-title'>Projects</h2>
						<div className='divider-rule' />
						<p className='section-copy'>
							Products, tools, experiments, and infrastructure work across web,
							desktop, mobile, and cloud.
						</p>
					</div>
					<div className='grid gap-8 lg:grid-cols-2'>
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
						<div
							className='section-eyebrow'
							style={{ fontFamily: 'var(--font-mono)' }}
						>
							Professional Timeline
						</div>
						<h2 className='section-title'>Experience</h2>
						<div className='divider-rule' />
						<p className='section-copy'>
							Roles focused on backend engineering, infrastructure, and product
							delivery with the same visual weight as the featured project work.
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
