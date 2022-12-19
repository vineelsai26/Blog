import Head from 'next/head'
import Footer from '../src/Footer/Footer'

export default function New() {
    return (
        <div className='container'>
            <Head>
                <title>New Article</title>
                <link rel="icon" href="/logo.png" />
            </Head>

            <main className='main'>
                <div className='grid'>
                    <form action="/api/add" method="POST">
                        <input id="title" name="title" className='textBox' placeholder="Title" required></input>
                        <input id="url" name="url" className='textBox' placeholder="Url" required></input>
                        <input id="imageUrl" name="imageUrl" className='textBox' placeholder="Image  Url" required></input>
                        <textarea id="description" name="description" className='textBox' rows={5} placeholder="Description" required></textarea>
                        <textarea id="content" name="content" className='textBox' rows={20} placeholder="Content" required></textarea>
                        <input id="email" name="email" type="email" className='textBox' placeholder="Email" required></input>
                        <input id="password" name="password" type="password" className='textBox' placeholder="Password" required></input>
                        <button className='submit'>Publish</button>
                    </form>
                </div>
            </main>

            <Footer />
        </div >
    )
}
