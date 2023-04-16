import { NextApiRequest } from 'next'
import prisma from '../../../prisma/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: NextApiRequest) {
	const articles = await prisma.articles.findMany({
		where: {
			OR: [
				{
					title: {
						contains: req.query.query?.toString().toLowerCase()!,
						mode: 'insensitive',
					},
				},
				{
					description: {
						contains: req.query.query?.toString().toLowerCase()!,
						mode: 'insensitive',
					},
				},
				{
					tags: {
						has: req.query.query?.toString().toLowerCase()!,
					},
				},
			],
		},
	})

	return NextResponse.json(articles)
}
