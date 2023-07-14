import { tools } from '../../data/tools'

export const metadata = {
	title: 'Tools',
	description: 'Tools by Vineel Sai',
}

export const revalidate = 3600
export const runtime = 'edge'

export default async function Blog() {
	return (
		<div className='min-h-screen'>
			<h1 className='m-5 p-2 text-center text-4xl font-semibold dark:text-white'>
				Tools
			</h1>
			<p className='m-2 text-center text-xl dark:text-white'>
				Hear are Some Usefull Tools I Made.
			</p>
			<div
				className='flex w-full flex-wrap items-center justify-evenly pt-10'
				style={{ margin: 0, width: '100%' }}
			>
				{
					tools.map((tool, index) => {
						return (
							<a
								key={index}
								className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
								href={tool.url}
								target='_blank'

							>
								{tool.name}
							</a>
						)
					})
				}
			</div>
		</div>
	)
}
