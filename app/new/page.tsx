"use client"

import { useState } from 'react'
import ArticleEditor from '../../src/ArticleEditor/ArticleEditor'
import { SaveResponse } from '../../types/article'

export default function New() {
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const [description, setDescription] = useState('')
	const [content, setContent] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [tags, setTags] = useState([])

	const [data, setData] = useState<SaveResponse>({} as SaveResponse)

	const [loading, setLoading] = useState(false)

	const editMode = false

	const handleSubmit = async () => {
		setLoading(true)
		const request = await fetch('/api/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: title,
				url: url,
				imageUrl: imageUrl,
				tags: tags,
				description: description,
				content: content,
				email: email,
				password: password,
			}),
		})

		const response = await request.json()

		setData(response)
		setLoading(false)
	}
	return (
		<ArticleEditor
			title={title}
			setTitle={setTitle}
			url={url}
			setUrl={setUrl}
			imageUrl={imageUrl}
			setImageUrl={setImageUrl}
			description={description}
			setDescription={setDescription}
			content={content}
			setContent={setContent}
			setEmail={setEmail}
			setPassword={setPassword}
			data={data}
			handleSubmit={handleSubmit}
			loading={loading}
			editMode={editMode}
			tags={tags}
			setTags={setTags}
		/>
	)
}
