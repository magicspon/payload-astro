import { cn } from '@ui/utils/cn'
import * as React from 'react'
import styles from './Skeleton.module.css'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="skeleton"
			className={cn(styles.skeleton, className)}
			{...props}
		/>
	)
}

export { Skeleton }
