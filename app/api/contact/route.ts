import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
	const body = await new Response(req.body).json()

	const response = await fetch(process.env.NEXT_DISCORD_WEBHOOK!, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})

	if (response.status === 204 || response.status === 200) {
		return NextResponse.json({
			message: 'Successfully Sent, I will get back to you soon!',
		})
	} else {
		return NextResponse.json({
			error: 'Error! Please try again later.',
		})
	}
}
