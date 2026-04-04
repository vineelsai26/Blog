'use client'

import { Editor } from '@monaco-editor/react'
import { useEffect, useState } from 'react'
import CopyButton from '../../../components/Markdown/CopyButton'

function capitalizeWords(str: string): string {
	return str
		.toLowerCase()
		.split(' ')
		.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}

const formatString: {
	[key: string]: (str: string) => [str: string, title: string]
} = {
	capitalize: (str: string) => [capitalizeWords(str), 'Capitalized String'],
	lowercase: (str: string) => [str.toLowerCase(), 'Lowercase String'],
	uppercase: (str: string) => [str.toUpperCase(), 'Uppercase String'],
	uppercase_underscroll: (str: string) => [
		str.toUpperCase().replaceAll(' ', '_').replaceAll('-', '_'),
		'Uppercase String (dashes and spaces replaced with underscores)',
	],
	url: (str: string) => [encodeURI(str), 'URL Encoded String'],
	urlComponent: (str: string) => [
		encodeURIComponent(str),
		'URL Component Encoded String',
	],
	escape: (str: string) => [JSON.stringify(str), 'Escaped String'],
	base32: (str: string) => {
		const base32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
		let result = ''
		for (let i = 0; i < str.length; i++) {
			result += base32[str.charCodeAt(i) >> 3]
			result +=
				base32[
					((str.charCodeAt(i) & 0b111) << 2) | (str.charCodeAt(i + 1) >> 6)
				]
			result += base32[(str.charCodeAt(i + 1) & 0b111110) >> 1]
			result +=
				base32[
					((str.charCodeAt(i + 1) & 0b1) << 4) |
						(str.charCodeAt(i + 2) >> 4)
				]
			result +=
				base32[
					((str.charCodeAt(i + 2) & 0b1111) << 1) |
						(str.charCodeAt(i + 3) >> 7)
				]
			result += base32[(str.charCodeAt(i + 3) & 0b1111110) >> 2]
			result +=
				base32[
					((str.charCodeAt(i + 3) & 0b11) << 3) |
						(str.charCodeAt(i + 4) >> 5)
				]
			result += base32[str.charCodeAt(i + 4) & 0b11111]
		}
		return [result, 'Base32 Encoded String']
	},
	base32Decode: (str: string) => {
		const base32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
		let result = ''
		for (let i = 0; i < str.length; i++) {
			result += String.fromCharCode(
				(base32.indexOf(str[i]) << 3) | (base32.indexOf(str[i + 1]) >> 2)
			)
			result += String.fromCharCode(
				((base32.indexOf(str[i + 1]) & 0b11) << 6) |
					(base32.indexOf(str[i + 2]) << 1) |
					(base32.indexOf(str[i + 3]) >> 4)
			)
			result += String.fromCharCode(
				((base32.indexOf(str[i + 3]) & 0b1111) << 4) |
					(base32.indexOf(str[i + 4]) >> 1)
			)
			result += String.fromCharCode(
				((base32.indexOf(str[i + 4]) & 0b1) << 7) |
					(base32.indexOf(str[i + 5]) << 2) |
					(base32.indexOf(str[i + 6]) >> 3)
			)
			result += String.fromCharCode(
				((base32.indexOf(str[i + 6]) & 0b111) << 5) |
					base32.indexOf(str[i + 7])
			)
		}
		return [result, 'Base32 Decoded String']
	},
	base45: (str: string) => {
		const base45 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:'
		let result = ''
		for (let i = 0; i < str.length; i++) {
			result += base45[str.charCodeAt(i) >> 4]
			result += base45[str.charCodeAt(i) & 0b1111]
		}
		return [result, 'Base45 Encoded String']
	},
	base45Decode: (str: string) => {
		const base45 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:'
		let result = ''
		for (let i = 0; i < str.length; i++) {
			result += String.fromCharCode(
				(base45.indexOf(str[i]) << 4) | base45.indexOf(str[i + 1])
			)
		}
		return [result, 'Base45 Decoded String']
	},
	base64: (str: string) => [btoa(str), 'Base64 Encoded String'],
	base64Decode: (str: string) => {
		try {
			return [atob(str), 'Base64 Decoded String']
		} catch {
			return ['Invalid Base64', 'Base64 Decoded String']
		}
	},
	base64Url: (str: string) => [
		btoa(str).replace(/\+/g, '-').replace(/\//g, '_'),
		'Base64 URL Encoded String',
	],
	base64UrlDecode: (str: string) => {
		try {
			return [
				atob(str.replace(/-/g, '+').replace(/_/g, '/')),
				'Base64 URL Decoded String',
			]
		} catch {
			return ['Invalid Base64 URL', 'Base64 URL Decoded String']
		}
	},
	ascii: (str: string) => {
		let result = ''
		for (let i = 0; i < str.length; i++) {
			result += str.charCodeAt(i)
		}
		return [result, 'ASCII Encoded String']
	},
	binary: (str: string) => {
		let result = ''
		for (let i = 0; i < str.length; i++) {
			result += str.charCodeAt(i).toString(2)
		}
		return [result, 'Binary Encoded String']
	},
	hex: (str: string) => {
		let result = ''
		for (let i = 0; i < str.length; i++) {
			result += str.charCodeAt(i).toString(16)
		}
		return [result, 'Hex Encoded String']
	},
	decimal: (str: string) => {
		let result = ''
		for (let i = 0; i < str.length; i++) {
			result += str.charCodeAt(i).toString(10)
		}
		return [result, 'Decimal Encoded String']
	},
	morseCode: (str: string) => {
		const morseCode: { [key: string]: string } = {
			A: '.-',
			B: '-...',
			C: '-.-.',
			D: '-..',
			E: '.',
			F: '..-.',
			G: '--.',
			H: '....',
			I: '..',
			J: '.---',
			K: '-.-',
			L: '.-..',
			M: '--',
			N: '-.',
			O: '---',
			P: '.--.',
			Q: '--.-',
			R: '.-.',
			S: '...',
			T: '-',
			U: '..-',
			V: '...-',
			W: '.--',
			X: '-..-',
			Y: '-.--',
			Z: '--..',
			' ': '/',
			'1': '.----',
			'2': '..---',
			'3': '...--',
			'4': '....-',
			'5': '.....',
			'6': '-....',
			'7': '--...',
			'8': '---..',
			'9': '----.',
			'0': '-----',
			'.': '.-.-.-',
			',': '--..--',
			'?': '..--..',
			"'": '.----.',
			'!': '-.-.--',
			'/': '-..-.',
			'(': '-.--.',
			')': '-.--.-',
			'&': '.-...',
			':': '---...',
			';': '-.-.-.',
			'=': '-...-',
			'+': '.-.-.',
			'-': '-....-',
			_: '..--.-',
			'"': '.-..-.',
			$: '...-..-',
			'@': '.--.-.',
		}
		let result = ''
		for (let i = 0; i < str.length; i++) {
			if (morseCode[str[i].toUpperCase()]) {
				result += morseCode[str[i].toUpperCase()] + ' '
			} else {
				result += str[i]
			}
		}
		return [result, 'Morse Code Encoded String']
	},
}

export default function JsonFormator() {
	const [input, setInput] = useState(() =>
		typeof window !== 'undefined'
			? window.localStorage.getItem(`${window.location.pathname}/input`) || ''
			: ''
	)
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
					<h1 className='section-title'>String Encoder</h1>
					<div className='divider-rule' />
					<p className='section-copy'>
						Transform a string into multiple encoded or reformatted variants at
						once.
					</p>
				</section>

				<section className='surface-stack'>
					<div className='tool-editor h-64'>
						<Editor
							defaultValue=''
							value={input}
							className='h-full w-full'
							theme={darkTheme ? 'vs-dark' : 'light'}
							language='text'
							options={{
								minimap: { enabled: false },
							}}
							onChange={(value) => {
								setInput(value as string)
							}}
						/>
					</div>

					<div className='surface-stack'>
						{Object.entries(formatString).map(([key, value]) => {
							const [result, title] = value(input)
							return (
								<div className='brutal-card flex flex-col gap-4 p-4' key={key}>
									<div className='text-2xl font-black uppercase tracking-[-0.04em]'>
										{title}
									</div>
									<div className='flex flex-row items-start gap-3'>
										<div className='brutal-card-soft w-full overflow-auto bg-[var(--surface)] p-4 text-sm leading-7'>
											{result}
										</div>
										<CopyButton content={result} />
									</div>
								</div>
							)
						})}
					</div>
				</section>
			</div>
		</div>
	)
}
