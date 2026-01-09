'use client';

/**
 * Role Switcher Component
 *
 * Allows users with multiple roles (consumer/merchant/admin) to switch
 * between them without logging out. Part of the Unified Account System.
 *
 * @module components/account/RoleSwitcher
 */

import { useState } from 'react';
import { useAccountRoles, type AccountRole } from '@/lib/hooks/useAccountRoles';

// Check if in development mode
const isDev = process.env.NODE_ENV === 'development';

// Role icons and labels
const ROLE_CONFIG: Record<string, { icon: string; label: string; color: string }> = {
  consumer: {
    icon: 'user',
    label: 'Personal Account',
    color: 'text-blue-600 bg-blue-50',
  },
  merchant: {
    icon: 'store',
    label: 'Business',
    color: 'text-green-600 bg-green-50',
  },
  admin: {
    icon: 'shield',
    label: 'Admin',
    color: 'text-purple-600 bg-purple-50',
  },
  contributor: {
    icon: 'star',
    label: 'Contributor',
    color: 'text-yellow-600 bg-yellow-50',
  },
};

function RoleIcon({ role }: { role: string }) {
  switch (role) {
    case 'consumer':
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      );
    case 'merchant':
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      );
    case 'admin':
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      );
    case 'contributor':
      return (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      );
    default:
      return null;
  }
}

function getRoleDisplayName(role: AccountRole): string {
  if (role.role_type === 'merchant' && role.tenant_name) {
    return role.tenant_name;
  }
  return ROLE_CONFIG[role.role_type]?.label || role.role_type;
}

export function RoleSwitcher() {
  const { account, currentRole, roles, isLoading, switchRole } = useAccountRoles();
  const [isOpen, setIsOpen] = useState(false);

  // Don't show if no account or only one role (except in dev mode for testing)
  const hasMultipleRoles = roles.length > 1;
  if (isLoading || !account || (!hasMultipleRoles && !isDev)) {
    return null;
  }

  const config = currentRole ? ROLE_CONFIG[currentRole.role_type] : null;

  return (
    <div className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm transition-colors hover:bg-gray-50"
      >
        {currentRole && (
          <>
            <span className={`rounded p-1 ${config?.color || 'bg-gray-100'}`}>
              <RoleIcon role={currentRole.role_type} />
            </span>
            <span className="max-w-[150px] truncate font-medium text-gray-900">
              {getRoleDisplayName(currentRole)}
            </span>
            <svg
              className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Menu */}
          <div className="absolute left-0 z-20 mt-2 w-64 rounded-lg border border-gray-200 bg-white py-2 shadow-lg">
            {/* Header */}
            <div className="border-b border-gray-100 px-4 py-2">
              <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Switch Account
              </p>
            </div>

            {/* Role list */}
            <div className="py-1">
              {roles.map((role) => {
                const roleConfig = ROLE_CONFIG[role.role_type];
                const isActive = currentRole?.id === role.id;

                return (
                  <button
                    key={role.id}
                    onClick={() => {
                      switchRole(role.id);
                      setIsOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 px-4 py-2 text-left transition-colors ${
                      isActive ? 'bg-gray-50' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className={`rounded p-1.5 ${roleConfig?.color || 'bg-gray-100'}`}>
                      <RoleIcon role={role.role_type} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`truncate text-sm font-medium ${isActive ? 'text-gray-900' : 'text-gray-700'}`}
                      >
                        {getRoleDisplayName(role)}
                      </p>
                      <p className="text-xs text-gray-500">{roleConfig?.label || role.role_type}</p>
                    </div>
                    {isActive && (
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
                    {role.is_primary && !isActive && (
                      <span className="text-xs text-gray-400">Default</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Footer - Loyalty points */}
            {account.total_points > 0 && (
              <div className="border-t border-gray-100 px-4 py-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">Loyalty Points</span>
                  <span className="font-medium text-gray-900">
                    {account.total_points.toLocaleString()} pts
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Tier</span>
                  <span
                    className={`font-medium capitalize ${
                      account.loyalty_tier === 'platinum'
                        ? 'text-purple-600'
                        : account.loyalty_tier === 'gold'
                          ? 'text-yellow-600'
                          : account.loyalty_tier === 'silver'
                            ? 'text-gray-600'
                            : 'text-orange-600'
                    }`}
                  >
                    {account.loyalty_tier}
                  </span>
                </div>
              </div>
            )}

            {/* Add role link */}
            <div className="border-t border-gray-100 px-4 py-2">
              <a
                href="/settings/accounts"
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline"
                onClick={() => setIsOpen(false)}
              >
                Manage accounts
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
