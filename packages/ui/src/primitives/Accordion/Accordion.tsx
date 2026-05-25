'use client'

import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion'
import { cn } from '@ui/utils/cn'
import { PlusIcon } from 'lucide-react'
import * as React from 'react'
import styles from './Accordion.module.css'

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
	return (
		<AccordionPrimitive.Root
			data-slot="accordion"
			className={cn(styles.Accordion, className)}
			{...props}
		/>
	)
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn(styles.Item, className)}
			{...props}
		/>
	)
}

function AccordionTrigger({
	className,
	children,
	...props
}: AccordionPrimitive.Trigger.Props) {
	return (
		<AccordionPrimitive.Header className={styles.Header}>
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(styles.Trigger, className)}
				{...props}
			>
				{children}
				<PlusIcon className={styles.TriggerIcon} />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	)
}

function AccordionContent({
	className,
	children,
	...props
}: AccordionPrimitive.Panel.Props) {
	return (
		<AccordionPrimitive.Panel
			data-slot="accordion-content"
			className={cn(styles.Panel, className)}
			{...props}
		>
			<div className={cn(styles.Content, className)}>{children}</div>
		</AccordionPrimitive.Panel>
	)
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
