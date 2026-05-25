import { faker } from '@faker-js/faker'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@ui/primitives/Button'
import {
	Bell,
	CreditCard,
	LogOut,
	MoreHorizontal,
	Settings,
	User,
} from 'lucide-react'
import { useState } from 'react'
import * as React from 'react'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '.'

const meta = {
	title: 'ui/DropdownMenu',
	component: DropdownMenu,
	parameters: { layout: 'centered' },
	tags: ['autodocs'],
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				Open menu
			</DropdownMenuTrigger>
			<DropdownMenuContent style={{ minWidth: '200px' }}>
				<DropdownMenuItem>
					<User size={16} />
					{faker.lorem.words(2)}
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Settings size={16} />
					{faker.lorem.words(2)}
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					<LogOut size={16} />
					Sign out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

export const WithGroups: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				{faker.person.firstName()}
			</DropdownMenuTrigger>
			<DropdownMenuContent style={{ minWidth: '220px' }}>
				<DropdownMenuGroup>
					<DropdownMenuLabel>{faker.internet.email()}</DropdownMenuLabel>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<User size={16} />
						Profile
						<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<CreditCard size={16} />
						Billing
						<DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Settings size={16} />
						Settings
						<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<Bell size={16} />
						Notifications
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					<LogOut size={16} />
					Log out
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}

export const WithCheckboxItems: Story = {
	render: () => {
		const [showStatus, setShowStatus] = useState(true)
		const [showActivity, setShowActivity] = useState(false)
		const [showNotifications, setShowNotifications] = useState(true)

		return (
			<DropdownMenu>
				<DropdownMenuTrigger render={<Button variant="outline" />}>
					View options
				</DropdownMenuTrigger>
				<DropdownMenuContent style={{ minWidth: '200px' }}>
					<DropdownMenuGroup>
						<DropdownMenuLabel>Display</DropdownMenuLabel>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuCheckboxItem
						checked={showStatus}
						onCheckedChange={setShowStatus}
					>
						Show status bar
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={showActivity}
						onCheckedChange={setShowActivity}
					>
						Show activity
					</DropdownMenuCheckboxItem>
					<DropdownMenuCheckboxItem
						checked={showNotifications}
						onCheckedChange={setShowNotifications}
					>
						Show notifications
					</DropdownMenuCheckboxItem>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	},
}

export const WithRadioItems: Story = {
	render: () => {
		const positions = ['Top', 'Bottom', 'Right']
		const [position, setPosition] = useState('Bottom')

		return (
			<DropdownMenu>
				<DropdownMenuTrigger render={<Button variant="outline" />}>
					Panel position
				</DropdownMenuTrigger>
				<DropdownMenuContent style={{ minWidth: '180px' }}>
					<DropdownMenuGroup>
						<DropdownMenuLabel>Position</DropdownMenuLabel>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
						{positions.map((pos) => (
							<DropdownMenuRadioItem key={pos} value={pos}>
								{pos}
							</DropdownMenuRadioItem>
						))}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		)
	},
}

export const WithSubmenu: Story = {
	render: () => (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant="outline" />}>
				<MoreHorizontal size={16} />
			</DropdownMenuTrigger>
			<DropdownMenuContent style={{ minWidth: '200px' }}>
				<DropdownMenuItem>{faker.lorem.words(2)}</DropdownMenuItem>
				<DropdownMenuItem>{faker.lorem.words(2)}</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>More options</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuItem>{faker.lorem.words(2)}</DropdownMenuItem>
						<DropdownMenuItem>{faker.lorem.words(2)}</DropdownMenuItem>
						<DropdownMenuItem>{faker.lorem.words(2)}</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuSub>
				<DropdownMenuSeparator />
				<DropdownMenuItem variant="destructive">
					{faker.lorem.words(2)}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	),
}
