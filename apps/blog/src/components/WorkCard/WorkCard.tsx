import Image from 'next/image'
import { HiOutlineArrowLongRight } from 'react-icons/hi2'

export default function WorkCard({ work }: { work: WorkExperienceType }) {
	return (
		<article className='brutal-card grid overflow-hidden md:grid-cols-[200px_1fr]'>
			<div className='relative min-h-[180px] bg-[var(--surface-strong)] md:min-h-full'>
				<Image
					src={work.image}
					alt={work.companyName}
					fill
					sizes='200px'
					className='object-contain p-8'
				/>
			</div>
			<div className='flex flex-col gap-4 p-7'>
				<div className='flex flex-col gap-3 md:flex-row md:items-start md:justify-between'>
					<div>
						<p className='meta-label'>Experience</p>
						<h3 className='display-heading mt-2 text-2xl md:text-3xl'>
							{work.companyName}
						</h3>
						<p className='mt-2 text-base font-medium text-[var(--accent)]'>
							{work.role}
						</p>
					</div>
					<div className='inline-flex w-fit items-center gap-2 rounded-full bg-[var(--accent-muted)] px-3 py-1.5 text-xs font-medium text-[var(--accent)]'>
						{work.from}
						<HiOutlineArrowLongRight className='text-sm' />
						{work.to}
					</div>
				</div>
				<p className='max-w-3xl text-base leading-7 text-[var(--text-secondary)]'>
					{work.description}
				</p>
			</div>
		</article>
	)
}
