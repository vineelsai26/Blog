import { NextApiRequest, NextApiResponse } from 'next'

import bcrypt from "bcrypt"
import prisma from '../../prisma/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const { email, password, url, title, imageUrl, description, content, deleteArticle } = req.body

		const user = await prisma.users.findUnique({
			where: {
				email: email
			}
		})
		if (user && user.email) {
			const result = await bcrypt.compare(password, user.password)
			if (result) {
				if (deleteArticle) {
					await prisma.articles.delete({
						where: {
							url: url
						}
					})
					return res.status(200).json({
						message: "Article deleted successfully"
					})
				} else {
					const article = await prisma.articles.update({
						where: {
							url: url
						},
						data: {
							title: title,
							imageUrl: imageUrl,
							description: description,
							longDescription: content,
							createdBy: user.email,
							createdAt: new Date(),
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
		}
		return res.status(400).json({
			error: "invalid email or password"
		})
	} else {
		return res.status(400).json({
			error: "Invalid request"
		})
	}
}
