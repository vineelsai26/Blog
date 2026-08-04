import Link from 'next/link'
import Image from 'next/image'
import { ArticleType } from '../../types/article'
import { HiOutlineArrowRight, HiOutlineCalendarDays } from 'react-icons/hi2'

export default function Article({
	article,
	priority = false,
}: {
	article: ArticleType
	priority?: boolean
}) {
	return (
		<Link
			href={`post/${article.url}`}
			className='brutal-card grid overflow-hidden transition-transform hover:-translate-y-0.5 lg:grid-cols-[220px_1fr]'
		>
			<div className='relative min-h-[200px] bg-[var(--surface-strong)]'>
				<Image
					src={article.imageUrl}
					alt={article.title}
					fill
					sizes='(max-width: 1024px) 100vw, 220px'
					priority={priority}
					className='object-cover'
				/>
			</div>
			<div className='flex flex-col gap-4 p-7'>
				<div className='flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between'>
					<h2 className='display-heading text-2xl md:text-3xl'>
						{article.title}
					</h2>
					<span className='brutal-tag w-fit'>Read</span>
				</div>
				<div className='flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]'>
					<span className='inline-flex items-center gap-2'>
						<HiOutlineCalendarDays className='text-base' />
						{new Date(article.createdAt).toLocaleDateString('en', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})}
					</span>
				</div>
				<div className='flex flex-wrap gap-2'>
					{article.tags &&
						article.tags.length > 0 &&
						article.tags.map((tag: string, index: number) => (
							<span key={index} className='brutal-tag'>
								{tag}
							</span>
						))}
				</div>
				<p className='text-base leading-7 text-[var(--text-secondary)]'>
					{article.description && article.description.substring(0, 190)}
				</p>
				<span className='mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)]'>
					Open article
					<HiOutlineArrowRight className='text-lg' />
				</span>
			</div>
		</Link>
	)
}
