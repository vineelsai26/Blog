import showdown from "showdown"
import { ArticleType } from "../../types/article"

export default function ArticlePreview({ article }: { article: ArticleType }) {
	const converter = new showdown.Converter({ tables: true, tasklists: true, tablesHeaderId: true, strikethrough: true, simplifiedAutoLink: true, ghCompatibleHeaderId: true, emoji: true }),
		text = article.longDescription,
		html = converter.makeHtml(text)
	return (
		<div className='min-h-screen'>
			<h1 className='text-center font-medium leading-tight text-5xl mt-0 mb-2'>{article.title}</h1>
			<div className='p-4'>
				<div dangerouslySetInnerHTML={{
					__html: html
				}} className='description'></div>
			</div>
		</div>
	)
}
