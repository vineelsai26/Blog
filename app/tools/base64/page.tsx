"use client"

import { useEffect, useState } from 'react'
import CopyButton from '../../../src/Markdown/CopyButton'

function encode(input: string) {
	return btoa(input)
}

function decode(input: string) {
	try {
		return atob(input)
	} catch (err) {
		return 'Invalid Base64'
	}
}

export default function Blog() {
	const [input, setInput] = useState('')
	const [output, setOutput] = useState('')

	useEffect(() => {
		const cachedInput = window.localStorage.getItem(`${window.location.pathname}/input`)
		if (cachedInput) {
			setInput(cachedInput)
		}
	}, [])

	useEffect(() => {
		window.localStorage.setItem(`${window.location.pathname}/input`, input)
	}, [input])

	return (
		<div className='min-h-screen'>
			<h1 className='m-5 p-2 text-center text-4xl font-semibold dark:text-white'>
				Base64
			</h1>
			<p className='m-2 text-center text-xl dark:text-white'>
				Encode and Decode Base64
			</p>
			<div
				className='flex w-full flex-wrap items-center justify-center pt-5'
				style={{ margin: 0, width: '100%' }}
			>
				<div className='w-4/5 m-2 flex flex-col items-center'>
					<textarea
						rows={5}
						className='w-full p-2 text-xl border-2 border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white'
						placeholder='Write something...'
						value={input}
						onChange={
							(e) => {
								setInput(e.target.value)
							}
						}
					/>
					<p className='m-2 dark:text-white'>OR</p>
					<input
						type='file'
						className='m-4 mt-0 p-2 dark:text-white cursor-pointer'
						onChange={
							(e) => {
								const file = e.target.files
								if (file && file[0]) {
									const reader = new FileReader()
									reader.readAsText(file[0], 'UTF-8')
									reader.onload = (readerEvent) => {
										if (readerEvent.target) {
											setInput(readerEvent.target.result as string)
										}
									}
								}
							}
						} />
				</div>
				<div className='flex flex-col w-1/2'>
					<button
						className='w-full p-2 m-2 text-xl font-semibold text-white bg-blue-700 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
						onClick={() => { setOutput(encode(input)) }}
					>
						Encode
					</button>
					<button
						className='w-full p-2 m-2 text-xl font-semibold text-white bg-blue-700 rounded-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
						onClick={() => { setOutput(decode(input)) }}
					>
						Decode
					</button>
				</div>
				<div className='w-4/5 m-2 flex flex-row'>
					<div
						className='w-full p-2 text-xl overflow-auto border-2 border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white'
					>
						{output || 'Encoded/Decoded Text'}
					</div>
					<CopyButton content={output} />
				</div>
			</div>
		</div>
	)
}
