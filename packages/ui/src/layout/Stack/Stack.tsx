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
	'2xl': 'gap-14',
}

const style = cva('grid', {
	variants: {
		size: gaps,
		align: {
			center: 'text-center',
		},
		reset: {
			sm: 'sm:gap-0',
			md: 'md:gap-0',
			lg: 'lg:gap-0',
		},
		lg: gaps,
	},
	defaultVariants: {},
})

export type TStackProps = React.ComponentProps<'div'> &
	VariantProps<typeof style> & {
		asChild?: boolean
	}

export function Stack({ size, className, ...props }: TStackProps) {
	const cx = style({ size, className })

	return <div className={cx} {...props} />
}
