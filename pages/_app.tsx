import '../styles/globals.css'
import '../styles/Home.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<NextNProgress />
			<Component {...pageProps} />
		</>
	)
}
