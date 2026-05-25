import { Combobox as PrimitiveCombobox } from '@base-ui/react/combobox'
import { cn } from '@ui/utils/cn'
import styles from './Combobox.module.css'

export const Root = PrimitiveCombobox.Root
export const Portal = PrimitiveCombobox.Portal
export const Empty = PrimitiveCombobox.Empty
export const Value = PrimitiveCombobox.Value

export function InputGroup({
	className,
	...props
}: PrimitiveCombobox.InputGroup.Props) {
	return (
		<PrimitiveCombobox.InputGroup
			className={cn(className, styles.InputGroup)}
			{...props}
		/>
	)
}

export function Input({ className, ...props }: PrimitiveCombobox.Input.Props) {
	return (
		<PrimitiveCombobox.Input
			className={cn(className, styles.Input)}
			{...props}
		/>
	)
}

export function Clear({ className, ...props }: PrimitiveCombobox.Clear.Props) {
	return (
		<PrimitiveCombobox.Clear
			className={cn(className, styles.Clear)}
			{...props}
		/>
	)
}

export function Trigger({
	className,
	...props
}: PrimitiveCombobox.Trigger.Props) {
	return (
		<PrimitiveCombobox.Trigger
			className={cn(className, styles.Trigger)}
			{...props}
		/>
	)
}

export function Positioner({
	className,
	...props
}: PrimitiveCombobox.Positioner.Props) {
	return (
		<PrimitiveCombobox.Positioner
			className={cn(className, styles.Positioner)}
			{...props}
		/>
	)
}

export function Popup({ className, ...props }: PrimitiveCombobox.Popup.Props) {
	return (
		<PrimitiveCombobox.Popup
			className={cn(className, styles.Popup)}
			{...props}
		/>
	)
}

export function List({ className, ...props }: PrimitiveCombobox.List.Props) {
	return (
		<PrimitiveCombobox.List className={cn(className, styles.List)} {...props} />
	)
}

export function Item({ className, ...props }: PrimitiveCombobox.Item.Props) {
	return (
		<PrimitiveCombobox.Item className={cn(className, styles.Item)} {...props} />
	)
}

export function ItemIndicator({
	className,
	...props
}: PrimitiveCombobox.ItemIndicator.Props) {
	return (
		<PrimitiveCombobox.ItemIndicator
			className={cn(className, styles.ItemIndicator)}
			{...props}
		/>
	)
}

export function ItemText({
	className,
	...props
}: React.ComponentProps<'span'>) {
	return <span className={cn(className, styles.ItemText)} {...props} />
}
