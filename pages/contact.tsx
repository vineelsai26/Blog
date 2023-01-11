import Head from 'next/head'
import Footer from '../src/Footer/Footer'
import Navbar from '../src/Navbar/Navbar'
import Image from 'next/image'
import { useState } from 'react'
import Loader from '../src/Loader/Loader'

export default function Contact() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [message, setMessage] = useState('')

	const [submitStatus, setSubmitStatus] = useState('')
	const [submitError, setSubmitError] = useState('')

	const [loading, setLoading] = useState(false)

	const handleContact = async () => {
		setLoading(true)
		const response = await fetch('/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username: 'Contact Form',
				avatar_url: 'https://vineelsai.com/logo.png',
				content: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
			})
		})

		const data = await response.json()

		if (response.ok) {
			setSubmitStatus(data.message)
			setSubmitError('')
		} else {
			setSubmitError(data.error)
			setSubmitStatus('')
		}
		setLoading(false)
	}

	return (
		<div className='bg-slate-200 h-screen'>
			<Head>
				<title>Vineel Sai | Blog</title>
				<meta name="description" content="Blog by Vineel Sai"></meta>
				<link rel="icon" href="/logo.png" />
			</Head>

			<Navbar showSearch={false} setArticles={null} setLoading={null} />

			<div>
				<form className='p-5 h-auto w-full md:w-3/5 lg:w-1/3 m-auto bg-white mt-10 rounded-lg shadow-lg' onSubmit={(e) => {
					e.preventDefault()
					handleContact()
				}}>
					<div>
						<h1 className='text-center font-bold text-5xl m-2'>
							Contact
						</h1>
						<p className='text-center text-xl m-2 mb-10'>Hear is the way to contact me.</p>
					</div>
					<div className='flex flex-col '>
						<input
							type="text"
							className='p-3 m-3 border-2 box-border rounded-lg'
							placeholder="Name"
							onChange={(e) => {
								setName(e.target.value)
							}}
							required
						/>

						<input
							type="email"
							className='p-3 m-3 border-2 box-border rounded-lg'
							placeholder="Email"
							onChange={(e) => {
								setEmail(e.target.value)
							}}
							required
						/>

						<textarea
							rows={5}
							className='p-3 border m-3 box-border-2 rounded-lg'
							placeholder="Write something.."
							onChange={(e) => {
								setMessage(e.target.value)
							}}
							required
						/>

						{
							loading && (
								<Loader />
							)
						}

						{submitStatus && <p className='text-green-600 text-center p-2'>{submitStatus}</p>}
						{submitError && <p className='text-red-600 text-center p-2'>{submitError}</p>}

						<div className='flex justify-center'>
							<button
								className='w-1/4 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
							>
								Submit
							</button>
						</div>
					</div>
					<p className='text-center p-5'>OR</p>
					<div className='flex justify-center'>
						<a href="https://instagram.com/vineelsai26">
							<Image src="https://skillicons.dev/icons?i=instagram" alt={''} width={40} height={40} className='m-2' />
						</a>
						<a href="https://twitter.com/vineelsai26">
							<Image src="https://skillicons.dev/icons?i=twitter" alt={''} width={40} height={40} className='m-2' />
						</a>
						<a href="https://linkedin.com/in/vineelsai26">
							<Image src="https://skillicons.dev/icons?i=linkedin" alt={''} width={40} height={40} className='m-2' />
						</a>
						<a href="https://github.com/vineelsai26">
							<Image src="https://skillicons.dev/icons?i=github" alt={''} width={40} height={40} className='m-2' />
						</a>
					</div>
				</form>
			</div>

			<div className='bottom-0 fixed w-full'>
				<Footer />
			</div>
		</div >
	)
}
