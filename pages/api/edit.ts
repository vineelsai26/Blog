import { NextApiRequest, NextApiResponse } from 'next'
import Article from '../../models/article'
import User from '../../models/user'

import bcrypt from "bcrypt"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const user = await User.findOne({ email: req.body.email })
        if (user && user.email) {
            const result = await bcrypt.compare(req.body.password, user.password)
            if (result) {
                let article = await Article.findOne({
                    url: req.body.url
                })
                if (req.body.delete == "true") {
                    await article.delete()
                    return res.status(200).json({
                        message: "Article deleted successfully"
                    })
                } else {
                    article.update({
                        title: req.body.title,
                        url: req.body.url,
                        imageUrl: req.body.imageUrl,
                        description: req.body.description,
                        longDescription: req.body.content
                    }, function (err: any) {
                        if (err) {
                            return res.status(400).json({
                                error: err
                            })
                        } else {
                            return res.status(200).json({
                                message: "Article modified successfully"
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