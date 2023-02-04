import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import GoogleAnalytics from '../src/Analytics/GoogleAnalytics'
import GoogleAdSense from '../src/Ads/GoogleAdSense'
import { useEffect, useState } from 'react'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {
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
		<>
			<Head>
				<link rel="icon" href={faviconHref} type="image/x-icon" />
			</Head>
			<NextNProgress />
			{analytics === true ? (
				<>
					<GoogleAnalytics />
					<GoogleAdSense />
				</>
			) : null}
			<Component
				{...pageProps}
				analytics={analytics}
				setAnalytics={setAnalytics}
			/>
		</>
	)
}
