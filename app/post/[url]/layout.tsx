import { ArticleType } from '../../../types/article'
import { NotionAPI } from 'notion-client'
import RenderNotionPage from '../../../src/Render/RenderNotionPage'

// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'

// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css'

// used for rendering equations (optional)
import 'katex/dist/katex.min.css'

export default async function RootLayout({
	params
}: {
	params: { url: string, children: React.ReactNode }
}) {
	let id = ''
	const response = await fetch(`https://api.notion.com/v1/databases/${process.env.DATABASE_ID}/query`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${process.env.NEXT_NOTION_TOKEN}`,
			'Content-Type': 'application/json',
			'Notion-Version': '2022-02-22',
		},
		body: JSON.stringify({}),
	})

	const articles = await response.json()

	articles.results.forEach((article: ArticleType) => {
		if (article.properties.URL.url === params.url) {
			id = article.id
		}
	})

	const notion = new NotionAPI({
		activeUser: process.env.NEXT_NOTION_ACTIVE_USER,
		authToken: process.env.NEXT_NOTION_TOKEN_V2,
		userTimeZone: 'Asia/Kolkata',
	})

	const article = await notion.getPage(id)

	return (
		<>
			<RenderNotionPage article={article} />
		</>
	)
}

export async function generateStaticParams() {
	const response = await fetch(`https://api.notion.com/v1/databases/${process.env.DATABASE_ID}/query`, {
		method: 'POST',
		headers: {
			'Authorization': `Bearer ${process.env.NEXT_NOTION_TOKEN}`,
			'Content-Type': 'application/json',
			'Notion-Version': '2022-02-22',
		},
		body: JSON.stringify({}),
	})

	const articles = await response.json()

	let paths: { params: { url: string} }[] = []

	articles.results.forEach((article: ArticleType) => {
		paths.push({ params: { url: article.properties.URL.url } })
	})

	return paths
}
