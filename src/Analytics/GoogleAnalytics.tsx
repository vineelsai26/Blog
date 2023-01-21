import Script from 'next/script'

export default function GoogleAnalytics() {
	return (
		<>
			<Script async src="https://www.googletagmanager.com/gtag/js?id=G-BG3V6WRM1Z" />
			<Script
				id="google-analytics"
				strategy='afterInteractive'
				dangerouslySetInnerHTML={{
					__html: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-BG3V6WRM1Z', {
							page_path: window.location.pathname,
						});
					`
				}}
			/>
		</>
	)
}
