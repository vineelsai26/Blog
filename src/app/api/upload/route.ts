import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

export async function POST(req: NextRequest) {
	const body = await req.formData()

	const image = body.get('image') as File
	const type = body.get('type') as string
	const articleUrl = body.get('articleUrl') as string | null

	const session = await getServerSession()

	if (session?.user?.email && session?.user?.email === 'mail@vineelsai.com') {
		if (type === 'thumbnail') {
			const response = await fetch(
				`https://static.vineelsai.com/blog/images/${new Date().getFullYear()}/thumbnails/${
					image.name
				}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${process.env.NEXT_STATIC_UPLOAD_AUTH_KEY}`,
					},
					body: image,
				}
			)

			if (!response.ok) {
				return NextResponse.json({
					error: 'Error uploading thumbnail',
				})
			}

			return NextResponse.json({
				message: 'Thumbnail uploaded successfully',
				url: `https://static.vineelsai.com/blog/images/${new Date().getFullYear()}/thumbnails/${
					image.name
				}`,
			})
		}

		if (type === 'article' && articleUrl !== null) {
			const response = await fetch(
				`https://static.vineelsai.com/blog/images/${new Date().getFullYear()}/${articleUrl}/${
					image.name
				}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${process.env.NEXT_STATIC_UPLOAD_AUTH_KEY}`,
					},
					body: image,
				}
			)

			if (!response.ok) {
				return NextResponse.json({
					error: 'Error uploading thumbnail',
				})
			}

			return NextResponse.json({
				message: 'Image uploaded successfully',
				url: `https://static.vineelsai.com/blog/images/${new Date().getFullYear()}/${articleUrl}/${
					image.name
				}`,
			})
		}
	}


	return NextResponse.json({
		error: 'invalid email or password',
	})
}
