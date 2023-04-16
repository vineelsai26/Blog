import React from 'react'
import { ArticleType } from '../../types/article'
import Markdown from '../Markdown/Markdown'
import Image from 'next/image'

export default function ArticlePreview({ article }: { article: ArticleType }) {
	return (
		<div className='min-h-screen bg-slate-200 dark:bg-gray-600'>
			<div className='m-auto w-full bg-white p-8 dark:bg-gray-800 md:w-2/3 lg:w-3/5'>
				<h1 className='mt-0 mb-2 text-center text-5xl font-medium leading-tight dark:text-white'>
					{article.title}
				</h1>
				{article.createdBy && (
					<div className='flex flex-row items-center justify-center'>
						<p className='py-4 text-center text-2xl font-medium leading-tight dark:text-white'>
							By
						</p>
						<p className='py-4 px-2 text-center text-xl font-light leading-tight dark:text-white'>
							{article.createdBy.name}
						</p>
						<Image
							src={article.createdBy.profilePicture}
							alt={'profile'}
							width={128}
							height={128}
							className='my-4 h-8 w-8 rounded-full'
						/>
					</div>
				)}
				<div className='mx-auto my-4 flex w-96 justify-evenly'>
					{article.tags && article.tags.map((tag, index) => {
						return (
							<span
								key={index}
								className='align-center ease flex w-max cursor-pointer rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-500 transition duration-300 active:bg-gray-300'
							>
								{tag}
							</span>
						)
					})}
				</div>
				<Markdown article={article} />
			</div>
		</div>
	)
}
