import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../prisma/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const articles = await prisma.articles.findMany({
		where: {
			OR: [
				{
					title: {
						contains: req.query.query?.toString().toLowerCase()!,
						mode: "insensitive"
					}
				},
				{
					description: {
						contains: req.query.query?.toString().toLowerCase()!,
						mode: "insensitive"
					}
				},
				{
					tags: {
						has: req.query.query?.toString().toLowerCase()!
					}
				}
			]
		},
	})

	return res.status(200).json(articles)
}
