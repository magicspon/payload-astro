import { cn } from '@ui/utils/cn'
import * as React from 'react'
import styles from './Alert.module.css'

type AlertVariant = 'default' | 'destructive'

export function Root({
	className,
	variant = 'default',
	...props
}: React.ComponentProps<'div'> & { variant?: AlertVariant }) {
	return (
		<div
			data-slot="alert"
			role="alert"
			className={cn(styles.alert, styles[`alert--${variant}`], className)}
			{...props}
		/>
	)
}

export function Title({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-title"
			className={cn(styles.alertTitle, className)}
			{...props}
		/>
	)
}

export function Description({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="alert-description"
			className={cn(styles.alertDescription, className)}
			{...props}
		/>
	)
}

export type { AlertVariant }
