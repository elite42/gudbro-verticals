'use client';

import { useState, useEffect } from 'react';

/**
 * Tailwind CSS default breakpoints
 */
const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

type BreakpointKey = keyof typeof BREAKPOINTS;

interface BreakpointState {
  width: number;
  isMobile: boolean; // < 768px (md)
  isTablet: boolean; // >= 768px && < 1024px
  isDesktop: boolean; // >= 1024px (lg)
  isLargeDesktop: boolean; // >= 1280px (xl)

  // Individual breakpoint checks
  isSm: boolean; // >= 640px
  isMd: boolean; // >= 768px
  isLg: boolean; // >= 1024px
  isXl: boolean; // >= 1280px
  is2xl: boolean; // >= 1536px

  // Current breakpoint name
  current: BreakpointKey | 'xs';
}

/**
 * SSR-safe hook for detecting current breakpoint
 *
 * Usage:
 * ```tsx
 * const { isMobile, isDesktop, current } = useBreakpoint();
 *
 * // In JSX
 * {isMobile && <MobileNav />}
 * {isDesktop && <DesktopNav />}
 * ```
 *
 * Note: On SSR, defaults to mobile-first values
 */
export function useBreakpoint(): BreakpointState {
  // Default to mobile-first values for SSR
  const [state, setState] = useState<BreakpointState>({
    width: 0,
    isMobile: true,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    isSm: false,
    isMd: false,
    isLg: false,
    isXl: false,
    is2xl: false,
    current: 'xs',
  });

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const calculateBreakpoint = (): BreakpointState => {
      const width = window.innerWidth;

      const isSm = width >= BREAKPOINTS.sm;
      const isMd = width >= BREAKPOINTS.md;
      const isLg = width >= BREAKPOINTS.lg;
      const isXl = width >= BREAKPOINTS.xl;
      const is2xl = width >= BREAKPOINTS['2xl'];

      // Determine current breakpoint
      let current: BreakpointKey | 'xs' = 'xs';
      if (is2xl) current = '2xl';
      else if (isXl) current = 'xl';
      else if (isLg) current = 'lg';
      else if (isMd) current = 'md';
      else if (isSm) current = 'sm';

      return {
        width,
        isMobile: !isMd, // < 768px
        isTablet: isMd && !isLg, // 768-1023px
        isDesktop: isLg, // >= 1024px
        isLargeDesktop: isXl, // >= 1280px
        isSm,
        isMd,
        isLg,
        isXl,
        is2xl,
        current,
      };
    };

    // Set initial value
    setState(calculateBreakpoint());

    // Debounced resize handler
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setState(calculateBreakpoint());
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return state;
}

/**
 * Get breakpoint value in pixels
 */
export function getBreakpointValue(breakpoint: BreakpointKey): number {
  return BREAKPOINTS[breakpoint];
}

/**
 * Media query string generator for use with matchMedia
 */
export function getMediaQuery(breakpoint: BreakpointKey, type: 'min' | 'max' = 'min'): string {
  const value = BREAKPOINTS[breakpoint];
  return type === 'min' ? `(min-width: ${value}px)` : `(max-width: ${value - 1}px)`;
}
