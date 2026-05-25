import { UseSend } from 'usesend-js'
import { env } from '@/env/server'

// Only initialize UseSend if API key is available
// This allows scripts like create-stub to run without email configuration
export const usesend = new UseSend(env.USE_SEND_API_KEY, env.USE_SEND_URL)
