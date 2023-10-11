'use client'

import { useState } from 'react'

export default function Contact() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async () => {
        document.cookie = `email=${email};max-age=31536000;samesite=strict;secure;`
        document.cookie = `password=${password};max-age=31536000;samesite=strict;secure;`
    }

    return (
        <div id='contact' className='m-10'>
            <div>
                <h1 className='m-2 text-center text-5xl font-bold dark:text-white'>
                    Contact
                </h1>
                <p className='m-2 mb-10 text-center text-xl dark:text-white'>
                    Hear is the way to contact me.
                </p>
            </div>
            <form
                className='m-auto mt-10  flex h-auto w-full flex-col rounded-lg bg-white p-10 shadow-lg dark:bg-gray-800 md:w-4/5 lg:w-5/6 lg:flex-row'
                onSubmit={(e) => {
                    e.preventDefault()
                    handleLogin()
                }}
            >
                <div className='flex w-full flex-col lg:w-5/12'>
                    <input
                        type='email'
                        className='my-3 box-border rounded-lg border-2 p-3 dark:bg-gray-600 dark:text-white'
                        placeholder='Email'
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        required
                    />

                    <input
                        type='password'
                        className='my-3 box-border rounded-lg border-2 p-3 dark:bg-gray-600 dark:text-white'
                        placeholder='Password'
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        required
                    />

                    <div className='flex justify-center'>
                        <button className='m-3 w-2/4 rounded border border-blue-500 bg-transparent px-4 py-2 font-semibold text-blue-700 hover:border-transparent hover:bg-blue-500 hover:text-white lg:w-1/4'>
                            Login
                        </button>
                    </div>
                </div>

            </form>
        </div>
    )
}
