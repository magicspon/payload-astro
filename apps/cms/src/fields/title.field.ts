import { Field } from 'payload'
import { deepMerge } from '@/utils/deepMerge'

type FieldInput = {
	field?: Partial<Field>
}

export const titleField = ({ field = {} }: FieldInput = {}) => {
	const base: Field = {
		name: 'title',
		type: 'text',
		required: true,
	}

	return deepMerge(base, field)
}
