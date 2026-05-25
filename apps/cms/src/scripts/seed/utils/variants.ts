import { faker } from '@faker-js/faker'

export type Variant = 'primary' | 'secondary' | 'tertiary'

export function generateVariant(): Variant {
	return faker.helpers.arrayElement(['primary', 'secondary', 'tertiary'])
}
