'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ThemeToggleButton, cx } from '@vstack/ui'
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6'
import {
	HiBars3BottomRight,
	HiMoon,
	HiOutlineArrowUpRight,
	HiSun,
	HiXMark,
} from 'react-icons/hi2'

const navigation = [
	{ name: 'Home', href: '/' },
	{ name: 'Projects', href: '/#projects' },
	{ name: 'Blog', href: '/blog' },
	{ name: 'Archive', href: '/archive' },
	{ name: 'Tools', href: '/tools' },
	{ name: 'Contact', href: '/#contact' },
]

export default function Navbar({
	theme,
	onToggleTheme,
}: {
	theme: 'light' | 'dark'
	onToggleTheme: () => void
}) {
	const pathname = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	return (
		<header className='fixed left-0 right-0 top-0 z-50 px-3 py-3 md:px-6'>
			<div className='site-container brutal-card-soft bg-[var(--surface)] px-4 py-3'>
				<div className='flex items-center gap-4'>
					<Link href='/' className='flex items-center gap-3'>
						<span className='inverse-surface inline-flex h-12 w-12 items-center justify-center border-2 border-[var(--border)] text-xl font-black uppercase tracking-tight'>
							VS
						</span>
						<div className='hidden sm:block'>
							<p className='text-lg font-black uppercase tracking-[-0.08em]'>
								Vineel Sai
							</p>
							<p
								className='text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[var(--text-secondary)]'
								style={{ fontFamily: 'var(--font-mono)' }}
							>
								Software Developer
							</p>
						</div>
					</Link>

					<nav className='hidden flex-1 items-center justify-center gap-7 lg:flex'>
						{navigation.map((item) => {
							const isActive =
								item.href === '/'
									? pathname === '/'
									: pathname === item.href ||
									  (item.href.startsWith('/#') && pathname === '/')

							return (
								<Link
									key={item.name}
									href={item.href}
									className={cx(
										'nav-link',
										isActive && 'nav-link-active'
									)}
								>
									{item.name}
								</Link>
							)
						})}
					</nav>

					<div className='ml-auto hidden items-center gap-3 md:flex'>
						<ThemeToggleButton
							onToggle={onToggleTheme}
							isDark={theme === 'dark'}
							darkIcon={<HiSun className='text-lg' />}
							lightIcon={<HiMoon className='text-lg' />}
							className='inline-flex h-10 w-10 items-center justify-center border-2 border-[var(--border)] bg-[var(--surface)] transition-transform hover:-translate-y-1'
						/>
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
								className='inline-flex h-10 w-10 items-center justify-center border-2 border-[var(--border)] bg-[var(--surface)] transition-transform hover:-translate-y-1'
							>
								<item.icon className='text-lg' />
							</a>
						))}
						<a
							href='/resume/resume.pdf'
							target='_blank'
							rel='noopener noreferrer'
							className='brutal-button px-4 py-3 text-sm'
						>
							Resume
							<HiOutlineArrowUpRight />
						</a>
					</div>

					<button
						type='button'
						aria-label='Toggle navigation'
						onClick={() => setIsMenuOpen((value) => !value)}
						className='inline-flex h-11 w-11 items-center justify-center border-2 border-[var(--border)] bg-[var(--surface)] lg:hidden'
					>
						{isMenuOpen ? (
							<HiXMark className='text-2xl' />
						) : (
							<HiBars3BottomRight className='text-2xl' />
						)}
					</button>
				</div>

				{isMenuOpen && (
					<div className='mt-4 grid gap-3 border-t-2 border-[var(--border)] pt-4 lg:hidden'>
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								onClick={() => setIsMenuOpen(false)}
								className='brutal-card-soft bg-[var(--surface)] px-4 py-3 text-sm font-bold uppercase tracking-[0.18em]'
							>
								{item.name}
							</Link>
						))}
						<button
							type='button'
							onClick={onToggleTheme}
							className='brutal-card-soft bg-[var(--surface)] px-4 py-3 text-sm font-bold uppercase tracking-[0.18em]'
						>
							{theme === 'dark' ? 'Light mode' : 'Dark mode'}
						</button>
						<a
							href='/resume/resume.pdf'
							target='_blank'
							rel='noopener noreferrer'
							className='brutal-button text-sm'
						>
							Resume
							<HiOutlineArrowUpRight />
						</a>
					</div>
				)}
			</div>
		</header>
	)
}
