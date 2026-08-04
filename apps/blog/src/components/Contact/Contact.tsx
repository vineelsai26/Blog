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
				name,
				email,
				message,
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
				<div className='section-eyebrow'>Reach out</div>
				<h2 className='section-title'>Contact</h2>
				<div className='divider-rule' />
				<p className='section-copy'>
					Project, collaboration, or writing enquiries — use the form, or reach
					me directly through email and socials.
				</p>
			</div>
			<form
				className='brutal-card grid overflow-hidden lg:grid-cols-[1.25fr_0.75fr]'
				onSubmit={(e) => {
					e.preventDefault()
					handleContact()
				}}
			>
				<div className='surface-stack border-b border-[var(--border)] p-7 lg:border-b-0 lg:border-r'>
					<div>
						<p className='meta-label'>Message</p>
						<h3 className='display-heading mt-2 text-2xl md:text-3xl'>
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
						placeholder='Write something…'
						onChange={(e) => {
							setMessage(e.target.value)
						}}
						required
					/>

					{loading && <Loader />}

					{submitStatus && (
						<p className='rounded-[var(--radius-sm)] bg-[var(--accent-muted)] px-4 py-3 text-sm font-medium text-[var(--accent)]'>
							{submitStatus}
						</p>
					)}
					{submitError && (
						<p className='rounded-[var(--radius-sm)] bg-rose-100 px-4 py-3 text-sm font-medium text-rose-800'>
							{submitError}
						</p>
					)}

					<div className='flex flex-col gap-3 sm:flex-row'>
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
				<div className='flex flex-col gap-5 bg-[var(--surface-strong)] p-7'>
					<div>
						<p className='meta-label'>Elsewhere</p>
						<h3 className='display-heading mt-2 text-2xl'>Direct channels</h3>
					</div>

					<div className='grid gap-2'>
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
								className='flex items-center justify-between gap-4 rounded-[var(--radius-sm)] bg-[var(--surface)] px-4 py-3.5 text-sm font-medium transition-colors hover:bg-[var(--bg-primary)]'
							>
								<span className='flex items-center gap-3'>
									<item.icon className='text-lg' />
									{item.label}
								</span>
								<HiOutlineArrowUpRight className='text-base opacity-60' />
							</Link>
						))}
					</div>

					<div className='rounded-[var(--radius)] bg-[var(--surface)] p-5'>
						<p className='meta-label'>Email</p>
						<a
							href='mailto:mail@vineelsai.com'
							className='mt-2 inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-[var(--accent)]'
						>
							<HiOutlineEnvelope className='text-xl' />
							mail@vineelsai.com
						</a>
					</div>
				</div>
			</form>
		</section>
	)
}
