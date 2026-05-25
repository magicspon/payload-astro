import type { StorybookConfig } from '@storybook/react-vite'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
	stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
	addons: [
		'@chromatic-com/storybook',
		'@storybook/addon-vitest',
		'@storybook/addon-a11y',
		'@storybook/addon-docs',
		'@storybook/addon-onboarding',
	],
	framework: '@storybook/react-vite',
	staticDirs: ['../public', '../static'],
	viteFinal: async (config) => {
		config.resolve = config.resolve || {}
		config.resolve.alias = {
			...config.resolve.alias,
			'~': resolve(__dirname, '../src'),
		}
		return config
	},
}

export default config
