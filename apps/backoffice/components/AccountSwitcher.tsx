'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Organization {
  roleId: string;
  organizationId: string;
  organizationName: string;
  organizationLogo?: string | null;
  roleTitle: string;
  brandName?: string;
  locationName?: string;
  isPrimary: boolean;
}

interface AccountSwitcherProps {
  currentOrganization?: Organization;
  organizations?: Organization[];
  userEmail?: string;
  userName?: string;
  userAvatar?: string;
  onSwitchOrganization?: (roleId: string) => void;
}

const ROLE_ICONS: Record<string, string> = {
  owner: '👑',
  manager: '💼',
  chef: '👨‍🍳',
  waiter: '🍽️',
  viewer: '👁️',
  staff: '👤',
};

export default function AccountSwitcher({
  currentOrganization,
  organizations = [],
  userEmail = 'user@example.com',
  userName,
  userAvatar,
  onSwitchOrganization,
}: AccountSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwitch = (roleId: string) => {
    if (onSwitchOrganization) {
      onSwitchOrganization(roleId);
    }
    setIsOpen(false);
  };

  const displayName = userName || userEmail.split('@')[0];
  const initials = displayName.slice(0, 2).toUpperCase();
  const otherOrgs = organizations.filter((o) => o.roleId !== currentOrganization?.roleId);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-3 rounded-lg p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        {/* Avatar */}
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-sm font-bold text-white">
          {userAvatar ? (
            <img src={userAvatar} alt="" className="h-full w-full rounded-full object-cover" />
          ) : (
            initials
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {currentOrganization?.organizationName || 'Seleziona'}
          </p>
          <p className="truncate text-xs text-gray-500 dark:text-gray-400">
            {currentOrganization ? (
              <>
                <span>{ROLE_ICONS[currentOrganization.roleTitle] || '👤'}</span>
                <span className="ml-1 capitalize">{currentOrganization.roleTitle}</span>
              </>
            ) : (
              userEmail
            )}
          </p>
        </div>

        {/* Chevron */}
        <svg
          className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 z-50 mb-2 rounded-xl border border-gray-200 bg-white py-2 shadow-xl dark:border-gray-700 dark:bg-gray-800">
          {/* Current Organization */}
          {currentOrganization && (
            <div className="border-b border-gray-100 px-3 py-2 dark:border-gray-700">
              <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                Organizzazione attuale
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                  {currentOrganization.organizationLogo ? (
                    <img
                      src={currentOrganization.organizationLogo}
                      alt=""
                      className="h-full w-full rounded-lg object-cover"
                    />
                  ) : (
                    <span className="text-xl">🏪</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {currentOrganization.organizationName}
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {currentOrganization.brandName && `${currentOrganization.brandName} • `}
                    {currentOrganization.locationName || 'Tutte le sedi'}
                  </p>
                </div>
                <span className="text-green-500">✓</span>
              </div>
            </div>
          )}

          {/* Other Organizations */}
          {otherOrgs.length > 0 && (
            <div className="py-2">
              <p className="mb-2 px-3 text-xs text-gray-500 dark:text-gray-400">
                Cambia organizzazione
              </p>
              {otherOrgs.map((org) => (
                <button
                  key={org.roleId}
                  onClick={() => handleSwitch(org.roleId)}
                  className="flex w-full items-center gap-3 px-3 py-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700">
                    {org.organizationLogo ? (
                      <img
                        src={org.organizationLogo}
                        alt=""
                        className="h-full w-full rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-lg">🏪</span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <p className="truncate text-sm text-gray-900 dark:text-white">
                      {org.organizationName}
                    </p>
                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                      <span>{ROLE_ICONS[org.roleTitle] || '👤'}</span>
                      <span className="ml-1 capitalize">{org.roleTitle}</span>
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="mt-2 border-t border-gray-100 pt-2 dark:border-gray-700">
            <Link
              href="https://gudbro-website.vercel.app/account/profile"
              target="_blank"
              className="flex w-full items-center gap-3 px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50"
            >
              <span className="flex h-8 w-8 items-center justify-center text-lg">👤</span>
              <span className="text-sm">Il mio profilo</span>
            </Link>
            <Link
              href="https://gudbro-website.vercel.app/get-started"
              target="_blank"
              className="flex w-full items-center gap-3 px-3 py-2 text-gray-700 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700/50"
            >
              <span className="flex h-8 w-8 items-center justify-center text-lg">➕</span>
              <span className="text-sm">Aggiungi locale</span>
            </Link>
            <button
              onClick={() => {
                // In production, call logout
                console.log('Logout');
              }}
              className="flex w-full items-center gap-3 px-3 py-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              <span className="flex h-8 w-8 items-center justify-center text-lg">🚪</span>
              <span className="text-sm">Esci</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
