'use client';

/**
 * V2 Orders History Page Route
 *
 * Pagina cronologia ordini con design system v2.
 *
 * @migrazione Fase 4 del piano di unificazione PWA v1 + v2
 */

import { useState, useEffect } from 'react';
import { ConnectedOrderHistoryPage } from '@/components/v2/connected';

export default function V2OrdersPage() {
  const [isDark, setIsDark] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);
  }, []);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  const handleNavigate = (pageId: string) => {
    if (pageId === 'home') {
      window.location.href = '/v2';
    } else if (pageId === 'menu') {
      window.location.href = '/v2/menu';
    } else if (pageId === 'cart') {
      window.location.href = '/v2/cart';
    } else if (pageId === 'favorites') {
      window.location.href = '/v2/favorites';
    } else if (pageId === 'account') {
      window.location.href = '/v2/account';
    }
  };

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div data-theme={isDark ? 'dark' : 'light'}>
      <ConnectedOrderHistoryPage
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        onNavigate={handleNavigate}
        activePage="orders"
      />
    </div>
  );
}
