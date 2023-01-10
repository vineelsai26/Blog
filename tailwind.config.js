/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			typography: (theme) => ({
				DEFAULT: {
					css: [
						{
							"ul > li.task-list-item::before": {
								content: "none"
							}
						}
					]
				}
			})
		}
	},
	plugins: [
		require("@tailwindcss/typography")
	],
}
