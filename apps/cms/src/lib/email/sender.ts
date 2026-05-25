import { IS_DEV } from '@/utils/env'
import { usesend } from './usesend'

export type SendEmailOptions = {
	to: string | string[]
	subject?: string
	text?: string | null
	html?: string | null
	replyTo?: string | string[]
	cc?: string | string[]
	bcc?: string | string[]
	from?: string
}

export async function sender(
	options: SendEmailOptions,
): Promise<{ emailId?: string } | null> {
	if (IS_DEV) {
		console.info(`Mock email in development mode`)
		console.info(`Sending email: ${options.subject}`, options.to)
		return { emailId: '_' }
	}

	if (!usesend) {
		console.error('UseSend client not initialized - missing API key')
		return null
	}

	const { data, error } = await usesend.emails.send({
		from: options.from ?? 'no-reply@spon.cloud',
		to: options.to,
		subject: options.subject ?? 'Hello world',
		text: options.text ?? 'hello',
		// react: options.react,
		html: options.html,
	})

	if (error) {
		return null
	}

	return data
}
