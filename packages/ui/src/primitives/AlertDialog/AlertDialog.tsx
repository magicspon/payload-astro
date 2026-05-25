'use client'

import { AlertDialog as AlertDialogPrimitive } from '@base-ui/react/alert-dialog'
import { cn } from '@ui/utils/cn'
import * as React from 'react'
import styles from './AlertDialog.module.css'

export const Root = AlertDialogPrimitive.Root

export const Trigger = AlertDialogPrimitive.Trigger

export const Portal = AlertDialogPrimitive.Portal

type AlertDialogBackdropProps = React.ComponentProps<
	typeof AlertDialogPrimitive.Backdrop
>

export function Backdrop({ className, ...props }: AlertDialogBackdropProps) {
	return (
		<AlertDialogPrimitive.Backdrop
			data-testid="alert-Backdrop"
			className={cn(styles.backdrop, className)}
			{...props}
		/>
	)
}

type AlertDialogPopupProps = React.ComponentProps<
	typeof AlertDialogPrimitive.Popup
>

export function Popup({ className, ...props }: AlertDialogPopupProps) {
	return (
		<Portal>
			<Backdrop />
			<AlertDialogPrimitive.Popup
				data-testid="alert-content"
				className={cn(styles.popup, className)}
				{...props}
			/>
		</Portal>
	)
}

type AlertDialogHeaderProps = React.ComponentProps<'div'>

export function Header({ className, ...props }: AlertDialogHeaderProps) {
	return <div className={cn(styles.header, className)} {...props} />
}

type AlertDialogFooterProps = React.ComponentProps<'div'>

export function Footer({ className, ...props }: AlertDialogFooterProps) {
	return <div className={cn(styles.footer, className)} {...props} />
}

type AlertDialogTitleProps = React.ComponentProps<
	typeof AlertDialogPrimitive.Title
>

export function Title({ className, ...props }: AlertDialogTitleProps) {
	return (
		<AlertDialogPrimitive.Title
			className={cn(styles.title, className)}
			data-testid="alert-title"
			{...props}
		/>
	)
}

type AlertDialogDescriptionProps = React.ComponentProps<
	typeof AlertDialogPrimitive.Description
>

export function Description({
	className,
	...props
}: AlertDialogDescriptionProps) {
	return (
		<AlertDialogPrimitive.Description
			data-testid="alert-description"
			className={className}
			{...props}
		/>
	)
}

export const Action = AlertDialogPrimitive.Close
export const Cancel = AlertDialogPrimitive.Close
