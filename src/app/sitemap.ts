import { MetadataRoute } from 'next'
import db from '../drizzle/db'
import projects from '../data/projects'
import tools from '../data/tools'
import archive from '../data/archive'

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

	projects.forEach((project) => {
		if (
			project.previewUrl?.includes('vineelsai.com') ||
			project.previewUrl?.includes('vineelsai.dev')
		) {
			paths.push({
				url: project.previewUrl,
				lastModified: new Date(),
			})
		}
	})

	tools.forEach((tool) => {
		paths.push({
			url: `${process.env.NEXT_APP_URL}${tool.url}`,
		})
	})

	archive.forEach((archive) => {
		paths.push({
			url: archive.previewUrl,
		})
	})

	return paths
}

type Sitemap = Array<{
	url: string
	lastModified?: string | Date
}>
