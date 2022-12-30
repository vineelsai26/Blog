import Image from "next/image"

interface Navigation {
    name: string
    href: string
    current: boolean
}

const navigation = [
    { name: 'Home', href: '/', current: true },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    return (
        <>
            <div className='bg-gray-800'>
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <Image
                                    className="h-8 w-auto lg:block"
                                    src="/logo.png"
                                    alt="Vineel Sai"
                                    width={50}
                                    height={50}
                                />
                            </div>
                            <div className="sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item: Navigation) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'px-3 py-2 rounded-md text-sm font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                            <div>
                                <input
                                    type="text"
                                    className="px-3 py-2 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Search"
                                />
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}
