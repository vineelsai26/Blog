import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import GoogleAnalytics from '../src/Analytics/GoogleAnalytics'
import GoogleAdSense from '../src/Ads/GoogleAdSense'
import { useEffect, useState } from 'react'

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
	return (
		<>
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
