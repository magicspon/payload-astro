import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import * as React from 'react'
import type { DateRange } from 'react-day-picker'
import { Calendar } from '.'

const meta = {
	title: 'ui/Calendar',
	component: Calendar,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		mode: 'single',
	},
}

export const WithSelectedDate: Story = {
	render: () => {
		const [selected, setSelected] = useState<Date | undefined>(new Date())
		return <Calendar mode="single" selected={selected} onSelect={setSelected} />
	},
}

export const RangeSelection: Story = {
	render: () => {
		const [range, setRange] = useState<DateRange | undefined>()
		return <Calendar mode="range" selected={range} onSelect={setRange} />
	},
}

export const MultipleMonths: Story = {
	args: {
		mode: 'single',
		numberOfMonths: 2,
	},
}

export const DropdownCaption: Story = {
	args: {
		mode: 'single',
		captionLayout: 'dropdown',
		fromYear: 2020,
		toYear: 2030,
	},
}
