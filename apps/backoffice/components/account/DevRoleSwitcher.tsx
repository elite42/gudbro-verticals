'use client';

/**
 * Dev Role Switcher - For testing different user roles during development
 *
 * This component is independent of the actual account system and allows
 * developers to quickly switch between different role contexts for testing.
 *
 * Shows when:
 * - NODE_ENV === 'development' (local dev)
 * - OR dev session cookie exists (ENABLE_DEV_AUTH=true on Vercel)
 */

import { useState, useEffect } from 'react';
import { Users } from '@phosphor-icons/react';

// Cookie name must match middleware
const DEV_SESSION_COOKIE = 'gudbro_dev_session';

type DevRole = 'consumer' | 'merchant' | 'admin' | 'contributor';

const DEV_ROLES: { id: DevRole; label: string; icon: string; color: string }[] = [
  { id: 'consumer', label: 'Consumer', icon: '👤', color: 'bg-blue-100 text-blue-700' },
  { id: 'merchant', label: 'Merchant', icon: '🏪', color: 'bg-green-100 text-green-700' },
  { id: 'admin', label: 'Admin', icon: '🛡️', color: 'bg-purple-100 text-purple-700' },
  { id: 'contributor', label: 'Contributor', icon: '⭐', color: 'bg-yellow-100 text-yellow-700' },
];

const STORAGE_KEY = 'gudbro_dev_role';

/**
 * Check if dev mode is active by looking for the dev session cookie
 */
function hasDevSession(): boolean {
  if (typeof document === 'undefined') return false;
  return document.cookie.includes(DEV_SESSION_COOKIE);
}

export function DevRoleSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<DevRole>('merchant');
  const [mounted, setMounted] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);

  // Wait for client-side hydration before rendering
  useEffect(() => {
    setMounted(true);
    // Check if dev mode: either NODE_ENV=development or dev session cookie exists
    const isDev = process.env.NODE_ENV === 'development' || hasDevSession();
    setIsDevMode(isDev);

    const saved = localStorage.getItem(STORAGE_KEY) as DevRole;
    if (saved && DEV_ROLES.some((r) => r.id === saved)) {
      setCurrentRole(saved);
    }
  }, []);

  // Don't render if not in dev mode or before hydration
  if (!isDevMode || !mounted) {
    return null;
  }

  const current = DEV_ROLES.find((r) => r.id === currentRole) || DEV_ROLES[1];

  const handleSelect = (role: DevRole) => {
    setCurrentRole(role);
    localStorage.setItem(STORAGE_KEY, role);
    setIsOpen(false);
    // Could dispatch an event or update context here for app-wide effect
    window.dispatchEvent(new CustomEvent('dev-role-change', { detail: role }));
  };

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 rounded-lg border border-dashed border-orange-300 px-2.5 py-1.5 text-xs font-medium ${current.color} transition-opacity hover:opacity-80`}
        title="Dev: Switch test role"
      >
        <span>{current.icon}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <span className="rounded bg-orange-500 px-1 text-[10px] text-white">DEV</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Menu */}
          <div className="absolute left-0 z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
            <div className="border-b border-gray-100 px-3 py-2">
              <p className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-orange-600">
                <Users className="h-3 w-3" />
                Test Role
              </p>
            </div>

            {DEV_ROLES.map((role) => (
              <button
                key={role.id}
                onClick={() => handleSelect(role.id)}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-gray-50 ${
                  currentRole === role.id ? 'bg-gray-50' : ''
                }`}
              >
                <span className={`rounded px-1.5 py-0.5 text-xs ${role.color}`}>{role.icon}</span>
                <span className="flex-1">{role.label}</span>
                {currentRole === role.id && (
                  <svg
                    className="h-4 w-4 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}

            <div className="border-t border-gray-100 px-3 py-2">
              <p className="text-[10px] text-gray-400">Dev mode active - for testing only</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * Hook to get current dev role
 */
export function useDevRole(): DevRole {
  const [role, setRole] = useState<DevRole>('merchant');

  useEffect(() => {
    // Load initial
    const saved = localStorage.getItem(STORAGE_KEY) as DevRole;
    if (saved) setRole(saved);

    // Listen for changes
    const handleChange = (e: CustomEvent<DevRole>) => {
      setRole(e.detail);
    };

    window.addEventListener('dev-role-change', handleChange as EventListener);
    return () => window.removeEventListener('dev-role-change', handleChange as EventListener);
  }, []);

  return role;
}
