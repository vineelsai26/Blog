import prisma from '../../../prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import bcrypt from 'bcrypt'


export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)

	const cookieStore = cookies()
	const email = cookieStore.get('email')?.value
	const password = cookieStore.get('password')?.value
	let result = false

	if (email && password) {
		const user = await prisma.users.findUnique({
			where: {
				email: email,
			},
		})

		result = await bcrypt.compare(password, user!.password)
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
