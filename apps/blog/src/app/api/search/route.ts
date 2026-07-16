import db from '../../../drizzle/db'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { sql, type SQLWrapper } from 'drizzle-orm'
import { authOptions, isAdmin } from '../../../lib/auth'

// Case-insensitive substring match with LIKE metacharacters escaped so
// user input cannot inject `%`/`_` wildcards.
function likeContains(column: SQLWrapper, value: string) {
	const escaped = value.replace(/[\\%_]/g, (ch) => `\\${ch}`)
	return sql`${column} like ${`%${escaped}%`} escape '\\'`
}

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)

	const session = await getServerSession(authOptions)
	const admin = isAdmin(session)

	const query = searchParams.get('query')?.trim() ?? ''
	if (!query) {
		return NextResponse.json([])
	}

	const articles = await db.query.articles.findMany({
		where: (articles, { or, and, eq }) => {
			const match = or(
				likeContains(articles.title, query),
				likeContains(articles.description, query),
				likeContains(articles.content, query)
			)
			// Admin sees all articles; everyone else is limited to public ones.
			return admin ? match : and(eq(articles.private, false), match)
		},
		limit: 5,
	})

	return NextResponse.json(articles)
}
