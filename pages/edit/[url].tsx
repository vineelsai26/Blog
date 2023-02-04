import Head from 'next/head'
import { ArticleType, SaveResponse } from '../../types/article'
import Footer from '../../src/Footer/Footer'
import { Dispatch, SetStateAction, useState } from 'react'
import Navbar from '../../src/Navbar/Navbar'
import ArticleEditor from '../../src/ArticleEditor/ArticleEditor'
import { PrismaClient } from '@prisma/client'

export default function EditPost({
	article,
	analytics,
	setAnalytics,
}: {
	article: ArticleType
	analytics: boolean
	setAnalytics: Dispatch<SetStateAction<boolean>>
}) {
	const [title, setTitle] = useState(article.title)
	const [url, setUrl] = useState(article.url)
	const [imageUrl, setImageUrl] = useState(article.imageUrl)
	const [description, setDescription] = useState(article.description)
	const [content, setContent] = useState(article.longDescription)
	const [tags, setTags] = useState(article.tags)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [data, setData] = useState<SaveResponse>({} as SaveResponse)

	const [loading, setLoading] = useState(false)

	const editMode = true

	const handleSubmit = async (deleteArticle: Boolean = false) => {
		setLoading(true)
		const request = await fetch('/api/edit', {
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
				deleteArticle: deleteArticle,
			}),
		})

		const response = await request.json()

		setData(response)
		setLoading(false)
	}
	return (
		<div>
			<Head>
				<title>New Article</title>
			</Head>

			<Navbar
				showSearch={false}
				setArticles={null}
				setLoading={null}
				analytics={analytics}
				setAnalytics={setAnalytics}
			/>

			<ArticleEditor
				title={title}
				setTitle={setTitle}
				url={url}
				setUrl={setUrl}
				imageUrl={imageUrl}
				setImageUrl={setImageUrl}
				tags={tags}
				setTags={setTags}
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
			/>

			<Footer />
		</div>
	)
}

export async function getServerSideProps(context: { query: { url: string } }) {
	const prisma = new PrismaClient()

	const article = await prisma.articles.findUnique({
		where: {
			url: context.query.url,
		},
	})
	return {
		props: {
			article: JSON.parse(JSON.stringify(article)),
		},
	}
}
