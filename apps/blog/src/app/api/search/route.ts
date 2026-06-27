import db from '../../../drizzle/db'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)

	let result = false
	const session = await getServerSession()
	if (session?.user?.email === 'mail@vineelsai.com') {
		result = true
	}

	const articles = await db.query.articles.findMany({
		where: (articles, { or, and, like, eq }) =>
			and(
				eq(articles.private, result),
				or(
					like(articles.title, `%${searchParams.get('query')}%`),
					like(
						articles.description,
						`%${searchParams.get('query')}%`
					),
					like(articles.content, `%${searchParams.get('query')}%`)
				)
			),
		limit: 5,
	})

	return NextResponse.json(articles)
}
