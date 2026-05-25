import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'
import { IceCreamCone } from 'lucide-react'
import * as React from 'react'
import { Button } from '.'

const meta = {
	title: 'ui/Button',
	component: Button,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: [
				'default',
				'outline',
				'secondary',
				'ghost',
				'destructive',
				'link',
			],
		},
		size: {
			control: 'select',
			options: [
				'default',
				'xs',
				'sm',
				'lg',
				'icon',
				'icon-xs',
				'icon-sm',
				'icon-lg',
			],
		},
	},
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		children: faker.lorem.words(2),
		variant: 'default',
	},
}

export const Outline: Story = {
	args: {
		children: faker.lorem.words(2),
		variant: 'outline',
	},
}

export const Secondary: Story = {
	args: {
		children: faker.lorem.words(2),
		variant: 'secondary',
	},
}

export const Ghost: Story = {
	args: {
		children: faker.lorem.words(2),
		variant: 'ghost',
	},
}

export const Destructive: Story = {
	args: {
		children: faker.lorem.words(2),
		variant: 'destructive',
	},
}

export const Link: Story = {
	args: {
		children: faker.lorem.words(2),
		variant: 'link',
	},
}

export const Disabled: Story = {
	args: {
		children: faker.lorem.words(2),
		disabled: true,
	},
}

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
			{(
				[
					'default',
					'outline',
					'secondary',
					'ghost',
					'destructive',
					'link',
				] as const
			).map((variant) => (
				<Button key={variant} variant={variant}>
					{variant}
				</Button>
			))}
		</div>
	),
}

export const AllSizes: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				gap: '8px',
				alignItems: 'center',
				flexWrap: 'wrap',
			}}
		>
			{(['xs', 'sm', 'default', 'lg'] as const).map((size) => (
				<Button key={size} size={size}>
					{size}
				</Button>
			))}
		</div>
	),
}

export const Icon: Story = {
	render: () => (
		<div className="grid gap-4">
			{(
				[
					'default',
					'outline',
					'secondary',
					'ghost',
					'destructive',
					'link',
				] as const
			).map((variant) => (
				<div key={variant} className="flex gap-4">
					{(
						['xs', 'sm', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'] as const
					).map((size) => (
						<Button variant={variant} icon key={size} size={size}>
							<IceCreamCone />
						</Button>
					))}
				</div>
			))}
		</div>
	),
}
