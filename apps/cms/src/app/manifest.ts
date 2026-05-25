import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'Spon Corp',
		short_name: 'spon',
		description:
			'An Astro frontend application with Payload CMS as the backend, featuring type-safe tRPC endpoints for custom API operations.',
		start_url: '/',
		display: 'standalone',
		background_color: '#fff',
		theme_color: '#0070a3',
		icons: [
			{
				src: '/favicon.ico',
				sizes: 'any',
				type: 'image/x-icon',
			},
		],
	}
}
