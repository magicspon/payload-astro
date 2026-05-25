import { Buttons } from '@spon/payload-types'
import { ButtonVariant } from '@spon/ui/primitives/Button'

export function parseButtonProps(
	button: NonNullable<Buttons['buttons']>[number]['button'],
): React.ComponentProps<'a'> & {
	variant: ButtonVariant['variant']
} {
	return {
		download: button.type === 'download',
		target:
			button.type === 'download' ? '_blank' : (button.target ?? undefined),
		rel: button.type === 'url' ? 'noopener noreferrer' : undefined,
		variant: button.variant,
		href: button.href!,
	}
}
