'use client';

/**
 * V2 Cart Page Route
 *
 * Questa route usa i componenti v2 connessi ai servizi v1.
 *
 * @migrazione Fase 3 del piano di unificazione PWA v1 + v2
 */

import { useState, useEffect } from 'react';
import { ConnectedCartPage } from '@/components/v2/connected';

export default function V2CartPage() {
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
    } else if (pageId === 'favorites') {
      window.location.href = '/v2/favorites';
    } else if (pageId === 'orders') {
      window.location.href = '/v2/orders';
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
      <ConnectedCartPage
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        activePage="cart"
        onNavigate={handleNavigate}
      />
    </div>
  );
}
