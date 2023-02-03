import Editor from '@monaco-editor/react'
import { ArticleEditorProps, ArticleType } from '../../types/article'
import ArticlePreview from '../ArticlePreview/ArticlePreview'
import { useState } from 'react'
import Article from '../ArticleCard/ArticleCard'
import Loader from '../Loader/Loader'

export default function ArticleEditor({
	title,
	setTitle,
	url,
	setUrl,
	imageUrl,
	setImageUrl,
	tags,
	setTags,
	description,
	setDescription,
	content,
	setContent,
	setEmail,
	setPassword,
	data,
	handleSubmit,
	loading,
	editMode,
}: ArticleEditorProps) {
	const [article, setArticle] = useState<ArticleType>({
		title: title,
		url: url,
		imageUrl: imageUrl,
		description: description,
		longDescription: content,
		tags: tags,
	} as ArticleType)

	return (
		<div className='flex flex-row'>
			<div className='m-2 flex w-1/2 flex-col overflow-hidden p-2'>
				<input
					className='m-2 rounded border-2 border-black p-3'
					placeholder='Title'
					defaultValue={title}
					onChange={(e) => {
						setTitle(e.target.value)
						setArticle({ ...article, title: e.target.value })
					}}
				/>
				<input
					className='m-2 rounded  border-2 border-black p-3'
					placeholder='Url'
					defaultValue={url}
					onChange={(e) => {
						setUrl(e.target.value)
						setArticle({ ...article, url: e.target.value })
					}}
				/>
				<input
					className='m-2 rounded  border-2 border-black p-3'
					placeholder='Image Url'
					defaultValue={imageUrl}
					onChange={(e) => {
						setImageUrl(e.target.value)
						setArticle({ ...article, imageUrl: e.target.value })
					}}
				/>
				<input
					className='m-2 rounded  border-2 border-black p-3'
					placeholder='Tags'
					defaultValue={tags.join(',')}
					onChange={(e) => {
						setTags(e.target.value.split(','))
						setArticle({
							...article,
							tags: e.target.value.split(','),
						})
					}}
				/>
				<textarea
					className='m-2 rounded  border-2 border-black p-3'
					rows={5}
					placeholder='Description'
					defaultValue={description}
					onChange={(e) => {
						setDescription(e.target.value)
						setArticle({ ...article, description: e.target.value })
					}}
				/>
				<Editor
					className='m-2 rounded border-2 border-black p-3'
					height='50vh'
					width='-webkit-fill-available'
					defaultValue={content}
					onChange={(value) => {
						setContent(value)
						setArticle({ ...article, longDescription: value! })
					}}
					options={{
						minimap: { enabled: false },
					}}
					defaultLanguage='markdown'
				/>
				<input
					type='email'
					className='m-2 rounded  border-2 border-black p-3'
					placeholder='Email'
					onChange={(e) => {
						setEmail(e.target.value)
					}}
				/>
				<input
					type='password'
					className='m-2 rounded  border-2 border-black p-3'
					placeholder='Password'
					onChange={(e) => {
						setPassword(e.target.value)
					}}
				/>
				{loading && <Loader />}
				{data.message && (
					<p className='text-center text-green-600'>{data.message}</p>
				)}
				{data.error && (
					<p className='text-center text-red-600'>{data.error}</p>
				)}
				<div
					className='flex justify-center'
					style={{ margin: '10px', padding: '10px' }}
				>
					<button
						className='w-1/4 rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white'
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
							className='w-1/4  rounded border border-blue-500 bg-transparent py-2 px-4 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white'
							onClick={() => {
								handleSubmit(true)
							}}
						>
							Delete
						</button>
					</div>
				)}
			</div>
			<div className='w-1/2 overflow-scroll bg-slate-200 p-2'>
				<h1 className='text-center text-2xl'>Home Page Preview</h1>
				<div className='flex justify-center'>
					<Article article={article} />
				</div>
				<h1 className='m-5 text-center text-2xl'>Article Preview</h1>
				<ArticlePreview article={article} />
			</div>
		</div>
	)
}
