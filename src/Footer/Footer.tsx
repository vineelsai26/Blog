import Link from 'next/link'

export default function Footer() {
	return (
		<footer className="flex overflow-hidden right-0 left-0 p-4 bottom-0 bg-white shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800">
			<span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="https://vineelsai.com/" className="hover:underline">Vineel Sai</a>. All Rights Reserved.
			</span>
			<ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
				<li>
					<Link href="/contact" className="mr-4 hover:underline md:mr-6 ">Contact</Link>
				</li>
			</ul>
		</footer>
	)
}
