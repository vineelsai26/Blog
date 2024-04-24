import React from 'react'
import { ArticleType, UserType } from '../../types/article'
import Markdown from '../Markdown/Markdown'
import Image from 'next/image'

export default function ArticlePreview({
	article,
	user,
}: {
	article: ArticleType
	user: UserType | null
}) {
	return (
		<div className='min-h-screen bg-slate-200 dark:bg-gray-600'>
			<div className='m-auto w-full bg-white p-8 md:w-2/3 lg:w-3/5 dark:bg-gray-800'>
				<h1 className='mb-2 mt-0 text-center text-5xl font-medium leading-tight dark:text-white'>
					{article.title}
				</h1>
				{user && (
					<div className='flex flex-row items-center justify-center'>
						<p className='py-4 text-center text-2xl font-medium leading-tight dark:text-white'>
							By
						</p>
						<p className='px-2 py-4 text-center text-xl font-light leading-tight dark:text-white'>
							{user.name}
						</p>
						<Image
							src={user.profilePicture}
							alt={'profile'}
							width={128}
							height={128}
							className='my-4 h-8 w-8 rounded-full'
						/>
					</div>
				)}
				<div className='mx-auto my-4 flex w-96 justify-evenly'>
					{article.tags &&
						article.tags.map((tag: string, index: number) => {
							return (
								<span
									key={index}
									className='align-center ease flex w-max cursor-pointer rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-black transition duration-300 active:bg-gray-300'
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
