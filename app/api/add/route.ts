import { NextRequest, NextResponse } from 'next/server';

import bcrypt from 'bcrypt'
import prisma from '../../../prisma/prisma'

export async function POST(req: NextRequest) {
	const body = await new Response(req.body).json()
	const { email, password, url, title, imageUrl, description, content, tags } = body

	const user = await prisma.users.findUnique({
		where: {
			email: email,
		},
	})

	if (user && user.email) {
		const result = await bcrypt.compare(password, user.password)
		if (result) {
			const article = await prisma.articles.create({
				data: {
					title: title as string,
					url: url as string,
					imageUrl: imageUrl as string,
					tags: tags as string[],
					description: description as string,
					longDescription: content as string,
					createdBy: user.email as string,
					createdAt: new Date(),
					v: 1,
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
