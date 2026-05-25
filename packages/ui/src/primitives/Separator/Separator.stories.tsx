import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Separator } from '.'

const meta = {
	title: 'ui/Separator',
	component: Separator,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
	render: () => (
		<div style={{ width: '300px' }}>
			<p>{faker.lorem.sentence()}</p>
			<Separator />
			<p>{faker.lorem.sentence()}</p>
		</div>
	),
}

export const Vertical: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				alignItems: 'center',
				gap: '12px',
				height: '40px',
			}}
		>
			<span>{faker.commerce.productName()}</span>
			<Separator orientation="vertical" style={{ height: '100%' }} />
			<span>{faker.commerce.productName()}</span>
			<Separator orientation="vertical" style={{ height: '100%' }} />
			<span>{faker.commerce.productName()}</span>
		</div>
	),
}
