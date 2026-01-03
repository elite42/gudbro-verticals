'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface Organization {
  roleId: string;
  organizationId: string;
  organizationName: string;
  organizationLogo?: string;
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
        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full"
      >
        {/* Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
          {userAvatar ? (
            <img src={userAvatar} alt="" className="w-full h-full rounded-full object-cover" />
          ) : (
            initials
          )}
        </div>

        {/* Info */}
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
            {currentOrganization?.organizationName || 'Seleziona'}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
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
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 py-2 z-50">
          {/* Current Organization */}
          {currentOrganization && (
            <div className="px-3 py-2 border-b border-gray-100 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Organizzazione attuale</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  {currentOrganization.organizationLogo ? (
                    <img
                      src={currentOrganization.organizationLogo}
                      alt=""
                      className="w-full h-full rounded-lg object-cover"
                    />
                  ) : (
                    <span className="text-xl">🏪</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {currentOrganization.organizationName}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
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
              <p className="px-3 text-xs text-gray-500 dark:text-gray-400 mb-2">
                Cambia organizzazione
              </p>
              {otherOrgs.map((org) => (
                <button
                  key={org.roleId}
                  onClick={() => handleSwitch(org.roleId)}
                  className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    {org.organizationLogo ? (
                      <img
                        src={org.organizationLogo}
                        alt=""
                        className="w-full h-full rounded-lg object-cover"
                      />
                    ) : (
                      <span className="text-lg">🏪</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 text-left">
                    <p className="text-sm text-gray-900 dark:text-white truncate">
                      {org.organizationName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      <span>{ROLE_ICONS[org.roleTitle] || '👤'}</span>
                      <span className="ml-1 capitalize">{org.roleTitle}</span>
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="border-t border-gray-100 dark:border-gray-700 pt-2 mt-2">
            <Link
              href="https://gudbro-website.vercel.app/account/profile"
              target="_blank"
              className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 transition-colors"
            >
              <span className="w-8 h-8 flex items-center justify-center text-lg">👤</span>
              <span className="text-sm">Il mio profilo</span>
            </Link>
            <Link
              href="https://gudbro-website.vercel.app/get-started"
              target="_blank"
              className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 transition-colors"
            >
              <span className="w-8 h-8 flex items-center justify-center text-lg">➕</span>
              <span className="text-sm">Aggiungi locale</span>
            </Link>
            <button
              onClick={() => {
                // In production, call logout
                console.log('Logout');
              }}
              className="w-full px-3 py-2 flex items-center gap-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors"
            >
              <span className="w-8 h-8 flex items-center justify-center text-lg">🚪</span>
              <span className="text-sm">Esci</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
