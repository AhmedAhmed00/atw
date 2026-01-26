import { Suspense, type PropsWithChildren } from 'react'
import { BrowserRouter } from 'react-router'
import { Provider as ReduxProvider } from 'react-redux'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/core/providers/theme-provider'
import { ErrorBoundary } from '@/core/providers/ErrorBoundary'
import { store } from '@/core/store'
import { queryClient } from '@/core/query'

/**
 * AppProviders
 *
 * Central place to compose all top-level providers:
 * - ErrorBoundary
 * - Redux store
 * - ThemeProvider
 * - React Query client
 * - Router
 */



export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>{children}</BrowserRouter>
          </QueryClientProvider>
        </ThemeProvider>
      </ReduxProvider>
    </ErrorBoundary>
  )
}


