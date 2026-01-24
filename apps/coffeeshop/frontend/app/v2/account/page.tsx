'use client';

/**
 * V2 Account Page Route
 *
 * Pagina account utente con design system v2.
 * Gestisce profilo, preferenze, ordini e logout.
 *
 * @migrazione Fase 4 del piano di unificazione PWA v1 + v2
 */

import { useState, useEffect } from 'react';
import { AccountPage } from '@/components/v2';

export default function V2AccountPage() {
  const [isDark, setIsDark] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [activePage, setActivePage] = useState('account');

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
    // In produzione, usare Next.js router
    // Per ora, navigazione basata su stato per demo
    if (pageId === 'home') {
      window.location.href = '/v2';
    } else if (pageId === 'menu') {
      window.location.href = '/v2/menu';
    } else if (pageId === 'cart') {
      window.location.href = '/v2/cart';
    } else if (pageId === 'favorites') {
      window.location.href = '/v2/favorites';
    } else if (pageId === 'orders') {
      window.location.href = '/v2/orders';
    } else {
      setActivePage(pageId);
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
      <AccountPage
        isDark={isDark}
        onThemeToggle={handleThemeToggle}
        cartCount={0}
        activePage={activePage}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
