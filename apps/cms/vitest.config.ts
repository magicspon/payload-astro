import path from 'node:path'
import { defaultExclude, defineConfig } from 'vitest/config'

export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	test: {
		name: 'cms',
		root: path.resolve(__dirname, './src'),
		include: ['**/*.test.ts'],
		exclude: defaultExclude,
	},
})
