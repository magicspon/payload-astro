'use client'

import {
	QueryClient,
	QueryClientProvider as TanStackQueryClientProvider,
	isServer,
} from '@tanstack/react-query'

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
		},
	})
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
	if (isServer) {
		return makeQueryClient()
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient()
		return browserQueryClient
	}
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient()

	return (
		<TanStackQueryClientProvider client={queryClient}>
			{children}
		</TanStackQueryClientProvider>
	)
}

export function withQueryProvider<T>(Component: React.ComponentType<T>) {
	return function WithQueryProvider(props: any) {
		return (
			<QueryProvider>
				<Component {...props} />
			</QueryProvider>
		)
	}
}
