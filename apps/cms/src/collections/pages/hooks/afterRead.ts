import type { FieldHook } from 'payload'

export const listingItemsAfterRead: FieldHook = async ({
	siblingData,
	originalDoc,
	req,
	context,
}) => {
	if (context.skipRun) return

	const list = siblingData?.list
	const limit = siblingData?.limit ?? 10

	if (!list) return undefined

	if (list === 'children') {
		const result = await req.payload.find({
			collection: 'pages',
			depth: 1,
			limit,
			req,
			where: { parent: { equals: originalDoc.id } },
			context: { skipRun: true },
			select: {
				title: true,
				slug: true,
				breadcrumbs: true,
				description: true,
				image: true,
			},
		})
		return result.docs.map((page) => ({
			relationTo: 'pages',
			value: page,
		}))
	}

	const collection = list as 'pages' | 'posts'
	const result = await req.payload.find({
		collection,
		depth: 1,
		limit,
		req,
		context: { skipRun: true },
		select: {
			title: true,
			slug: true,
			description: true,
			image: true,
		},
	})
	return result.docs.map((item) => ({
		relationTo: collection,
		value: item,
	}))
}
