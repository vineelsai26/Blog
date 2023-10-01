import prisma from '../../../prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const articles = await prisma.articles.findMany({
		where: {
			OR: [
				{
					title: {
						contains: searchParams
							.get('query')
							?.toString()
							.toLowerCase()!,
						mode: 'insensitive',
					},
				},
				{
					description: {
						contains: searchParams
							.get('query')
							?.toString()
							.toLowerCase()!,
						mode: 'insensitive',
					},
				},
				{
					longDescription: {
						contains: searchParams
							.get('query')
							?.toString()
							.toLowerCase()!,
						mode: 'insensitive',
					},
				},
				{
					tags: {
						has: searchParams
							.get('query')
							?.toString()
							.toLowerCase()!,
					},
				},
			],
		},
		take: 5,
	})

	return NextResponse.json(articles)
}
