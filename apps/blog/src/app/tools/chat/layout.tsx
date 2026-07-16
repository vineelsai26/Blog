import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import { authOptions, isAdmin } from '../../../lib/auth'

export default async function ChatLayout({
	children,
}: {
	children: ReactNode
}) {
	const session = await getServerSession(authOptions)
	if (!isAdmin(session)) {
		redirect('/api/auth/signin')
	}
	// Fullscreen: remove width constraint wrapper so child page can occupy entire viewport
	return <>{children}</>
}
