export const metadata = {
	title: 'Vineel Sai',
	description: 'Blog by Vineel Sai',
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
