'use client'

import Editor from '@monaco-editor/react'
import { ArticleType, SaveResponse } from '../../types/article'
import ArticlePreview from '../ArticlePreview/ArticlePreview'
import { useEffect, useState } from 'react'
import Article from '../ArticleCard/ArticleCard'
import Loader from '../Loader/Loader'
import CopyButton from '../Markdown/CopyButton'

export default function ArticleEditor({
	articleFetch,
	editMode,
}: {
	articleFetch: ArticleType
	editMode: Boolean
}) {
	const [currentTab, setCurrentTab] = useState<Number>(0)
	const tabs = ['Editor', 'Preview']

	const [article, setArticle] = useState<ArticleType>({} as ArticleType)

	const [thumbnail, setThumbnail] = useState<File | null>(null)
	const [files, setFiles] = useState<FileList | null>(null)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [data, setData] = useState<SaveResponse>({} as SaveResponse)

	const [loading, setLoading] = useState(false)

	const handleSubmit = async (deleteArticle: Boolean = false) => {
		setLoading(true)
		setData({} as SaveResponse)

		if (thumbnail) {
			const formData = new FormData()
			formData.append('image', thumbnail)
			formData.append('type', 'thumbnail')

			const request = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			})

			const response = await request.json()

			if (response.error) {
				setLoading(false)
				setData(response)
				return
			}

			setArticle((article) => {
				article = {
					...article,
					imageUrl: response.url,
				} as ArticleType
				handleLocalStorage(article)
				return article
			})
		}

		if (files && files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				const formData = new FormData()
				formData.append('image', files.item(i)!)
				formData.append('type', 'article')
				formData.append(
					'articleUrl',
					article.url.replaceAll(' ', '-').toLowerCase()
				)

				const request = await fetch('/api/upload', {
					method: 'POST',
					body: formData,
				})

				const response = await request.json()

				if (response.error) {
					setLoading(false)
					setData(response)
					return
				}
			}
		}

		if (editMode) {
			const request = await fetch('/api/edit', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: article.title,
					url: article.url.replaceAll(' ', '-').toLowerCase(),
					imageUrl: article.imageUrl,
					tags: article.tags,
					description: article.description,
					content: article.longDescription,
					email: email,
					password: password,
					deleteArticle: deleteArticle,
					isPrivate: article.private,
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
					title: article.title,
					url: article.url.replaceAll(' ', '-').toLowerCase(),
					imageUrl: article.imageUrl,
					tags: article.tags,
					description: article.description,
					content: article.longDescription,
					email: email,
					password: password,
					isPrivate: article.private,
				}),
			})

			const response = await request.json()

			setData(response)
		}
		setLoading(false)
	}

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

		if (window.localStorage.getItem(window.location.pathname)) {
			const article = JSON.parse(
				window.localStorage.getItem(window.location.pathname)!
			)
			setArticle(article)
		} else {
			setArticle(articleFetch)
		}
	}, [])

	const handleLocalStorage = (article: ArticleType) => {
		window.localStorage.setItem(
			window.location.pathname,
			JSON.stringify(article)
		)
	}

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
						<div className='flex flex-row'>
							<input
								className='m-2 w-1/2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'
								placeholder='Title'
								value={article.title}
								onChange={(e) => {
									setArticle((article) => {
										article = {
											...article,
											title: e.target.value,
										} as ArticleType
										handleLocalStorage(article)
										return article
									})
								}}
							/>
							<input
								className='m-2 w-1/2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'
								placeholder='Url'
								value={article.url}
								onChange={(e) => {
									e.target.value = e.target.value.replaceAll(
										' ',
										'-'
									)
									setArticle((article) => {
										article = {
											...article,
											url: e.target.value,
										} as ArticleType
										handleLocalStorage(article)
										return article
									})
								}}
							/>
						</div>
						<div className='flex flex-row'>
							<input
								className='m-2 w-1/2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'
								placeholder='Tags'
								value={article.tags && article.tags.join(',')}
								onChange={(e) => {
									setArticle((article) => {
										article = {
											...article,
											tags: e.target.value.split(','),
										} as ArticleType
										handleLocalStorage(article)
										return article
									})
								}}
							/>

							<input
								className='m-2 w-1/2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'
								placeholder='Image'
								type='file'
								multiple={false}
								onChange={(e) => {
									setThumbnail(e.target.files![0])
								}}
							/>
						</div>

						<div className='flex flex-row'>
							<textarea
								className='m-2 w-1/2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'
								rows={5}
								placeholder='Description'
								value={article.description}
								onChange={(e) => {
									setArticle((article) => {
										article = {
											...article,
											description: e.target.value,
										} as ArticleType
										handleLocalStorage(article)
										return article
									})
								}}
							/>
							<div className='flex w-1/2 flex-row'>
								<input
									className='m-2 w-1/2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'
									placeholder='Images'
									type='file'
									multiple={true}
									onChange={(e) => {
										setFiles(e.target.files)
									}}
								/>
								<ul className='m-2 w-1/2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'>
									{files &&
										Array.from(files).map((file, index) => {
											const fileUrl = `https://static.vineelsai.com/blog/images/${new Date().getFullYear()}/${
												article.url
											}/${file.name}`
											return (
												<div className='flex flex-row'>
													<li
														className='m-2 overflow-scroll'
														key={index}
													>
														{fileUrl}
													</li>
													<CopyButton
														content={`![${file.name}](${fileUrl})`}
													/>
												</div>
											)
										})}
								</ul>
							</div>
						</div>
						<Editor
							className='m-2 rounded border-2 border-black dark:border-white  dark:bg-gray-600'
							height='90vh'
							width='-webkit-fill-available'
							value={article.longDescription}
							onChange={(value) => {
								setArticle((article) => {
									article = {
										...article,
										longDescription: value,
									} as ArticleType
									handleLocalStorage(article)
									return article
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
							checked={article.private}
							className='m-2 rounded border-2 border-black p-3 dark:border-white dark:bg-gray-600 dark:text-white'
							onChange={(e) => {
								setArticle((article) => {
									article = {
										...article,
										private: e.target.checked,
									} as ArticleType
									handleLocalStorage(article)
									return article
								})
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
