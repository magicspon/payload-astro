import { camelCase } from 'es-toolkit/string'
import { Field } from 'payload'

type FieldInput<T extends readonly string[]> = {
	options: T
	defaultValue: T[number]
	name?: string
	label?: string
}

export const variantField = <T extends readonly string[]>({
	defaultValue,
	options,
	name = 'variant',
	label = 'variants',
}: FieldInput<T>): Field => {
	return {
		name,
		label,
		defaultValue,
		options: options.map((o) => ({ label: o, value: camelCase(o) })),
		type: 'select',
		required: true,
		admin: {
			isClearable: false,
		},
	}
}
