import { Block } from 'payload'
import { themeField } from '@/fields/theme.field'

export const hero: Block = {
	slug: 'hero',
	fields: [
		{
			type: 'row',
			fields: [
				{
					name: 'variant',
					type: 'select',
					defaultValue: 'primary',
					options: [
						{ label: 'Primary', value: 'primary' },
						{ label: 'Secondary', value: 'secondary' },
						{ label: 'Tertiary', value: 'tertiary' },
					],
					required: true,
				},
				themeField(),
			],
		},
		{
			name: 'title',
			type: 'text',
			required: true,
		},
		{
			name: 'content',
			type: 'richText',
			admin: {
				condition: (_, sibling) => sibling.variant !== 'tertiary',
			},
		},
		{
			name: 'image',
			type: 'upload',
			relationTo: 'media',
			admin: {
				condition: (_, sibling) => sibling.variant === 'primary',
			},
		},
	],
}
