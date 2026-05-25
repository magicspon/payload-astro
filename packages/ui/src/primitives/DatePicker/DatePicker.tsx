'use client'

import { Calendar } from '@ui/primitives/Calendar'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from '@ui/primitives/InputGroup'
import { Popover, PopoverContent, PopoverTrigger } from '@ui/primitives/Popover'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'
import styles from './DatePicker.module.css'

export interface DatePickerProps {
	id?: string
	/** Formatted date string as returned by onChange (e.g. "01 June 2025"), or "" for no date. */
	value?: string
	onChange?: (value: string) => void
	onBlur?: () => void
	placeholder?: string
	disabled?: boolean
}

function formatDate(date: Date | undefined): string {
	if (!date) return ''
	return date.toLocaleDateString('en-GB', {
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	})
}

function isValidDate(date: Date | undefined): boolean {
	return !!date && !isNaN(date.getTime())
}

/** Parse a formatted display string (e.g. "01 June 2025") back to a Date. */
function parseDisplayDate(str: string): Date | undefined {
	if (!str) return undefined
	const d = new Date(str)
	return isValidDate(d) ? d : undefined
}

export function DatePicker({
	id,
	value,
	onChange,
	onBlur,
	placeholder = 'DD MMMM YYYY',
	disabled,
}: DatePickerProps) {
	const isControlled = value !== undefined

	// open and month are always internal — they don't need to escape the component
	const [open, setOpen] = React.useState(false)
	const [month, setMonth] = React.useState<Date | undefined>(() => {
		if (isControlled) return parseDisplayDate(value)
		return new Date('2025-06-01')
	})

	// Uncontrolled internal state — only used when value prop is not provided
	const initialDate = new Date('2025-06-01')
	const [internalDate, setInternalDate] = React.useState<Date | undefined>(
		isControlled ? undefined : initialDate,
	)
	const [internalValue, setInternalValue] = React.useState(
		isControlled ? '' : formatDate(initialDate),
	)

	const displayValue = isControlled ? value : internalValue
	const selectedDate = isControlled ? parseDisplayDate(value) : internalDate

	function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
		const raw = e.target.value
		const parsed = new Date(raw)
		if (!isControlled) {
			setInternalValue(raw)
			if (isValidDate(parsed)) {
				setInternalDate(parsed)
				setMonth(parsed)
			}
		} else if (isValidDate(parsed)) {
			setMonth(parsed)
		}
		onChange?.(raw)
	}

	function handleSelect(date: Date | undefined) {
		const formatted = formatDate(date)
		if (!isControlled) {
			setInternalDate(date)
			setInternalValue(formatted)
		}
		setMonth(date)
		onChange?.(formatted)
		setOpen(false)
	}

	return (
		<InputGroup>
			<InputGroupInput
				id={id}
				value={displayValue}
				className={styles.input}
				placeholder={placeholder}
				disabled={disabled}
				onChange={handleTextChange}
				onBlur={onBlur}
				onKeyDown={(e) => {
					if (e.key === 'ArrowDown') {
						e.preventDefault()
						setOpen(true)
					}
				}}
			/>
			<InputGroupAddon align="inline-end">
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger
						render={
							<InputGroupButton
								variant="ghost"
								size="icon-xs"
								aria-label="Select date"
								disabled={disabled}
							/>
						}
					>
						<CalendarIcon />
						<span className="sr-only">Select date</span>
					</PopoverTrigger>
					<PopoverContent
						className="w-auto overflow-hidden p-0"
						align="end"
						alignOffset={-8}
						sideOffset={10}
					>
						<Calendar
							mode="single"
							selected={selectedDate}
							month={month}
							onMonthChange={setMonth}
							captionLayout="dropdown"
							onSelect={handleSelect}
						/>
					</PopoverContent>
				</Popover>
			</InputGroupAddon>
		</InputGroup>
	)
}
