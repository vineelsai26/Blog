import { describe, expect, it } from 'vitest'
import { getClientIp } from './clientIp'

describe('contact client IP resolution', () => {
	it('ignores the spoofable X-Forwarded-For header', () => {
		const headers = new Headers({ 'x-forwarded-for': '6.6.6.6, 7.7.7.7' })
		expect(getClientIp(headers)).toBe('unknown')
	})

	it('trusts the edge-provided connecting IP', () => {
		expect(getClientIp(new Headers({ 'cf-connecting-ip': '1.2.3.4' }))).toBe('1.2.3.4')
		expect(getClientIp(new Headers({ 'x-real-ip': '5.6.7.8' }))).toBe('5.6.7.8')
	})

	it('prefers cf-connecting-ip over x-real-ip', () => {
		const headers = new Headers({
			'cf-connecting-ip': '1.2.3.4',
			'x-real-ip': '5.6.7.8',
		})
		expect(getClientIp(headers)).toBe('1.2.3.4')
	})

	it('falls back to a shared bucket when no trusted header is present', () => {
		expect(getClientIp(new Headers())).toBe('unknown')
	})
})
