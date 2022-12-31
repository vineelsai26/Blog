export type ArticleType = {
	url: string
	title: string
	description: string
	longDescription: string
	imageUrl: string
	createdAt: Date
	createdBy: string
}

export type SaveResponse = {
	message: string | null
	error: string | null
}

export type ArticleEditorProps = {
	title: string,
	setTitle: Dispatch<SetStateAction<string>>,
	url: string,
	setUrl: Dispatch<SetStateAction<string>>,
	imageUrl: string,
	setImageUrl: Dispatch<SetStateAction<string>>,
	description: string,
	setDescription: Dispatch<SetStateAction<string>>,
	content: string,
	setContent: Dispatch<SetStateAction<string>>,
	setEmail: Dispatch<SetStateAction<string>>,
	setPassword: Dispatch<SetStateAction<string>>,
	data: SaveResponse,
	handleSubmit: () => void
}
