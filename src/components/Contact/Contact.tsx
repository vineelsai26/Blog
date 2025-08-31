'use client'

import Image from 'next/image'
import { useState } from 'react'
import Loader from '../Loader/Loader'
import Link from 'next/link'
import { FcInvite } from 'react-icons/fc'

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
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: 'Contact Form',
				avatar_url: 'https://vineelsai.com/logo-light.png',
				content: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
			}),
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
		<div id='contact' className='m-10'>
			<div>
				<h1 className='m-2 text-center text-5xl font-bold dark:text-white'>
					Contact
				</h1>
				<p className='m-2 mb-10 text-center text-xl dark:text-white'>
					Hear is the way to contact me.
				</p>
			</div>
			<form
				className='m-auto mt-10 flex h-auto w-full flex-col rounded-lg bg-white p-10 shadow-lg md:w-4/5 lg:w-5/6 lg:flex-row dark:bg-gray-800'
				onSubmit={(e) => {
					e.preventDefault()
					handleContact()
				}}
			>
				<div className='flex w-full flex-col lg:w-5/12'>
					<input
						type='text'
						className='my-3 box-border rounded-lg border-2 p-3 dark:bg-gray-600 dark:text-white'
						placeholder='Name'
						onChange={(e) => {
							setName(e.target.value)
						}}
						required
					/>

					<input
						type='email'
						className='my-3 box-border rounded-lg border-2 p-3 dark:bg-gray-600 dark:text-white'
						placeholder='Email'
						onChange={(e) => {
							setEmail(e.target.value)
						}}
						required
					/>

					<textarea
						rows={5}
						className='box-border-2 my-3 rounded-lg border p-3 dark:bg-gray-600 dark:text-white'
						placeholder='Write something..'
						onChange={(e) => {
							setMessage(e.target.value)
						}}
						required
					/>

					{loading && <Loader />}

					{submitStatus && (
						<p className='p-2 text-center text-green-600'>
							{submitStatus}
						</p>
					)}
					{submitError && (
						<p className='p-2 text-center text-red-600'>
							{submitError}
						</p>
					)}

					<div className='flex justify-center'>
						<button className='m-3 w-2/4 rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white lg:w-1/4'>
							Submit
						</button>
					</div>
				</div>
				<p className='w-2/12 self-center p-5 text-center dark:text-white'>
					OR
				</p>
				<div className='w-full lg:w-5/12'>
					<p className='p-3 text-center text-2xl font-extrabold dark:text-white'>
						Social Media
					</p>
					<p className='p-3 text-center text-xl font-extralight dark:text-white'>
						You can also reach out to me through social media.
					</p>

					<div className='flex flex-row justify-evenly'>
						<Link
							href='https://instagram.com/vineelsai26'
							aria-label='instagram'
						>
							<Image
								src='https://icons.vineelsai.com/icons?i=instagram'
								alt={''}
								width={40}
								height={40}
								className='m-2'
							/>
						</Link>
						<Link
							href='https://twitter.com/vineelsai26'
							aria-label='twitter'
						>
							<Image
								src='https://icons.vineelsai.com/icons?i=twitter'
								alt={''}
								width={40}
								height={40}
								className='m-2'
							/>
						</Link>
						<Link
							href='https://linkedin.com/in/vineelsai26'
							aria-label='linkedin'
						>
							<Image
								src='https://icons.vineelsai.com/icons?i=linkedin'
								alt={''}
								width={40}
								height={40}
								className='m-2'
							/>
						</Link>
						<Link
							href='https://github.com/vineelsai26'
							aria-label='github'
						>
							<Image
								src='https://icons.vineelsai.com/icons?i=github'
								alt={''}
								width={40}
								height={40}
								className='m-2'
							/>
						</Link>
					</div>

					<p className='p-5 text-center text-xl font-extrabold dark:text-white'>
						OR
					</p>
					<p className='p-3 text-center text-xl font-extralight dark:text-white'>
						Reach out me through email
					</p>
					<div className='flex flex-row justify-evenly'>
						<Link
							href='mailto:mail@vineelsai.com'
							aria-label='instagram'
						>
							<FcInvite className='m-2' size={40} />
						</Link>
					</div>
				</div>
			</form>
		</div>
	)
}
