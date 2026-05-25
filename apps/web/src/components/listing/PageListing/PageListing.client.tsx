import styles from './PageListing.module.css'

import * as React from 'react'

type TElementProps = React.ComponentProps<'div'>

export type TPageListingProps = TElementProps & {
	//
}

export function PageListing(props: TPageListingProps) {
	return <div data-testid="PageListing" {...props} />
}
