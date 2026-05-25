/** @type {import("prettier").Config} */
export default {
	useTabs: true,
	plugins: [
		'prettier-plugin-astro',
		'prettier-plugin-tailwindcss',
		'@trivago/prettier-plugin-sort-imports',
	],
	bracketSpacing: true,
	printWidth: 80,
	semi: false,
	singleQuote: true,
	trailingComma: 'all',
	overrides: [
		{
			files: '*.json',
			options: {
				trimTrailingWhitespace: false,
			},
		},
	],
	importOrder: [
		'<THIRD_PARTY_MODULES>',
		'^@/(.*)$',
		'^@spon*/(.*)$',
		'^~/(.*)$',
		'^[./]',
	],
	importOrderSeparation: false,
	importOrderSortSpecifiers: true,
}
