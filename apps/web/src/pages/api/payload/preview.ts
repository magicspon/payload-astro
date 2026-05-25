import type { APIRoute } from 'astro'
import { env } from '~/env/server'

export const GET: APIRoute = async ({ request, redirect }) => {
	const { searchParams } = new URL(request.url)

	const path = searchParams.get('path')
	const collection = searchParams.get('collection')
	const slug = searchParams.get('slug')
	const previewSecret = searchParams.get('previewSecret')

	if (previewSecret !== env.PREVIEW_SECRET) {
		return new Response('You are not allowed to preview this page', {
			status: 403,
		})
	}

	if (!path || !collection || !slug) {
		return new Response('Insufficient search params', { status: 404 })
	}

	if (!path.startsWith('/')) {
		return new Response(
			'This endpoint can only be used for relative previews',
			{ status: 500 },
		)
	}

	return redirect(path, 307)
}
