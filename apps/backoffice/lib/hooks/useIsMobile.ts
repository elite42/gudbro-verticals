'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect if the current device is mobile
 * Uses media query for responsive detection
 *
 * @param breakpoint - The breakpoint in pixels (default: 768 for md)
 * @returns boolean indicating if viewport is below breakpoint
 */
export function useIsMobile(breakpoint: number = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check initial state
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Set initial value
    checkMobile();

    // Listen for resize events
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, [breakpoint]);

  return isMobile;
}
