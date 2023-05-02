import { Prisma } from '@prisma/client'

export type ArticleType = {
	id: string
	created_time: string
	icon: {
		file: {
			url: string
		}
	}
	properties: {
		URL: {
			url: string
		}
		Tags: {
			multi_select: {
				name: string
			}[]
		}
		"Mini Description": {
			rich_text: {
				text: {
					content: string
				}
			}[0]
		}
		Name: {
			title: {
				text: {
					content: string
				}
			}[]
		}
	}
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
