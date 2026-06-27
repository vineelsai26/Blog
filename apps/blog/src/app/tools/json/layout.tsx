export const metadata = {
	title: 'JSON Formatter',
	description: 'Beautify JSON',
}

export const revalidate = 3600
// export const runtime = 'edge'

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
