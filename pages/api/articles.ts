import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const { page, pageLimit } = req.body

		const articles = await prisma.articles.findMany({
			select: {
				title: true,
				url: true,
				imageUrl: true,
				description: true,
				createdAt: true,
				createdBy: true,
				tags: true
			},
			orderBy: {
				createdAt: "desc"
			},
			skip: page * pageLimit,
			take: pageLimit
		})

		const count = await prisma.articles.count()

		return res.status(200).json({
			articles: articles,
			pageCount: Math.ceil(count / pageLimit)
		})
	} else {
		return res.status(400).json({
			error: "Invalid request"
		})
	}
}
