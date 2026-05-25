import { cn } from '@ui/utils/cn'
import styles from './Empty.module.css'

export function Root({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="empty"
			className={cn(styles.root, className)}
			{...props}
		/>
	)
}

export function Header({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="empty-header"
			className={cn(styles.header, className)}
			{...props}
		/>
	)
}

export function Media({
	className,
	variant = 'default',
	...props
}: React.ComponentProps<'div'> & { variant?: 'default' | 'icon' }) {
	return (
		<div
			data-slot="empty-icon"
			data-variant={variant}
			className={cn(styles.media, className)}
			{...props}
		/>
	)
}

export function Title({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="empty-title"
			className={cn(styles.title, className)}
			{...props}
		/>
	)
}

export function Description({
	className,
	...props
}: React.ComponentProps<'p'>) {
	return (
		<div
			data-slot="empty-description"
			className={cn(styles.description, className)}
			{...props}
		/>
	)
}

export function Content({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="empty-content"
			className={cn(styles.content, className)}
			{...props}
		/>
	)
}
