'use client'

import * as Dialog from '@ui/primitives/Dialog'
import { InputGroup, InputGroupAddon } from '@ui/primitives/InputGroup'
import { cn } from '@ui/utils/cn'
import { Command as CommandPrimitive } from 'cmdk-base'
import { CheckIcon, SearchIcon } from 'lucide-react'
import * as React from 'react'
import styles from './Command.module.css'

function Command({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive>) {
	return (
		<CommandPrimitive
			data-slot="command"
			className={cn(styles.command, className)}
			{...props}
		/>
	)
}

function CommandDialog({
	title = 'Command Palette',
	description = 'Search for a command to run...',
	children,
	className,
	// showCloseButton = false,
	...props
}: Omit<React.ComponentProps<typeof Dialog.Root>, 'children'> & {
	title?: string
	description?: string
	className?: string
	showCloseButton?: boolean
	children: React.ReactNode
}) {
	return (
		<Dialog.Root {...props}>
			<Dialog.Header className="sr-only">
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Description>{description}</Dialog.Description>
			</Dialog.Header>
			<Dialog.Popup
				className={cn(styles.dialogPopup, className)}
				// showCloseButton={showCloseButton}
			>
				{children}
			</Dialog.Popup>
		</Dialog.Root>
	)
}

function CommandInput({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) {
	return (
		<div
			data-slot="command-input-wrapper"
			className={styles.commandInputWrapper}
		>
			<InputGroup className={styles.commandInputGroup}>
				<CommandPrimitive.Input
					data-slot="command-input"
					className={cn(styles.commandInput, className)}
					autoFocus
					{...props}
				/>
				<InputGroupAddon>
					<SearchIcon className={styles.searchIcon} />
				</InputGroupAddon>
			</InputGroup>
		</div>
	)
}

function CommandList({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.List>) {
	return (
		<CommandPrimitive.List
			data-slot="command-list"
			className={cn(styles.commandList, className)}
			{...props}
		/>
	)
}

function CommandEmpty({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Empty>) {
	return (
		<CommandPrimitive.Empty
			data-slot="command-empty"
			className={cn(styles.commandEmpty, className)}
			{...props}
		/>
	)
}

function CommandGroup({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) {
	return (
		<CommandPrimitive.Group
			data-slot="command-group"
			className={cn(styles.commandGroup, className)}
			{...props}
		/>
	)
}

function CommandSeparator({
	className,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) {
	return (
		<CommandPrimitive.Separator
			data-slot="command-separator"
			className={cn(styles.commandSeparator, className)}
			{...props}
		/>
	)
}

function CommandItem({
	className,
	children,
	...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) {
	return (
		<CommandPrimitive.Item
			data-slot="command-item"
			className={cn(styles.commandItem, className)}
			{...props}
		>
			{children}
			<CheckIcon className={styles.checkIcon} />
		</CommandPrimitive.Item>
	)
}

function CommandShortcut({
	className,
	...props
}: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot="command-shortcut"
			className={cn(styles.commandShortcut, className)}
			{...props}
		/>
	)
}

export {
	Command,
	CommandDialog,
	CommandInput,
	CommandList,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandShortcut,
	CommandSeparator,
}
