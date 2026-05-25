import { Field } from 'payload'
import { deepMerge } from '@/utils/deepMerge'

type FieldInput = {
	field?: Partial<Field>
}

export const userIdField = ({ field = {} }: FieldInput = {}) => {
	const base: Field = {
		name: 'userId',
		label: 'User',
		type: 'relationship',
		relationTo: 'users',
		required: true,
		index: true,
	}

	return deepMerge(base, field)
}
