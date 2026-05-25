import type { Config } from 'tailwindcss'

export default {
	theme: {
		fontFamily: {
			serif: ['var(--font-roboto)', 'sans-serif'],
		},
		fontMetrics: {
			serif: {
				capHeight: 1456,
				ascent: 1900,
				descent: -500,
				lineGap: 0,
				unitsPerEm: 2048,
				xHeight: 1082,
				xWidthAvg: 911,
			},
		},
	},
	plugins: [],
} satisfies Config
