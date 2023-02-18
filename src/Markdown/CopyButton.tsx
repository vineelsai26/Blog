import { HiOutlineClipboard, HiClipboardCheck } from 'react-icons/hi'
import { useState } from 'react'

export default function CopyButton({ content }: { content: string }) {
    const [copied, setCopied] = useState(false)
    return (
        <button onClick={() => {
            setCopied(true)
            navigator.clipboard.writeText(String(content).replace(/\n$/, ''))
            setTimeout(() => {
                setCopied(false)
            }, 2000)
        }}>
            {
                copied ? <HiClipboardCheck className='w-6 h-6 m-2' /> : <HiOutlineClipboard className='w-6 h-6 m-2' />
            }
        </button>
    )
}