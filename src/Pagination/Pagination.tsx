import { GrNext, GrPrevious } from 'react-icons/gr'

export default function Pagination({
	pageCount,
	page,
}: {
	pageCount: number
	page: number
}) {
	return (
		<div className='m-auto flex w-4/5 flex-row-reverse'>
			<div
				className='isolate m-4 inline-flex -space-x-px rounded-md p-4'
				aria-label='Pagination'
			>
				<button
					disabled={page <= 0}
					style={{ display: page <= 0 ? 'none' : 'inline-flex' }}
					className='relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'
					
				>
					<span className='sr-only'>Previous</span>
					<GrPrevious />
				</button>

				{Array.from({ length: pageCount }, (_, i) => {
					return (
						<button
							key={i}
							className='relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10'
							
						>
							{i + 1}
						</button>
					)
				})}

				<button
					className='relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20'
					disabled={page >= pageCount - 1}
					style={{
						display: page >= pageCount - 1 ? 'none' : 'inline-flex',
					}}
				>
					<span className='sr-only'>Next</span>
					<GrNext />
				</button>
			</div>
		</div>
	)
}
