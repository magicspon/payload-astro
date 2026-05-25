import { Field } from 'payload'
import { env } from '@/env/server'
import { variantField } from '@/fields/helpers/variant'
import { deepMerge } from '@/utils/deepMerge'

type FieldInput = {
	field?: Partial<Field>
	relationTo?: string | string[]
	allowTypes?: ('url' | 'internal' | 'email' | 'tel' | 'download' | 'custom')[]
}

const types = {
	url: 'Web address',
	internal: 'Internal page',
	email: 'Email',
	tel: 'Telephone',
	download: 'Download',
	custom: 'Custom',
} as const

export const buttonField = (
	{
		field = {},
		allowTypes = ['url', 'internal', 'email', 'tel', 'download', 'custom'],
	}: FieldInput = {
		allowTypes: ['url', 'internal', 'email', 'tel', 'download', 'custom'],
	},
) => {
	const base: Field = {
		name: 'button',
		type: 'group',
		required: true,
		fields: [
			{
				type: 'row',
				fields: [
					{
						name: 'type',
						type: 'select',
						defaultValue: 'url',
						options: allowTypes.map((type) => ({
							label: types[type],
							value: type,
						})),
						admin: {
							isClearable: false,
						},
					},
					{
						name: 'url',
						type: 'text',
						label: 'URL',
						required: true,
						admin: {
							condition: (_data, siblingData) => siblingData?.type === 'url',
							placeholder: 'https://',
						},
					},
					{
						name: 'internal',
						type: 'relationship',
						label: 'Internal Page',
						relationTo: ['pages'],
						required: true,
						admin: {
							condition: (_data, siblingData) =>
								siblingData?.type === 'internal',
						},
					},
					{
						name: 'email',
						type: 'text',
						label: 'Email Address',
						required: true,
						admin: {
							condition: (_data, siblingData) => siblingData?.type === 'email',
							placeholder: 'hello@gmail.com',
						},
					},
					{
						name: 'tel',
						type: 'text',
						label: 'Phone Number',
						required: true,
						admin: {
							condition: (_data, siblingData) => siblingData?.type === 'tel',
							placeholder: '0123456789',
						},
					},
					{
						name: 'download',
						type: 'relationship',
						label: 'Download',
						relationTo: ['media'],
						required: true,
						admin: {
							condition: (_data, siblingData) =>
								siblingData?.type === 'download',
						},
					},
					{
						name: 'custom',
						type: 'text',
						label: 'Custom Value',
						required: true,
						admin: {
							condition: (_data, siblingData) => siblingData?.type === 'custom',
							placeholder: '#read-more',
						},
					},
					{
						name: 'text',
						type: 'text',
						label: 'Text',
						required: true,
						admin: {
							placeholder: 'Read more',
						},
					},
				],
			},
			{
				name: 'href',
				type: 'text',
				admin: {
					readOnly: true,
					hidden: true,
				},
				hooks: {
					beforeChange: [
						({ siblingData }) => {
							const { type, url, email, tel, custom, download, internal } =
								siblingData

							console.log({ download })

							switch (type) {
								case 'url':
									return url || ''
								case 'email':
									return email ? `mailto:${email}` : ''
								case 'tel':
									return tel ? `tel:${tel}` : ''
								case 'download':
									return `${env.CMS_URL}/api/media/${download.value}/download`
								case 'custom':
									return custom || ''
								case 'internal':
									// For internal links, you might want to construct a URL path
									// This is a placeholder - adjust based on your routing structure
									return typeof internal === 'string'
										? `/posts/${internal}`
										: ''
								default:
									return ''
							}
						},
					],
				},
			},
			{
				label: 'Options',
				type: 'collapsible',
				admin: {
					initCollapsed: true,
				},
				fields: [
					{
						type: 'row',
						fields: [
							variantField({
								defaultValue: 'default',
								options: ['Default', 'Ghost', 'Link', 'Outline', 'Secondary'],
							}),
							{
								name: 'target',
								type: 'select',
								options: [
									{
										label: 'Blank',
										value: '_blank',
									},
								],
								admin: {
									isClearable: true,
									condition: (_data, siblingData) =>
										siblingData?.type === 'url',
								},
							},
						],
					},
				],
			},
		],
	}

	return deepMerge(field, base)
}

export const buttons: Field = {
	name: 'buttons',
	type: 'array',
	fields: [buttonField()],
}
