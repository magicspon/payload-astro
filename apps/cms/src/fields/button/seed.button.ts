import { faker } from '@faker-js/faker'
import type { Hero } from '@spon/payload-types'

type Button = NonNullable<Hero['buttons']>[number]
type ButtonVariant = 'default' | 'ghost' | 'link' | 'primary' | 'secondary'
type ButtonType = 'url' | 'internal' | 'email' | 'tel' | 'custom'

export function generateButton(): Button {
	const buttonType = faker.helpers.arrayElement([
		'url',
		'email',
		'custom',
	] as const satisfies readonly ButtonType[])

	const text = faker.helpers.arrayElement([
		'Learn More',
		'Get Started',
		'Contact Us',
		'Read More',
		'View Details',
		'Sign Up',
		'Discover',
		'Explore',
	])

	const variant = faker.helpers.arrayElement([
		'default',
		'ghost',
		'link',
		'primary',
		'secondary',
	] as const satisfies readonly ButtonVariant[])

	const base = {
		type: buttonType,
		text,
		variant,
		href: null,
	}

	switch (buttonType) {
		case 'url':
			return {
				button: {
					...base,
					href: faker.internet.url(),
					target: faker.helpers.arrayElement(['_blank', null]),
				},
			}
		case 'email':
			return {
				button: {
					...base,
					href: `mailto:${faker.internet.email()}`,
				},
			}
		case 'custom':
			return {
				button: {
					...base,
					href: `#${faker.lorem.slug(2)}`,
				},
			}
	}
}

export function generateButtons(count: number = 2): Button[] {
	return Array.from({ length: count }, () => generateButton())
}
