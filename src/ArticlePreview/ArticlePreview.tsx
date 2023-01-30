import React from 'react'
import { ArticleType } from "../../types/article"
import Markdown from '../Markdown/Markdown'
import Image from 'next/image'

export default function ArticlePreview({ article }: { article: ArticleType }) {
	return (
		<div className='min-h-screen bg-slate-200 dark:bg-gray-600'>
			<div className='w-full lg:w-3/5 md:w-2/3 m-auto p-8 bg-white dark:bg-gray-800'>
				<h1 className='text-center font-medium leading-tight text-5xl mt-0 mb-2 dark:text-white'>{article.title}</h1>
				<div className='flex flex-row items-center justify-center'>
					<p className='text-center font-medium leading-tight text-2xl py-4 dark:text-white'>By</p>
					<p className='text-center font-light leading-tight text-xl py-4 px-2 dark:text-white'>
						{article.createdBy.name}
					</p>
					<Image src={article.createdBy.profilePicture} alt={'profile'} width={128} height={128} className='h-8 w-8 my-4 rounded-full' />
				</div>
				<div className='flex justify-evenly w-96 mx-auto my-4'>
					{
						article.tags.map((tag, index) => {
							return (
								<span
									key={index}
									className="px-4 py-2 rounded-full text-gray-500 bg-gray-200 font-semibold text-sm flex align-center w-max cursor-pointer active:bg-gray-300 transition duration-300 ease">
									{tag}
								</span>
							)
						})
					}
				</div>
				<Markdown article={article} />
			</div>
		</div>
	)
}
