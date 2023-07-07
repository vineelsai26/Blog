import prisma from '../../../prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'


export async function POST(req: NextRequest) {
	const body = await new Response(req.body).json()
	const { page, pageLimit } = body

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
