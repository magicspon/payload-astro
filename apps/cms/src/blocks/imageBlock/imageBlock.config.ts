import { Block } from 'payload'
import { imageField } from '@/fields/image.field'
import { themeField } from '@/fields/theme.field'

export const imageBlock: Block = {
	slug: 'imageBlock',
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
		imageField(),
	],
}
