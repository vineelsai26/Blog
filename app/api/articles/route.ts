import { NextApiRequest } from 'next'
import prisma from '../../../prisma/prisma'
import { NextResponse } from 'next/server'


export async function POST(req: NextApiRequest) {
	const { page, pageLimit } = req.body

	const articles = await prisma.articles.findMany({
		select: {
			title: true,
			url: true,
			imageUrl: true,
			description: true,
			createdAt: true,
			createdBy: true,
			tags: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
		skip: page * pageLimit,
		take: pageLimit,
	})

	const count = await prisma.articles.count()

	return NextResponse.json({
		articles: articles,
		pageCount: Math.ceil(count / pageLimit),
	})
}
