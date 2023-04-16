export const metadata = {
	title: 'Archive of My Portfolios',
	description: 'Archive of Portfolio`s of Vineel Sai',
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}

