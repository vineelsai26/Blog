'use client'

import { useEffect, useState } from 'react'
import CopyButton from '../../../components/Markdown/CopyButton'

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

export default function Base64() {
	const [input, setInput] = useState('')
	const [output, setOutput] = useState('')

	const [isImage, setIsImage] = useState(false)

	useEffect(() => {
		const cachedInput = window.localStorage.getItem(
			`${window.location.pathname}/input`
		)
		if (cachedInput) {
			setInput(cachedInput)
		}
	}, [])

	useEffect(() => {
		window.localStorage.setItem(`${window.location.pathname}/input`, input)
	}, [input])

	return (
		<>
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
					<div className='m-2 flex w-4/5 flex-col items-center'>
						<textarea
							rows={5}
							className='w-full rounded-lg border-2 border-gray-300 p-2 text-xl dark:border-gray-700 dark:bg-gray-800 dark:text-white'
							placeholder='Write something...'
							value={input}
							onChange={(e) => {
								setInput(e.target.value)
							}}
						/>
						<p className='m-2 dark:text-white'>OR</p>
						<input
							type='file'
							placeholder='Upload File'
							className='m-4 mt-0 cursor-pointer p-2 dark:text-white'
							accept={isImage ? 'image/*' : 'text/*'}
							onChange={(e) => {
								const file = e.target.files
								if (file && file[0]) {
									const reader = new FileReader()
									console.log('is image', isImage)
									if (isImage) {
										reader.readAsDataURL(file[0])
										reader.onload = () => {
											const result =
												reader.result as string
											const base64 = result
												.replace('data:', '')
												.replace(/^.+,/, '')

											setOutput(base64)
										}
									} else {
										reader.readAsText(file[0], 'UTF-8')
										reader.onload = (readerEvent) => {
											if (readerEvent.target) {
												setInput(
													readerEvent.target
														.result as string
												)
											}
										}
									}
								}
							}}
						/>
					</div>
					<div className='flex w-1/2 flex-col'>
						<label
							htmlFor='isImage'
							className='flex w-full justify-center'
						>
							<input
								type='checkbox'
								className='my-2'
								id='isImage'
								checked={isImage}
								onChange={(e) => {
									setIsImage(e.target.checked)
								}}
							/>
							<span className='m-2 dark:text-white'>
								Is Image
							</span>
						</label>

						{!isImage && (
							<button
								className='m-2 w-full rounded-lg bg-blue-700 p-2 text-xl font-semibold text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
								onClick={() => {
									setOutput(encode(input))
								}}
							>
								Encode
							</button>
						)}

						<button
							className='m-2 w-full rounded-lg bg-blue-700 p-2 text-xl font-semibold text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
							onClick={() => {
								if (!isImage) {
									setOutput(decode(input))
								} else {
									setOutput(input)
								}
							}}
						>
							Decode
						</button>
					</div>
					<div className='m-2 flex w-4/5 flex-row'>
						{isImage && input.trim().length > 0 ? (
							<div className='w-full overflow-auto rounded-lg border-2 border-gray-300 p-2 text-xl dark:border-gray-700 dark:bg-gray-800 dark:text-white'>
								<img src={`data:image/png;base64, ${output}`} />
							</div>
						) : (
							<>
								<div className='w-full overflow-auto rounded-lg border-2 border-gray-300 p-2 text-xl dark:border-gray-700 dark:bg-gray-800 dark:text-white'>
									{output || 'Encoded/Decoded Text'}
								</div>
								<CopyButton content={output} />
							</>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
