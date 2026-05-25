import { Drawer as DrawerPrimitive } from '@base-ui/react/drawer'
import { cn } from '@ui/utils/cn'
import styles from './Drawer.module.css'

export const Root = DrawerPrimitive.Root
export const Portal = DrawerPrimitive.Portal

export function Trigger({
	className,
	...props
}: DrawerPrimitive.Trigger.Props) {
	return (
		<DrawerPrimitive.Trigger
			className={cn(className, styles.Button)}
			{...props}
		/>
	)
}

export function Backdrop({
	className,
	...props
}: DrawerPrimitive.Backdrop.Props) {
	return (
		<DrawerPrimitive.Backdrop
			className={cn(className, styles.Backdrop)}
			{...props}
		/>
	)
}

export function Viewport({
	className,
	...props
}: DrawerPrimitive.Viewport.Props) {
	return (
		<DrawerPrimitive.Viewport
			className={cn(className, styles.Viewport)}
			{...props}
		/>
	)
}

export function Content({
	className,
	...props
}: DrawerPrimitive.Content.Props) {
	return (
		<DrawerPrimitive.Content
			className={cn(className, styles.Popup)}
			{...props}
		/>
	)
}

export function Title({ className, ...props }: DrawerPrimitive.Title.Props) {
	return (
		<DrawerPrimitive.Title className={cn(className, styles.Title)} {...props} />
	)
}

export function Description({
	className,
	...props
}: DrawerPrimitive.Description.Props) {
	return (
		<DrawerPrimitive.Description
			className={cn(className, styles.Description)}
			{...props}
		/>
	)
}

export function Popup({ className, ...props }: DrawerPrimitive.Popup.Props) {
	return (
		<DrawerPrimitive.Popup className={cn(className, styles.Popup)} {...props} />
	)
}

export function Close({ className, ...props }: DrawerPrimitive.Close.Props) {
	return (
		<DrawerPrimitive.Close className={cn(className, styles.Close)} {...props} />
	)
}

export function Actions({ className, ...props }: React.ComponentProps<'div'>) {
	return <div className={cn(className, styles.Actions)} {...props} />
}
