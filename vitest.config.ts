import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defaultExclude, defineConfig } from 'vitest/config'

const dirname =
	typeof __dirname !== 'undefined'
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	test: {
		projects: [
			'apps/*/vitest.config.ts',
			'packages/*/vitest.config.ts',
			{
				plugins: [
					storybookTest({
						configDir: path.join(dirname, 'apps/web/.storybook'),
					}),
				],
			},
		],
	},
})
