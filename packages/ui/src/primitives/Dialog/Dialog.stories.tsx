import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@ui/primitives/Button'
import * as React from 'react'
import {
	Close,
	Description,
	Footer,
	Header,
	Popup,
	Root,
	Title,
	Trigger,
} from '.'

const meta = {
	title: 'ui/Dialog',
	component: Root,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof Root>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<Root>
			<Trigger render={<Button />}>Open dialog</Trigger>
			<Popup>
				<Header>
					<Title>{faker.lorem.words(4)}</Title>
					<Description>{faker.lorem.sentence()}</Description>
				</Header>
				<p>{faker.lorem.paragraph()}</p>
				<Footer>
					<Close render={<Button variant="outline" />}>Cancel</Close>
					<Close render={<Button />}>Confirm</Close>
				</Footer>
			</Popup>
		</Root>
	),
}

export const Destructive: Story = {
	render: () => (
		<Root>
			<Trigger render={<Button variant="destructive" />}>
				Delete account
			</Trigger>
			<Popup>
				<Header>
					<Title>Delete account</Title>
					<Description>
						{faker.lorem.sentence()} This action cannot be undone.
					</Description>
				</Header>
				<p>{faker.lorem.sentences(2)}</p>
				<Footer>
					<Close render={<Button variant="outline" />}>Cancel</Close>
					<Close render={<Button variant="destructive" />}>Delete</Close>
				</Footer>
			</Popup>
		</Root>
	),
}

export const WithForm: Story = {
	render: () => (
		<Root>
			<Trigger render={<Button />}>Edit profile</Trigger>
			<Popup>
				<Header>
					<Title>Edit profile</Title>
					<Description>{faker.lorem.sentence()}</Description>
				</Header>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						gap: '12px',
						padding: '16px 0',
					}}
				>
					<label
						style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
					>
						<span style={{ fontSize: '14px', fontWeight: 500 }}>Name</span>
						<input
							type="text"
							defaultValue={faker.person.fullName()}
							style={{
								padding: '8px',
								border: '1px solid #e5e5e5',
								borderRadius: '4px',
							}}
						/>
					</label>
					<label
						style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
					>
						<span style={{ fontSize: '14px', fontWeight: 500 }}>Email</span>
						<input
							type="email"
							defaultValue={faker.internet.email()}
							style={{
								padding: '8px',
								border: '1px solid #e5e5e5',
								borderRadius: '4px',
							}}
						/>
					</label>
				</div>
				<Footer>
					<Close render={<Button variant="outline" />}>Cancel</Close>
					<Close render={<Button />}>Save changes</Close>
				</Footer>
			</Popup>
		</Root>
	),
}
