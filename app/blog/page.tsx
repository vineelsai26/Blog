import prisma from '../../prisma/prisma'
import Article from '../../src/ArticleCard/ArticleCard'
import { ArticleType } from '../../types/article'

const pageLimit = 10

export default async function Blog() {
	// const [articles, setArticles] = useState<ArticleType[]>(articleProps)
	// const [page, setPage] = useState(-1)
	// const [pageCount, setPageCount] = useState(pageCountProp)
	// const [loading, setLoading] = useState(false)

	// useEffect(() => {
	// 	const getArticles = async () => {
	// 		setLoading(true)
	// 		const res = await fetch('/api/articles', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify({
	// 				page: page,
	// 				pageLimit: pageLimit,
	// 			}),
	// 		})
	// 		if (res.ok) {
	// 			const data = await res.json()
	// 			setArticles(data.articles)
	// 			setPageCount(data.pageCount)
	// 		} else {
	// 			console.log('error')
	// 		}
	// 		setLoading(false)
	// 	}

	// 	if (page >= 0) {
	// 		getArticles()
	// 	}
	// }, [page])

	const articles = await prisma.articles.findMany({
		select: {
			title: true,
			url: true,
			imageUrl: true,
			description: true,
			tags: true,
			createdAt: true,
			createdBy: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
		skip: 0,
		take: pageLimit,
	})

	// const pageCount = ((await prisma.articles.count()) / pageLimit) + 1

	return (
		<div>
			<div className='min-h-screen'>
				{articles.length > 0 && (
					<div className='flex flex-col items-center'>
						{articles.map((article) => (
							<Article key={article.url} article={article as ArticleType} />
						))}
					</div>
				)}
				{/* {loading && <Loader />} */}
			</div>

			<div className='flex flex-col'>
				{/* {pageCount > 1 && (
					<Pagination
						page={page}
						setPage={setPage}
						pageCount={pageCount}
					/>
				)} */}
			</div>
		</div>
	)
}
