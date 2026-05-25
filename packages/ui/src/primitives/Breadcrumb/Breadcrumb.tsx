import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { cn } from '@ui/utils/cn'
import { ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'
import * as React from 'react'
import styles from './Breadcrumb.module.css'

export function Root({ className, ...props }: React.ComponentProps<'nav'>) {
	return (
		<nav
			aria-label="breadcrumb"
			data-slot="breadcrumb"
			className={className}
			{...props}
		/>
	)
}

export function List({ className, ...props }: React.ComponentProps<'ol'>) {
	return (
		<ol
			data-slot="breadcrumb-list"
			className={cn(styles.list, className)}
			{...props}
		/>
	)
}

export function Item({ className, ...props }: React.ComponentProps<'li'>) {
	return (
		<li
			data-slot="breadcrumb-item"
			className={cn(styles.item, className)}
			{...props}
		/>
	)
}

export function Link({
	className,
	render,
	...props
}: useRender.ComponentProps<'a'>) {
	return useRender({
		defaultTagName: 'a',
		props: mergeProps<'a'>(
			{
				className: cn(styles.link, className),
			},
			props,
		),
		render,
		state: {
			slot: 'breadcrumb-link',
		},
	})
}

export function Page({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot="breadcrumb-page"
			role="link"
			aria-disabled="true"
			aria-current="page"
			className={cn(styles.page, className)}
			{...props}
		/>
	)
}

export function Separator({
	children,
	className,
	...props
}: React.ComponentProps<'li'>) {
	return (
		<li
			data-slot="breadcrumb-separator"
			role="presentation"
			aria-hidden="true"
			className={cn(styles.separator, className)}
			{...props}
		>
			{children ?? <ChevronRightIcon className="cn-rtl-flip" />}
		</li>
	)
}

export function Ellipsis({
	className,
	...props
}: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot="breadcrumb-ellipsis"
			role="presentation"
			aria-hidden="true"
			className={cn(styles.ellipsis, className)}
			{...props}
		>
			<MoreHorizontalIcon />
			<span className="sr-only">More</span>
		</span>
	)
}
