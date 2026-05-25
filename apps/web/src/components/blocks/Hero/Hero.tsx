
import * as React from 'react'

type TElementProps = React.ComponentProps<'div'>

export type THeroProps = TElementProps & {
	//
}

export function Hero(props: THeroProps) {
	return <div data-testid="Hero" {...props} />
}
