import Image from 'next/image'

export default function WorkCard({ work }: { work: WorkExperienceType }) {
	return (
		<div className='relative m-10 flex h-auto w-full flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-800 md:w-2/5 lg:w-3/12'>
			<div className='relative h-64'>
				<Image
					src={work.image}
					alt={work.companyName}
					style={{ objectFit: 'fill' }}
					width={200}
					height={200}
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					className='relative h-full w-full rounded-t-md object-cover'
				/>
			</div>
			<div className='p-2'>
				<h1 className='mt-6 text-center text-5xl font-semibold dark:text-white'>
					{work.companyName}
				</h1>
			</div>
			<div className='p-8 pt-0'>
				<h3 className='my-6 text-center text-xl font-semibold dark:text-white'>
					From {work.from}
					<br />
					to {work.to}
				</h3>
				<p className='my-6 text-center text-xl font-semibold dark:text-white'>
					{work.role}
				</p>
			</div>
		</div>
	)
}
