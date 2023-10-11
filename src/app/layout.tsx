'use client'

import { Kalam } from 'next/font/google'
import { useCallback, useEffect, useState } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import '../styles/globals.css'
import { HighlightInit } from '@highlight-run/next/client'

const kalam = Kalam({
	weight: '400',
	subsets: ['latin'],
	display: 'swap',
})

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const [faviconHref, setFaviconHref] = useState('/logo-light.png')

	const handleKeyPress = useCallback((event: KeyboardEvent) => {
		if (window.location.pathname.startsWith('/post')) {
			if (event.key === '.') {
				window.location.href = window.location.href.replace(
					'post',
					'edit'
				)
			}
		} else if (window.location.pathname === '/blog') {
			if (event.key === 'n') {
				window.location.href = '/new'
			}
		}
	}, [])

	useEffect(() => {
		const darkThemeMq = window.matchMedia('(prefers-color-scheme: dark)')

		darkThemeMq.addEventListener('change', (e) => {
			if (e.matches) {
				setFaviconHref('/logo-light.png')
			} else {
				setFaviconHref('/logo-dark.png')
			}
		})

		if (darkThemeMq.matches) {
			setFaviconHref('/logo-light.png')
		} else {
			setFaviconHref('/logo-dark.png')
		}

		document.addEventListener('keydown', handleKeyPress)
		return () => {
			document.removeEventListener('keydown', handleKeyPress)
		}
	}, [handleKeyPress])

	return (
		<>
			<HighlightInit
				projectId={'2d1x54gr'}
				tracingOrigins
				networkRecording={{
					enabled: true,
					recordHeadersAndBody: true,
					urlBlocklist: [],
				}}
			/>
			<html lang='en'>
				<head>
					<link rel='icon' href={faviconHref} type='image/x-icon' />
				</head>
				<body
					className={`${kalam.className} relative min-h-screen bg-slate-200 dark:bg-gray-600`}
				>
					<div className='sticky top-0 z-50 w-full'>
						<Navbar />
					</div>
					<div className='pb-14'>{children}</div>
					<div className='absolute bottom-0 h-14 w-full'>
						<Footer />
					</div>
				</body>
			</html>
		</>
	)
}
