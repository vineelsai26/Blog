import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { ArticleType } from '../../types/article'
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Image from 'next/image'

export default function Markdown({ article }: { article: ArticleType }) {
	return (
		<ReactMarkdown
			className='prose max-w-max dark:prose-invert'
			remarkPlugins={[remarkGfm]}
			components={{
				code({ node, inline, className, children, ...props }) {
					const match = /language-(\w+)/.exec(className || '')
					return !inline && match ? (
						<SyntaxHighlighter
							style={vs as any}
							language={match[1]}
							PreTag='div'
							{...props}
						>
							{String(children).replace(/\n$/, '')}
						</SyntaxHighlighter>
					) : (
						<code
							className={className}
							{...props}
						>
							{children}
						</code>
					)
				},
				img({ node, className, children, ...props }) {
					return (
						<Image
							src={props.src!}
							alt={props.alt!}
							width={1200}
							height={600}
							className={`${className} h-auto w-full`}
						/>
					)
				},
			}}
		>
			{article.longDescription}
		</ReactMarkdown>
	)
}
