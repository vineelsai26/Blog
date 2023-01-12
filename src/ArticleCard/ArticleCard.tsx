import Link from 'next/link'
import Image from 'next/image'
import { ArticleType } from '../../types/article'
import { FcCalendar } from 'react-icons/fc'


export default function Article({ article }: { article: ArticleType }) {
	return (
		<Link href={`post/${article.url}`} className='m-4 p-4 rounded-xl bg-white w-full lg:w-3/5 md:w-2/3 flex flex-col lg:flex-row items-center border-2 border-slate-400'>
			<Image
				src={article.imageUrl}
				alt="image"
				width={200}
				height={200}
				priority
				className='w-2/3 h-auto max-h-60 max-w-64 lg:w-52 lg:h-52 object-scale-down'
			/>
			<div className='h-full'>
				<h2 className='font-bold text-3xl m-4 mt-0'>{article.title}</h2>
				<div className='flex flex-row items-center m-4'>
					<FcCalendar className='text-xl' />
					<p className='px-1 font-bold'>
						{new Date(article.createdAt).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })}
					</p>
				</div>
				<h4 className='m-2 p-2 font-normal text-xl'>{article.description}</h4>
			</div>
		</Link>
	)
}
