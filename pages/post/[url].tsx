import Head from 'next/head'
import mongoose from 'mongoose'
import Article from '../../models/article'
import { ArticleType } from '../../types/article'
import Footer from '../../src/Footer/Footer'
import ArticlePreview from '../../src/ArticlePreview/ArticlePreview'
import Navbar from '../../src/Navbar/Navbar'

export default function Post({ article }: { article: ArticleType }) {
    return (
        <div>
            <Head>
                <title>{article.title}</title>
                <link rel="icon" href="/logo.png" />
            </Head>

            <Navbar />

            <ArticlePreview article={article} />

            <Footer />
        </div>
    )
}

export async function getServerSideProps(context: { query: { url: string } }) {
    try {
        mongoose.connect(process.env.NEXT_MONGODB_URL!)
    } catch (error) {
        console.log(error)
    }

    const article = await Article.findOne({ url: context.query.url })
    return {
        props: {
            article: JSON.parse(JSON.stringify(article)) as ArticleType
        }
    }
}
