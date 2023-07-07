"use client"

import Typewriter from 'typewriter-effect'

export default function TypeWriter() {
    return (
        <span className='my-1 text-center text-xl text-white'>
            <Typewriter
                options={{
                    strings: [
                        'Software Engineer',
                        'Full Stack Web Developer',
                        'Open Source Contributor',
                        'Blogger',
                        'Linux Enthusiast',
                    ],
                    autoStart: true,
                    loop: true,
                }}
            />
        </span>
    )
}