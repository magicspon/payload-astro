import type {
	DefaultNodeTypes,
	SerializedBlockNode,
} from '@payloadcms/richtext-lexical'
import {
	type JSXConvertersFunction,
	RichText,
} from '@payloadcms/richtext-lexical/react'
import * as React from 'react'
import type { Buttons, Hero as HeroProps } from '@spon/payload-types'
import { Inline } from '@spon/ui/layout/Inline'
import { ButtonLink } from '@spon/ui/primitives/Button'
import { cn } from '@spon/ui/utils/cn'
import { Theme } from '~/components/ui/Theme'
import { parseButtonProps } from '~/utils/parseButtonProps'
import styles from './Hero.module.css'

export type THeroProps = HeroProps

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<Buttons>

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
	defaultConverters,
}) => ({
	...defaultConverters,
	blocks: {
		buttons: ({ node }) => {
			const buttons = node.fields.buttons

			if (!buttons || buttons.length === 0) return null

			return (
				<Inline className={styles.buttons}>
					{buttons?.map(({ id, button }) => (
						<ButtonLink key={id} {...parseButtonProps(button)}>
							{button.text}
						</ButtonLink>
					))}
				</Inline>
			)
		},
	},
})

export function Hero({ content, variant, title, theme, ...props }: THeroProps) {
	console.log({ props })
	return (
		<Theme
			theme={theme}
			className={cn(styles.container, 'prose')}
			data-variant={variant}
			data-testid="Hero"
			render={<section />}
		>
			<h1 className={styles.title}>{title}</h1>
			{content && (
				<RichText
					className={styles.copy}
					converters={jsxConverters}
					data={content}
				/>
			)}
		</Theme>
	)
}
