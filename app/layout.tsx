"use client"

import { Kalam } from '@next/font/google'
import { useEffect, useState } from 'react'
import GoogleAdSense from '../src/Ads/GoogleAdSense'
import GoogleAnalytics from '../src/Analytics/GoogleAnalytics'
import Footer from '../src/Footer/Footer'
import Navbar from '../src/Navbar/Navbar'
import '../styles/globals.css'

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
	const [analytics, setAnalytics] = useState(false)
	useEffect(() => {
		if (
			localStorage.getItem('analytics') === 'true' ||
			localStorage.getItem('analytics') === null
		) {
			setAnalytics(true)
		} else {
			setAnalytics(false)
		}
	}, [])

	const [faviconHref, setFaviconHref] = useState("/logo-light.png")

	useEffect(() => {
		const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)")

		darkThemeMq.addEventListener("change", e => {
			if (e.matches) {
				setFaviconHref("/logo-light.png")
			} else {
				setFaviconHref("/logo-dark.png")
			}
		})

		if (darkThemeMq.matches) {
			setFaviconHref("/logo-light.png")
		} else {
			setFaviconHref("/logo-dark.png")
		}
	}, [])

	return (
		<html lang='en'>
			<head>
				<link rel="icon" href={faviconHref} type="image/x-icon" />
			</head>
			<body className={`${kalam.className} bg-slate-200 dark:bg-gray-600`}>
				{
					analytics === true ? (
						<>
							<GoogleAnalytics />
							<GoogleAdSense />
						</>
					) : null
				}
				<div className='sticky top-0 z-50 w-full'>
					<Navbar
						showSearch={false}
						setArticles={null}
						setLoading={null}
						analytics={analytics}
						setAnalytics={setAnalytics}
					/>
				</div>
				<div>
					{children}
				</div>
				<Footer />
			</body>
		</html>
	)
}
