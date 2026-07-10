import { describe, expect, it } from 'vitest'
import { ContactRateLimiter, parseContactPayload } from './validation'

describe('contact form validation', () => {
	it('accepts only the structured contact fields', () => {
		expect(parseContactPayload({
			name: 'Vineel',
			email: 'vineel@example.com',
			message: 'A sufficiently detailed message.',
			username: '@everyone',
		})).toEqual({
			ok: true,
			value: {
				name: 'Vineel',
				email: 'vineel@example.com',
				message: 'A sufficiently detailed message.',
			},
		})
	})

	it('rejects malformed and oversized fields', () => {
		expect(parseContactPayload({ name: 'A', email: 'bad', message: 'short' }).ok).toBe(false)
		expect(parseContactPayload({
			name: 'Valid Name',
			email: 'valid@example.com',
			message: 'x'.repeat(1501),
		}).ok).toBe(false)
	})

	it('rejects a filled honeypot field', () => {
		expect(parseContactPayload({
			name: 'Valid Name',
			email: 'valid@example.com',
			message: 'This message is valid.',
			website: 'https://spam.example',
		}).ok).toBe(false)
	})
})

describe('contact rate limiter', () => {
	it('limits repeated submissions and resets after the window', () => {
		const limiter = new ContactRateLimiter(2, 1000)
		expect(limiter.consume('ip', 0).allowed).toBe(true)
		expect(limiter.consume('ip', 1).allowed).toBe(true)
		expect(limiter.consume('ip', 2)).toEqual({ allowed: false, retryAfterSeconds: 1 })
		expect(limiter.consume('ip', 1000).allowed).toBe(true)
	})
})
