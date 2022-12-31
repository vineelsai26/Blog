import { NextApiRequest, NextApiResponse } from 'next'
import Article from '../../models/article'
import User from '../../models/user'

import bcrypt from "bcrypt"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const { email, password, url, title, imageUrl, description, content, deleteArticle } = req.body
		const user = await User.findOne({ email: { $eq: email } })
		if (user && user.email) {
			const result = await bcrypt.compare(password, user.password)
			if (result) {
				let article = await Article.findOne({
					url: { $eq: url }
				})
				if (deleteArticle == "true") {
					await article.delete()
					return res.status(200).json({
						message: "Article deleted successfully"
					})
				} else {
					article.title = title
					article.url = url
					article.imageUrl = imageUrl
					article.description = description
					article.longDescription = content
					article.createdBy = user.email

					article.save(function (err: any) {
						if (err) {
							console.log(err)
							return res.status(400).json({
								error: "Error saving article"
							})
						} else {
							return res.status(200).json({
								message: "Article saved successfully"
							})
						}
					})
				}
			} else {
				return res.status(400).json({
					error: "invalid email or password"
				})
			}
		} else {
			res.status(400).json({
				error: "invalid email or password"
			})
		}
	} else {
		return res.status(400).json({
			error: "Invalid request"
		})
	}
}
