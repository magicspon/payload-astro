import styles from './TextBlock.module.css'

import * as React from 'react'

type TElementProps = React.ComponentProps<'div'>

export type TTextBlockProps = TElementProps & {
	//
}

export function TextBlock(props: TTextBlockProps) {
	return <div data-testid="TextBlock" {...props} />
}
