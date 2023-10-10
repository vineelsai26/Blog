import { Prisma } from '@prisma/client'

export type ArticleType = {
	url: string
	title: string
	description: string
	longDescription: string | undefined
	imageUrl: string
	createdAt: Date
	createdBy: string | Prisma.users
	tags: string[]
	private: boolean
}

export type ArticleURLType = {
	url: string
}

export type SaveResponse = {
	message: string | null
	error: string | null
}

export type ArticleEditorProps = {
	title: string
	setTitle: Dispatch<SetStateAction<string>>
	url: string
	setUrl: Dispatch<SetStateAction<string>>
	imageUrl: string
	setImageUrl: Dispatch<SetStateAction<string>>
	tags: string[]
	setTags: Dispatch<SetStateAction<string[]>>
	description: string
	setDescription: Dispatch<SetStateAction<string>>
	content: string
	setContent: Dispatch<SetStateAction<string>>
	setEmail: Dispatch<SetStateAction<string>>
	setPassword: Dispatch<SetStateAction<string>>
	data: SaveResponse
	handleSubmit: (boolean) => void
	loading: boolean
	editMode: boolean
}
