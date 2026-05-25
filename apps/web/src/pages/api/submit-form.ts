import type { APIRoute } from 'astro'

const PAYLOAD_API_URL = import.meta.env.CMS_URL

export const POST: APIRoute = async ({ request }) => {
	try {
		const formData = await request.formData()

		// Forward request headers for IP/user-agent detection
		const userAgent = request.headers.get('user-agent') ?? ''
		const forwardedFor = request.headers.get('x-forwarded-for')
		const ipAddress = forwardedFor?.split(',')[0]?.trim() ?? ''

		// Add headers to formData for the Payload endpoint
		formData.set('_userAgent', userAgent)
		formData.set('_ipAddress', ipAddress)

		const response = await fetch(
			`${PAYLOAD_API_URL}/api/submissions/${formData.get('id')}`,
			{
				method: 'POST',
				body: formData,
			},
		)

		const result = await response.json()

		return new Response(JSON.stringify(result), {
			status: response.status,
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		console.error('Form submission error:', error)
		return new Response(
			JSON.stringify({
				success: false,
				message: 'An error occurred while processing the form',
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } },
		)
	}
}
