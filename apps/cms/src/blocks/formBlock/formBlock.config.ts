import { Block } from 'payload'
import { themeField } from '@/fields/theme.field'

export const formBlock: Block = {
	slug: 'formBlock',
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
		// {
		// 	name: 'form',
		// 	type: 'relationship',
		// 	relationTo: 'form',
		// 	required: true,
		// },
	],
}
