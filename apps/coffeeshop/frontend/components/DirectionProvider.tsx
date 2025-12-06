'use client';

/**
 * DirectionProvider Component
 *
 * Initializes RTL/LTR direction based on the current language.
 * Should be placed high in the component tree to ensure
 * direction is set before any content renders.
 *
 * This component:
 * - Listens to language changes
 * - Updates document.dir attribute
 * - Adds rtl/ltr class to html element for CSS targeting
 */

import { useDirection } from '@/lib/hooks';

interface DirectionProviderProps {
  children: React.ReactNode;
}

export function DirectionProvider({ children }: DirectionProviderProps) {
  // This hook handles all the direction logic
  // It updates document.dir and document.documentElement classes
  useDirection();

  return <>{children}</>;
}
