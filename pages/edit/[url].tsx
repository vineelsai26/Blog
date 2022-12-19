import Head from 'next/head'
import mongoose from 'mongoose'
import Article from '../../models/article'
import { ArticleType } from '../../types/article'
import Footer from '../../src/Footer/Footer'

export default function EditPost({ article }: { article: ArticleType }) {

    return (
        <div className='container'>
            <Head>
                <title>Edit Article</title>
                <link rel="icon" href="/logo.png" />
            </Head>

            <main className='main'>
                <div className='grid'>
                    <form action="/api/edit" method="POST">
                        <input id="title" name="title" className='textBox' defaultValue={article.title} required></input>
                        <input id="url" name="url" className='textBox' defaultValue={article.url} readOnly></input>
                        <input id="imageUrl" name="imageUrl" className='textBox' defaultValue={article.imageUrl} required></input>
                        <textarea id="description" name="description" className='textBox' rows={5} defaultValue={article.description} required></textarea>
                        <textarea id="content" name="content" className='textBox' rows={20} defaultValue={article.longDescription} required></textarea>
                        <input id="email" name="email" type="email" className='textBox' placeholder="Email" required></input>
                        <input id="password" name="password" type="password" className='textBox' placeholder="Password" required></input>
                        <button className='submit'>Edit</button>
                        <button name="delete" value="true" className='submit'>Delete</button>
                    </form>
                </div>
            </main>

            <Footer />
        </div >
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
            article: JSON.parse(JSON.stringify(article))
        }
    }
}
