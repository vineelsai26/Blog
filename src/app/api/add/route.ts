import { NextRequest, NextResponse } from 'next/server'

import prisma from '../../../prisma/prisma'
import { getServerSession } from 'next-auth'

export async function POST(req: NextRequest) {
	const body = await new Response(req.body).json()
	const {
		url,
		title,
		imageUrl,
		description,
		content,
		tags,
		isPrivate,
	} = body

	const session = await getServerSession()

	if (session?.user?.email && session?.user?.email === 'mail@vineelsai.com') {
		const article = await prisma.articles.create({
			data: {
				title: title as string,
				url: url as string,
				imageUrl: imageUrl as string,
				tags: tags as string[],
				description: description as string,
				longDescription: content as string,
				createdBy: session.user.email,
				createdAt: new Date(),
				v: 1,
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

	return NextResponse.json({
		error: 'invalid email or password',
	})
}
