import { Dispatch, SetStateAction } from "react"
import { GrNext, GrPrevious } from 'react-icons/gr'

export default function Pagination({ pageCount, setPage, page }: { pageCount: number, setPage: Dispatch<SetStateAction<number>>, page: number }) {
	return (
		<div className='w-4/5 m-auto'>
			<div
				className="isolate inline-flex -space-x-px rounded-md shadow-sm m-4 p-4 float-right"
				aria-label="Pagination"
			>
				<button
					disabled={page === 0}
					style={{ display: page === 0 ? 'none' : 'inline-flex' }}
					className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
					onClick={() => setPage((page) => { return page - 1 })}
				>
					<span className="sr-only">Previous</span>
					<GrPrevious />
				</button>

				{
					Array.from({ length: pageCount }, (_, i) => {
						return (
							<button
								key={i}
								className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10"
								onClick={() => setPage(i)}
							>
								{i + 1}
							</button>
						)
					})
				}

				<button
					className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
					disabled={page === pageCount - 1}
					style={{ display: page === pageCount - 1 ? 'none' : 'inline-flex' }}
					onClick={() => {
						setPage((page) => {
							return page + 1
						})
					}}
				>
					<span className="sr-only">Next</span>
					<GrNext />
				</button>
			</div>
		</div>
	)
}
