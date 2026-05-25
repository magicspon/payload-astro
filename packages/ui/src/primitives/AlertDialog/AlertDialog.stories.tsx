import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@ui/primitives/Button'
import * as React from 'react'
import {
	Action,
	Cancel,
	Description,
	Footer,
	Header,
	Popup,
	Root,
	Title,
	Trigger,
} from '.'

const meta = {
	title: 'ui/AlertDialog',
	component: Root,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<Root>
			<Trigger render={<Button variant="outline" />}>Show alert</Trigger>
			<Popup>
				<Header>
					<Title>{faker.lorem.words(4)}</Title>
					<Description>{faker.lorem.sentence()}</Description>
				</Header>
				<Footer>
					<Cancel render={<Button variant="outline" />}>Cancel</Cancel>
					<Action render={<Button />}>Continue</Action>
				</Footer>
			</Popup>
		</Root>
	),
}

export const Destructive: Story = {
	render: () => (
		<Root>
			<Trigger render={<Button variant="destructive" />}>Delete item</Trigger>
			<Popup>
				<Header>
					<Title>Are you absolutely sure?</Title>
					<Description>
						This will permanently delete{' '}
						<strong>{faker.commerce.productName()}</strong>. This action cannot
						be undone.
					</Description>
				</Header>
				<Footer>
					<Cancel render={<Button variant="outline" />}>Cancel</Cancel>
					<Action render={<Button variant="destructive" />}>Delete</Action>
				</Footer>
			</Popup>
		</Root>
	),
}

export const WithLongContent: Story = {
	render: () => (
		<Root>
			<Trigger render={<Button />}>View terms</Trigger>
			<Popup>
				<Header>
					<Title>Terms and conditions</Title>
					<Description>Please read before continuing.</Description>
				</Header>
				<div style={{ padding: '12px 0', fontSize: '14px', lineHeight: '1.6' }}>
					<p>{faker.lorem.paragraph()}</p>
					<p>{faker.lorem.paragraph()}</p>
				</div>
				<Footer>
					<Cancel render={<Button variant="outline" />}>Decline</Cancel>
					<Action render={<Button />}>Accept</Action>
				</Footer>
			</Popup>
		</Root>
	),
}
