/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			typography: () => ({
				DEFAULT: {
					css: [
						{
							'ul > li.task-list-item::before': {
								content: 'none',
							},
						},
					],
				},
			}),
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
