'use client'
import { Toast } from '@base-ui/react/toast'
import * as React from 'react'
import styles from './Toast.module.css'

export const Provider = Toast.Provider
export const Portal = Toast.Portal
export const useToastManager = Toast.useToastManager

export function Viewport(props: React.ComponentProps<typeof Toast.Viewport>) {
	return <Toast.Viewport className={styles.Viewport} {...props} />
}

export function List() {
	const { toasts } = Toast.useToastManager()
	return toasts.map((toast) => (
		<Toast.Root key={toast.id} toast={toast} className={styles.Toast}>
			<Toast.Content className={styles.Content}>
				<Toast.Title className={styles.Title} />
				<Toast.Description className={styles.Description} />
				<Toast.Close className={styles.Close} aria-label="Close">
					<XIcon className={styles.Icon} />
				</Toast.Close>
			</Toast.Content>
		</Toast.Root>
	))
}

function XIcon(props: React.ComponentProps<'svg'>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			{...props}
		>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	)
}
