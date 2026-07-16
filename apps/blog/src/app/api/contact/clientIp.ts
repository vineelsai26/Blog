// Derive the rate-limit key only from headers set by our trusted edge/CDN,
// which overwrite any client-supplied value. The left-most X-Forwarded-For
// entry is attacker-controllable, so a client could mint a fresh bucket per
// request and defeat the limiter; it must not be used as the key.
export function getClientIp(headers: Headers): string {
	const trusted =
		headers.get('cf-connecting-ip') ?? headers.get('x-real-ip')
	return trusted?.trim() || 'unknown'
}
