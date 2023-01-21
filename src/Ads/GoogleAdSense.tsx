import Script from 'next/script'

export default function GoogleAdSense() {
	return (
		<Script
			src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1389292252312215"
			crossOrigin="anonymous"
			async
		/>
	)
}
