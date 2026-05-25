'use client'
import { Switch as SwitchPrimitive } from '@base-ui/react/switch'
import { cn } from '@ui/utils/cn'
import * as React from 'react'
import styles from './Switch.module.css'

function Switch({
	className,
	size = 'default',
	...props
}: SwitchPrimitive.Root.Props & {
	size?: 'sm' | 'default'
}) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			data-size={size}
			className={cn(styles.root, className)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={styles.thumb}
			/>
		</SwitchPrimitive.Root>
	)
}

export { Switch }
