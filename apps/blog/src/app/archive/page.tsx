import archive from '../../data/archive'
import ProjectCard from '../../components/ProjectCard/ProjectCard'

export const metadata = {
	title: 'Archive of My Portfolios',
	description: 'Archive of Portfolio`s of Vineel Sai',
}

export const revalidate = 3600

export default function Archive() {
	return (
		<div className='section-shell'>
			<div className='site-container surface-stack'>
				<section className='section-heading'>
					<div
						className='section-eyebrow'
						style={{ fontFamily: 'var(--font-mono)' }}
					>
						Older Iterations
					</div>
					<h1 className='section-title'>Archive</h1>
					<div className='divider-rule' />
					<p className='section-copy'>
						Previous versions of the portfolio, preserved as snapshots of how the
						site evolved over time.
					</p>
				</section>
				<section className='grid gap-8 lg:grid-cols-2'>
					{archive.map((project, index) => (
						<ProjectCard
							key={project.name}
							project={project}
							priority={index === 0}
						/>
					))}
				</section>
			</div>
		</div>
	)
}
