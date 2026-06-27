'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArticleType } from '../../types/article'

export default function BlogSearch() {
	const [query, setQuery] = useState('')
	const [searchResults, setSearchResults] = useState<ArticleType[]>([])

	const handleSearch = (value: string) => {
		setQuery(value)

		if (value.trim().length > 0) {
			fetch(`/api/search?query=${encodeURIComponent(value)}`)
				.then((res) => res.json())
				.then((data) => {
					setSearchResults(data)
				})
				.catch(() => {
					setSearchResults([])
				})
			return
		}

		setSearchResults([])
	}

	return (
		<div className='surface-stack'>
			<input
				type='text'
				value={query}
				className='brutal-input'
				placeholder='Search posts'
				onChange={(e) => {
					handleSearch(e.target.value)
				}}
			/>

			{query.trim().length > 0 && (
				<div className='surface-stack'>
					{searchResults.length > 0 ? (
						searchResults.map((article) => (
							<Link
								key={article.url}
								href={`/post/${article.url}`}
								className='brutal-card-soft grid grid-cols-[88px_1fr] gap-4 bg-[var(--surface)] p-3'
							>
								<div className='relative h-20 overflow-hidden border-2 border-[var(--border)]'>
									<Image
										src={article.imageUrl}
										alt={article.title}
										fill
										className='object-cover'
									/>
								</div>
								<div className='min-w-0'>
									<p className='truncate text-lg font-black uppercase tracking-tight'>
										{article.title}
									</p>
									<p className='line-clamp-2 text-sm text-[var(--text-secondary)]'>
										{article.description}
									</p>
								</div>
							</Link>
						))
					) : (
						<div className='brutal-card-soft bg-[var(--surface)] px-4 py-5 text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)]'>
							No matching posts
						</div>
					)}
				</div>
			)}
		</div>
	)
}
