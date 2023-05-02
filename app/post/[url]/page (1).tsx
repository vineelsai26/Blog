"use client"

// import { ArticleType } from '../../../types/article'
import { NotionRenderer } from 'react-notion-x'
import { ExtendedRecordMap } from 'notion-types'

import { useEffect, useState } from 'react'

export default async function Post({params}: {params: {url: string}}) {

	return (
		<>
			{/* {
				article && (
					<NotionRenderer recordMap={article!} fullPage={true} darkMode={false} />
				)
			} */}
		</>
	)
}

// export async function generateStaticParams() {
// 	const response = await fetch(`https://api.notion.com/v1/databases/${process.env.DATABASE_ID}/query`, {
// 		method: 'POST',
// 		headers: {
// 			'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
// 			'Content-Type': 'application/json',
// 			'Notion-Version': '2022-02-22',
// 		},
// 		body: JSON.stringify({}),
// 	})

// 	const articles = await response.json()

// 	let paths: { params: { url: string, id: string } }[] = []

// 	articles.forEach((article: ArticleType) => {
// 		paths.push({ params: { url: article.properties.URL.url, id: article.id } })
// 	})

// 	return paths
// }
