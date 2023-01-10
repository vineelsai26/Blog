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

		const { email, password, url, title, imageUrl, description, content } = req.body

		const user = await User.findOne({ email: { $eq: email } })
		if (user && user.email) {
			const result = await bcrypt.compare(password, user.password)
			if (result) {
				let article = new Article({
					title: title,
					url: url,
					imageUrl: imageUrl,
					description: description,
					longDescription: content,
					createdBy: user.email
				})
				try {
					await article.save()
					res.status(200).json({
						message: "Article saved successfully"
					})
				} catch (err) {
					console.log(err)
					res.status(400).json({
						error: "Error saving article"
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
