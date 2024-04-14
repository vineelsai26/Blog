export const metadata = {
	title: 'Base64',
	description: 'Encode and Decode Base64',
}

export const revalidate = 3600

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <>{children}</>
}
