import prisma from '../../../prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)

	let result = false
	const session = await getServerSession()
	if (session?.user?.email === 'mail@vineelsai.com') {
		result = true
	}

	const articles = await prisma.articles.findMany({
		where: {
			private: result,
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
