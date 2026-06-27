import Article from '../../components/ArticleCard/ArticleCard'
import BlogSearch from '../../components/BlogSearch/BlogSearch'
import Pagination from '../../components/Pagination/Pagination'
import { ArticleType } from '../../types/article'
import { articles as articlesD } from '../../drizzle/schema/articles'
import db from '../../drizzle/db'
import { count } from 'drizzle-orm'

const pageLimit = 100

export const metadata = {
	title: 'Blog',
	description: 'Blog by Vineel Sai',
}

export const revalidate = 3600

export default async function Blog() {
	const page = 0

	let result = false

	const articles = await db.query.articles
		.findMany({
			where: (articles, { eq }) => eq(articles.private, result),
			orderBy: (articles, { desc }) => [desc(articles.createdAt)],
		})
		.catch(() => [])

	const articleCount = await db
		.select({ count: count() })
		.from(articlesD)
		.then((res) => res[0]?.count ?? 0)
		.catch(() => 0)

	const pageCount = Math.ceil(articleCount / pageLimit)

	return (
		<div className='section-shell'>
			<div className='site-container surface-stack'>
				<section className='section-heading'>
					<div
						className='section-eyebrow'
						style={{ fontFamily: 'var(--font-mono)' }}
					>
						Writing
					</div>
					<h1 className='section-title'>Blog</h1>
					<div className='divider-rule' />
					<p className='section-copy'>
						Notes on software, tools, and the things worth documenting after the
						build is done.
					</p>
				</section>

				<BlogSearch />

				<section className='surface-stack'>
					{articles.length > 0 && (
						<div className='surface-stack'>
							{articles.map((article, index) => (
								<Article
									key={article.url}
									article={article as ArticleType}
									priority={index === 0}
								/>
							))}
						</div>
					)}
					{articles.length === 0 && (
						<div className='brutal-card p-10 text-center text-lg font-semibold uppercase tracking-[0.12em]'>
							No public posts yet.
						</div>
					)}
				</section>

				{pageCount > 1 && <Pagination page={page} pageCount={pageCount} />}
			</div>
		</div>
	)
}
