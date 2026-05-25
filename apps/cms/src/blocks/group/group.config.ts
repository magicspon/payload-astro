import { Block } from 'payload'

export const group: Block = {
	slug: 'group',
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
		{
			type: 'blocks',
			name: 'blocks',
			blockReferences: [
				'textBlock',
				'formBlock',
				'relatedBlocks',
				'imageBlock',
			],
			blocks: [],
		},
	],
}
