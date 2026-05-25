import node from '@astrojs/node'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, envField, fontProviders } from 'astro/config'

export default defineConfig({
	output: 'server',
	site: process.env.CMS_URL,
	env: {
		schema: {
			PAYLOAD_BEARER_TOKEN: envField.string({
				context: 'server',
				access: 'secret',
			}),
			CMS_URL: envField.string({ context: 'server', access: 'secret' }),
			PREVIEW_SECRET: envField.string({ context: 'server', access: 'secret' }),
			PLAUSIBLE_DOMAIN: envField.string({
				context: 'server',
				access: 'secret',
			}),
			PLAUSIBLE_SCRIPT: envField.string({
				context: 'server',
				access: 'secret',
			}),
		},
	},
	adapter: node({
		mode: 'standalone',
	}),
	security: {
		checkOrigin: true,
	},
	devToolbar: {
		enabled: true,
	},
	server: {
		port: 4321,
		host: true,
	},
	integrations: [react()],
	vite: {
		plugins: [
			tailwindcss(),
			{
				name: 'configure-response-headers',
				configureServer: (server) => {
					server.middlewares.use((_req, res, next) => {
						const cmsUrl = process.env.CMS_URL || 'http://localhost:3000'

						// Allow embedding in Payload CMS live preview iframe
						res.setHeader('Access-Control-Allow-Origin', cmsUrl)
						res.setHeader('Access-Control-Allow-Credentials', 'true')

						// Use CSP frame-ancestors instead of deprecated X-Frame-Options ALLOW-FROM
						res.setHeader(
							'Content-Security-Policy',
							`frame-ancestors 'self' ${cmsUrl}`,
						)

						next()
					})
				},
			},
		],
	},

	fonts: [
		{
			provider: fontProviders.local(),
			name: 'Bitter',
			cssVariable: '--font-bitter',
			options: {
				variants: [
					{
						weight: '100 900',
						style: 'italic',
						src: [
							'./static/assets/fonts/Bitter-Italic-VariableFont_wght.woff2',
						],
					},
					{
						weight: '100 900',
						style: 'normal',
						src: ['./static/assets/fonts/Bitter-VariableFont_wght.woff2'],
					},
				],
			},
		},
		{
			provider: fontProviders.local(),
			name: 'Raleway',
			cssVariable: '--font-raleway',
			options: {
				variants: [
					{
						weight: '100 900',
						style: 'italic',
						src: [
							'./static/assets/fonts/Raleway-Italic-VariableFont_wght.woff2',
						],
					},
					{
						weight: '100 900',
						style: 'normal',
						src: ['./static/assets/fonts/Raleway-VariableFont_wght.woff2'],
					},
				],
			},
		},
	],
})
