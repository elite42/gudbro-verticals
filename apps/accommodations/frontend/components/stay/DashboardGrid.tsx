'use client';

import type { ReactNode } from 'react';

interface DashboardGridProps {
  children: ReactNode;
  className?: string;
}

/**
 * 2-column CSS grid wrapper for the guest dashboard homepage cards.
 * Renders children in a responsive grid with consistent spacing.
 */
export default function DashboardGrid({ children, className = '' }: DashboardGridProps) {
  return <div className={`grid grid-cols-2 gap-3 px-4 py-4 ${className}`.trim()}>{children}</div>;
}
