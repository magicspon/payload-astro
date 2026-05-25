import type { BasePayload } from 'payload'

let payloadInstance: BasePayload | null = null

export function setPayloadInstance(payload: BasePayload): void {
	payloadInstance = payload
}

export function getPayloadInstance(): BasePayload {
	if (!payloadInstance) {
		throw new Error('Payload not initialized')
	}
	return payloadInstance
}
