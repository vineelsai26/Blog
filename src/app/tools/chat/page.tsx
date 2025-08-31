'use client'
import React, { useState, useEffect, useRef } from 'react'

const MODELS = [
	{ id: 'gpt-5', name: 'GPT-5' },
	{ id: 'gpt-5-chat-latest', name: 'GPT-5 Chat Latest' },
	{ id: 'gpt-5-mini', name: 'GPT-5 Mini' },
	{ id: 'gpt-5-nano', name: 'GPT-5 Nano' },
	{ id: 'anthropic-claude-4.1', name: 'Anthropic Claude 4.1' },
]

type ChatMessage = { role: 'user' | 'assistant'; content: string }
type ConversationMeta = {
	id: string
	title: string
	model: string
	updatedAt: number
}

// Legacy single-chat key (for migration)
const LEGACY_STORAGE_KEY = (path: string) => `${path}/chat`
const HISTORY_KEY = '/tools/chat/conversations'
const CONVO_KEY = (id: string) => `/tools/chat/conversation/${id}`

export default function ChatPage() {
	const [model, setModel] = useState(MODELS[0].id)
	const [messages, setMessages] = useState<ChatMessage[]>([])
	const [input, setInput] = useState('')
	const [loading, setLoading] = useState(false)
	const [conversations, setConversations] = useState<ConversationMeta[]>([])
	const [activeId, setActiveId] = useState<string>('')
	const [showSidebar, setShowSidebar] = useState(true)
	const [renamingId, setRenamingId] = useState<string>('')
	const [generatingTitle, setGeneratingTitle] = useState(false)
	const scrollRef = useRef<HTMLDivElement | null>(null)
	// create a new conversation meta + persist
	const createConversation = (initial?: {
		messages?: ChatMessage[]
		model?: string
		title?: string
	}) => {
		const id = Date.now().toString(36)
		const conv: ConversationMeta = {
			id,
			title: initial?.title || 'New Chat',
			model: initial?.model || MODELS[0].id,
			updatedAt: Date.now(),
		}
		const newList = [conv, ...conversations]
		setConversations(newList)
		setActiveId(id)
		setModel(conv.model)
		setMessages(initial?.messages || [])
		window.localStorage.setItem(HISTORY_KEY, JSON.stringify(newList))
		window.localStorage.setItem(
			CONVO_KEY(id),
			JSON.stringify({
				model: conv.model,
				messages: initial?.messages || [],
			})
		)
		return id
	}

	const persistActive = (msgs: ChatMessage[], mdl: string) => {
		if (!activeId) return
		window.localStorage.setItem(
			CONVO_KEY(activeId),
			JSON.stringify({ model: mdl, messages: msgs })
		)
		setConversations((prev) => {
			const updated = prev.map((c) =>
				c.id === activeId
					? {
							...c,
							model: mdl,
							updatedAt: Date.now(),
							title: c.title,
						}
					: c
			)
			window.localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
			return updated
		})
	}

	const generateTitle = async (msgs: ChatMessage[], convId?: string) => {
		const idToUse = convId || activeId
		if (!idToUse || generatingTitle) return
		setGeneratingTitle(true)
		try {
			// debug aid
			console.debug(
				'[chat] generating title for',
				idToUse,
				'messages length',
				msgs.length
			)
			const res = await fetch('/api/chat/title', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages: msgs }),
			})
			if (!res.ok) return
			const data = await res.json()
			if (data?.title) {
				setConversations((prev) => {
					const updated = prev.map((c) =>
						c.id === idToUse
							? { ...c, title: data.title, updatedAt: Date.now() }
							: c
					)
					window.localStorage.setItem(
						HISTORY_KEY,
						JSON.stringify(updated)
					)
					return updated
				})
				const raw = window.localStorage.getItem(CONVO_KEY(idToUse))
				if (raw) {
					try {
						const parsed = JSON.parse(raw)
						parsed.model = model
						parsed.messages = msgs
						window.localStorage.setItem(
							CONVO_KEY(idToUse),
							JSON.stringify(parsed)
						)
					} catch {}
				}
			}
		} catch {
		} finally {
			setGeneratingTitle(false)
		}
	}

	const normalizeModel = (m: string): string => {
		// Map legacy openai prefixed ids to new canonical ones
		if (m.startsWith('openai-gpt-5')) {
			if (m.includes('mini')) return 'gpt-5-mini'
			if (m.includes('nano')) return 'gpt-5-nano'
			// vision/long/pro/standard collapse to base gpt-5 or chat-latest (pick base)
			return 'gpt-5'
		}
		return m
	}

	const loadConversation = (id: string) => {
		const raw = window.localStorage.getItem(CONVO_KEY(id))
		if (!raw) return
		try {
			const parsed = JSON.parse(raw) as {
				model: string
				messages: ChatMessage[]
			}
			const normalizedModel = normalizeModel(parsed.model)
			setActiveId(id)
			setModel(normalizedModel)
			setMessages(parsed.messages)
			if (normalizedModel !== parsed.model) {
				// persist normalization
				window.localStorage.setItem(
					CONVO_KEY(id),
					JSON.stringify({
						model: normalizedModel,
						messages: parsed.messages,
					})
				)
			}
		} catch {}
	}

	/* removed corrupted fragment */

	const deleteConversation = (id: string) => {
		window.localStorage.removeItem(CONVO_KEY(id))
		const filtered = conversations.filter((c) => c.id !== id)
		setConversations(filtered)
		window.localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered))
		if (id === activeId) {
			if (filtered.length) {
				loadConversation(filtered[0].id)
			} else {
				createConversation()
			}
		}
	}

	// hydrate conversations from localStorage (with legacy migration)
	useEffect(() => {
		const historyRaw = window.localStorage.getItem(HISTORY_KEY)
		if (historyRaw) {
			try {
				const list = JSON.parse(historyRaw) as ConversationMeta[]
				if (Array.isArray(list) && list.length) {
					// normalize legacy models in meta
					const normalized = list.map((c) =>
						c.model !== normalizeModel(c.model)
							? { ...c, model: normalizeModel(c.model) }
							: c
					)
					// Preserve stored order (no sorting) to avoid shuffle on refresh
					setConversations(normalized)
					setActiveId(list[0].id)
					loadConversation(list[0].id)
					return
				}
			} catch {}
		}
		// migration path
		const legacy = window.localStorage.getItem(
			LEGACY_STORAGE_KEY(window.location.pathname)
		)
		if (legacy) {
			try {
				const parsed = JSON.parse(legacy) as {
					model: string
					messages: ChatMessage[]
				}
				createConversation({
					model: parsed.model,
					messages: parsed.messages,
					title: 'New Chat',
				})
				window.localStorage.removeItem(
					LEGACY_STORAGE_KEY(window.location.pathname)
				)
				return
			} catch {}
		}
		// else start new
		createConversation()
	}, [])

	// persist active conversation on change
	useEffect(() => {
		persistActive(messages, model)
	}, [messages, model])

	// auto scroll
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight
		}
	}, [messages, loading])

	const sendMessage = async () => {
		if (!input.trim() || loading) return
		// ensure a conversation exists and capture its id synchronously
		const ensuredId = activeId || createConversation()
		const userContent = input
		setInput('')
		const newMessages: ChatMessage[] = [
			...messages,
			{ role: 'user', content: userContent },
		]
		setMessages(newMessages)
		setLoading(true)
		// clear any ongoing title generation flag
		// (generatingTitle prevents duplicate runs)
		let assistantBuffer = ''
		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ model, messages: newMessages }),
			})
			if (!res.body) throw new Error('No response body')
			setMessages((prev) => [...prev, { role: 'assistant', content: '' }])
			const reader = res.body.getReader()
			const decoder = new TextDecoder()
			while (true) {
				const { done, value } = await reader.read()
				if (done) break
				const chunk = decoder.decode(value, { stream: true })
				assistantBuffer += chunk
				setMessages((prev) => {
					const copy = [...prev]
					const last = copy[copy.length - 1]
					if (last && last.role === 'assistant') {
						if (chunk.startsWith(last.content)) {
							last.content = chunk
						} else if (!last.content.endsWith(chunk)) {
							last.content += chunk
						}
					}
					return copy
				})
			}
		} catch (err) {
			setMessages((prev) => [
				...prev,
				{
					role: 'assistant',
					content: 'Error: Unable to reach backend.',
				},
			])
		}
		setLoading(false)
		// generate title once after streaming completes if still default title
		if (
			assistantBuffer &&
			conversations.find((c) => c.id === ensuredId)?.title === 'New Chat'
		) {
			generateTitle(
				[
					...newMessages,
					{ role: 'assistant', content: assistantBuffer },
				],
				ensuredId
			)
		}
	}

	const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault()
			sendMessage()
		}
	}

	const clearChat = () => {
		setMessages([])
		persistActive([], model)
	}

	const renameConversation = (id: string, title: string) => {
		setConversations((prev) => {
			const updated = prev.map((c) =>
				c.id === id ? { ...c, title, updatedAt: Date.now() } : c
			)
			window.localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
			return updated
		})
		if (id === activeId) persistActive(messages, model)
	}

	return (
		<div className='fixed inset-0 bottom-14 top-16 flex bg-transparent'>
			{/* Sidebar */}
			{showSidebar && (
				<aside className='hidden w-64 flex-col overflow-y-auto border-r-2 border-gray-300 bg-gray-100 p-3 md:flex dark:border-gray-700 dark:bg-gray-900'>
					<div className='mb-3 flex items-center gap-2'>
						<span className='text-sm font-semibold dark:text-gray-200'>
							Conversations
						</span>
						<button
							onClick={() => createConversation()}
							className='ml-auto rounded bg-blue-600 px-2 py-1 text-xs text-white hover:bg-blue-700'
						>
							New
						</button>
					</div>
					<ul className='space-y-1'>
						{conversations.map((c) => (
							<li
								key={c.id}
								className={`group rounded border border-transparent hover:border-gray-300 dark:hover:border-gray-600 ${c.id === activeId ? 'bg-white shadow dark:bg-gray-800' : 'bg-gray-200 dark:bg-gray-700'} transition`}
							>
								<div className='flex items-center gap-2 px-2 py-2'>
									<button
										onClick={() => {
											if (c.id !== activeId)
												loadConversation(c.id)
										}}
										className='flex-1 truncate text-left text-xs font-medium dark:text-gray-100'
									>
										{renamingId === c.id ? (
											<input
												autoFocus
												defaultValue={c.title}
												onBlur={(e) => {
													renameConversation(
														c.id,
														e.target.value.trim() ||
															'New Chat'
													)
													setRenamingId('')
												}}
												onKeyDown={(e) => {
													if (e.key === 'Enter') {
														renameConversation(
															c.id,
															(
																e.target as HTMLInputElement
															).value.trim() ||
																'New Chat'
														)
														setRenamingId('')
													}
													if (e.key === 'Escape') {
														setRenamingId('')
													}
												}}
												className='w-full rounded bg-gray-50 px-1 py-0.5 text-xs outline-none dark:bg-gray-600'
											/>
										) : (
											<span
												onDoubleClick={() =>
													setRenamingId(c.id)
												}
											>
												{c.title}
											</span>
										)}
									</button>
									<button
										onClick={() => setRenamingId(c.id)}
										title='Rename'
										className='text-xs text-gray-500 opacity-0 transition hover:text-gray-800 group-hover:opacity-100 dark:text-gray-400 dark:hover:text-gray-200'
									>
										✎
									</button>
									<button
										onClick={() => deleteConversation(c.id)}
										title='Delete'
										className='text-xs text-gray-500 opacity-0 transition hover:text-red-600 group-hover:opacity-100 dark:text-gray-400 dark:hover:text-red-400'
									>
										×
									</button>
								</div>
							</li>
						))}
						{conversations.length === 0 && (
							<li className='py-4 text-center text-xs text-gray-500 dark:text-gray-400'>
								No conversations
							</li>
						)}
					</ul>
				</aside>
			)}
			<div className='flex flex-1 flex-col'>
				<header className='px-4 pb-2'>
					<div className='flex items-center gap-2'>
						<button
							onClick={() => setShowSidebar((s) => !s)}
							className='rounded bg-gray-300 px-2 py-1 text-xs font-semibold text-gray-800 md:hidden dark:bg-gray-700 dark:text-gray-100'
						>
							{showSidebar ? 'Hide' : 'Show'}
						</button>
						<h1 className='flex-1 pt-2 text-center text-2xl font-semibold md:text-4xl dark:text-white'>
							AI Chat
						</h1>
					</div>
					<p className='mt-1 text-center text-xs font-medium text-gray-600 md:text-sm dark:text-gray-300'>
						Private experimental AI assistant.
					</p>
				</header>
				<main className='flex min-h-0 flex-1 flex-col gap-3 px-4 pb-4'>
					<div
						ref={scrollRef}
						className='flex-1 overflow-y-auto rounded-lg border-2 border-gray-300 p-4 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white'
					>
						{messages.length === 0 && !loading && (
							<div className='pt-10 text-center text-gray-400'>
								Start the conversation…
							</div>
						)}
						{messages.map((m, i) => (
							<div
								key={i}
								className={`my-2 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
							>
								<div
									className={`max-w-[75%] whitespace-pre-wrap rounded-lg px-4 py-2 text-sm shadow ${m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 dark:text-white'}`}
								>
									{m.content ||
										(m.role === 'assistant' ? (
											<span className='opacity-60'>
												Thinking…
											</span>
										) : null)}
								</div>
							</div>
						))}
						{loading &&
							messages[messages.length - 1]?.role !==
								'assistant' && (
								<div className='my-2 flex justify-start'>
									<div className='max-w-[75%] rounded-lg bg-gray-200 px-4 py-2 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300'>
										Thinking…
									</div>
								</div>
							)}
					</div>
					<div className='flex flex-col'>
						<textarea
							rows={3}
							className='flex-0 w-full resize-none rounded-lg border-2 border-gray-300 p-3 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white'
							placeholder='Ask something...'
							value={input}
							onChange={(e) => setInput(e.target.value)}
							onKeyDown={handleKey}
							disabled={loading}
						/>
						<div className='mt-2 flex flex-wrap items-center gap-2'>
							<button
								onClick={clearChat}
								className='rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-700 disabled:opacity-50'
								disabled={loading || messages.length === 0}
							>
								Clear
							</button>
							<div className='ml-auto flex items-center gap-2'>
								<div className='hidden text-xs text-gray-500 sm:block dark:text-gray-400'>
									Enter = send • Shift+Enter = newline
								</div>
								<select
									className='rounded-lg border-2 border-gray-300 bg-white p-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white'
									value={model}
									onChange={(e) => setModel(e.target.value)}
									disabled={loading}
								>
									{MODELS.map((m) => (
										<option key={m.id} value={m.id}>
											{m.name}
										</option>
									))}
								</select>
								<button
									onClick={sendMessage}
									disabled={loading || !input.trim()}
									className='rounded-lg bg-blue-700 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700'
								>
									{loading ? 'Sending…' : 'Send'}
								</button>
							</div>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}
