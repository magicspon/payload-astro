import { Block } from 'payload'
import { themeField } from '@/fields/theme.field'

export const relatedBlocks: Block = {
	slug: 'relatedBlocks',
	fields: [
		{
			type: 'row',
			fields: [
				themeField(),
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
			],
		},
		{
			name: 'content',
			type: 'richText',
		},
		{
			name: 'related',
			type: 'relationship',
			relationTo: ['pages', 'posts'],
			hasMany: true,
		},
	],
}
