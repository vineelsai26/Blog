import React from 'react'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

export default async function ChatLayout({
	children,
}: {
	children: ReactNode
}) {
	const session = await getServerSession()
	if (!session || session.user?.email !== 'mail@vineelsai.com') {
		redirect('/api/auth/signin')
	}
	// Fullscreen: remove width constraint wrapper so child page can occupy entire viewport
	return <>{children}</>
}
