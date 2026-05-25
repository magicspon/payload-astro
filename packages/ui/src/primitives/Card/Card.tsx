import { cn } from '@ui/utils/cn'
import * as React from 'react'
import styles from './Card.module.css'

export function Root({
	className,
	size = 'default',
	...props
}: React.ComponentProps<'div'> & { size?: 'default' | 'sm' }) {
	return (
		<div
			data-slot="card"
			data-size={size}
			className={cn(styles.card, className)}
			{...props}
		/>
	)
}

export function Header({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-header"
			className={cn(styles.cardHeader, className)}
			{...props}
		/>
	)
}

export function Title({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-title"
			className={cn(styles.cardTitle, className)}
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
			data-slot="card-description"
			className={cn(styles.cardDescription, className)}
			{...props}
		/>
	)
}

export function Action({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-action"
			className={cn(styles.cardAction, className)}
			{...props}
		/>
	)
}

export function Content({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-content"
			className={cn(styles.cardContent, className)}
			{...props}
		/>
	)
}

export function Footer({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="card-footer"
			className={cn(styles.cardFooter, className)}
			{...props}
		/>
	)
}
