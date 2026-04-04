'use client'

import { Bricolage_Grotesque, IBM_Plex_Mono } from 'next/font/google'
import type { CSSProperties, ReactNode } from 'react'
import { useCallback, useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { PostHogProvider } from '../components/PostHogProvider'
import '../styles/globals.css'

const bricolage = Bricolage_Grotesque({
	subsets: ['latin'],
	display: 'swap',
})

const ibmPlexMono = IBM_Plex_Mono({
	weight: ['400', '700'],
	subsets: ['latin'],
	display: 'swap',
})

type ThemeMode = 'light' | 'dark' | 'system'

export default function RootLayout({
	children,
}: {
	children: ReactNode
}) {
	const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
		if (typeof window === 'undefined') {
			return 'system'
		}

		const storedTheme = window.localStorage.getItem('theme-mode')
		return storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system'
			? storedTheme
			: 'system'
	})
	const [systemPrefersDark, setSystemPrefersDark] = useState(() =>
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
	)
	const resolvedTheme = themeMode === 'system'
		? systemPrefersDark
			? 'dark'
			: 'light'
		: themeMode
	const faviconHref = resolvedTheme === 'dark' ? '/logo-light.png' : '/logo-dark.png'

	const handleKeyPress = useCallback((event: KeyboardEvent) => {
		if (window.location.pathname.startsWith('/post')) {
			if (event.key === '.') {
				window.location.href = window.location.href.replace('post', 'edit')
			}
		} else if (window.location.pathname === '/blog') {
			if (event.key === 'n') {
				window.location.href = '/new'
			}
		}
	}, [])

	useEffect(() => {
		const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
		const handleThemeChange = (event: MediaQueryListEvent) => {
			setSystemPrefersDark(event.matches)
		}

		darkThemeMq.addEventListener('change', handleThemeChange)

		document.addEventListener('keydown', handleKeyPress)
		return () => {
			darkThemeMq.removeEventListener('change', handleThemeChange)
			document.removeEventListener('keydown', handleKeyPress)
		}
	}, [handleKeyPress])

	useEffect(() => {
		document.documentElement.dataset.theme = resolvedTheme
		window.localStorage.setItem('theme-mode', themeMode)
	}, [resolvedTheme, themeMode])

	const toggleTheme = useCallback(() => {
		setThemeMode((current) => {
			if (current === 'dark') {
				return 'light'
			}

			if (current === 'light') {
				return 'dark'
			}

			return resolvedTheme === 'dark' ? 'light' : 'dark'
		})
	}, [resolvedTheme])

	return (
		<html lang='en' data-theme={resolvedTheme} suppressHydrationWarning>
			<head>
				<link rel='icon' href={faviconHref} type='image/x-icon' />
			</head>
			<body
				suppressHydrationWarning
				className={`${bricolage.className} site-shell min-h-screen`}
				style={
					{
						['--font-mono' as string]: ibmPlexMono.style.fontFamily,
					} as CSSProperties
				}
			>
				<PostHogProvider>
					<Navbar theme={resolvedTheme} onToggleTheme={toggleTheme} />
					<div className='flex min-h-screen flex-col pt-24'>
						<main className='flex-1'>{children}</main>
						<Footer />
					</div>
				</PostHogProvider>
			</body>
		</html>
	)
}
