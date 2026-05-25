import { defaultExclude, defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		environment: 'jsdom',
		setupFiles: './vitest.setup.ts',
		include: ['**/*.test.ts'],
		exclude: defaultExclude,
	},
})
