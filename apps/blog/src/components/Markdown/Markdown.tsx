'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Image from 'next/image'
import { ArticleType } from '../../types/article'
import CopyButton from './CopyButton'

export default function Markdown({ article }: { article: ArticleType }) {
	return (
		<div className='article-prose prose max-w-none prose-neutral'>
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				components={{
					code({ className, children }) {
						const match = /language-(\w+)/.exec(className || '')
						return match ? (
							<div className='brutal-card-soft my-8 overflow-hidden bg-[var(--surface)]'>
								<div
									className='flex items-center justify-between border-b-2 border-[var(--border)] px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)]'
									style={{ fontFamily: 'var(--font-mono)' }}
								>
									<span>{match[1]}</span>
									<CopyButton content={String(children).replace(/\n$/, '')} />
								</div>
								<SyntaxHighlighter
									style={oneLight as any}
									language={match[1]}
									PreTag='div'
									customStyle={{
										margin: 0,
										borderRadius: 0,
										background: '#fffdf7',
										padding: '1rem',
									}}
								>
									{String(children).replace(/\n$/, '')}
								</SyntaxHighlighter>
							</div>
						) : (
							<code className='rounded-sm border border-[var(--border)] bg-[var(--accent-muted)] px-2 py-1 text-[0.92em] text-[var(--text-primary)]'>
								{children}
							</code>
						)
					},
					img({ className, ...props }) {
						if (typeof props.src !== 'string') return null
						return (
							<Image
								src={props.src}
								alt={props.alt || ''}
								width={1200}
								height={600}
								className={`${className} h-auto w-full`}
							/>
						)
					},
				}}
			>
				{article.content}
			</ReactMarkdown>
		</div>
	)
}
