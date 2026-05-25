import { navigationPlugin } from '@spon/payload-navigation'

export const navigation = navigationPlugin({
	internalCollections: ['pages', 'posts'],
	maxDepth: 3,
	resolveInternalUrl: async ({ id, collection, payload }) => {
		if (collection === 'pages') {
			const doc = await payload.findByID({ collection, id, depth: 0 })
			return doc.breadcrumbs?.at(-1)?.url ?? ''
		}

		if (collection === 'posts') {
			const doc = await payload.findByID({ collection, id, depth: 0 })
			return `/posts/${doc.slug}`
		}

		return '/'
	},
})
