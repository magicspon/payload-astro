import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'
import * as Collapsible from '.'

const meta = {
	title: 'ui/Collapsible',
	component: Collapsible.Root,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof Collapsible.Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<Collapsible.Root style={{ width: '320px' }}>
			<Collapsible.Trigger
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '100%',
					padding: '8px 0',
					background: 'none',
					border: 'none',
					cursor: 'pointer',
					fontWeight: 600,
				}}
			>
				{faker.lorem.words(3)}
				<span>↕</span>
			</Collapsible.Trigger>
			<Collapsible.Content style={{ padding: '8px 0' }}>
				<p style={{ margin: 0 }}>{faker.lorem.paragraph()}</p>
			</Collapsible.Content>
		</Collapsible.Root>
	),
}

export const OpenByDefault: Story = {
	render: () => (
		<Collapsible.Root defaultOpen style={{ width: '320px' }}>
			<Collapsible.Trigger
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					width: '100%',
					padding: '8px 0',
					background: 'none',
					border: 'none',
					cursor: 'pointer',
					fontWeight: 600,
				}}
			>
				{faker.lorem.words(3)}
				<span>↕</span>
			</Collapsible.Trigger>
			<Collapsible.Content style={{ padding: '8px 0' }}>
				<p style={{ margin: 0 }}>{faker.lorem.paragraph()}</p>
			</Collapsible.Content>
		</Collapsible.Root>
	),
}

export const MultipleSections: Story = {
	render: () => (
		<div
			style={{
				width: '320px',
				display: 'flex',
				flexDirection: 'column',
				gap: '4px',
			}}
		>
			{Array.from({ length: 3 }, (_, i) => (
				<Collapsible.Root key={i}>
					<Collapsible.Trigger
						style={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							width: '100%',
							padding: '8px 0',
							background: 'none',
							border: 'none',
							borderBottom: '1px solid #e5e5e5',
							cursor: 'pointer',
							fontWeight: 600,
						}}
					>
						{faker.lorem.words(3)}
						<span>↕</span>
					</Collapsible.Trigger>
					<Collapsible.Content style={{ padding: '8px 0' }}>
						<p style={{ margin: 0 }}>{faker.lorem.sentences(2)}</p>
					</Collapsible.Content>
				</Collapsible.Root>
			))}
		</div>
	),
}
