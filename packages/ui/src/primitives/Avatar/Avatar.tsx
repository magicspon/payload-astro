'use client'

import { Avatar as AvatarPrimitive } from '@base-ui/react/avatar'
import { cn } from '@ui/utils/cn'
import * as React from 'react'
import styles from './Avatar.module.css'

export function Root({
	className,
	size = 'default',
	...props
}: AvatarPrimitive.Root.Props & {
	size?: 'default' | 'sm' | 'lg'
}) {
	return (
		<AvatarPrimitive.Root
			data-slot="avatar"
			data-size={size}
			className={cn(styles.avatar, className)}
			{...props}
		/>
	)
}

export function Image({ className, ...props }: AvatarPrimitive.Image.Props) {
	return (
		<AvatarPrimitive.Image
			data-slot="avatar-image"
			className={cn(styles.avatarImage, className)}
			loading="lazy"
			{...props}
		/>
	)
}

export function Fallback({
	className,
	...props
}: AvatarPrimitive.Fallback.Props) {
	return (
		<AvatarPrimitive.Fallback
			data-slot="avatar-fallback"
			className={cn(styles.avatarFallback, className)}
			{...props}
		/>
	)
}

export function Badge({ className, ...props }: React.ComponentProps<'span'>) {
	return (
		<span
			data-slot="avatar-badge"
			className={cn(styles.avatarBadge, className)}
			{...props}
		/>
	)
}

export function Group({ className, ...props }: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="avatar-group"
			className={cn(styles.avatarGroup, className)}
			{...props}
		/>
	)
}

export function GroupCount({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="avatar-group-count"
			className={cn(styles.avatarGroupCount, className)}
			{...props}
		/>
	)
}
