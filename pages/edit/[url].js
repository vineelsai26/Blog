import Head from 'next/head'
import mongoose from 'mongoose'
import styles from '../../styles/Home.module.css'
import Article from '../../models/article'

export default function EditPost({ article }) {

    return (
        <div className={styles.container}>
            <Head>
                <title>Edit Article</title>
                <link rel="icon" href="/logo.png" />
            </Head>

            <nav className={styles.navbar}>
                <a href="/">
                    <img src={"/logo.png"}></img>
                </a>
            </nav>

            <main className={styles.main}>
                <div className={styles.grid}>
                    <form action="/api/edit" method="POST">
                        <input id="title" name="title" className={styles.textBox} defaultValue={article.title} required></input>
                        <input id="url" name="url" className={styles.textBox} defaultValue={article.url} readOnly></input>
                        <input id="imageUrl" name="imageUrl" className={styles.textBox} defaultValue={article.imageUrl} required></input>
                        <textarea id="description" name="description" className={styles.textBox} rows={5} defaultValue={article.description} required></textarea>
                        <textarea id="content" name="content" className={styles.textBox} rows={20} defaultValue={article.longDescription} required></textarea>
                        <input id="email" name="email" type="email" className={styles.textBox} placeholder="Email" required></input>
                        <input id="password" name="password" type="password" className={styles.textBox} placeholder="Password" required></input>
                        <button className={styles.submit}>Edit</button>
                        <button name="delete" value="true" className={styles.submit}>Delete</button>
                    </form>
                </div>
            </main>

            <footer className={styles.footer}>
                Created By
                <img src="/logo.png" alt="Logo" className={styles.logo} />
            </footer>
        </div >
    )
}

export async function getServerSideProps(context) {
    try {
        mongoose.connect(process.env.mongodb)
    } catch (error) {
        console.log(error)
    }

    const article = await Article.findOne({ url: context.query.url })
    return {
        props: {
            article: JSON.parse(JSON.stringify(article))
        }
    }
}
