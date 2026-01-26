import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - reduce refetch frequency
      refetchOnWindowFocus: false,
      refetchOnMount: false, // Don't refetch on mount if data exists
      retry: 1, // Reduce retry attempts
      gcTime: 10 * 60 * 1000, // 10 minutes garbage collection
    },
  },
})


