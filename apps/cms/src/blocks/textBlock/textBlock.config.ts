import { Block } from 'payload'
import { buttons } from '@/fields/button'
import { themeField } from '@/fields/theme.field'

export const textBlock: Block = {
	slug: 'textBlock',
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
		buttons,
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
