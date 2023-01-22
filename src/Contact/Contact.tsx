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
		<div id='contact' className='m-10'>
			<div>
				<h1 className='text-center font-bold text-5xl m-2 dark:text-white'>
					Contact
				</h1>
				<p className='text-center text-xl m-2 mb-10 dark:text-white'>Hear is the way to contact me.</p>
			</div>
			<form className='p-10 h-auto w-full md:w-4/5 lg:w-5/6 m-auto bg-white dark:bg-gray-800 mt-10 rounded-lg shadow-lg flex flex-col lg:flex-row' onSubmit={(e) => {
				e.preventDefault()
				handleContact()
			}}>
				<div className='flex flex-col w-full lg:w-5/12'>
					<input
						type="text"
						className='p-3 my-3 border-2 box-border rounded-lg dark:bg-gray-600'
						placeholder="Name"
						onChange={(e) => {
							setName(e.target.value)
						}}
						required
					/>

					<input
						type="email"
						className='p-3 my-3 border-2 box-border rounded-lg dark:bg-gray-600'
						placeholder="Email"
						onChange={(e) => {
							setEmail(e.target.value)
						}}
						required
					/>

					<textarea
						rows={5}
						className='p-3 border my-3 box-border-2 rounded-lg dark:bg-gray-600'
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
							className='w-2/4 lg:w-1/4 m-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
						>
							Submit
						</button>
					</div>
				</div>
				<p className='text-center p-5 w-2/12 self-center dark:text-white'>OR</p>
				<div className='w-full lg:w-5/12'>
					<p className='text-center text-2xl font-bold p-3 dark:text-white'>Social Media</p>
					<p className='text-center text-xl p-3 dark:text-white'>You can also reach out to me through social media.</p>

					<div className='flex flex-row justify-evenly'>
						<Link href="https://instagram.com/vineelsai26" aria-label='instagram'>
							<Image src="https://skillicons.dev/icons?i=instagram" alt={''} width={40} height={40} className='m-2' />
						</Link>
						<Link href="https://twitter.com/vineelsai26" aria-label='twitter'>
							<Image src="https://skillicons.dev/icons?i=twitter" alt={''} width={40} height={40} className='m-2' />
						</Link>
						<Link href="https://linkedin.com/in/vineelsai26" aria-label='linkedin'>
							<Image src="https://skillicons.dev/icons?i=linkedin" alt={''} width={40} height={40} className='m-2' />
						</Link>
						<Link href="https://github.com/vineelsai26" aria-label='github'>
							<Image src="https://skillicons.dev/icons?i=github" alt={''} width={40} height={40} className='m-2' />
						</Link>
					</div>

					<p className='text-center text-xl p-5 dark:text-white'>OR</p>
					<p className='text-center text-xl p-3 dark:text-white'>Reach out me through email</p>
					<div className='flex flex-row justify-evenly'>
						<Link href="mailto:mail@vineelsai.com" aria-label='instagram'>
							<FcInvite className='m-2' size={40} />
						</Link>
					</div>
				</div>
			</form>
		</div>
	)
}
