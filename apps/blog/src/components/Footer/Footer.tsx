import Link from 'next/link'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'

export default function Footer() {
	return (
		<footer className='site-footer px-3 md:px-6'>
			<div className='site-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
				<div className='max-w-md'>
					<p className='display-heading text-lg text-[var(--text-primary)]'>
						Vineel Sai
					</p>
					<p className='mt-1 text-sm leading-6'>
						Software, tools, and notes — kept simple.
					</p>
					<p className='mt-3 text-xs tracking-[0.04em]'>
						© {new Date().getFullYear()} Vineel Sai
					</p>
				</div>

				<nav
					aria-label='Footer'
					className='flex flex-wrap items-center gap-x-5 gap-y-3 text-sm'
				>
					{[
						{ label: 'Blog', href: '/blog' },
						{ label: 'Archive', href: '/archive' },
						{ label: 'Tools', href: '/tools' },
						{ label: 'Contact', href: '/#contact' },
						{
							label: 'Resume',
							href: '/resume/resume.pdf',
							external: true,
						},
					].map((item) =>
						item.external ? (
							<a
								key={item.label}
								href={item.href}
								target='_blank'
								rel='noopener noreferrer'
							>
								{item.label}
							</a>
						) : (
							<Link key={item.label} href={item.href}>
								{item.label}
							</Link>
						)
					)}
					<span className='mx-1 hidden h-4 w-px bg-[var(--border)] sm:inline-block' />
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
							className='inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface)] hover:text-[var(--text-primary)]'
						>
							<item.icon className='text-base' />
						</a>
					))}
				</nav>
			</div>
		</footer>
	)
}
