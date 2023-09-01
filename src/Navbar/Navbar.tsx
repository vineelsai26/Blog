"use client"

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ArticleType } from '../../types/article'

interface Navigation {
	name: string
	href: string
	current: boolean
}

const navigation = [
	{ name: 'Home', href: '/#home', current: false },
	{ name: 'Projects', href: '/#projects', current: false },
	{ name: 'Contact', href: '/#contact', current: false },
	{ name: 'Blog', href: '/blog', current: false },
	{ name: 'Resume', href: '/resume/resume.pdf', current: false },
	{ name: 'Archive', href: '/archive', current: false },
	{ name: 'Tools', href: '/tools', current: false },
]

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
	let showSearch = false

	if (usePathname() === '/blog') {
		showSearch = true
	}

	const [search, setSearch] = useState<ArticleType[]>([])

	const handleSearch = (value: string) => {
		if (value.trim().length > 0) {
			fetch(
				`/api/search?query=${value}`
			)
				.then((res) => res.json())
				.then((data) => {
					setSearch(data)
				})
		} else {
			setSearch([])
		}
	}

	return (
		<>
			<div className='bg-gray-800'>
				<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
					<div className='relative flex h-16 items-center justify-between'>
						<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
							<div className='flex flex-shrink-0 items-center'>
								<Link href='/'>
									<Image
										className='h-8 w-auto lg:block'
										src='/logo-light.png'
										alt='Vineel Sai'
										width={50}
										height={50}
									/>
								</Link>
							</div>
							<div className='hidden sm:ml-6 sm:block lg:block'>
								<div className='flex space-x-4'>
									{navigation.map((item: Navigation) => (
										<Link
											key={item.name}
											href={item.href}
											scroll={true}
											className={classNames(
												item.current
													? 'bg-gray-900 text-white'
													: 'text-gray-300 hover:bg-gray-700 hover:text-white',
												'rounded-md px-3 py-2 text-sm font-medium'
											)}
											aria-current={
												item.current
													? 'page'
													: undefined
											}
										>
											{item.name}
										</Link>
									))}
								</div>
							</div>
						</div>
						<div className='hidden w-1/3 relative items-center lg:flex'>
							{showSearch && (
								<div className='flex w-full flex-col absolute'>
									<input
										onBlur={() => {
											setSearch([])
										}}
										onFocus={(e) => {
											handleSearch(e.target.value)
										}}
										type='text'
										className='block w-full rounded-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										placeholder='Search'
										onChange={(e) => {
											handleSearch(e.target.value)
										}}
									/>
									<ul className='absolute mt-10'>
										{
											search.map((article: ArticleType) => {
												return (
													<Link
														href={`/post/${article.url}`}
														className='bg-gray-700 w-full flex flex-row h-20 p-2 rounded border-slate-400 border-x border-y-[0.5px]'
														key={article.url}>
														<Image
															src={article.imageUrl}
															alt={article.title}
															width={100}
															height={100}
														/>
														<div className='flex flex-col justify-evenly'>
															<p
																className='text-gray-300 hover:text-white rounded-md px-2 text-l font-semibold overflow-x-clip'
															>
																{article.title}
															</p>
															<p className='text-gray-300 hover:text-white rounded-md px-2 text-sm font-medium overflow-x-clip overflow-y-clip'>
																{article.description.slice(0, 60)}
															</p>
														</div>
													</Link>
												)
											})
										}
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
