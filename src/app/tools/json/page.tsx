'use client'

import { useEffect, useState } from 'react'
import CopyButton from '../../../components/Markdown/CopyButton'
import { Editor } from '@monaco-editor/react'

function format(input: string, tabLength: number) {
	try {
		return JSON.stringify(JSON.parse(input), null, tabLength)
	} catch (err: any) {
		return err.toString()
	}
}

export default function JsonFormator() {
	const [input, setInput] = useState('')
	const [tabLength, setTabLength] = useState(4)
	const [output, setOutput] = useState('{}')
	const [darkTheme, setDarkTheme] = useState(false)

	useEffect(() => {
		setDarkTheme(window.matchMedia('(prefers-color-scheme: dark)').matches)

		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', (e) => {
				if (e.matches) {
					setDarkTheme(true)
				} else {
					setDarkTheme(false)
				}
			})
	}, [])

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

	function handleTabLengthChange(e: React.ChangeEvent<HTMLInputElement>) {
		setTabLength(parseInt(e.target.value))
	}

	return (
		<div className='min-h-screen'>
			<h1 className='m-5 p-2 text-center text-4xl font-semibold dark:text-white'>
				JSON Formatter
			</h1>
			<p className='m-2 text-center text-xl dark:text-white'>
				Beautify JSON
			</p>
			<div
				className='flex w-full flex-wrap items-center justify-center pt-5'
				style={{ margin: 0, width: '100%' }}
			>
				<div className='m-2 flex h-64 w-4/5 flex-col items-center'>
					<Editor
						defaultValue='{}'
						value={input}
						className='h-full w-full rounded-lg border-2 border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
						theme={darkTheme ? 'vs-dark' : 'light'}
						language='json'
						options={{
							minimap: { enabled: false },
						}}
						onChange={(value) => {
							setInput(value as string)
						}}
					/>
				</div>
				<div className='flex w-1/2 flex-col'>
					<div className='flex flex-row justify-center'>
						<label className='m-2 text-xl font-semibold dark:text-white'>
							<input
								type='radio'
								name='spacing'
								value={4}
								checked={tabLength == 4}
								onChange={handleTabLengthChange}
							/>
							<span className='ml-2'>Indent with tabs</span>
						</label>
						<label className='m-2 text-xl font-semibold dark:text-white'>
							<input
								type='radio'
								name='spacing'
								value={2}
								checked={tabLength == 2}
								onChange={handleTabLengthChange}
							/>
							<span className='ml-2'>Indent with Spaces</span>
						</label>
					</div>
					<button
						className='m-2 w-full rounded-lg bg-blue-700 p-2 text-xl font-semibold text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
						onClick={() => {
							setOutput(format(input, tabLength))
						}}
					>
						Format
					</button>
				</div>
				<div className='m-2 flex w-4/5 flex-row'>
					<div className='w-full overflow-auto rounded-lg border-2 border-gray-300 p-2 text-xl dark:border-gray-700 dark:bg-gray-800 dark:text-white'>
						Formatted JSON
					</div>
					<CopyButton content={output} />
				</div>
				<div className='m-2 flex h-64 w-4/5 flex-col items-center'>
					<Editor
						className='h-full w-full rounded-lg border-2 border-gray-300 p-2 dark:border-gray-700 dark:bg-gray-800 dark:text-white'
						value={output}
						theme={darkTheme ? 'vs-dark' : 'light'}
						language='json'
						options={{
							minimap: { enabled: false },
							readOnly: true,
						}}
					/>
				</div>
			</div>
		</div>
	)
}
