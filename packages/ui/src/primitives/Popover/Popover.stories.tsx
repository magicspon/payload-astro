import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@ui/primitives/Button'
import * as React from 'react'
import {
	Popover,
	PopoverContent,
	PopoverDescription,
	PopoverHeader,
	PopoverTitle,
	PopoverTrigger,
} from '.'

const meta = {
	title: 'ui/Popover',
	component: Popover,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger render={<Button variant="outline" />}>
				{faker.lorem.words(2)}
			</PopoverTrigger>
			<PopoverContent>
				<PopoverHeader>
					<PopoverTitle>{faker.lorem.words(3)}</PopoverTitle>
					<PopoverDescription>{faker.lorem.sentence()}</PopoverDescription>
				</PopoverHeader>
				<p style={{ margin: '8px 0 0' }}>{faker.lorem.paragraph()}</p>
			</PopoverContent>
		</Popover>
	),
}

export const TopPlacement: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger render={<Button variant="outline" />}>
				Open (top)
			</PopoverTrigger>
			<PopoverContent side="top">
				<PopoverTitle>{faker.lorem.words(3)}</PopoverTitle>
				<p style={{ margin: '4px 0 0' }}>{faker.lorem.sentence()}</p>
			</PopoverContent>
		</Popover>
	),
}

export const WithActions: Story = {
	render: () => (
		<Popover>
			<PopoverTrigger render={<Button />}>
				{faker.lorem.words(2)}
			</PopoverTrigger>
			<PopoverContent style={{ maxWidth: '280px' }}>
				<PopoverHeader>
					<PopoverTitle>{faker.lorem.words(3)}</PopoverTitle>
					<PopoverDescription>{faker.lorem.sentence()}</PopoverDescription>
				</PopoverHeader>
				<div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
					<Button size="sm">Confirm</Button>
					<Button size="sm" variant="outline">
						Cancel
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	),
}
