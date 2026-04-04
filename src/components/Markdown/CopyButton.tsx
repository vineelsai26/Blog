'use client'

import { HiOutlineClipboard, HiClipboardCheck } from 'react-icons/hi'
import { useState } from 'react'

export default function CopyButton({ content }: { content: string }) {
	const [copied, setCopied] = useState(false)
	return (
		<button
			aria-label='copy'
			className='inline-flex items-center justify-center border-2 border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--text-primary)] transition-transform hover:-translate-y-0.5'
			onClick={() => {
				setCopied(true)
				navigator.clipboard.writeText(String(content).replace(/\n$/, ''))
				setTimeout(() => {
					setCopied(false)
				}, 2000)
			}}
		>
			{copied ? (
				<HiClipboardCheck className='h-5 w-5' />
			) : (
				<HiOutlineClipboard className='h-5 w-5' />
			)}
		</button>
	)
}
