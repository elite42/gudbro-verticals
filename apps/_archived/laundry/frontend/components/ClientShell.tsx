'use client';

import { useState, useEffect } from 'react';
import { BottomNav, type NavItem } from '@gudbro/ui';
import LaundryForm from './LaundryForm';

const STORAGE_KEY = 'gudbro-laundry-bag';

function getBagCount(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return 0;
    const items = JSON.parse(data) as { quantity: number }[];
    return items.reduce((acc, i) => acc + (i.quantity || 0), 0);
  } catch {
    return 0;
  }
}

const navItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
    icon: (active: boolean) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={active ? '1.5' : '2'}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
        {!active && <path d="M9 21V12h6v9" />}
      </svg>
    ),
  },
  {
    label: 'Services',
    href: '/services',
    icon: (active: boolean) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={active ? '1.5' : '2'}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: 'Menu',
    href: '#',
    isCenter: true,
    icon: (_active: boolean) => (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: 'Promo',
    href: '/promotions',
    icon: (active: boolean) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill={active ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={active ? '1.5' : '2'}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 12v10H4V12" />
        <path d="M2 7h20v5H2z" />
        <path d="M12 22V7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    ),
  },
  {
    label: 'Search',
    href: '/search',
    icon: (active: boolean) => (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={active ? '2.5' : '2'}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
];

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [showLaundryForm, setShowLaundryForm] = useState(false);
  const [bagCount, setBagCount] = useState(0);

  useEffect(() => {
    setBagCount(getBagCount());
    const handler = () => setBagCount(getBagCount());
    window.addEventListener('laundry-bag-updated', handler);
    return () => window.removeEventListener('laundry-bag-updated', handler);
  }, []);

  return (
    <>
      {children}
      <BottomNav
        items={navItems}
        activeColor="var(--blue-hex)"
        onCenterClick={() => setShowLaundryForm(true)}
        centerBadge={bagCount}
      />
      <LaundryForm isOpen={showLaundryForm} onClose={() => setShowLaundryForm(false)} />
    </>
  );
}
