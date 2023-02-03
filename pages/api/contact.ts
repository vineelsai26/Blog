import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const response = await axios.post(
			process.env.NEXT_DISCORD_WEBHOOK!,
			req.body
		)

		if (response.status === 204 || response.status === 200) {
			return res.status(200).json({
				message: 'Successfully Sent, I will get back to you soon!',
			})
		} else {
			return res.status(400).json({
				error: 'Error! Please try again later.',
			})
		}
	} else {
		return res.status(400).json({
			error: 'Invalid request',
		})
	}
}
