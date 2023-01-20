import { NextApiRequest, NextApiResponse } from 'next'
import Article from '../../models/article'
import User from '../../models/user'

import bcrypt from "bcrypt"
import mongoose from 'mongoose'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		try {
			await mongoose.connect(process.env.NEXT_MONGODB_URL!)
			console.log("connected")
		} catch (error) {
			console.log(error)
			return res.status(500).json({
				error: "Error connecting to database"
			})
		}

		const { email, password, url, title, imageUrl, description, content, deleteArticle } = req.body

		const user = await User.findOne({ email: { $eq: email } })
		if (user && user.email) {
			const result = await bcrypt.compare(password, user.password)
			if (result) {
				let article = await Article.findOne({
					url: { $eq: url }
				})
				if (deleteArticle) {
					await article.delete()
					res.status(200).json({
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
							res.status(400).json({
								error: "Error saving article"
							})
						} else {
							res.status(200).json({
								message: "Article saved successfully"
							})
						}
					})
				}
			} else {
				res.status(400).json({
					error: "invalid email or password"
				})
			}
		} else {
			res.status(400).json({
				error: "invalid email or password"
			})
		}

		mongoose.disconnect()
	} else {
		res.status(400).json({
			error: "Invalid request"
		})
	}
}