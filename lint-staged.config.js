/** @type {import("lint-staged").Configuration} */
const config = {
	'*.{js,cjs,ts,tsx}': [
		'prettier --write',
		'pnpm exec oxlint --deny-warnings',
		() => 'pnpm typecheck --force',
	],
	'*.css': ['prettier --write', 'pnpm exec stylelint'],
}

export default config
