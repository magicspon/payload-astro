import * as style from '../../shared/style'
import { Link, Text } from '@react-email/components'
import * as React from 'react'

export function Footer({ baseUrl }: { baseUrl: string }) {
	return (
		<>
			<Text style={style.footer}>
				<Link
					href={baseUrl}
					target="_blank"
					style={{ ...style.link, color: '#898989' }}
				>
					Spon Corp
				</Link>
				<br />
				You are receiving this email because you opted in via our site. <br />
				<a href="{{usesend_unsubscribe_url}}">Unsubscribe</a>
			</Text>
		</>
	)
}

export function Hint({ children }: { children: React.ReactNode }) {
	return (
		<Text
			style={{
				...style.text,
				color: '#ababab',
				marginTop: '12px',
				marginBottom: '38px',
			}}
		>
			{children}
		</Text>
	)
}
