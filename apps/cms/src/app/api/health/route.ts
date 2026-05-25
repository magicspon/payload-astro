import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
	try {
		// Basic health check - server is responding
		const healthCheck = {
			status: 'ok',
			timestamp: new Date().toISOString(),
			uptime: process.uptime(),
		}

		return NextResponse.json(healthCheck, { status: 200 })
	} catch (error) {
		return NextResponse.json(
			{
				status: 'error',
				timestamp: new Date().toISOString(),
				error: error instanceof Error ? error.message : 'Unknown error',
			},
			{ status: 503 },
		)
	}
}
