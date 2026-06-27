export const metadata = {
	title: 'String Encoder/Decoder',
	description: 'Encode or decode text to/from different formats',
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
