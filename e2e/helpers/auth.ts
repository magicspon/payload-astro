import type { Page } from '@playwright/test'

const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL ?? 'ci-admin@example.com'
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD ?? 'ci-password-123'

/**
 * Log in to the Payload admin panel.
 * Payload with better-auth uses the standard /admin login page.
 */
export async function loginAsAdmin(page: Page) {
	await page.goto('/admin/login')
	await page.waitForLoadState('networkidle')
	await page.getByLabel(/email/i).fill(ADMIN_EMAIL)
	await page.getByLabel(/password/i).fill(ADMIN_PASSWORD)
	await page.getByRole('button', { name: 'Sign In', exact: true }).click()
	// Wait until we've left the login page
	await page.waitForURL((url) => !url.pathname.includes('/login'), { waitUntil: 'networkidle' })
}

/**
 * Navigate to the form collection list.
 */
export async function gotoForms(page: Page) {
	await page.goto('/admin/collections/form', { waitUntil: 'domcontentloaded' })
	// Wait for the list or create button to be visible
	await page.getByRole('link', { name: /create new/i }).first().waitFor({ state: 'visible' })
}

/**
 * Create a new form and land on its edit page.
 * Returns the page already on the Canvas tab.
 */
export async function createNewForm(page: Page, title = 'Test Form') {
	await gotoForms(page)
	await page.getByRole('link', { name: /create new/i }).first().click()
	// Wait for the form edit page - Title field is in the sidebar
	await page.getByRole('textbox', { name: /title/i }).waitFor({ state: 'visible' })
	await page.getByRole('textbox', { name: /title/i }).fill(title)
	// Switch to the Canvas tab (Payload renders collection tabs as buttons)
	await page.getByRole('button', { name: /^canvas$/i }).click()
	// Wait for the canvas to be visible
	await page.locator('[data-testid="form-canvas"]').waitFor({ state: 'visible' })
}
