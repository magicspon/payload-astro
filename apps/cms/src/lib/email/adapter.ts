import type { EmailAdapter, SendEmailOptions } from 'payload'
import { APIError } from 'payload'
import { usesend } from './usesend'

export type UseSendAdapterArgs = {
	defaultFromAddress: string
	defaultFromName: string
}

type UseSendAdapter = EmailAdapter<UseSendResponse>

type UseSendError = {
	message: string
	code: string
}

type UseSendResponse = { emailId?: string } | UseSendError

/**
 * Email adapter for [UseSend](https://usesend.com) REST API
 */
export const useSendAdapter = (args: UseSendAdapterArgs): UseSendAdapter => {
	const { defaultFromAddress, defaultFromName } = args

	const adapter: UseSendAdapter = () => ({
		name: 'usesend-rest',
		defaultFromAddress,
		defaultFromName,
		sendEmail: async (message) => {
			if (!usesend) {
				throw new APIError(
					'UseSend client not initialized - missing API key',
					500,
				)
			}

			// Map the Payload email options to UseSend email options
			const sendEmailOptions = mapPayloadEmailToUseSendEmail(
				message,
				defaultFromAddress,
				defaultFromName,
			)

			const { data, error } = await usesend.emails.send(sendEmailOptions)

			if (data && data.emailId) {
				return { emailId: data.emailId }
			} else {
				const formattedError = error
					? `Error sending email: ${error.code} - ${error.message}`
					: 'Error sending email: Unknown error'

				throw new APIError(formattedError, 500)
			}
		},
	})

	return adapter
}

function mapPayloadEmailToUseSendEmail(
	message: SendEmailOptions,
	defaultFromAddress: string,
	defaultFromName: string,
): UseSendEmailOptions {
	return {
		// Required
		from: mapFromAddress(message.from, defaultFromName, defaultFromAddress),
		subject: message.subject ?? '',
		to: mapAddresses(message.to),

		// Other To fields
		bcc: mapAddresses(message.bcc),
		cc: mapAddresses(message.cc),
		replyTo: mapAddresses(message.replyTo),

		// Optional
		attachments: mapAttachments(message.attachments),
		html: message.html?.toString() || '',
		text: message.text?.toString() || '',
	} as UseSendEmailOptions
}

function mapFromAddress(
	address: SendEmailOptions['from'],
	defaultFromName: string,
	defaultFromAddress: string,
): UseSendEmailOptions['from'] {
	if (!address) {
		return `${defaultFromName} <${defaultFromAddress}>`
	}

	if (typeof address === 'string') {
		return address
	}

	return `${address.name} <${address.address}>`
}

function mapAddresses(
	addresses: SendEmailOptions['to'],
): UseSendEmailOptions['to'] {
	if (!addresses) {
		return ''
	}

	if (typeof addresses === 'string') {
		return addresses
	}

	if (Array.isArray(addresses)) {
		return addresses.map((address) =>
			typeof address === 'string' ? address : address.address,
		)
	}

	return [addresses.address]
}

function mapAttachments(
	attachments: UseSendEmailOptions['attachments'],
): UseSendEmailOptions['attachments'] {
	if (!attachments) {
		return []
	}

	return attachments.map((attachment) => {
		if (!attachment.filename || !attachment.content) {
			throw new APIError('Attachment is missing filename or content', 400)
		}

		if (typeof attachment.content === 'string') {
			return {
				content: attachment.content,
				filename: attachment.filename,
			}
		}

		// @ts-ignore this might be a buffer but the types start complaining
		if (attachment.content instanceof Buffer) {
			return {
				content: (attachment.content as Buffer).toString('base64'),
				filename: attachment.filename,
			}
		}

		throw new APIError('Attachment content must be a string or a buffer', 400)
	})
}

type UseSendEmailOptions = {
	/**
	 * Filename and content of attachments
	 */
	attachments?: Attachment[]
	/**
	 * Blind carbon copy recipient email address. For multiple addresses, send as an array of strings.
	 */
	bcc?: string | string[]

	/**
	 * Carbon copy recipient email address. For multiple addresses, send as an array of strings.
	 */
	cc?: string | string[]
	/**
	 * Sender email address. To include a friendly name, use the format `"Your Name <sender@domain.com>"`
	 */
	from: string
	/**
	 * Custom headers to add to the email.
	 */
	headers?: Record<string, string>
	/**
	 * The HTML version of the message.
	 */
	html?: string
	/**
	 * Reply-to email address. For multiple addresses, send as an array of strings.
	 */
	replyTo?: string | string[]
	/**
	 * Email subject.
	 */
	subject: string
	/**
	 * The plain text version of the message.
	 */
	text?: string
	/**
	 * Recipient email address. For multiple addresses, send as an array of strings.
	 */
	to: string | string[]
}

type Attachment = {
	/** Content of an attached file (base64 encoded string) */
	content: string
	/** Name of attached file */
	filename: string
}
