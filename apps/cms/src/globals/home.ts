import { GlobalConfig } from 'payload'
import { isAnyone } from '@/access'
import { env } from '@/env/server'
import { themeField } from '@/fields/theme.field'
import { titleField } from '@/fields/title.field'
import { getAstroClient } from '@/utils/getUrl'

export const home: GlobalConfig = {
	slug: 'home',
	access: {
		read: isAnyone,
	},
	versions: {
		drafts: {
			autosave: {
				interval: 2000, // Autosave every 2 seconds
			},
			schedulePublish: true,
		},
	},
	admin: {
		group: 'Content',
		preview: (_doc, { token }) => {
			const encodedParams = new URLSearchParams({
				collection: 'home',
				path: `/`,
				previewSecret: env.PREVIEW_SECRET,
				slug: 'home',
				...(token && { token }),
			})
			return `${getAstroClient()}/api/payload/preview?${encodedParams.toString()}`
		},
		livePreview: {
			url: () => {
				const encodedParams = new URLSearchParams({
					s: Date.now().toString(),
					previewSecret: env.PREVIEW_SECRET,
					collection: 'home',
					isPreview: 'true',
				})

				const url = '/'
				const baseUrl = `${getAstroClient()}${url}?s=${encodedParams.toString()}`
				return baseUrl
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
						{
							name: 'blocks',
							type: 'blocks',
							blockReferences: [
								'hero',
								'textBlock',
								'formBlock',
								'relatedBlocks',
								'imageBlock',
							],
							blocks: [],
						},
					],
				},
			],
		},
		titleField({ field: { admin: { position: 'sidebar' } } }),
		themeField({ field: { admin: { position: 'sidebar' } } }),
	],
}
