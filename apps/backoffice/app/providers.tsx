'use client';

import { QueryProvider } from '@/lib/query';
import { type ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Client-side providers wrapper
 *
 * Wraps the app with necessary client-side providers:
 * - React Query for data fetching and optimistic updates
 */
export function Providers({ children }: ProvidersProps) {
  return <QueryProvider>{children}</QueryProvider>;
}
