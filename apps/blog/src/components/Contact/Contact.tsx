'use client'

import { useState } from 'react'
import Link from 'next/link'
import { FaGithub, FaInstagram, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { HiOutlineArrowUpRight, HiOutlineEnvelope } from 'react-icons/hi2'
import Loader from '../Loader/Loader'

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
		<section id='contact' className='section-shell'>
			<div className='section-heading'>
				<div
					className='section-eyebrow'
					style={{ fontFamily: 'var(--font-mono)' }}
				>
					Reach Out
				</div>
				<h2 className='section-title'>Contact</h2>
				<div className='divider-rule' />
				<p className='section-copy'>
					Use the form for project, collaboration, or writing enquiries. If you
					prefer direct channels, the social links and email route stay
					available below.
				</p>
			</div>
			<form
				className='brutal-card grid gap-0 overflow-hidden lg:grid-cols-[1.25fr_0.75fr]'
				onSubmit={(e) => {
					e.preventDefault()
					handleContact()
				}}
			>
				<div className='surface-stack border-b-[3px] border-[var(--border)] p-8 lg:border-b-0 lg:border-r-[3px]'>
					<div>
						<p
							className='text-xs font-bold uppercase tracking-[0.24em] text-[var(--text-secondary)]'
							style={{ fontFamily: 'var(--font-mono)' }}
						>
							Message
						</p>
						<h3 className='mt-3 text-3xl font-black uppercase tracking-[-0.05em]'>
							Tell me what you&apos;re building
						</h3>
					</div>
					<input
						type='text'
						className='brutal-input'
						placeholder='Name'
						onChange={(e) => {
							setName(e.target.value)
						}}
						required
					/>

					<input
						type='email'
						className='brutal-input'
						placeholder='Email'
						onChange={(e) => {
							setEmail(e.target.value)
						}}
						required
					/>

					<textarea
						rows={7}
						className='brutal-textarea'
						placeholder='Write something..'
						onChange={(e) => {
							setMessage(e.target.value)
						}}
						required
					/>

					{loading && <Loader />}

					{submitStatus && (
						<p className='border-2 border-[var(--border)] bg-lime-200 px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-primary)]'>
							{submitStatus}
						</p>
					)}
					{submitError && (
						<p className='border-2 border-[var(--border)] bg-rose-200 px-4 py-3 text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-primary)]'>
							{submitError}
						</p>
					)}

					<div className='flex flex-col gap-4 sm:flex-row'>
						<button className='brutal-button'>Submit</button>
						<a
							href='mailto:mail@vineelsai.com'
							className='brutal-button brutal-button-secondary'
						>
							<HiOutlineEnvelope className='text-xl' />
							Email directly
						</a>
					</div>
				</div>
				<div className='flex flex-col gap-6 bg-[var(--surface-strong)] p-8'>
					<div>
						<p
							className='text-xs font-bold uppercase tracking-[0.24em] text-[var(--text-secondary)]'
							style={{ fontFamily: 'var(--font-mono)' }}
						>
							Elsewhere
						</p>
						<h3 className='mt-3 text-3xl font-black uppercase tracking-[-0.05em]'>
							Direct channels
						</h3>
					</div>

					<div className='grid gap-3'>
						{[
							{
								label: 'GitHub',
								href: 'https://github.com/vineelsai26',
								icon: FaGithub,
							},
							{
								label: 'LinkedIn',
								href: 'https://linkedin.com/in/vineelsai26',
								icon: FaLinkedinIn,
							},
							{
								label: 'Twitter',
								href: 'https://twitter.com/vineelsai26',
								icon: FaXTwitter,
							},
							{
								label: 'Instagram',
								href: 'https://instagram.com/vineelsai26',
								icon: FaInstagram,
							},
						].map((item) => (
							<Link
								key={item.label}
								href={item.href}
								target='_blank'
								className='brutal-card-soft surface-default flex items-center justify-between gap-4 px-4 py-4 text-sm font-black uppercase tracking-[0.18em]'
							>
								<span className='flex items-center gap-3'>
									<item.icon className='text-lg' />
									{item.label}
								</span>
								<HiOutlineArrowUpRight className='text-lg' />
							</Link>
						))}
					</div>

					<div className='brutal-card-soft surface-default p-5'>
						<p className='text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)]'>
							Email
						</p>
						<a
							href='mailto:mail@vineelsai.com'
							className='mt-3 inline-flex items-center gap-3 text-xl font-black tracking-tight text-[var(--accent)]'
						>
							<HiOutlineEnvelope className='text-2xl' />
							mail@vineelsai.com
						</a>
					</div>
				</div>
			</form>
		</section>
	)
}
