import prisma from '../../../prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

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
			await prisma.articles.delete({
				where: {
					url: url,
				},
			})
			return NextResponse.json({
				message: 'Article deleted successfully',
			})
		} else {
			const article = await prisma.articles.update({
				where: {
					url: url,
				},
				data: {
					title: title,
					imageUrl: imageUrl,
					description: description,
					longDescription: content,
					tags: tags,
					createdBy: session.user.email,
					createdAt: new Date(),
					private: isPrivate as boolean,
				},
			})

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
