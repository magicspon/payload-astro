import { Button as ButtonPrimitive } from '@base-ui/react/button'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'
import styles from './Button.module.css'

export const buttonVariants = cva(styles.btn, {
	variants: {
		variant: {
			default: styles['btn--default'],
			outline: styles['btn--outline'],
			secondary: styles['btn--secondary'],
			ghost: styles['btn--ghost'],
			destructive: styles['btn--destructive'],
			link: styles['btn--link'],
		},
		disabled: {
			true: styles['btn--disabled'],
		},
		icon: {
			true: styles['btn--icon'],
		},
		size: {
			default: '',
			xs: styles['btn--xs'],
			sm: styles['btn--sm'],
			lg: styles['btn--lg'],
			icon: styles['btn--icon'],
			'icon-xs': styles['btn--icon-xs'],
			'icon-sm': styles['btn--icon-sm'],
			'icon-lg': styles['btn--icon-lg'],
		},
	},
	defaultVariants: {
		variant: 'default',
	},
})

export type ButtonVariant = VariantProps<typeof buttonVariants>

export type ButtonProps = React.ComponentProps<typeof ButtonPrimitive> &
	ButtonVariant

export function Button({
	variant,
	className,
	ref,
	size,
	disabled,
	icon,
	type = 'button',
	...props
}: ButtonProps) {
	return (
		<ButtonPrimitive
			ref={ref}
			className={buttonVariants({ variant, className, size, icon, disabled })}
			disabled={disabled}
			type={type}
			{...props}
		/>
	)
}

export type ButtonLinkProps = React.ComponentProps<'a'> & ButtonVariant

export function ButtonLink({
	variant,
	className,
	size,
	icon,
	...props
}: ButtonLinkProps) {
	return (
		<a
			className={buttonVariants({ variant, className, size, icon })}
			{...props}
		/>
	)
}
