'use client'

import { CopyButton as SharedCopyButton } from '@vstack/ui'
import { HiOutlineClipboard, HiClipboardCheck } from 'react-icons/hi'

export default function CopyButton({ content }: { content: string }) {
	return (
		<SharedCopyButton
			content={content}
			copiedIcon={<HiClipboardCheck className='h-5 w-5' />}
			copiedLabel='copied'
			className='inline-flex items-center justify-center border-2 border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--text-primary)] transition-transform hover:-translate-y-0.5'
			copyIcon={<HiOutlineClipboard className='h-5 w-5' />}
			copyLabel='copy'
		/>
	)
}
