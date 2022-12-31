import Image from "next/image"

export default function Footer() {
    return (
        <footer className='flex bg-white w-full h-24 border-t justify-center overflow-hidden items-center'>
            Created By
            <Image src="/logo.png" alt="Logo" className='logo' width={50} height={50} />
        </footer>
    )
}