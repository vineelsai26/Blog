import Link from 'next/link'
import Image from 'next/image'
import { ArticleType } from '../../types/article'
import { FcCalendar } from 'react-icons/fc'

export default function Article({ article }: { article: ArticleType }) {
	return (
		<Link
			href={`post/${article.url}`}
			className='lg:5/6 m-4 flex w-full flex-col items-center rounded-xl border-2 border-slate-400 bg-white p-4 dark:bg-gray-800 md:w-2/3 lg:w-3/5 lg:flex-row'
		>
			<div className='w-full lg:w-1/6'>
				<Image
					src={article.imageUrl}
					alt='image'
					width={200}
					height={200}
					className='h-auto w-full object-scale-down lg:h-36 lg:w-52'
				/>
			</div>
			<div className='h-full py-10 md:w-5/6 md:py-0'>
				<h2 className='m-4 mt-0 text-3xl font-bold dark:text-white md:mt-4'>
					{article.title}
				</h2>
				<div className='m-4 flex flex-row items-center'>
					<FcCalendar className='text-xl' />
					<p className='px-1 font-bold dark:text-white'>
						{new Date(article.createdAt).toLocaleDateString('en', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})}
					</p>
				</div>
				<div className='col my-4 flex'>
					{article.tags &&
						article.tags.length > 0 &&
						article.tags.map((tag, index) => {
							return (
								<span
									key={index}
									className='align-center ease mx-4 flex w-max cursor-pointer rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-black transition duration-300 active:bg-gray-300'
								>
									{tag}
								</span>
							)
						})}
				</div>
				<p className='m-2 p-2 text-xl font-extralight dark:text-white'>
					{article.description &&
						article.description.substring(0, 150)}
				</p>
			</div>
		</Link>
	)
}
