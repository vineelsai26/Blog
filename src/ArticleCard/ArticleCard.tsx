import Link from 'next/link'
import Image from 'next/image'
import { ArticleType } from '../../types/article'

export default function Article({ article }: { article: ArticleType }) {
	return (
		<Link href={"post/" + article.url} className='card bg-white w-full lg:w-3/5 md:w-2/3 flex flex-col lg:flex-row items-center border-2 border-slate-400'>
			<Image
				src={article.imageUrl}
				alt="image"
				width={200}
				height={200}
				priority
				className='w-2/3 h-auto max-h-60 max-w-64 lg:w-52 lg:h-40'
			/>
			<div>
				<h2 className='font-bold leading-tight text-3xl m-4'>{article.title}</h2>
				<h4 className='m-2 p-2 font-normal leading-tight text-xl'>{article.description}</h4>
			</div>
		</Link>
	)
}
