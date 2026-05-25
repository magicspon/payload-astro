import { Endpoint } from 'payload'

export const download: Endpoint = {
	method: 'get',
	path: '/:id/download',
	handler: async (req) => {
		const { id } = req.routeParams!

		if (!id) {
			return new Response(null, {
				status: 404,
			})
		}

		const doc = await req.payload.findByID({
			collection: 'media',
			id: id as string,
		})

		if (!doc?.url) {
			return new Response(null, {
				status: 404,
			})
		}

		return new Response(null, {
			status: 302,
			headers: {
				Location: doc.url,
				'Content-Disposition': `attachment; filename="${doc.filename}"`,
			},
		})
	},
}
