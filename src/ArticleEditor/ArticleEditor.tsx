import Editor from "@monaco-editor/react"
import { ArticleEditorProps, ArticleType } from "../../types/article"
import ArticlePreview from "../ArticlePreview/ArticlePreview"
import { useState } from "react"
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
	editMode
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
			<div className='m-2 p-2 w-1/2 flex flex-col overflow-hidden'>
				<input
					className='m-2 p-3 border-black border-2 rounded'
					placeholder="Title"
					defaultValue={title}
					onChange={(e) => {
						setTitle(e.target.value)
						setArticle({ ...article, title: e.target.value })
					}}
				/>
				<input
					className='m-2 p-3  border-black border-2 rounded'
					placeholder="Url"
					defaultValue={url}
					onChange={(e) => {
						setUrl(e.target.value)
						setArticle({ ...article, url: e.target.value })
					}}
				/>
				<input
					className='m-2 p-3  border-black border-2 rounded'
					placeholder="Image Url"
					defaultValue={imageUrl}
					onChange={(e) => {
						setImageUrl(e.target.value)
						setArticle({ ...article, imageUrl: e.target.value })
					}}
				/>
				<input
					className='m-2 p-3  border-black border-2 rounded'
					placeholder="Tags"
					defaultValue={tags.join(',')}
					onChange={(e) => {
						setTags(e.target.value.split(','))
						setArticle({ ...article, tags: e.target.value.split(',') })
					}}
				 />
				<textarea
					className='m-2 p-3  border-black border-2 rounded'
					rows={5}
					placeholder="Description"
					defaultValue={description}
					onChange={(e) => {
						setDescription(e.target.value)
						setArticle({ ...article, description: e.target.value })
					}}
				/>
				<Editor
					className="m-2 p-3 border-black border-2 rounded"
					height="50vh"
					width="-webkit-fill-available"
					defaultValue={content}
					onChange={(value) => {
						setContent(value)
						setArticle({ ...article, longDescription: value! })
					}}
					options={{
						minimap: { enabled: false },
					}}
					defaultLanguage="markdown"
				/>
				<input
					type="email"
					className='m-2 p-3  border-black border-2 rounded'
					placeholder="Email"
					onChange={(e) => {
						setEmail(e.target.value)
					}}
				/>
				<input
					type="password"
					className='m-2 p-3  border-black border-2 rounded'
					placeholder="Password"
					onChange={(e) => {
						setPassword(e.target.value)
					}}
				/>
				{
					loading && (
						<Loader />
					)
				}
				{data.message && <p className='text-green-600 text-center'>{data.message}</p>}
				{data.error && <p className='text-red-600 text-center'>{data.error}</p>}
				<div className='flex justify-center' style={{ margin: '10px', padding: '10px' }}>
					<button className="w-1/4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
						onClick={() => {
							handleSubmit(false)
						}}>
						Submit
					</button>
				</div>
				{
					editMode && (
						<div className='flex justify-center' style={{ margin: '10px', padding: '10px' }}>
							<button className="w-1/4  bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
								onClick={() => {
									handleSubmit(true)
								}}>
								Delete
							</button>
						</div>
					)
				}

			</div>
			<div className='p-2 w-1/2 overflow-scroll bg-slate-200'>
				<h1 className='text-2xl text-center'>Home Page Preview</h1>
				<div className='flex justify-center'>
					<Article article={article} />
				</div>
				<h1 className='text-2xl text-center m-5'>Article Preview</h1>
				<ArticlePreview article={article} />
			</div>
		</div>
	)
}
