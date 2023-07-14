import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Navigation {
	name: string
	href: string
	current: boolean
}

const navigation = [
	{ name: 'Home', href: '/', current: false },
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
						<div className='hidden lg:flex'>
							{showSearch && (
								<div>
									<input
										type='text'
										className='block w-full rounded-md border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
										placeholder='Search'
										onChange={(e) => {
											fetch(
												`/api/search?query=${e.target.value}`
											)
												.then((res) => res.json())
												.then((data) => {
													console.log(data)
												})
										}}
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
