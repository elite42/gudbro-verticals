'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { useTheme } from '@/lib/theme/theme-context';
import { selectionsStore } from '@/lib/selections-store';
import { useState, useEffect } from 'react';

interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function DesktopNav() {
  const pathname = usePathname();
  const { themeMode, toggleTheme } = useTheme();
  const { business } = coffeeshopConfig;
  const [selectionsCount, setSelectionsCount] = useState(0);

  // Listen for selections changes
  useEffect(() => {
    const handleSelectionsUpdate = () => {
      setSelectionsCount(selectionsStore.getCount());
    };

    // Initial count
    if (typeof window !== 'undefined') {
      setSelectionsCount(selectionsStore.getCount());
      window.addEventListener('selections-updated', handleSelectionsUpdate);
      return () => window.removeEventListener('selections-updated', handleSelectionsUpdate);
    }
  }, []);

  return (
    <header className="bg-theme-bg-elevated border-theme-border-light sticky top-0 z-50 hidden border-b shadow-sm lg:block">
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="mx-auto max-w-screen-xl px-4 lg:px-8"
      >
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Brand Name */}
          <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="bg-theme-bg-secondary h-10 w-10 overflow-hidden rounded-full">
              <img src={business.logo} alt={business.name} className="h-full w-full object-cover" />
            </div>
            <span className="text-theme-text-primary text-xl font-bold">{business.name}</span>
          </Link>

          {/* Center Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                    isActive
                      ? 'bg-theme-brand-primary text-white'
                      : 'text-theme-text-secondary hover:text-theme-text-primary hover:bg-theme-bg-tertiary'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="hover:bg-theme-bg-tertiary rounded-lg p-2 transition-colors"
              aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
            >
              {themeMode === 'light' ? (
                <svg
                  className="text-theme-text-secondary h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              ) : (
                <svg
                  className="text-theme-text-secondary h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              )}
            </button>

            {/* Cart/Order Button */}
            <Link
              href="/cart"
              className="hover:bg-theme-bg-tertiary relative rounded-lg p-2 transition-colors"
              aria-label={selectionsCount > 0 ? `View cart, ${selectionsCount} items` : 'View cart'}
            >
              <svg
                className="text-theme-text-secondary h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {selectionsCount > 0 && (
                <span className="bg-theme-brand-primary absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-xs font-bold text-white">
                  {selectionsCount}
                </span>
              )}
            </Link>

            {/* Account Button */}
            <Link
              href="/account"
              className="hover:bg-theme-bg-tertiary rounded-lg p-2 transition-colors"
              aria-label="My account"
            >
              <svg
                className="text-theme-text-secondary h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
