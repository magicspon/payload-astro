import { withPayload } from '@payloadcms/next/withPayload'
import { createJiti } from 'jiti'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// // this tool allows us to import and execute typescript from within a regular node file
const jiti = createJiti(__filename)
// validate the client and server secrets
async function validate() {
	await jiti.import('./src/env/server')
	await jiti.import('./src/env/client')
}

try {
	await validate()
} catch (err) {
	console.error(err)
	process.exit(1)
}

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'standalone',
	outputFileTracingRoot: path.join(__dirname, '../../'),
	devIndicators: false,
	transpilePackages: ['@spon/email', '@spon/ui', '@spon/utils'],

	// compiler: {
	// 	removeConsole:
	// 		process.env.NODE_ENV === 'production' ? { exclude: ['error'] } : false,
	// },

	// Exclude test files and non-code files from the build
	serverExternalPackages: [
		'pino',
		'thread-stream',
		'pino-pretty',
		'@napi-rs/canvas',
		'qr-code-styling',
	],

	experimental: {
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 's.gravatar.com',
			},
		],
		qualities: [75],
		minimumCacheTTL: 3.154e7, // 1 year
		dangerouslyAllowSVG: true,
		contentDispositionType: 'attachment',
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},

	async headers() {
		// Get CLIENT_URL for live preview iframe
		const clientUrl = process.env.CLIENT_URL || 'http://localhost:4321'

		const cspHeader = [
			"default-src 'self'",
			"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net",
			"style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
			"img-src 'self' data: blob: https:",
			"font-src 'self' data: https://cdn.jsdelivr.net",
			"connect-src 'self' https://cdn.jsdelivr.net",
			"worker-src 'self' blob:",
			"media-src 'self'",
			"object-src 'none'",
			`frame-src 'self' ${clientUrl}`,
			"base-uri 'self'",
			"form-action 'self'",
			"frame-ancestors 'self'",
		]

		// Only add upgrade-insecure-requests in production
		if (process.env.NODE_ENV === 'production') {
			cspHeader.push('upgrade-insecure-requests')
		}

		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Content-Security-Policy',
						value: cspHeader.join('; '),
					},
					{
						key: 'Cross-Origin-Opener-Policy',
						value: 'same-origin',
					},
				],
			},
		]
	},
}

export default withPayload(nextConfig)
