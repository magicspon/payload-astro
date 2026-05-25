import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

const gaps = {
	xs: 'gap-1',
	sm: 'gap-3',
	base: 'gap-5',
	md: 'gap-8',
	lg: 'gap-10',
	xl: 'gap-12',
	'2xl': 'gap-16',
}

const style = cva('flex flex-row', {
	variants: {
		size: gaps,
		align: {
			start: 'items-start',
			center: 'items-center',
		},
		justify: {
			between: 'justify-between',
			around: 'justify-around',
			center: 'justify-center',
		},
		wrap: {
			true: 'flex-wrap',
		},
	},
	defaultVariants: {
		align: 'center',
	},
})

export type TInlineProps = React.ComponentProps<'div'> &
	VariantProps<typeof style>

export function Inline({
	size,
	wrap,
	align,
	justify,
	className,
	ref,
	...props
}: TInlineProps) {
	const cx = style({ size, className, wrap, justify, align })

	return <div ref={ref} className={cx} {...props} />
}
