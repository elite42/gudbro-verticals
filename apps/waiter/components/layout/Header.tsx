'use client';

/**
 * Header Component for Waiter PWA
 *
 * Minimal header with:
 * - Page title
 * - User avatar / menu
 * - Connection status indicator
 */

import { useAuth } from '@/components/providers/AuthProvider';
import { useTheme } from '@/lib/theme';
import {
  User,
  Moon,
  Sun,
  WifiHigh,
  WifiSlash,
  SignOut
} from '@phosphor-icons/react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  title?: string;
}

export function Header({ title = 'GudBro Waiter' }: HeaderProps) {
  const { user, signOut, isDevMode } = useAuth();
  const { themeMode, toggleTheme } = useTheme();
  const [isOnline, setIsOnline] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-theme-bg-primary border-b border-theme-border-light">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left - Title */}
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold text-theme-text-primary">{title}</h1>
          {isDevMode && (
            <span className="px-1.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 rounded">
              DEV
            </span>
          )}
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          {/* Connection status */}
          <div className={`p-2 rounded-full ${isOnline ? 'text-green-500' : 'text-red-500'}`}>
            {isOnline ? <WifiHigh size={20} weight="bold" /> : <WifiSlash size={20} weight="bold" />}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-theme-bg-secondary transition-colors"
            aria-label={themeMode === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro'}
          >
            {themeMode === 'dark' ? (
              <Sun size={20} weight="bold" className="text-theme-text-primary" />
            ) : (
              <Moon size={20} weight="bold" className="text-theme-text-primary" />
            )}
          </button>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 p-2 rounded-full hover:bg-theme-bg-secondary transition-colors"
              aria-label="Menu utente"
            >
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-theme-brand-primary flex items-center justify-center">
                  <User size={18} weight="bold" className="text-white" />
                </div>
              )}
            </button>

            {/* Dropdown menu */}
            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-12 z-50 w-56 py-2 bg-theme-bg-elevated rounded-lg shadow-lg border border-theme-border-medium animate-scale-in">
                  {user && (
                    <div className="px-4 py-2 border-b border-theme-border-light">
                      <p className="font-medium text-theme-text-primary">{user.name}</p>
                      <p className="text-sm text-theme-text-secondary">{user.email}</p>
                      <p className="text-xs text-theme-text-tertiary capitalize mt-1">{user.role}</p>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      signOut();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-left text-theme-interactive-danger hover:bg-theme-bg-secondary transition-colors"
                  >
                    <SignOut size={20} weight="bold" />
                    <span>Esci</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
