import { NextApiRequest, NextApiResponse } from 'next'
import Articles from '../../models/article'
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

		const { page, pageLimit } = req.body

		const articles = await Articles.find({}).sort({ createdAt: -1 }).skip(page * pageLimit).limit(pageLimit)

		const count = await Articles.count({})

		mongoose.disconnect()

		return res.status(200).json({
			articles: articles,
			pageCount: Math.ceil(count / pageLimit)
		})
	} else {
		return res.status(400).json({
			error: "Invalid request"
		})
	}
}
