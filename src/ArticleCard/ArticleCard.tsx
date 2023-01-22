import Link from 'next/link'
import Image from 'next/image'
import { ArticleType } from '../../types/article'
import { FcCalendar } from 'react-icons/fc'


export default function Article({ article }: { article: ArticleType }) {
	return (
		<Link href={`post/${article.url}`} className='m-4 p-4 rounded-xl bg-white dark:bg-gray-800 w-full lg:w-3/5 md:w-2/3 lg:5/6 flex flex-col lg:flex-row items-center border-2 border-slate-400'>
			<div className='w-full lg:w-1/6'>
				<Image
					src={article.imageUrl}
					alt="image"
					width={200}
					height={200}
					priority
					className='w-full h-auto lg:w-52 lg:h-36 object-scale-down'
				/>
			</div>
			<div className='h-full py-10 md:py-0 md:w-5/6'>
				<h2 className='font-bold text-3xl m-4 mt-0 dark:text-white'>{article.title}</h2>
				<div className='flex flex-row items-center m-4'>
					<FcCalendar className='text-xl' />
					<p className='px-1 font-bold dark:text-white'>
						{new Date(article.createdAt).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })}
					</p>
				</div>
				<p className='m-2 p-2 font-normal text-xl dark:text-white'>{article.description.substring(0,150)}</p>
			</div>
		</Link>
	)
}
