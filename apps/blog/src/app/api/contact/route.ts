import { NextRequest, NextResponse } from 'next/server'
import { ContactRateLimiter, parseContactPayload } from './validation'

const rateLimiter = new ContactRateLimiter(5, 15 * 60 * 1000)
const MAX_BODY_BYTES = 16 * 1024

function getClientIp(req: NextRequest): string {
	return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
}

export async function POST(req: NextRequest) {
	const contentLength = Number(req.headers.get('content-length') ?? '0')
	if (contentLength > MAX_BODY_BYTES) {
		return NextResponse.json({ error: 'Request is too large.' }, { status: 413 })
	}

	const rateLimit = rateLimiter.consume(getClientIp(req))
	if (!rateLimit.allowed) {
		return NextResponse.json(
			{ error: 'Too many messages. Please try again later.' },
			{ status: 429, headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) } },
		)
	}

	let body: unknown
	try {
		body = await req.json()
	} catch {
		return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 })
	}

	const parsed = parseContactPayload(body)
	if (!parsed.ok) {
		return NextResponse.json({ error: parsed.error }, { status: 400 })
	}

	const webhook = process.env.NEXT_DISCORD_WEBHOOK
	if (!webhook) {
		return NextResponse.json({ error: 'Contact service is unavailable.' }, { status: 503 })
	}

	try {
		const response = await fetch(webhook, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: 'Contact Form',
				avatar_url: 'https://vineelsai.com/logo-light.png',
				content: `Name: ${parsed.value.name}\nEmail: ${parsed.value.email}\nMessage: ${parsed.value.message}`,
				allowed_mentions: { parse: [] },
			}),
		})

		if (!response.ok) {
			return NextResponse.json({ error: 'Error! Please try again later.' }, { status: 502 })
		}
	} catch {
		return NextResponse.json({ error: 'Error! Please try again later.' }, { status: 502 })
	}

	return NextResponse.json({ message: 'Successfully Sent, I will get back to you soon!' })
}
