import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { openAICompatibleGatewaySettings } from '@vstack/ai'
import { authOptions, isAdmin } from '../../../lib/auth'

const MODEL_ROUTES: Record<string, string> = {
	'gpt-5': 'openai/gpt-5',
	'gpt-5-chat-latest': 'openai/gpt-5.5',
	'gpt-5-mini': 'openai/gpt-5-mini',
	'gpt-5-nano': 'openai/gpt-5-nano',
	'anthropic-claude-4.1': 'anthropic/claude-opus-4.1',
}

function gateway() {
	const baseURL = process.env.MODEL_GATEWAY_BASE_URL?.trim()
	const apiKey = process.env.MODEL_GATEWAY_API_KEY?.trim()
	if (!baseURL || !apiKey) {
		throw new Error('VAI Gateway is not configured.')
	}
	return createOpenAI(
		openAICompatibleGatewaySettings({
			baseURL,
			apiKey,
			workload: 'blog-chat',
		})
	)
}

export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions)
	if (!isAdmin(session)) {
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

	const routeModel = MODEL_ROUTES[model]
	if (!routeModel) {
		return new Response(JSON.stringify({ error: 'Model not supported' }), {
			status: 400,
		})
	}

	const stream = await streamText({
		model: gateway().chat(routeModel),
		messages,
		...(model === 'anthropic-claude-4.1' ? { maxOutputTokens: 1024 } : {}),
	})
	return new Response(stream.textStream)
}
