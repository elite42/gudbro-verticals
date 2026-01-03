'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initAnalytics, trackPageView } from '@/lib/analytics-service';

/**
 * Analytics Provider
 * Initializes analytics on mount and tracks page views on route changes
 */
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Initialize analytics on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track page views on route changes
  useEffect(() => {
    if (pathname) {
      // Map pathname to page name
      const pageName = getPageName(pathname);
      trackPageView(pageName);
    }
  }, [pathname]);

  return <>{children}</>;
}

/**
 * Get human-readable page name from pathname
 */
function getPageName(pathname: string): string {
  const routes: Record<string, string> = {
    '/': 'Home',
    '/menu': 'Menu',
    '/menu/category': 'Category',
    '/menu/popular': 'Popular Items',
    '/cart': 'Cart',
    '/checkout': 'Checkout',
    '/account': 'Account',
    '/account/orders': 'Order History',
    '/account/favorites': 'Favorites',
    '/account/preferences': 'Preferences',
  };

  // Check for exact match
  if (routes[pathname]) {
    return routes[pathname];
  }

  // Check for dynamic routes
  if (pathname.startsWith('/menu/category/')) {
    const category = pathname.split('/').pop();
    return `Category: ${category}`;
  }

  if (pathname.startsWith('/menu/item/')) {
    return 'Product Detail';
  }

  if (pathname.startsWith('/order/')) {
    return 'Order Confirmation';
  }

  // Default to pathname
  return pathname;
}

export default AnalyticsProvider;
