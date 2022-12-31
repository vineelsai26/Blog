import { NextApiRequest, NextApiResponse } from 'next'
import Articles from '../../models/article'
import mongoose from 'mongoose'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { page, pageLimit } = req.body
    if (req.method === "POST") {
        try {
            mongoose.connect(process.env.NEXT_MONGODB_URL!)
            console.log("connected")
        } catch (error) {
            console.log(error)
        }

        const articles = await Articles.find({}).sort({ createdAt: -1 }).skip(page * pageLimit).limit(pageLimit)

        const count = await Articles.count({})

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