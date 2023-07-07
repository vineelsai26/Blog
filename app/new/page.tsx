import ArticleEditor from '../../src/ArticleEditor/ArticleEditor'
import { ArticleType } from '../../types/article'

export const metadata = {
	title: 'New Article',
	description: 'Create New Article',
}

export default function New() {	
	return (
		<>
			<ArticleEditor
				articleFetch={{} as ArticleType}
				editMode={false}
			/>
		</>
	)
}
