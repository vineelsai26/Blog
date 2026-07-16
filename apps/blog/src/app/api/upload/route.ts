import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, isAdmin } from '../../../lib/auth'

const MAX_IMAGE_BYTES = 10 * 1024 * 1024
const MAX_MULTIPART_BYTES = MAX_IMAGE_BYTES + 64 * 1024
const SAFE_SEGMENT = /^[A-Za-z0-9][A-Za-z0-9._-]*$/

function safeSegment(value: string, label: string): string {
	if (!SAFE_SEGMENT.test(value) || value === '.' || value === '..') {
		throw new Error(`Invalid ${label}`)
	}
	return encodeURIComponent(value)
}

function safeArticlePath(value: string): string {
	const parts = value.split('/')
	if (parts.length === 0 || parts.some((part) => !part)) throw new Error('Invalid articleUrl')
	return parts.map((part) => safeSegment(part, 'articleUrl')).join('/')
}

function verifiedImageType(bytes: Uint8Array): string | undefined {
	if (bytes.length >= 8 && [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a].every((value, index) => bytes[index] === value)) return 'image/png'
	if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg'
	if (bytes.length >= 6 && new TextDecoder().decode(bytes.slice(0, 6)).match(/^GIF8[79]a$/)) return 'image/gif'
	if (bytes.length >= 12 && new TextDecoder().decode(bytes.slice(0, 4)) === 'RIFF' && new TextDecoder().decode(bytes.slice(8, 12)) === 'WEBP') return 'image/webp'
	return undefined
}

export async function POST(req: NextRequest) {
	const session = await getServerSession(authOptions)
	if (!isAdmin(session)) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}
	const contentLength = Number(req.headers.get('content-length'))
	if (Number.isFinite(contentLength) && contentLength > MAX_MULTIPART_BYTES) {
		return NextResponse.json({ error: 'Upload exceeds the 10 MiB limit' }, { status: 413 })
	}

	let body: FormData
	try {
		body = await req.formData()
	} catch {
		return NextResponse.json({ error: 'Invalid multipart form data' }, { status: 400 })
	}
	const image = body.get('image')
	const type = body.get('type')
	const articleUrl = body.get('articleUrl')
	if (!(image instanceof File) || typeof type !== 'string') {
		return NextResponse.json({ error: 'image and type are required' }, { status: 400 })
	}
	if (image.size <= 0 || image.size > MAX_IMAGE_BYTES) {
		return NextResponse.json({ error: 'image must be a non-empty image up to 10 MiB' }, { status: 400 })
	}
	const imageBytes = new Uint8Array(await image.arrayBuffer())
	const contentType = verifiedImageType(imageBytes)
	if (!contentType) {
		return NextResponse.json({ error: 'Only PNG, JPEG, GIF, and WebP images are accepted' }, { status: 400 })
	}

	let objectPath: string
	try {
		const fileName = safeSegment(image.name, 'file name')
		const base = `blog/images/${new Date().getFullYear()}`
		if (type === 'thumbnail') {
			objectPath = `${base}/thumbnails/${fileName}`
		} else if (type === 'article' && typeof articleUrl === 'string') {
			objectPath = `${base}/${safeArticlePath(articleUrl)}/${fileName}`
		} else {
			return NextResponse.json({ error: 'Invalid upload type or articleUrl' }, { status: 400 })
		}
	} catch (error) {
		return NextResponse.json({ error: error instanceof Error ? error.message : 'Invalid upload path' }, { status: 400 })
	}

	const authKey = process.env.NEXT_STATIC_UPLOAD_AUTH_KEY
	if (!authKey) return NextResponse.json({ error: 'Upload service is not configured' }, { status: 503 })
	const url = `https://static.vineelsai.com/${objectPath}`
	const response = await fetch(url, {
		method: 'PUT',
		headers: { Authorization: `Bearer ${authKey}`, 'Content-Type': contentType },
		body: imageBytes,
	})
	if (!response.ok) return NextResponse.json({ error: 'Static upload failed' }, { status: 502 })

	return NextResponse.json({ message: 'Image uploaded successfully', url })
}
