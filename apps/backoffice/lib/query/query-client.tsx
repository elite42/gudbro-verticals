'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

/**
 * React Query Provider for the backoffice app
 *
 * Provides:
 * - Automatic caching of server data
 * - Background refetching
 * - Optimistic updates support
 * - Request deduplication
 */

// Default options for all queries
const defaultQueryOptions = {
  queries: {
    // Stale time: how long data is considered "fresh"
    staleTime: 1000 * 60 * 5, // 5 minutes
    // Cache time: how long to keep unused data in cache
    gcTime: 1000 * 60 * 30, // 30 minutes
    // Retry failed requests
    retry: 1,
    // Don't refetch on window focus by default (can be enabled per-query)
    refetchOnWindowFocus: false,
  },
  mutations: {
    // Retry mutations once on failure
    retry: 1,
  },
};

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  // Create QueryClient once per component lifecycle
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: defaultQueryOptions,
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

// Export for direct access when needed
export { QueryClient };
