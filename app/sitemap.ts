import { MetadataRoute } from 'next'
import prisma from '../prisma/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const articles = await prisma.articles.findMany({
        select: {
            url: true,
        },
    })

    let paths: Sitemap = [
        { url: '/', lastModified: new Date() },
        { url: '/blog', lastModified: new Date() },
        { url: '/resume/resume.pdf', lastModified: new Date() },
        { url: '/archive', lastModified: new Date() },
    ]

    articles.forEach((article: { url: string }) => {
        paths.push({ 
            url: `/post/${article.url}`, 
            lastModified: new Date() 
        })
    })

    return paths
}

type Sitemap = Array<{
    url: string
    lastModified?: string | Date
}>