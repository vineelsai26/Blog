import { NotionAPI } from 'notion-client'
import { NextRequest, NextResponse } from 'next/server'
import { ArticleType } from '../../../types/article'

export async function POST(req: NextRequest) {
	const body = await new Response(req.body).json()

	const {url} = body

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

	await articles.results.forEach((article: ArticleType) => {
		if (article.properties.URL.url === url) {
			id = article.id
		}
	})

	console.log(id, body)

	const notion = new NotionAPI({
		activeUser: process.env.NEXT_NOTION_ACTIVE_USER,
		authToken: process.env.NEXT_NOTION_TOKEN_V2,
		userTimeZone: 'Asia/Kolkata',
	})

	const article = await notion.getPage(id)

	return NextResponse.json({
		article: article,
	})
}
