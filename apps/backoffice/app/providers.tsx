'use client';

import { QueryProvider } from '@/lib/query';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { type ReactNode } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';

interface ProvidersProps {
  children: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

/**
 * Client-side providers wrapper
 *
 * Wraps the app with necessary client-side providers:
 * - next-intl for internationalization
 * - React Query for data fetching and optimistic updates
 * - Radix UI TooltipProvider for contextual tooltips
 */
export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <QueryProvider>
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
      </QueryProvider>
    </NextIntlClientProvider>
  );
}
