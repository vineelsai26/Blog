import Head from 'next/head'
import mongoose from 'mongoose'
import Article from '../../models/article'
import { ArticleType, SaveResponse } from '../../types/article'
import Footer from '../../src/Footer/Footer'
import { useState } from 'react'
import Navbar from '../../src/Navbar/Navbar'
import ArticleEditor from '../../src/ArticleEditor/ArticleEditor'

export default function EditPost({ article }: { article: ArticleType }) {
	const [title, setTitle] = useState(article.title)
	const [url, setUrl] = useState(article.url)
	const [imageUrl, setImageUrl] = useState(article.imageUrl)
	const [description, setDescription] = useState(article.description)
	const [content, setContent] = useState(article.longDescription)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [data, setData] = useState<SaveResponse>({} as SaveResponse)

	const handleSubmit = async () => {
		const request = await fetch('/api/edit', {
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

export async function getServerSideProps(context: { query: { url: string } }) {
	try {
		mongoose.connect(process.env.NEXT_MONGODB_URL!)
	} catch (error) {
		console.log(error)
	}

	const article = await Article.findOne({ url: context.query.url })
	return {
		props: {
			article: JSON.parse(JSON.stringify(article))
		}
	}
}
