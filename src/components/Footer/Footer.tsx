import Link from 'next/link'

export default function Footer() {
	return (
		<footer className='bottom-0 left-0 right-0 flex overflow-hidden bg-white p-4 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800'>
			<span className='text-sm text-gray-500 sm:text-center dark:text-gray-400'>
				© 2023{' '}
				<a href='https://vineelsai.com/' className='hover:underline'>
					Vineel Sai
				</a>
				. All Rights Reserved.
			</span>
			<ul className='mt-3 flex flex-wrap items-center text-sm text-gray-500 sm:mt-0 dark:text-gray-400'>
				<li>
					<Link
						href='https://github.com/vineelsai26/Blog'
						className='mr-4 hover:underline md:mr-6 '
					>
						GitHub
					</Link>
					<Link
						href='/#contact'
						className='mr-4 hover:underline md:mr-6 '
					>
						Contact
					</Link>
				</li>
			</ul>
		</footer>
	)
}
