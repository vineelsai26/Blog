'use client'

import Image from 'next/image'
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
	const [input, setInput] = useState(() =>
		typeof window !== 'undefined'
			? window.localStorage.getItem(`${window.location.pathname}/input`) || ''
			: ''
	)
	const [output, setOutput] = useState('')
	const [isImage, setIsImage] = useState(false)

	useEffect(() => {
		window.localStorage.setItem(`${window.location.pathname}/input`, input)
	}, [input])

	return (
		<div className='section-shell'>
			<div className='site-container surface-stack'>
				<section className='section-heading'>
					<div
						className='section-eyebrow'
						style={{ fontFamily: 'var(--font-mono)' }}
					>
						Tool
					</div>
					<h1 className='section-title'>Base64</h1>
					<div className='divider-rule' />
					<p className='section-copy'>
						Encode text or decode Base64 strings and image payloads directly in
						the browser.
					</p>
				</section>
				<section className='brutal-card grid gap-6 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8'>
					<div className='surface-stack'>
						<textarea
							rows={5}
							className='brutal-textarea'
							placeholder='Write something...'
							value={input}
							onChange={(e) => {
								setInput(e.target.value)
							}}
						/>
						<div className='brutal-card-soft bg-[var(--surface-strong)] p-4'>
							<p className='text-sm font-bold uppercase tracking-[0.18em] text-[var(--text-secondary)]'>
								Upload source
							</p>
							<input
								type='file'
								placeholder='Upload File'
								className='mt-4 w-full cursor-pointer text-sm font-semibold'
								accept={isImage ? 'image/*' : 'text/*'}
								onChange={(e) => {
									const file = e.target.files
									if (file && file[0]) {
										const reader = new FileReader()
										if (isImage) {
											reader.readAsDataURL(file[0])
											reader.onload = () => {
												const result = reader.result as string
												const base64 = result
													.replace('data:', '')
													.replace(/^.+,/, '')

												setOutput(base64)
											}
										} else {
											reader.readAsText(file[0], 'UTF-8')
											reader.onload = (readerEvent) => {
												if (readerEvent.target) {
													setInput(readerEvent.target.result as string)
												}
											}
										}
									}
								}}
							/>
						</div>
					</div>

					<div className='surface-stack'>
						<label
							htmlFor='isImage'
							className='brutal-card-soft flex items-center gap-3 bg-[var(--surface)] px-4 py-4'
						>
							<input
								type='checkbox'
								className='h-4 w-4'
								id='isImage'
								checked={isImage}
								onChange={(e) => {
									setIsImage(e.target.checked)
								}}
							/>
							<span className='text-sm font-bold uppercase tracking-[0.18em]'>
								Treat payload as image
							</span>
						</label>

						{!isImage && (
							<button
								className='brutal-button'
								onClick={() => {
									setOutput(encode(input))
								}}
							>
								Encode
							</button>
						)}

						<button
							className='brutal-button brutal-button-secondary'
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

						<div className='flex items-start gap-3'>
							{isImage && input.trim().length > 0 ? (
								<div className='brutal-card-soft w-full overflow-auto bg-[var(--surface)] p-3'>
									<Image
										src={`data:image/png;base64, ${output}`}
										alt='base64 decoded image'
										width={1200}
										height={600}
										className='h-auto w-full object-contain'
									/>
								</div>
							) : (
								<>
									<div className='brutal-card-soft w-full overflow-auto bg-[var(--surface)] p-4 text-sm leading-7'>
										{output || 'Encoded/Decoded Text'}
									</div>
									<CopyButton content={output} />
								</>
							)}
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}
