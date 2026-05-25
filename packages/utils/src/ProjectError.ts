type ErrorName =
	// Input/Validation Errors (400 range)
	| 'INVALID_INPUT' // Generic input validation error
	| 'MISSING_REQUIRED_FIELD' // Required field not provided
	| 'INVALID_FORMAT' // Data format is incorrect
	| 'VALIDATION_ERROR' // Failed business rule validation
	| 'UNKNOWN_ERROR' // no one knows

	// Authentication/Authorization (400-403)
	| 'UNAUTHORIZED' // Not authenticated
	| 'FORBIDDEN' // Authenticated but not authorized
	| 'INVALID_CREDENTIALS' // Wrong username/password
	| 'TOKEN_EXPIRED' // Auth token expired

	// Resource Errors (404)
	| 'NOT_FOUND' // Resource doesn't exist
	| 'ALREADY_EXISTS' // Duplicate resource
	| 'RESOURCE_DELETED' // Resource no longer available

	// State Errors
	| 'INVALID_STATE' // Operation not valid in current state
	| 'CONFLICT' // Request conflicts with current state
	| 'RESOURCE_LOCKED' // Resource is currently locked

	// External Service Errors
	| 'SERVICE_UNAVAILABLE' // External service is down
	| 'EXTERNAL_API_ERROR' // External API returned an error
	| 'TIMEOUT' // Request timed out

	// System/Internal Errors (500 range)
	| 'INTERNAL_ERROR' // Unexpected system error
	| 'DATABASE_ERROR' // Database operation failed
	| 'NETWORK_ERROR' // Network communication failed

	// Rate Limiting/Quota
	| 'RATE_LIMIT_EXCEEDED' // Too many requests
	| 'QUOTA_EXCEEDED' // Usage quota exceeded

	// Data Processing
	| 'PROCESSING_ERROR' // Error during data processing
	| 'TRANSFORMATION_ERROR' // Data transformation failed

	// Business Logic
	| 'BUSINESS_RULE_VIOLATION' // Violates business rules
	| 'INSUFFICIENT_FUNDS' // Not enough balance/credits
	| 'OPERATION_NOT_SUPPORTED' // Feature not supported

export class ProjectError extends Error {
	override name: ErrorName
	override message: string
	override cause: unknown

	constructor({
		code,
		message,
		cause,
	}: {
		code: ErrorName
		message: string
		cause?: unknown
	}) {
		super()
		this.message = message
		this.cause = cause
		this.name = code
	}
}
