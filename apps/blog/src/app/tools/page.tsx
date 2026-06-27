import Link from 'next/link'
import { HiOutlineArrowRight } from 'react-icons/hi2'
import tools from '../../data/tools'

export const metadata = {
	title: 'Tools',
	description: 'Tools by Vineel Sai',
}

export const revalidate = 3600

export default async function Tools() {
	return (
		<div className='section-shell'>
			<div className='site-container surface-stack'>
				<section className='section-heading'>
					<div
						className='section-eyebrow'
						style={{ fontFamily: 'var(--font-mono)' }}
					>
						Utilities
					</div>
					<h1 className='section-title'>Tools</h1>
					<div className='divider-rule' />
					<p className='section-copy'>
						Small browser-based utilities for formatting, encoding, and other
						daily workflow tasks.
					</p>
				</section>
				<section className='tool-grid'>
					{tools.map((tool) => (
						<Link
							key={tool.name}
							className='brutal-card flex flex-col gap-5 p-6 transition-transform hover:-translate-y-1'
							href={tool.url}
						>
							<p
								className='text-xs font-bold uppercase tracking-[0.24em] text-[var(--text-secondary)]'
								style={{ fontFamily: 'var(--font-mono)' }}
							>
								Tool
							</p>
							<h2 className='text-3xl font-black uppercase tracking-[-0.05em]'>
								{tool.name}
							</h2>
							<p className='text-base leading-7 text-[var(--text-secondary)]'>
								{tool.description}
							</p>
							<span className='mt-auto inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[var(--accent)]'>
								Open tool
								<HiOutlineArrowRight className='text-lg' />
							</span>
						</Link>
					))}
				</section>
			</div>
		</div>
	)
}
