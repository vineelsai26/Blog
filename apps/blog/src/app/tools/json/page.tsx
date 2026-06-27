'use client'

import dynamic from 'next/dynamic'
import { useLocalStorageStringState } from '@vstack/ui'
import { useEffect, useState } from 'react'
import CopyButton from '../../../components/Markdown/CopyButton'

const Editor = dynamic(
	() => import('@monaco-editor/react').then((mod) => mod.Editor),
	{ ssr: false }
)

function customJSONParser(input: string, tabLength: number): string {
	let output = ''
	const stack: string[] = []

	input = input.replaceAll('\t', '').replaceAll('\n', '')

	let i = 0

	while (input[i] !== '{' && input[i] !== '[') {
		i++
	}

	input = input.slice(i)

	for (let i = 0; i < input.length; i++) {
		if (input[i] === '{') {
			stack.push('{')
			output += '{'
		} else if (stack.length === 0) {
			break
		} else if (input[i] === '}') {
			if (stack[stack.length - 1] === '{') {
				stack.pop()
			} else {
				throw new Error('Invalid JSON')
			}

			output += '}'
		} else if (input[i] === '[') {
			stack.push('[')
			output += '['
		} else if (input[i] === ']') {
			if (stack[stack.length - 1] === '[') {
				stack.pop()
			} else {
				throw new Error('Invalid JSON')
			}

			output += ']'
		} else if (input[i] === ',') {
			let j = i + 1

			while (input[j] === ' ') {
				j++
			}

			if (input[j] === '}' || input[j] === ']') {
				output += ''
			} else {
				output += ','
			}
		} else if (input[i] === ':') {
			if (input[i + 1] === ' ') {
				output += ':'
			} else {
				output += ': '
			}
		} else if (input[i] === '"') {
			let j = i + 1
			while (input[j] !== '"') {
				if (input[j] === '\\') {
					j++
				}
				j++
			}
			output += input.slice(i, j + 1)
			i = j
		} else if (input[i] === "'") {
			let j = i + 1
			while (input[j] !== "'") {
				if (input[j] === '\\') {
					j++
				}
				j++
			}
			output += '"'
			output += input
				.slice(i + 1, j)
				.replaceAll('"', '\\"')
				.replaceAll("\\'", "'")
			output += '"'
			i = j
		} else if (input[i] === 'T' || input[i] === 'F' || input[i] === 'N') {
			let j = i + 1
			while (
				input[j] !== ' ' &&
				input[j] !== ',' &&
				input[j] !== '}' &&
				input[j] !== ']'
			) {
				j++
			}

			const outputData = input.slice(i, j)
			if (outputData === 'True') {
				output += 'true'
			} else if (outputData === 'False') {
				output += 'false'
			} else if (outputData === 'None') {
				output += 'null'
			}

			i = j - 1
		} else {
			output += input[i]
		}
	}

	return format(output, tabLength)
}

function format(input: string, tabLength: number) {
	try {
		return JSON.stringify(JSON.parse(input), null, tabLength)
	} catch (err: any) {
		try {
			return customJSONParser(input, tabLength)
		} catch (parseErr: any) {
			console.error(parseErr)
		}

		return err.toString()
	}
}

export default function JsonFormator() {
	const [input, setInput] = useLocalStorageStringState(
		typeof window !== 'undefined' ? `${window.location.pathname}/input` : ''
	)
	const [tabLength, setTabLength] = useState(4)
	const [output, setOutput] = useState('{}')
	const [darkTheme, setDarkTheme] = useState(
		() =>
			typeof window !== 'undefined' &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
	)

	useEffect(() => {
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

	function handleTabLengthChange(e: React.ChangeEvent<HTMLInputElement>) {
		setTabLength(parseInt(e.target.value))
	}

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
					<h1 className='section-title'>JSON Formatter</h1>
					<div className='divider-rule' />
					<p className='section-copy'>
						Paste JSON or JSON-like payloads and normalize them into
						readable output.
					</p>
				</section>

				<section className='surface-stack'>
					<div className='tool-editor h-96'>
						<Editor
							defaultValue='{}'
							value={input}
							className='h-full w-full'
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

					<div className='brutal-card flex flex-col gap-5 p-6'>
						<div className='flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between'>
							<p className='text-sm font-bold tracking-[0.18em] text-[var(--text-secondary)] uppercase'>
								Formatting options
							</p>
							<div className='flex flex-col gap-3 sm:flex-row'>
								<label className='brutal-card-soft flex items-center gap-2 bg-[var(--surface)] px-4 py-3 text-sm font-bold tracking-[0.14em] uppercase'>
									<input
										type='radio'
										name='spacing'
										value={4}
										checked={tabLength == 4}
										onChange={handleTabLengthChange}
									/>
									<span>Indent 4</span>
								</label>
								<label className='brutal-card-soft flex items-center gap-2 bg-[var(--surface)] px-4 py-3 text-sm font-bold tracking-[0.14em] uppercase'>
									<input
										type='radio'
										name='spacing'
										value={2}
										checked={tabLength == 2}
										onChange={handleTabLengthChange}
									/>
									<span>Indent 2</span>
								</label>
							</div>
						</div>
						<button
							className='brutal-button'
							onClick={() => {
								setOutput(format(input, tabLength))
							}}
						>
							Format JSON
						</button>
					</div>

					<div className='flex items-start gap-3'>
						<div className='brutal-card-soft w-full overflow-auto bg-[var(--surface)] p-4 text-sm font-bold tracking-[0.18em] text-[var(--text-secondary)] uppercase'>
							Formatted output
						</div>
						<CopyButton content={output} />
					</div>

					<div className='tool-editor h-96'>
						<Editor
							className='h-full w-full'
							value={output}
							theme={darkTheme ? 'vs-dark' : 'light'}
							language='json'
							options={{
								minimap: { enabled: false },
								readOnly: true,
							}}
						/>
					</div>
				</section>
			</div>
		</div>
	)
}
