import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import * as React from 'react'

const style = cva('grid', {
	variants: {
		columns: {
			blog: 'gap-8 grid-cols-[repeat(auto-fill,minmax(320px,1fr))]',
		},
	},
	defaultVariants: {},
})

export type TGridProps = React.ComponentProps<'div'> &
	VariantProps<typeof style>

export function Grid({ className, columns, ref, ...props }: TGridProps) {
	const cx = style({ className, columns })

	return <div ref={ref} className={cx} {...props} />
}
