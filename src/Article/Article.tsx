import Link from 'next/link'
import Image from 'next/image'
import { ArticleType } from '../../types/article'

export default function Article({ article }: { article: ArticleType }) {
	return (
		<Link href={"post/" + article.url} className='card bg-white w-4/5 flex flex-row border-2 border-slate-400'>
			<Image
				src={article.imageUrl}
				alt="image"
				width={200}
				height={200}
				priority
				style={{ width: 'auto', height: 'auto' }}
			/>
			<div>
				<h2 className='font-bold leading-tight text-3xl m-4'>{article.title}</h2>
				<h4 className='m-2 p-2 font-normal leading-tight text-xl'>{article.description.substring(0, 100)}</h4>
			</div>
		</Link>
	)
}
