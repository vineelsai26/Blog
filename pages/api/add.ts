import { NextApiRequest, NextApiResponse } from 'next'
import Article from '../../models/article'
import User from '../../models/user'

import bcrypt from "bcrypt"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(400).json({
                error: "User not found"
            })
        } else {
            if (user && user.email) {
                const result = await bcrypt.compare(req.body.password, user.password)
                if (result) {
                    let article = new Article({
                        title: req.body.title,
                        url: req.body.url,
                        imageUrl: req.body.imageUrl,
                        description: req.body.description,
                        longDescription: req.body.content,
                        createdBy: user.email
                    })
                    article.save(function (err: any) {
                        if (err) {
                            res.status(400).json({
                                error: "Error saving article"
                            })
                        } else {
                            res.status(200).json({
                                success: "Article saved successfully"
                            })
                        }
                    })
                }
            } else {
                res.status(400).json({
                    error: "invalid email or password"
                })
            }
        }
    } else {
        res.status(400).json({
            error: "Invalid request"
        })
    }
}