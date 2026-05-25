import { cn } from '@ui/utils/cn'
import * as React from 'react'
import styles from './Table.module.css'

export function Root({ className, ...props }: React.ComponentProps<'table'>) {
	return (
		<div data-slot="table-container" className={styles.container}>
			<table
				data-slot="table"
				className={cn(styles.table, className)}
				{...props}
			/>
		</div>
	)
}

export function Header({ className, ...props }: React.ComponentProps<'thead'>) {
	return (
		<thead
			data-slot="table-header"
			className={cn(styles.header, className)}
			{...props}
		/>
	)
}

export function Body({ className, ...props }: React.ComponentProps<'tbody'>) {
	return (
		<tbody
			data-slot="table-body"
			className={cn(styles.body, className)}
			{...props}
		/>
	)
}

export function Footer({ className, ...props }: React.ComponentProps<'tfoot'>) {
	return (
		<tfoot
			data-slot="table-footer"
			className={cn(styles.footer, className)}
			{...props}
		/>
	)
}

export function Row({ className, ...props }: React.ComponentProps<'tr'>) {
	return (
		<tr
			data-slot="table-row"
			className={cn(styles.row, className)}
			{...props}
		/>
	)
}

export function Head({ className, ...props }: React.ComponentProps<'th'>) {
	return (
		<th
			data-slot="table-head"
			className={cn(styles.head, className)}
			{...props}
		/>
	)
}

export function Cell({ className, ...props }: React.ComponentProps<'td'>) {
	return (
		<td
			data-slot="table-cell"
			className={cn(styles.cell, className)}
			{...props}
		/>
	)
}

export function Caption({
	className,
	...props
}: React.ComponentProps<'caption'>) {
	return (
		<caption
			data-slot="table-caption"
			className={cn(styles.caption, className)}
			{...props}
		/>
	)
}
