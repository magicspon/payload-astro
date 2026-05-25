'use client'

import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { cn } from '@ui/utils/cn'
import * as React from 'react'
import styles from './Dialog.module.css'

export const Root = DialogPrimitive.Root

export const Trigger = DialogPrimitive.Trigger

export const Portal = DialogPrimitive.Portal

export const Close = DialogPrimitive.Close

type DialogBackdropProps = React.ComponentProps<typeof DialogPrimitive.Backdrop>

export function Backdrop({ className, ...props }: DialogBackdropProps) {
	return (
		<DialogPrimitive.Backdrop
			data-testid="dialog-backdrop"
			className={cn(styles.backdrop, className)}
			{...props}
		/>
	)
}

type DialogContentProps = React.ComponentProps<typeof DialogPrimitive.Popup>

export function Popup({ className, children, ...props }: DialogContentProps) {
	return (
		<Portal>
			<Backdrop />
			<DialogPrimitive.Popup
				data-testid="dialog-content"
				className={cn(styles.popup, className)}
				{...props}
			>
				{children}
			</DialogPrimitive.Popup>
		</Portal>
	)
}

type DialogHeaderProps = React.ComponentProps<'div'>

export function Header({ className, ...props }: DialogHeaderProps) {
	return <div className={cn(styles.header, className)} {...props} />
}

type DialogFooterProps = React.ComponentProps<'div'>

export function Footer({ className, ...props }: DialogFooterProps) {
	return <div className={cn(styles.footer, className)} {...props} />
}

type DialogTitleProps = React.ComponentProps<typeof DialogPrimitive.Title>

export function Title({ className, ...props }: DialogTitleProps) {
	return (
		<DialogPrimitive.Title
			data-testid="dialog-title"
			className={cn(styles.title, className)}
			{...props}
		/>
	)
}

type DialogDescriptionProps = React.ComponentProps<
	typeof DialogPrimitive.Description
>

export function Description({ className, ...props }: DialogDescriptionProps) {
	return (
		<DialogPrimitive.Description
			data-testid="dialog-description"
			className={cn(styles.description, className)}
			{...props}
		/>
	)
}
