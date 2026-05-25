import * as React from 'react'
import styles from './PostListing.module.css'

type TElementProps = React.ComponentProps<'div'>

export type TPostListingProps = TElementProps & {
	//
}

export function PostListing(props: TPostListingProps) {
	return <div data-testid="PostListing" {...props} />
}
