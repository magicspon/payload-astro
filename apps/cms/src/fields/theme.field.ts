import { Field } from 'payload'
import { deepMerge } from '@/utils/deepMerge'

type FieldInput = {
	field?: Partial<Field>
}

export const themeField = ({ field = {} }: FieldInput = {}) => {
	const base: Field = {
		name: 'theme',
		type: 'select',
		defaultValue: 'light',
		options: [
			{ label: 'Light', value: 'light' },
			{ label: 'Dark', value: 'dark' },
			{ label: 'Primary', value: 'primary' },
			{ label: 'Secondary', value: 'secondary' },
			{ label: 'Tertiary', value: 'tertiary' },
		],
	}

	return deepMerge(base, field)
}
