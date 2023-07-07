import bcrypt from 'bcrypt'
import prisma from '../../../prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const body = await new Response(req.body).json()
	const {
		email,
		password,
		url,
		title,
		imageUrl,
		description,
		content,
		deleteArticle,
		tags,
	} = body

	const user = await prisma.users.findUnique({
		where: {
			email: email,
		},
	})
	if (user && user.email) {
		const result = await bcrypt.compare(password, user.password)
		if (result) {
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
						createdBy: user.email,
						createdAt: new Date(),
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
	}
	return NextResponse.json({
		error: 'invalid email or password',
	})
}
