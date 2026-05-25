import { hasRole, requireAllRoles } from '@delmaredigital/payload-better-auth'
import {
	createBreadcrumbsField,
	createParentField,
} from '@payloadcms/plugin-nested-docs'
import { CollectionConfig, slugField } from 'payload'
import { notAdmin } from '@/access'
// import { isTeamMember } from '@/access'
import { env } from '@/env/server'
import { authorField } from '@/fields/author.field'
import { imageField } from '@/fields/image.field'
import { themeField } from '@/fields/theme.field'
import { titleField } from '@/fields/title.field'
import { getAstroClient } from '@/utils/getUrl'
import { Page } from '@spon/payload-types'
import { listingItemsAfterRead } from './hooks/afterRead'

export const pages: CollectionConfig = {
	slug: 'pages',
	access: {
		read: () => true,
		create: hasRole(['editor', 'admin']),
		update: hasRole(['editor', 'admin']),
		delete: requireAllRoles(['admin']),
	},
	orderable: true,
	defaultSort: 'parent',
	admin: {
		hidden: notAdmin,
		group: 'Content',
		useAsTitle: 'title',
		defaultColumns: ['title', 'slug', 'updatedAt', 'author', '_status'],

		preview: (doc, { token }) => {
			const node = doc as unknown as Page
			const url = node.breadcrumbs?.at(-1)?.url as string
			const encodedParams = new URLSearchParams({
				collection: 'pages',
				path: url,
				previewSecret: env.PREVIEW_SECRET,
				slug: node.slug as string,
				...(token && { token }),
			})
			return `${getAstroClient()}/api/payload/preview?${encodedParams.toString()}`
		},

		livePreview: {
			url: ({ data }) => {
				const encodedParams = new URLSearchParams({
					s: Date.now().toString(),
					previewSecret: env.PREVIEW_SECRET,
					collection: 'pages',
					isPreview: 'true',
				})

				const url = data.breadcrumbs?.at(-1)?.url as string
				if (!data?.slug || !url) return null

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
	hooks: {
		afterChange: [],
		afterRead: [],
		beforeDelete: [],
		beforeChange: [],
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
						{
							name: 'blocks',
							type: 'blocks',
							blockReferences: ['hero', 'textBlock'],
							blocks: [],
							admin: {
								condition: (data) =>
									data.template === 'default' || data.template === 'listing',
							},
						},
					],
				},
				{
					name: 'article',
					admin: {
						condition: (data) => data.template === 'article',
					},
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
				{
					name: 'listing',
					admin: {
						condition: (data) => data.template === 'listing',
					},
					fields: [
						{
							type: 'row',
							fields: [
								{
									name: 'list',
									type: 'select',
									options: [
										{ label: 'Pages', value: 'pages' },
										{ label: 'Posts', value: 'posts' },
										{ label: 'Children', value: 'children' },
									],
									admin: {},
								},
								{
									name: 'limit',
									type: 'number',
									min: 1,
									max: 50,
									admin: {
										description: 'The number of items to display',
									},
								},
							],
						},
						{
							name: 'items',
							label: 'Feed',
							type: 'relationship',
							relationTo: ['pages', 'posts'],
							hasMany: true,
							virtual: true,
							admin: {
								readOnly: true,
								condition: (_, siblingData) => !siblingData.children,
							},
							hooks: {
								afterRead: [listingItemsAfterRead],
							},
						},
						{
							name: 'footer',
							label: 'Footer',
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
				{
					name: 'contact',
					admin: {
						condition: (data) => data.template === 'contact',
					},
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

		slugField({ fieldToUse: 'title' }),
		{
			name: 'template',
			type: 'select',
			options: [
				{ label: 'Default', value: 'default' },
				{ label: 'Article', value: 'article' },
				{ label: 'Listing', value: 'listing' },
				{ label: 'Contact', value: 'contact' },
			],
			admin: {
				position: 'sidebar',
			},
		},
		authorField(),
		themeField({ field: { admin: { position: 'sidebar' } } }),
		{
			type: 'relationship',
			relationTo: 'navigation',
			name: 'menu',
			admin: {
				position: 'sidebar',
			},
		},
		createParentField('pages', {
			admin: {
				position: 'sidebar',
			},
		}),
		createBreadcrumbsField('pages', {
			admin: {
				position: 'sidebar',
			},
		}),
	],
}
