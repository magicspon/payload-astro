import { EmailAdapter } from 'payload'

// emailAdapters/mockAdapter.ts

export const mockEmailAdapter: EmailAdapter = ({ payload }) => {
	return {
		name: 'mock-email-adapter',
		defaultFromAddress: 'dev@example.com',
		defaultFromName: 'Dev Mode',
		sendEmail: async (message) => {
			console.info('📧 Dev Mode - Email intercepted:', {
				to: message.to,
				from: message.from,
				subject: message.subject,
				html: message.html,
				text: message.text,
			})

			// You can also save to a file or database for inspection
			if (payload.config.debug) {
				payload.logger.info({
					msg: 'Email intercepted in development',
					email: message,
				})
			}

			// Return a mock response
			return {
				messageId: `dev-${Date.now()}`,
				accepted: Array.isArray(message.to) ? message.to : [message.to],
				rejected: [],
			}
		},
	}
}
