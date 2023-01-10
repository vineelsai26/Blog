import React from 'react'
import { ArticleType } from "../../types/article"
import Markdown from '../Markdown/Markdown'

export default function ArticlePreview({ article }: { article: ArticleType }) {
	return (
		<div className='min-h-screen bg-slate-200'>
			<div className='w-full lg:w-3/5 md:w-2/3 m-auto p-8 bg-white'>
				<h1 className='text-center font-medium leading-tight text-5xl mt-0 mb-2'>{article.title}</h1>
				<Markdown article={article} />
			</div>
		</div>
	)
}
