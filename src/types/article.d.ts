import { articles } from '../drizzle/schema/articles'
import { users } from '../drizzle/schema/users'

type ArticleType = typeof articles.$inferSelect

type UserType = typeof users.$inferSelect

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
