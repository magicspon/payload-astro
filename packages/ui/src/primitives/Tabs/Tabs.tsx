'use client'

import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'
import { cn } from '@ui/utils/cn'
import { type VariantProps, cva } from 'class-variance-authority'
import styles from './Tabs.module.css'

export function Root({
	className,
	orientation = 'horizontal',
	...props
}: TabsPrimitive.Root.Props) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			data-orientation={orientation}
			className={cn(styles.tabs, className)}
			{...props}
		/>
	)
}

const tabsListVariants = cva(styles.tabsList, {
	variants: {
		variant: {
			default: styles.tabsListDefault,
			line: styles.tabsListLine,
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export function List({
	className,
	variant = 'default',
	...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			data-variant={variant}
			className={cn(tabsListVariants({ variant }), className)}
			{...props}
		/>
	)
}

export function Trigger({ className, ...props }: TabsPrimitive.Tab.Props) {
	return (
		<TabsPrimitive.Tab
			data-slot="tabs-trigger"
			className={cn(styles.tabsTrigger, className)}
			{...props}
		/>
	)
}

export function Content({ className, ...props }: TabsPrimitive.Panel.Props) {
	return (
		<TabsPrimitive.Panel
			data-slot="tabs-content"
			className={cn(styles.tabsContent, className)}
			{...props}
		/>
	)
}
