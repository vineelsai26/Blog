import { MetadataRoute } from 'next'
import db from '../drizzle/db'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const articles = await db.query.articles.findMany({
		columns: {
			url: true,
		},
	})

	let paths: Sitemap = [
		{ url: `${process.env.NEXT_APP_URL}/`, lastModified: new Date() },
		{ url: `${process.env.NEXT_APP_URL}/blog`, lastModified: new Date() },
		{
			url: `${process.env.NEXT_APP_URL}/resume/resume.pdf`,
			lastModified: new Date(),
		},
		{
			url: `${process.env.NEXT_APP_URL}/archive`,
			lastModified: new Date(),
		},
	]

	articles.forEach((article: { url: string }) => {
		paths.push({
			url: `${process.env.NEXT_APP_URL}/post/${article.url}`,
			lastModified: new Date(),
		})
	})

	return paths
}

type Sitemap = Array<{
	url: string
	lastModified?: string | Date
}>
