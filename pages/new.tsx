import Head from 'next/head'
import Footer from '../src/Footer/Footer'
import Navbar from '../src/Navbar/Navbar'
import { useState } from 'react'
import { SaveResponse } from '../types/article'
import ArticleEditor from '../src/ArticleEditor/ArticleEditor'

export default function New() {
	const [title, setTitle] = useState('')
	const [url, setUrl] = useState('')
	const [imageUrl, setImageUrl] = useState('')
	const [description, setDescription] = useState('')
	const [content, setContent] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [data, setData] = useState<SaveResponse>({} as SaveResponse)

	const handleSubmit = async () => {
		const request = await fetch('/api/add', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: title,
				url: url,
				imageUrl: imageUrl,
				description: description,
				content: content,
				email: email,
				password: password
			})
		})

		const response = await request.json()

		setData(response)
	}
	return (
		<div>
			<Head>
				<title>New Article</title>
				<link rel="icon" href="/logo.png" />
			</Head>

			<Navbar />

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
			/>

			<Footer />
		</div >
	)
}
