'use client'

import { Separator as SeparatorPrimitive } from '@base-ui/react/separator'
import { cn } from '@ui/utils/cn'
import * as React from 'react'
import styles from './Separator.module.css'

function Separator({
	className,
	orientation = 'horizontal',
	...props
}: SeparatorPrimitive.Props) {
	return (
		<SeparatorPrimitive
			data-slot="separator"
			orientation={orientation}
			className={cn(styles.separator, className)}
			{...props}
		/>
	)
}

export { Separator }
