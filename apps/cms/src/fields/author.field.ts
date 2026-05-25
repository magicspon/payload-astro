import { isAdminField } from '@delmaredigital/payload-better-auth'
import { Field } from 'payload'
import { deepMerge } from '../utils/deepMerge'

type FieldInput = {
	field?: Partial<Field>
}

export const authorField = ({ field = {} }: FieldInput = {}) => {
	const base: Field = {
		name: 'author',
		type: 'relationship',
		relationTo: 'users',
		required: true,
		defaultValue: ({ user }) => user?.id,
		admin: {
			position: 'sidebar',
		},

		access: {
			read: () => true,
			update: isAdminField(),
			create: isAdminField(),
		},
	}

	return deepMerge(base, field)
}
