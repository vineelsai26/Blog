import { NextApiRequest, NextApiResponse } from 'next'

import bcrypt from "bcrypt"
import prisma from '../../prisma/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const { email, password, url, title, imageUrl, description, content } = req.body

		const user = await prisma.users.findUnique({
			where: {
				email: email
			}
		})

		if (user && user.email) {
			const result = await bcrypt.compare(password, user.password)
			if (result) {
				const article = await prisma.articles.create({
					data: {
						title: title as string,
						url: url as string,
						imageUrl: imageUrl as string,
						description: description as string,
						longDescription: content as string,
						createdBy: user.email as string,
						createdAt: new Date(),
						v: 1
					}
				})
				if (article) {
					return res.status(200).json({
						message: "Article saved successfully"
					})
				} else {
					return res.status(400).json({
						error: "Error saving article"
					})
				}
			}
		}
		res.status(400).json({
			error: "invalid email or password"
		})
	} else {
		res.status(400).json({
			error: "Invalid request"
		})
	}
}
