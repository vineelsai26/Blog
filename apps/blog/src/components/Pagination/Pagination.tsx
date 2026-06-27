import Link from 'next/link'
import { GrNext, GrPrevious } from 'react-icons/gr'

export default function Pagination({
	pageCount,
	page,
}: {
	pageCount: number
	page: number
}) {
	return (
		<div className='flex justify-center'>
			<div
				className='brutal-card-soft flex flex-wrap items-center gap-3 bg-[var(--surface)] p-4'
				aria-label='Pagination'
			>
				{page > 0 && (
					<Link
						href={`/blog?page=${page - 1}`}
						className='brutal-button brutal-button-secondary px-4 py-3 text-sm'
					>
						<GrPrevious />
					</Link>
				)}

				{Array.from({ length: pageCount }, (_, i) => {
					const isCurrent = i === page
					return (
						<Link
							key={i}
							href={`/blog?page=${i}`}
							className={
								isCurrent
									? 'brutal-button px-4 py-3 text-sm'
									: 'brutal-button brutal-button-secondary px-4 py-3 text-sm'
							}
						>
							{i + 1}
						</Link>
					)
				})}

				{page < pageCount - 1 && (
					<Link
						href={`/blog?page=${page + 1}`}
						className='brutal-button brutal-button-secondary px-4 py-3 text-sm'
					>
						<GrNext />
					</Link>
				)}
			</div>
		</div>
	)
}
