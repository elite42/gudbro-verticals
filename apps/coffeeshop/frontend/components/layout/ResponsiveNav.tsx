'use client';

import React from 'react';
import { DesktopNav } from './DesktopNav';
import { BottomNavLocal } from '../BottomNavLocal';

/**
 * Responsive navigation wrapper component
 *
 * Shows:
 * - Desktop (lg+): Top navigation bar
 * - Mobile/Tablet (<lg): Bottom navigation bar
 *
 * The visibility is controlled via CSS classes (hidden/block with breakpoint prefixes)
 * to avoid hydration mismatches and ensure smooth transitions.
 */
export function ResponsiveNav() {
  return (
    <>
      {/* Desktop Navigation - shown on lg and up */}
      <DesktopNav />

      {/* Mobile/Tablet Navigation - hidden on lg and up */}
      {/* BottomNavLocal already has lg:hidden applied */}
      <BottomNavLocal />
    </>
  );
}

/**
 * Export individual components for flexibility
 */
export { DesktopNav } from './DesktopNav';
