import { hasRole, requireAllRoles } from '@delmaredigital/payload-better-auth'
import { CollectionConfig, slugField } from 'payload'
import { env } from '@/env/server'
import { authorField } from '@/fields/author.field'
import { imageField } from '@/fields/image.field'
import { themeField } from '@/fields/theme.field'
import { titleField } from '@/fields/title.field'
import { getAstroClient } from '@/utils/getUrl'

export const posts: CollectionConfig = {
	slug: 'posts',
	access: {
		read: () => true,
		create: hasRole(['editor', 'admin']),
		update: hasRole(['editor', 'admin']),
		delete: requireAllRoles(['admin']),
	},
	admin: {
		group: 'Content',
		useAsTitle: 'title',
		defaultColumns: ['title', 'slug', 'updatedAt', 'author', '_status'],
		preview: (doc, { token }) => {
			const encodedParams = new URLSearchParams({
				collection: 'posts',
				path: `/posts/${doc.slug}`,
				previewSecret: env.PREVIEW_SECRET,
				slug: doc.slug as string,
				...(token && { token }),
			})
			return `${getAstroClient()}/api/payload/preview?${encodedParams.toString()}`
		},

		livePreview: {
			url: ({ data }) => {
				const encodedParams = new URLSearchParams({
					s: Date.now().toString(),
					previewSecret: env.PREVIEW_SECRET,
					collection: 'posts',
				})

				const url = `/posts/${data.slug}`
				const baseUrl = `${getAstroClient()}${url}?s=${encodedParams.toString()}`
				return baseUrl
			},
		},
	},
	versions: {
		drafts: {
			autosave: {
				interval: 2000, // Autosave every 2 seconds
			},
		},
	},

	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Content',
					fields: [
						titleField(),
						{
							name: 'description',
							type: 'textarea',
							label: 'Description',
							required: false,
						},
						imageField(),
					],
				},
			],
		},
		slugField({ fieldToUse: 'title' }),
		themeField({ field: { admin: { position: 'sidebar' } } }),
		authorField(),
	],
}
