import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

// Generate a concise title for a conversation using gpt-5-nano
export async function POST(req: NextRequest) {
	const session = await getServerSession()
	if (!session || session.user?.email !== 'mail@vineelsai.com') {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
		})
	}
	let body: any
	try {
		body = await req.json()
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
			status: 400,
		})
	}
	const { messages } = body || {}
	if (!Array.isArray(messages) || messages.length === 0) {
		return new Response(JSON.stringify({ error: 'No messages' }), {
			status: 400,
		})
	}

	// Build a compact prompt from first few user / assistant messages
	const snippet = messages
		.slice(0, 6)
		.map(
			(m: any) =>
				`${m.role === 'user' ? 'User' : 'AI'}: ${typeof m.content === 'string' ? m.content : ''}`
		)
		.join('\n')
		.slice(0, 1200)

	const system =
		'You create extremely concise, clear, Title Case conversation titles (max 6 words, no quotes, no trailing punctuation).'
	const user = `Conversation excerpt:\n${snippet}\n\nTitle:`

	try {
		// Use messages array with system instruction and user message for title generation
		const result = await streamText({
			model: openai('gpt-5-nano'),
			messages: [
				{ role: 'system', content: system },
				{ role: 'user', content: user },
			],
			maxOutputTokens: 40,
		})

		// Collect streamed text into a single string
		const reader = result.textStream.getReader()
		let full = ''
		while (true) {
			const { done, value } = await reader.read()
			if (done) break
			full += value
			if (full.length > 160) break
		}

		let title = (full || '').trim()
		// Sanitize: remove quotes and trailing punctuation, enforce length
		title = title.replace(/^['"“”`]+|['"“”`]+$/g, '')
		title = title.replace(/[.!?\s]+$/g, '')
		if (title.split(/\s+/).length > 8) {
			title = title.split(/\s+/).slice(0, 8).join(' ')
		}

		console.log('Generated title:', title)
		// Fallback: if AI didn't return any title, use first user message
		if (!title) {
			const firstUser =
				messages.find((m: any) => m.role === 'user')?.content || ''
			// take first 5 words
			title = firstUser.split(/\s+/).slice(0, 5).join(' ')
			// Title Case words
			title = title
				.split(/\s+/)
				.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
				.join(' ')
			if (!title) title = 'New Chat'
		}

		return new Response(JSON.stringify({ title }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (e) {
		return new Response(
			JSON.stringify({ error: 'Failed to generate title' }),
			{ status: 500 }
		)
	}
}
