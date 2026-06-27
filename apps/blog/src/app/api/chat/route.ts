import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'

export async function POST(req: NextRequest) {
	const session = await getServerSession()
	if (!session || session.user?.email !== 'mail@vineelsai.com') {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
		})
	}
	const body = await req.json()
	let { model, messages } = body
	if (!model || !messages || !Array.isArray(messages)) {
		return new Response(JSON.stringify({ error: 'Invalid request' }), {
			status: 400,
		})
	}

	// normalize legacy client ids
	if (model.startsWith('openai-gpt-5')) {
		if (model.includes('mini')) model = 'gpt-5-mini'
		else if (model.includes('nano')) model = 'gpt-5-nano'
		else model = 'gpt-5'
	}

	let modelProvider
	if (model === 'gpt-5') {
		modelProvider = openai('gpt-5')
	} else if (model === 'gpt-5-chat-latest') {
		modelProvider = openai('gpt-5-chat-latest')
	} else if (model === 'gpt-5-mini') {
		modelProvider = openai('gpt-5-mini')
	} else if (model === 'gpt-5-nano') {
		modelProvider = openai('gpt-5-nano')
	} else if (model === 'anthropic-claude-4.1') {
		modelProvider = anthropic('claude-4.1')
	} else {
		return new Response(JSON.stringify({ error: 'Model not supported' }), {
			status: 400,
		})
	}

	const stream = await streamText({
		model: modelProvider,
		messages,
		...(model === 'anthropic-claude-4.1' ? { maxOutputTokens: 1024 } : {}),
	})
	return new Response(stream.textStream)
}
