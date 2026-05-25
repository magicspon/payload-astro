import { cn } from '@ui/utils/cn'
import { ChevronDownIcon } from 'lucide-react'
import * as React from 'react'
import styles from './NativeSelect.module.css'

type NativeSelectProps = Omit<React.ComponentProps<'select'>, 'size'> & {
	size?: 'sm' | 'default'
}

function NativeSelect({
	className,
	size = 'default',
	...props
}: NativeSelectProps) {
	return (
		<div
			className={cn(styles.wrapper, className)}
			data-slot="native-select-wrapper"
			data-size={size}
		>
			<select
				data-slot="native-select"
				data-size={size}
				className={styles.select}
				{...props}
			/>
			<ChevronDownIcon
				className={styles.icon}
				aria-hidden="true"
				data-slot="native-select-icon"
			/>
		</div>
	)
}

function NativeSelectOption({ ...props }: React.ComponentProps<'option'>) {
	return <option data-slot="native-select-option" {...props} />
}

function NativeSelectOptGroup({
	className,
	...props
}: React.ComponentProps<'optgroup'>) {
	return (
		<optgroup
			data-slot="native-select-optgroup"
			className={cn(className)}
			{...props}
		/>
	)
}

export { NativeSelect, NativeSelectOptGroup, NativeSelectOption }
