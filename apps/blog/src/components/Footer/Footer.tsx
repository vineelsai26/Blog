import Link from 'next/link'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import { HiOutlineArrowUpRight } from 'react-icons/hi2'

export default function Footer() {
	return (
		<footer className='border-t-[5px] border-[var(--border)] bg-[var(--accent)] px-3 py-10 text-[var(--accent-contrast)] md:px-6'>
			<div className='site-container flex flex-col gap-8 md:flex-row md:items-end md:justify-between'>
				<div className='max-w-xl'>
					<p
						className='mb-2 text-sm font-bold uppercase tracking-[0.24em] opacity-85'
						style={{ fontFamily: 'var(--font-mono)' }}
					>
						I make computers do useful things.
					</p>
					<h2 className='text-4xl font-black uppercase tracking-[-0.08em] md:text-5xl'>
						Vineel Sai
					</h2>
					<p className='mt-3 text-sm font-medium uppercase tracking-[0.16em] opacity-85'>
						© {new Date().getFullYear()} {'//'} All rights reserved
					</p>
				</div>

				<div className='grid gap-6 md:text-right'>
					<div className='flex flex-wrap gap-3 md:justify-end'>
						{[
							{ label: 'Blog', href: '/blog' },
							{ label: 'Archive', href: '/archive' },
							{ label: 'Tools', href: '/tools' },
							{ label: 'Contact', href: '/#contact' },
						].map((item) => (
							<Link
								key={item.label}
								href={item.href}
								className='brutal-card-soft surface-default px-4 py-2 text-sm font-black uppercase tracking-[0.18em]'
							>
								{item.label}
							</Link>
						))}
						<a
							href='/resume/resume.pdf'
							target='_blank'
							rel='noopener noreferrer'
							className='brutal-card-soft inverse-surface inline-flex items-center gap-2 px-4 py-2 text-sm font-black uppercase tracking-[0.18em]'
						>
							Resume
							<HiOutlineArrowUpRight />
						</a>
					</div>

					<div className='flex gap-3 md:justify-end'>
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
						].map((item) => (
							<a
								key={item.label}
								href={item.href}
								target='_blank'
								rel='noopener noreferrer'
								aria-label={item.label}
								className='surface-default inline-flex h-12 w-12 items-center justify-center border-2 border-[var(--surface)] transition-transform hover:-translate-y-1'
							>
								<item.icon className='text-lg' />
							</a>
						))}
					</div>
				</div>
			</div>
		</footer>
	)
}
