import ArticleEditor from '../../components/ArticleEditor/ArticleEditor'
import { ArticleType } from '../../types/article'

export const metadata = {
	title: 'New Article',
	description: 'Create New Article',
}

export default function New() {
	return (
		<>
			<ArticleEditor
				articleFetch={
					{
						title: 'Test',
						url: 'test',
						imageUrl: 'https://vineelsai.com/logo-light.png',
						description: 'Test Description',
						content: 'Test Long Description',
						createdAt: new Date(),
						createdBy: 'mail@vineelsai.com',
						tags: ['test1', 'test2', 'test3'],
						private: true,
					} as ArticleType
				}
				user={{
					id: 1,
					email: 'mail@vineelsai.com',
					name: 'Vineel Sai',
					profilePicture: 'https://vineelsai.com/profile.webp',
					password: '',
					role: 'admin',
					githubToken: '',
				}}
				editMode={false}
			/>
		</>
	)
}
