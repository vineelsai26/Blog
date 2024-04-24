import db from '../../../drizzle/db'
import { articles as articlesD } from '../../../drizzle/schema/articles'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
	const body = await new Response(req.body).json()
	const {
		url,
		title,
		imageUrl,
		description,
		content,
		deleteArticle,
		tags,
		isPrivate,
	} = body

	const session = await getServerSession()

	if (session?.user?.email && session?.user?.email === 'mail@vineelsai.com') {
		if (deleteArticle) {
			await db.delete(articlesD).where(eq(articlesD.url, url))
			return NextResponse.json({
				message: 'Article deleted successfully',
			})
		} else {
            const article = await db
				.update(articlesD)
				.set({
					title: title,
					imageUrl: imageUrl,
					description: description,
					content: content,
					tags: tags,
					updatedAt: new Date(),
					private: isPrivate as boolean,
				})
				.where(eq(articlesD.url, url))

			if (article) {
				return NextResponse.json({
					message: 'Article saved successfully',
				})
			} else {
				return NextResponse.json({
					error: 'Error saving article',
				})
			}
		}
	}

	return NextResponse.json({
		error: 'invalid email or password',
	})
}
