import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import * as React from 'react'

export interface TThemeProps extends useRender.ComponentProps<'div'> {
	theme?: 'light' | 'dark' | 'primary' | 'secondary' | 'tertiary' | null
}

export function Theme(props: TThemeProps) {
	const { render, theme, ...otherProps } = props

	const defaultProps: useRender.ElementProps<'div'> & {
		'data-theme': TThemeProps['theme']
	} = {
		'data-theme': theme,
	}

	const element = useRender({
		defaultTagName: 'div',
		render,
		props: mergeProps<'div'>(defaultProps, otherProps),
	})

	return element
}
