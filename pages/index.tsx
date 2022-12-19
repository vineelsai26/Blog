import Head from 'next/head'
import styles from '../styles/Home.module.css'
import mongoose from 'mongoose'
import Articles from '../models/article'
import { ArticleType } from '../types/article'
import Link from 'next/link'

export default function Home({ articles }: { articles: ArticleType[] }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vineel Sai | Blog</title>
        <meta name="description" content="Blog by Vineel Sai"></meta>
        <link rel="icon" href="/logo.png" />
      </Head>

      <main className={styles.main}>
        {
          articles.map(article => (
            <Link href={"post/" + article.url} className={styles.card} key={article.url}>
              <img src={article.imageUrl} className={styles.image} alt="image"></img>
              <h3>{article.title}</h3>
              <p>{article.description.substring(0, 100)}</p>
            </Link>
          ))
        }
      </main>

      <footer className={styles.footer}>
        Created By
        <img src="/logo.png" alt="Logo" className={styles.logo} />
      </footer>
    </div >
  )
}

export async function getServerSideProps() {
  try {
    mongoose.connect(process.env.NEXT_MONGODB_URL!)
    console.log("connected")
  } catch (error) {
    console.log(error)
  }
  const articles = await Articles.find()
  return {
    props: {
      articles: JSON.parse(JSON.stringify(articles)) as ArticleType[]
    }
  }
}
