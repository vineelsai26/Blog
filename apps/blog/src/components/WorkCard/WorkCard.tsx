import Image from 'next/image'
import { HiOutlineArrowLongRight } from 'react-icons/hi2'

export default function WorkCard({ work }: { work: WorkExperienceType }) {
	return (
		<article className='brutal-card grid gap-0 overflow-hidden md:grid-cols-[220px_1fr]'>
			<div className='relative min-h-[220px] border-b-[3px] border-[var(--border)] md:border-b-0 md:border-r-[3px]'>
				<Image
					src={work.image}
					alt={work.companyName}
					fill
					sizes='220px'
					className='object-contain p-8'
				/>
			</div>
			<div className='flex flex-col gap-5 p-8'>
				<div className='flex flex-col gap-4 md:flex-row md:items-start md:justify-between'>
					<div>
						<p
							className='text-xs font-bold uppercase tracking-[0.24em] text-[var(--text-secondary)]'
							style={{ fontFamily: 'var(--font-mono)' }}
						>
							Experience
						</p>
						<h3 className='mt-3 text-3xl font-black uppercase tracking-[-0.05em]'>
							{work.companyName}
						</h3>
						<p className='mt-3 text-lg font-semibold uppercase tracking-[0.08em] text-[var(--accent)]'>
							{work.role}
						</p>
					</div>
					<div className='brutal-card-soft w-fit bg-[var(--surface-strong)] px-4 py-3 text-sm font-bold uppercase tracking-[0.18em]'>
						{work.from}
						<HiOutlineArrowLongRight className='mx-2 inline-block text-base' />
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
