import { ArticleType, UserType } from '../../types/article'
import Markdown from '../Markdown/Markdown'
import Image from 'next/image'
import { HiOutlineCalendarDays } from 'react-icons/hi2'

export default function ArticlePreview({
	article,
	user,
}: {
	article: ArticleType
	user: UserType | null
}) {
	return (
		<div className='section-shell'>
			<div className='site-container'>
				<article className='brutal-card mx-auto max-w-4xl p-6 md:p-10'>
					<div className='section-heading mb-10'>
						<div
							className='section-eyebrow'
							style={{ fontFamily: 'var(--font-mono)' }}
						>
							Article
						</div>
						<h1 className='section-title !text-[clamp(2.8rem,7vw,5.25rem)]'>
							{article.title}
						</h1>
						<div className='divider-rule' />
					</div>
					<div className='mb-8 flex flex-wrap items-center gap-4 text-sm font-bold uppercase tracking-[0.16em] text-[var(--text-secondary)]'>
						<span className='inline-flex items-center gap-2'>
							<HiOutlineCalendarDays className='text-base' />
							{new Date(article.createdAt).toLocaleDateString('en', {
								year: 'numeric',
								month: 'short',
								day: 'numeric',
							})}
						</span>
						{user && (
							<div className='brutal-card-soft inline-flex items-center gap-3 bg-[var(--surface-strong)] px-3 py-2'>
								<Image
									src={user.profilePicture}
									alt={user.name}
									width={36}
									height={36}
									className='h-9 w-9 rounded-full border-2 border-[var(--border)] object-cover'
								/>
								<span>{user.name}</span>
							</div>
						)}
					</div>
					<div className='mb-8 flex flex-wrap gap-2'>
						{article.tags &&
							article.tags.map((tag: string, index: number) => (
								<span key={index} className='brutal-tag'>
									{tag}
								</span>
							))}
					</div>
					<Markdown article={article} />
				</article>
			</div>
		</div>
	)
}
