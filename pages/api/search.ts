import { NextApiRequest, NextApiResponse } from 'next'
import Articles from '../../models/article'
import mongoose from 'mongoose'
import _ from 'lodash'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		await mongoose.connect(process.env.NEXT_MONGODB_URL!)
		console.log("connected")
	} catch (error) {
		console.log(error)
		return res.status(500).json({
			error: "Error connecting to database"
		})
	}

	const searchExpression = new RegExp(_.escapeRegExp(req.query?.toString()!), 'i')

	const articles = await Articles.find({ title: { $regex: searchExpression } }).limit(5)

	const searchDescription = await Articles.find({ description: { $regex: searchExpression } }).limit(5)

	const searchTags = await Articles.find({ tags: { $in: [searchExpression] } }).limit(5)

	searchDescription.forEach((article) => {
		let canBeAdded = true
		articles.forEach((article2) => {
			if (article2.url === article.url) {
				canBeAdded = false
			}
		})
		if (canBeAdded) {
			articles.push(article)
		}
	})

	searchTags.forEach((article) => {
		let canBeAdded = true
		articles.forEach((article2) => {
			if (article2.url === article.url) {
				canBeAdded = false
			}
		})
		if (canBeAdded) {
			articles.push(article)
		}
	})

	mongoose.disconnect()

	return res.status(200).json(articles)
}
