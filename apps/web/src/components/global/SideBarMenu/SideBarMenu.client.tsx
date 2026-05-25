import * as React from 'react'
import { NavigationMenuItem } from '@spon/payload-types'
import styles from './SideBarMenu.module.css'

type TElementProps = React.ComponentProps<'div'>

export type TSideBarMenuProps = TElementProps & {
	items: NavigationMenuItem[]
}

export function SideBarMenu({ items }: TSideBarMenuProps) {
	return (
		<aside data-component="sidebar" className={styles.sidebar}>
			<div className={styles.content}>
				{items.map((item) => (
					<a className={styles.link} key={item.id} href={item.href}>
						{item.title}
					</a>
				))}
			</div>
		</aside>
	)
}
