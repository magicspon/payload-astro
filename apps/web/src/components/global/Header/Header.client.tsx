import styles from './Header.module.css'

import * as React from 'react'

type TElementProps = React.ComponentProps<'div'>

export type THeaderProps = TElementProps & {
	//
}

export function Header(props: THeaderProps) {
	return <div data-testid="Header" {...props} />
}
