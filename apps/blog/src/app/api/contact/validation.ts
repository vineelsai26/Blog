export interface ContactPayload {
	name: string
	email: string
	message: string
}

type ParseResult =
	| { ok: true; value: ContactPayload }
	| { ok: false; error: string }

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function parseContactPayload(input: unknown): ParseResult {
	if (!input || typeof input !== 'object' || Array.isArray(input)) {
		return { ok: false, error: 'Invalid contact form.' }
	}
	const body = input as Record<string, unknown>
	if (typeof body.website === 'string' && body.website.trim()) {
		return { ok: false, error: 'Invalid contact form.' }
	}
	const name = typeof body.name === 'string' ? body.name.trim() : ''
	const email = typeof body.email === 'string' ? body.email.trim() : ''
	const message = typeof body.message === 'string' ? body.message.trim() : ''

	if (name.length < 2 || name.length > 100) {
		return { ok: false, error: 'Name must be between 2 and 100 characters.' }
	}
	if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
		return { ok: false, error: 'Enter a valid email address.' }
	}
	if (message.length < 10 || message.length > 1500) {
		return { ok: false, error: 'Message must be between 10 and 1500 characters.' }
	}
	return { ok: true, value: { name, email, message } }
}

export class ContactRateLimiter {
	private readonly windows = new Map<string, { count: number; resetAt: number }>()

	constructor(
		private readonly limit: number,
		private readonly windowMs: number,
	) {}

	consume(key: string, now = Date.now()): { allowed: boolean; retryAfterSeconds: number } {
		if (this.windows.size > 10_000) {
			for (const [storedKey, window] of this.windows) {
				if (window.resetAt <= now) this.windows.delete(storedKey)
			}
		}

		const current = this.windows.get(key)
		if (!current || current.resetAt <= now) {
			this.windows.set(key, { count: 1, resetAt: now + this.windowMs })
			return { allowed: true, retryAfterSeconds: 0 }
		}
		if (current.count >= this.limit) {
			return {
				allowed: false,
				retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
			}
		}
		current.count += 1
		return { allowed: true, retryAfterSeconds: 0 }
	}
}
