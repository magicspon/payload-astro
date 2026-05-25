import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import { Skeleton } from '.'

const meta = {
	title: 'ui/Skeleton',
	component: Skeleton,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	args: {
		style: { width: '200px', height: '20px' },
	},
}

export const Card: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '12px',
				width: '320px',
			}}
		>
			<Skeleton
				style={{ width: '100%', height: '160px', borderRadius: '8px' }}
			/>
			<Skeleton style={{ width: '60%', height: '20px', borderRadius: '4px' }} />
			<Skeleton style={{ width: '40%', height: '16px', borderRadius: '4px' }} />
			<div style={{ display: 'flex', gap: '8px' }}>
				<Skeleton
					style={{ width: '80px', height: '32px', borderRadius: '4px' }}
				/>
				<Skeleton
					style={{ width: '80px', height: '32px', borderRadius: '4px' }}
				/>
			</div>
		</div>
	),
}

export const ListItems: Story = {
	render: () => (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '16px',
				width: '320px',
			}}
		>
			{Array.from({ length: 4 }).map((_, i) => (
				<div
					key={i}
					style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
				>
					<Skeleton
						style={{
							width: '40px',
							height: '40px',
							borderRadius: '50%',
							flexShrink: 0,
						}}
					/>
					<div
						style={{
							flex: 1,
							display: 'flex',
							flexDirection: 'column',
							gap: '8px',
						}}
					>
						<Skeleton
							style={{ width: '70%', height: '16px', borderRadius: '4px' }}
						/>
						<Skeleton
							style={{ width: '50%', height: '12px', borderRadius: '4px' }}
						/>
					</div>
				</div>
			))}
		</div>
	),
}
