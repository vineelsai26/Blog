import Head from 'next/head'
import mongoose from 'mongoose'
import styles from '../../styles/Home.module.css'
import Article from '../../models/article'
import { ArticleType } from '../../types/article'
import showdown from 'showdown'

export default function Post({ article }: { article: ArticleType }) {
    const converter = new showdown.Converter({ tables: true, tasklists: true, tablesHeaderId: true, strikethrough: true, simplifiedAutoLink: true, ghCompatibleHeaderId: true, emoji: true }),
        text = article.longDescription,
        html = converter.makeHtml(text)

    return (
        <div className={styles.container}>
            <Head>
                <title>{article.title}</title>
                <link rel="icon" href="/logo.png" />
            </Head>

            <h1 className={styles.title}>{article.title}</h1>
            <main className={styles.main}>
                <div dangerouslySetInnerHTML={{
                    __html: html
                }} className={styles.description}></div>
            </main>

            <footer className={styles.footer}>
                Created By
                <img src="/logo.png" alt="Logo" className={styles.logo} />
            </footer>
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
