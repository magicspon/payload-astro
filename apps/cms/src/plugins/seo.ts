import { seoPlugin } from '@payloadcms/plugin-seo'
import { imageField } from '@/fields/image.field'

export const seo = seoPlugin({
	collections: ['pages', 'posts'],
	globals: ['home', 'settings'],
	uploadsCollection: 'media',
	generateTitle: ({ doc }) => `spon — ${doc.title}`,
	generateDescription: ({ doc }) => doc.description,
	tabbedUI: true,
	fields: ({ defaultFields }) => [
		...defaultFields,
		{
			type: 'collapsible',
			label: 'Advanced',
			admin: {
				initCollapsed: true,
			},
			fields: [
				{
					name: 'canonical',
					type: 'text',
					admin: {
						description: 'Canonical URL for this page',
					},
				},
				{
					name: 'robots',
					type: 'group',
					fields: [
						{
							name: 'nofollow',
							type: 'checkbox',
							defaultValue: false,
						},
						{
							name: 'noindex',
							type: 'checkbox',
							defaultValue: false,
						},
						{
							name: 'noarchive',
							type: 'checkbox',
							defaultValue: false,
						},
						{
							name: 'nocache',
							type: 'checkbox',
							defaultValue: false,
						},
						{
							name: 'extras',
							type: 'text',
							admin: {
								description: 'Additional robots directives',
							},
						},
					],
				},
				{
					name: 'languageAlternates',
					dbName: 'lngAlts',
					type: 'array',
					fields: [
						{
							name: 'href',
							type: 'text',
							required: true,
						},
						{
							name: 'hrefLang',
							type: 'text',
							required: true,
						},
					],
				},
				{
					name: 'openGraph',
					type: 'group',
					fields: [
						{
							name: 'basic',
							type: 'group',
							fields: [
								{
									name: 'title',
									type: 'text',
								},
								{
									name: 'type',
									type: 'text',
									defaultValue: 'website',
								},
								imageField({
									field: {
										name: 'image',
										admin: {
											description: 'Open Graph image',
										},
									},
								}),
								{
									name: 'url',
									type: 'text',
								},
							],
						},
						{
							name: 'optional',
							type: 'group',
							fields: [
								{
									name: 'audio',
									type: 'text',
								},
								{
									name: 'description',
									type: 'textarea',
								},
								{
									name: 'determiner',
									type: 'text',
								},
								{
									name: 'locale',
									type: 'text',
								},
								{
									name: 'localeAlternate',
									type: 'array',
									fields: [
										{
											name: 'locale',
											type: 'text',
											required: true,
										},
									],
								},
								{
									name: 'siteName',
									type: 'text',
								},
								{
									name: 'video',
									type: 'text',
								},
							],
						},
						{
							name: 'image',
							type: 'group',
							admin: {
								description: 'Additional image properties (optional)',
							},
							fields: [
								{
									name: 'type',
									type: 'text',
									admin: {
										description: 'MIME type (e.g., image/jpeg)',
									},
								},
								{
									name: 'width',
									type: 'number',
								},
								{
									name: 'height',
									type: 'number',
								},
								{
									name: 'alt',
									type: 'text',
								},
							],
						},
						{
							name: 'article',
							type: 'group',
							fields: [
								{
									name: 'publishedTime',
									type: 'date',
								},
								{
									name: 'modifiedTime',
									type: 'date',
								},
								{
									name: 'expirationTime',
									type: 'date',
								},
								{
									name: 'authors',
									type: 'array',
									fields: [
										{
											name: 'author',
											type: 'text',
											required: true,
										},
									],
								},
								{
									name: 'section',
									type: 'text',
								},
								{
									name: 'tags',
									type: 'array',
									fields: [
										{
											name: 'tag',
											type: 'text',
											required: true,
										},
									],
								},
							],
						},
					],
				},
				{
					name: 'twitter',
					type: 'group',
					fields: [
						{
							name: 'card',
							type: 'select',
							options: [
								{ label: 'Summary', value: 'summary' },
								{ label: 'Summary Large Image', value: 'summary_large_image' },
								{ label: 'App', value: 'app' },
								{ label: 'Player', value: 'player' },
							],
						},
						{
							name: 'site',
							type: 'text',
							admin: {
								description: 'Twitter @username for the site',
							},
						},
						{
							name: 'creator',
							type: 'text',
							admin: {
								description: 'Twitter @username for the content creator',
							},
						},
						{
							name: 'title',
							type: 'text',
						},
						{
							name: 'description',
							type: 'textarea',
						},
						imageField({
							field: {
								name: 'image',
								admin: {
									description: 'Twitter card image',
								},
							},
						}),
						{
							name: 'imageAlt',
							type: 'text',
							admin: {
								description: 'Alt text for the Twitter image',
							},
						},
					],
				},
				{
					name: 'extend',
					type: 'group',
					fields: [
						{
							name: 'link',
							type: 'array',
							fields: [
								{
									name: 'rel',
									type: 'text',
								},
								{
									name: 'href',
									type: 'text',
								},
								{
									name: 'hreflang',
									type: 'text',
								},
								{
									name: 'type',
									type: 'text',
								},
							],
						},
						{
							name: 'meta',
							type: 'array',
							fields: [
								{
									name: 'name',
									type: 'text',
								},
								{
									name: 'property',
									type: 'text',
								},
								{
									name: 'content',
									type: 'text',
								},
							],
						},
					],
				},
			],
		},
	],
})
