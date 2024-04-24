import ArticlePreview from '../../../components/ArticlePreview/ArticlePreview'
import { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import db from '../../../drizzle/db'

export const dynamic = 'force-dynamic'

export default async function Post({
	params,
}: {
	params: {
		url: string
	}
}) {
	let result = false
	const session = await getServerSession()
	if (session?.user?.email === 'mail@vineelsai.com') {
		result = true
	}

    const article = await db.query.articles.findFirst({
        where: (articles, {eq}) => eq(articles.url, params.url) && eq(articles.private, result)
    })

    if (article && article.id) {
        const user = await db.query.users.findFirst({
            where: (users, {eq}) => eq(users.email, article.createdBy),
        })

        return (
            <div>
                <ArticlePreview article={article} user={user ? user : null} />
            </div>
        )
    }
}

export async function generateMetadata({
	params,
}: {
	params: {
		url: string
	}
}): Promise<Metadata> {
	const article = await db.query.articles.findFirst({
		where: (articles, { eq }) => eq(articles.url, params.url),
        columns: {
            title: true,
            description: true,
        }
	})

    if (!article) {
        return {
            title: 'Article not found',
            description: 'Article not found',
        }
    }

	return {
		title: article.title,
		description: article.description,
	}
}

export async function generateStaticParams() {
    const articles = await db.query.articles.findMany({
		columns: {
			url: true,
		},
	})

	let paths: { params: { url: string } }[] = []

	articles.forEach((article) => {
		paths.push({ params: { url: article.url } })
	})

	return paths
}
