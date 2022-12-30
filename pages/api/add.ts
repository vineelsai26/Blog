import { NextApiRequest, NextApiResponse } from 'next'
import Article from '../../models/article'
import User from '../../models/user'

import bcrypt from "bcrypt"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email, password, url, title, imageUrl, description, content } = req.body
    if (req.method === "POST") {
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
            } else {
                return res.status(400).json({
                    error: "invalid email or password"
                })
            }
        } else {
            return res.status(400).json({
                error: "invalid email or password"
            })
        }
    } else {
        return res.status(400).json({
            error: "Invalid request"
        })
    }
}