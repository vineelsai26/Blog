'use client'

import type { ReactNode } from 'react'
import { useCallback, useEffect, useSyncExternalStore } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import { PostHogProvider } from '../components/PostHogProvider'
import '../styles/globals.css'

type ThemeMode = 'light' | 'dark' | 'system'
type ResolvedTheme = Exclude<ThemeMode, 'system'>

const themeModeStorageKey = 'theme-mode'
const themeModeChangeEvent = 'theme-mode-change'

function isThemeMode(value: string | null): value is ThemeMode {
	return value === 'light' || value === 'dark' || value === 'system'
}

function getStoredThemeMode(): ThemeMode {
	if (typeof window === 'undefined') {
		return 'system'
	}

	const storedTheme = window.localStorage.getItem(themeModeStorageKey)
	return isThemeMode(storedTheme) ? storedTheme : 'system'
}

function subscribeToThemeMode(onStoreChange: () => void) {
	window.addEventListener('storage', onStoreChange)
	window.addEventListener(themeModeChangeEvent, onStoreChange)

	return () => {
		window.removeEventListener('storage', onStoreChange)
		window.removeEventListener(themeModeChangeEvent, onStoreChange)
	}
}

function getSystemPrefersDark() {
	return typeof window !== 'undefined' &&
		window.matchMedia('(prefers-color-scheme: dark)').matches
}

function subscribeToSystemTheme(onStoreChange: () => void) {
	const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')
	darkThemeMq.addEventListener('change', onStoreChange)

	return () => {
		darkThemeMq.removeEventListener('change', onStoreChange)
	}
}

export default function RootLayout({
	children,
}: {
	children: ReactNode
}) {
	const themeMode = useSyncExternalStore<ThemeMode>(
		subscribeToThemeMode,
		getStoredThemeMode,
		() => 'system'
	)
	const systemPrefersDark = useSyncExternalStore<boolean>(
		subscribeToSystemTheme,
		getSystemPrefersDark,
		() => false
	)
	const resolvedTheme: ResolvedTheme = themeMode === 'system'
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
		document.addEventListener('keydown', handleKeyPress)
		return () => {
			document.removeEventListener('keydown', handleKeyPress)
		}
	}, [handleKeyPress])

	useEffect(() => {
		document.documentElement.dataset.theme = resolvedTheme
	}, [resolvedTheme])

	const setThemeMode = useCallback((nextThemeMode: ThemeMode) => {
		window.localStorage.setItem(themeModeStorageKey, nextThemeMode)
		window.dispatchEvent(new Event(themeModeChangeEvent))
	}, [])

	const toggleTheme = useCallback(() => {
		if (themeMode === 'dark') {
			setThemeMode('light')
			return
		}

		if (themeMode === 'light') {
			setThemeMode('dark')
			return
		}

		setThemeMode(resolvedTheme === 'dark' ? 'light' : 'dark')
	}, [resolvedTheme, setThemeMode, themeMode])

	return (
		<html lang='en' data-theme={resolvedTheme} suppressHydrationWarning>
			<head>
				<link rel='icon' href={faviconHref} type='image/x-icon' />
			</head>
			<body
				suppressHydrationWarning
				className='site-shell min-h-screen'
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
