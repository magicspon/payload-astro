import { deepMerge } from '@/utils/deepMerge'
import { Field } from 'payload'

type FieldInput = {
	field?: Partial<Field>
}

export const imageField = ({ field = {} }: FieldInput = {}): Field => {
	const base: Field = {
		name: 'image',
		type: 'upload',
		relationTo: 'media',
	}

	return deepMerge(base, field)
}
