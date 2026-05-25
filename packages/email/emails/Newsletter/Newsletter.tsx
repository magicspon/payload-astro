import { Footer } from '../../shared/EmailUi/EmailUi'
import * as style from '../../shared/style'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Body, Container, Head, Html, Preview } from '@react-email/components'
import { Campaign } from '@spon/payload-types'
import * as React from 'react'

type NewsletterProps = Pick<Campaign, 'content' | 'previewText'> & {
	linkUrl: string
	baseUrl: string
}

export function Newsletter({
	// linkUrl,
	baseUrl = 'http://localhost:3000',
	content,
	previewText,
}: NewsletterProps) {
	return (
		<Html>
			<Head />
			<Body style={style.main}>
				<Preview>{previewText ?? ''}</Preview>
				<Container style={style.container}>
					{content?.map((item) => (
						<React.Fragment key={item.id}>
							{item.blockType === 'emailTextBlock' && (
								<RichText data={item.text!} />
							)}
						</React.Fragment>
					))}
					<Footer baseUrl={baseUrl!} />
				</Container>
			</Body>
		</Html>
	)
}

Newsletter.PreviewProps = {
	baseUrl: 'http://localhost:3000',
	linkUrl: '#0',
	content: [],
} as NewsletterProps

export default Newsletter
