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
		<header className='fixed left-0 right-0 top-0 z-50 px-3 pt-4 md:px-6'>
			<div className='site-container'>
				<div className='site-nav-shell'>
					<Link href='/' className='flex items-center gap-3'>
						<span className='inline-flex h-10 w-10 items-center justify-center rounded-[12px] bg-[var(--text-primary)] text-sm font-semibold tracking-tight text-[var(--accent-contrast)]'>
							VS
						</span>
						<div className='hidden sm:block'>
							<p className='display-heading text-[1.05rem] text-[var(--text-primary)]'>
								Vineel Sai
							</p>
							<p className='meta-label mt-0.5'>Software developer</p>
						</div>
					</Link>

					<nav className='hidden flex-1 items-center justify-center gap-6 lg:flex'>
						{navigation.map((item) => {
							const isActive =
								item.href === '/'
									? pathname === '/'
									: !item.href.includes('#') && pathname === item.href

							return (
								<Link
									key={item.name}
									href={item.href}
									className={cx('nav-link', isActive && 'nav-link-active')}
								>
									{item.name}
								</Link>
							)
						})}
					</nav>

					<div className='ml-auto hidden items-center gap-2 md:flex'>
						<ThemeToggleButton
							onToggle={onToggleTheme}
							isDark={theme === 'dark'}
							darkIcon={<HiSun className='text-lg' />}
							lightIcon={<HiMoon className='text-lg' />}
							className='inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
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
								className='inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]'
							>
								<item.icon className='text-base' />
							</a>
						))}
						<a
							href='/resume/resume.pdf'
							target='_blank'
							rel='noopener noreferrer'
							className='brutal-button px-4 py-2.5 text-sm'
						>
							Resume
							<HiOutlineArrowUpRight />
						</a>
					</div>

					<button
						type='button'
						aria-label='Toggle navigation'
						onClick={() => setIsMenuOpen((value) => !value)}
						className='ml-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--text-primary)] lg:hidden'
					>
						{isMenuOpen ? (
							<HiXMark className='text-xl' />
						) : (
							<HiBars3BottomRight className='text-xl' />
						)}
					</button>
				</div>

				{isMenuOpen && (
					<div className='mt-3 grid gap-2 rounded-[var(--radius)] bg-[var(--surface)] p-3 shadow-[var(--shadow)] lg:hidden'>
						{navigation.map((item) => (
							<Link
								key={item.name}
								href={item.href}
								onClick={() => setIsMenuOpen(false)}
								className='rounded-[var(--radius-sm)] px-3 py-3 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
							>
								{item.name}
							</Link>
						))}
						<button
							type='button'
							onClick={onToggleTheme}
							className='rounded-[var(--radius-sm)] px-3 py-3 text-left text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
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
