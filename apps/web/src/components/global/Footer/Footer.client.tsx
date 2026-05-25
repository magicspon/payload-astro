import styles from './Footer.module.css'

import * as React from 'react'

type TElementProps = React.ComponentProps<'div'>

export type TFooterProps = TElementProps & {
	//
}

export function Footer(props: TFooterProps) {
	return <div data-testid="Footer" {...props} />
}
