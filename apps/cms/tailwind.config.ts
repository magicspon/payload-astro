import preset from '@spon/tailwind-config'

export default {
	presets: [preset],
	darkMode: ['selector', '[data-theme="dark"]', '.dark'],
}
