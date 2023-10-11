'use client'

import Editor from '@monaco-editor/react'
import { ArticleType, SaveResponse } from '../../types/article'
import ArticlePreview from '../ArticlePreview/ArticlePreview'
import { useEffect, useState } from 'react'
import Article from '../ArticleCard/ArticleCard'
import Loader from '../Loader/Loader'

export default function ArticleEditor({
	articleFetch,
	editMode,
}: {
	articleFetch: ArticleType
	editMode: Boolean
}) {
	const [title, setTitle] = useState(articleFetch.title)
	const [url, setUrl] = useState(articleFetch.url)
	const [imageUrl, setImageUrl] = useState(articleFetch.imageUrl)
	const [description, setDescription] = useState(articleFetch.description)
	const [content, setContent] = useState(articleFetch.longDescription!)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [tags, setTags] = useState<String[]>(articleFetch.tags)
	const [privateArticle, setPrivateArticle] = useState(articleFetch.private)

	const [currentTab, setCurrentTab] = useState<Number>(0)
	const tabs = ['Editor', 'Preview']

	const [data, setData] = useState<SaveResponse>({} as SaveResponse)

	const [loading, setLoading] = useState(false)

	const handleSubmit = async (deleteArticle: Boolean = false) => {
		setLoading(true)
		if (editMode) {
			const request = await fetch('/api/edit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: title,
					url: url.replaceAll(' ', '-').toLowerCase(),
					imageUrl: imageUrl,
					tags: tags,
					description: description,
					content: content,
					email: email,
					password: password,
					deleteArticle: deleteArticle,
					isPrivate: privateArticle,
				}),
			})

			const response = await request.json()

			setData(response)
		} else {
			const request = await fetch('/api/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: title,
					url: url.replaceAll(' ', '-').toLowerCase(),
					imageUrl: imageUrl,
					tags: tags,
					description: description,
					content: content,
					email: email,
					password: password,
					isPrivate: privateArticle,
				}),
			})

			const response = await request.json()

			setData(response)
		}
		setLoading(false)
	}

	const [article, setArticle] = useState<ArticleType>({
		title: title,
		url: url,
		imageUrl: imageUrl,
		description: description,
		longDescription: content,
		tags: tags,
		createdAt: new Date(),
	} as ArticleType)

	const [theme, setTheme] = useState('light')

	useEffect(() => {
		window.matchMedia('(prefers-color-scheme: dark)').matches
			? setTheme('dark')
			: setTheme('light')

		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', (e) => {
				e.matches ? setTheme('dark') : setTheme('light')
			})
	}, [])

	return (
		<div>
			<ul className='m-1.5 flex flex-row justify-center'>
				{tabs.map((tab, index) => {
					return (
						<li
							key={index}
							className={`mr-2 inline-block cursor-pointer rounded border border-black p-2 dark:border-white dark:text-white ${
								currentTab === index
									? 'bg-slate-400 dark:bg-slate-800'
									: 'bg-slate-200 dark:bg-slate-600'
							}`}
							onClick={() => {
								setCurrentTab(index)
							}}
						>
							{tab}
						</li>
					)
				})}
			</ul>
			<div className='bg-slate-200 dark:bg-slate-600'>
				{currentTab === 0 && (
					<div className='m-2 flex w-full flex-col overflow-hidden p-2'>
						<input
							className='m-2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'
							placeholder='Title'
							defaultValue={title}
							onChange={(e) => {
								setTitle(e.target.value)
								setArticle({
									...article,
									title: e.target.value,
								})
							}}
						/>
						<input
							className='m-2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'
							placeholder='Url'
							defaultValue={url}
							onChange={(e) => {
								e.target.value = e.target.value.replaceAll(
									' ',
									'-'
								)
								setUrl(e.target.value)
								setArticle({ ...article, url: e.target.value })
							}}
						/>
						<input
							className='m-2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'
							placeholder='Image Url'
							defaultValue={imageUrl}
							onChange={(e) => {
								setImageUrl(e.target.value)
								setArticle({
									...article,
									imageUrl: e.target.value,
								})
							}}
						/>
						<input
							className='m-2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'
							placeholder='Tags'
							defaultValue={tags && tags.join(',')}
							onChange={(e) => {
								setTags(e.target.value.split(','))
								setArticle({
									...article,
									tags: e.target.value.split(','),
								})
							}}
						/>
						<textarea
							className='m-2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'
							rows={5}
							placeholder='Description'
							defaultValue={description}
							onChange={(e) => {
								setDescription(e.target.value)
								setArticle({
									...article,
									description: e.target.value,
								})
							}}
						/>
						<Editor
							className='m-2 rounded border-2 border-black dark:border-white  dark:bg-gray-600'
							height='90vh'
							width='-webkit-fill-available'
							defaultValue={content}
							onChange={(value) => {
								setContent(value!)
								setArticle({
									...article,
									longDescription: value!,
								})
							}}
							options={{
								minimap: { enabled: false },
								automaticLayout: true,
							}}
							theme={theme === 'dark' ? 'vs-dark' : 'vs'}
							defaultLanguage='markdown'
						/>
						<input
							type='email'
							className='m-2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'
							placeholder='Email'
							onChange={(e) => {
								setEmail(e.target.value)
							}}
						/>
						<input
							type='password'
							className='m-2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'
							placeholder='Password'
							onChange={(e) => {
								setPassword(e.target.value)
							}}
						/>
						<input
							type='checkbox'
							defaultChecked={privateArticle}
							className='m-2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'
							onChange={(e) => {
								setPrivateArticle(e.target.checked)
							}}
						/>
						{loading && <Loader />}
						{data.message && (
							<p className='text-center text-green-600'>
								{data.message}
							</p>
						)}
						{data.error && (
							<p className='text-center text-red-600'>
								{data.error}
							</p>
						)}
						<div
							className='flex justify-center'
							style={{ margin: '10px', padding: '10px' }}
						>
							<button
								className='w-1/4 rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white'
								onClick={() => {
									handleSubmit(false)
								}}
							>
								Submit
							</button>
						</div>
						{editMode && (
							<div
								className='flex justify-center'
								style={{ margin: '10px', padding: '10px' }}
							>
								<button
									className='w-1/4  rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white'
									onClick={() => {
										handleSubmit(true)
									}}
								>
									Delete
								</button>
							</div>
						)}
					</div>
				)}
				{currentTab === 1 && (
					<div className='w-full overflow-scroll p-2'>
						<h1 className='text-center text-2xl dark:text-white'>
							Home Page Preview
						</h1>
						<div className='flex justify-center'>
							<Article article={article} />
						</div>
						<h1 className='m-5 text-center text-2xl dark:text-white'>
							Article Preview
						</h1>
						<ArticlePreview article={article} />
					</div>
				)}
			</div>
		</div>
	)
}
