'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Sparkles, Settings, LogOut, User, ChevronDown } from 'lucide-react';
import { TenantSwitcher } from '@/components/tenant';
import { RoleSwitcher, DevRoleSwitcher } from '@/components/account';
import { WeatherWidget } from '@/components/ai/WeatherWidget';
import { NotificationDropdown } from '@/components/notifications';
import { useTenant } from '@/lib/contexts/TenantContext';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useAI } from '@/lib/contexts/AIContext';
import { useAccountRoles, type AccountRole } from '@/lib/hooks/useAccountRoles';
import { createClient } from '@/lib/supabase-browser';

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
      return <User className="h-4 w-4" />;
  }
}

export function Header() {
  const router = useRouter();
  const { user } = useAuth();
  const { toggleAI, hasNotification } = useAI();
  const { account, currentRole, roles, switchRole } = useAccountRoles();
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showRoleSection, setShowRoleSection] = useState(false);
  const { brand, location } = useTenant();
  const supabase = createClient();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = useTranslations('header');
  const tRoles = useTranslations('roles');

  // Role config with translations
  const ROLE_CONFIG: Record<string, { label: string; color: string }> = {
    consumer: { label: tRoles('consumer'), color: 'text-blue-600 bg-blue-50' },
    merchant: { label: tRoles('merchant'), color: 'text-green-600 bg-green-50' },
    admin: { label: tRoles('admin'), color: 'text-purple-600 bg-purple-50' },
    contributor: { label: tRoles('contributor'), color: 'text-yellow-600 bg-yellow-50' },
  };

  function getRoleDisplayName(role: AccountRole): string {
    if (role.role_type === 'merchant' && role.tenant_name) {
      return role.tenant_name;
    }
    return ROLE_CONFIG[role.role_type]?.label || role.role_type;
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
        setShowRoleSection(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  // Generate preview URL based on current selection
  const previewUrl =
    location?.slug && brand?.slug
      ? `https://go.gudbro.com/${brand.slug}/${location.slug}`
      : brand?.slug
        ? `https://go.gudbro.com/${brand.slug}`
        : 'https://go.gudbro.com/roots';

  const hasMultipleRoles = roles.length > 1;
  const currentRoleConfig = currentRole ? ROLE_CONFIG[currentRole.role_type] : null;

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Tenant Switcher (workspace context) + Role Switcher */}
      <div className="flex items-center gap-3">
        <TenantSwitcher />
        {/* Role Switcher - shows if user has multiple roles in the system */}
        <RoleSwitcher />
        {/* Dev Role Switcher - for testing, only in development mode */}
        <DevRoleSwitcher />
      </div>

      {/* Search */}
      <div className="mx-6 max-w-lg flex-1">
        <div className="relative">
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            placeholder={t('search')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-200 py-2 pl-10 pr-4 text-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-1">
        {/* Help */}
        <button
          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          title={t('help')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
            />
          </svg>
        </button>

        {/* Notifications */}
        <NotificationDropdown />

        {/* Preview link */}
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          title={t('preview')}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </a>

        {/* Weather Widget */}
        <WeatherWidget />

        {/* AI Co-Manager Button */}
        <button
          onClick={toggleAI}
          className="relative rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-700"
          title={t('aiCoManager')}
        >
          <Sparkles className="h-5 w-5" />
          {hasNotification && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 animate-pulse rounded-full bg-red-500" />
          )}
        </button>

        {/* Separator */}
        <div className="mx-2 h-6 w-px bg-gray-200" />

        {/* Unified Account Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowRoleSection(false);
            }}
            className="flex items-center gap-1.5 rounded-lg p-1.5 transition-colors hover:bg-gray-100"
            title={t('account')}
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-xs font-medium text-white">
              {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
            </div>
            <ChevronDown
              className={`h-3.5 w-3.5 text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown menu */}
          {showUserMenu && (
            <div className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              {/* User info header */}
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-red-500 text-base font-medium text-white">
                    {user?.name?.charAt(0).toUpperCase() ||
                      user?.email?.charAt(0).toUpperCase() ||
                      'U'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {user?.name || t('account')}
                    </p>
                    <p className="truncate text-xs text-gray-500">{user?.email || ''}</p>
                  </div>
                </div>
              </div>

              {/* Role Switcher Section (only if multiple roles) */}
              {hasMultipleRoles && (
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => setShowRoleSection(!showRoleSection)}
                    className="flex w-full items-center justify-between px-4 py-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      {currentRole && (
                        <span
                          className={`rounded p-1.5 ${currentRoleConfig?.color || 'bg-gray-100'}`}
                        >
                          <RoleIcon role={currentRole.role_type} />
                        </span>
                      )}
                      <div className="text-left">
                        <p className="text-sm font-medium text-gray-900">
                          {currentRole ? getRoleDisplayName(currentRole) : t('selectRole')}
                        </p>
                        <p className="text-xs text-gray-500">{t('switchAccountType')}</p>
                      </div>
                    </div>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-400 transition-transform ${showRoleSection ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Role list (expandable) */}
                  {showRoleSection && (
                    <div className="px-2 pb-2">
                      {roles.map((role) => {
                        const roleConfig = ROLE_CONFIG[role.role_type];
                        const isActive = currentRole?.id === role.id;

                        return (
                          <button
                            key={role.id}
                            onClick={() => {
                              switchRole(role.id);
                              setShowRoleSection(false);
                            }}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                              isActive ? 'bg-blue-50' : 'hover:bg-gray-50'
                            }`}
                          >
                            <span className={`rounded p-1.5 ${roleConfig?.color || 'bg-gray-100'}`}>
                              <RoleIcon role={role.role_type} />
                            </span>
                            <div className="min-w-0 flex-1">
                              <p
                                className={`truncate text-sm font-medium ${isActive ? 'text-blue-700' : 'text-gray-700'}`}
                              >
                                {getRoleDisplayName(role)}
                              </p>
                              <p className="text-xs text-gray-500">{roleConfig?.label}</p>
                            </div>
                            {isActive && (
                              <svg
                                className="h-4 w-4 text-blue-600"
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
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Loyalty Points (if any) */}
              {account && account.total_points > 0 && (
                <div className="border-b border-gray-200 px-4 py-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{t('loyaltyPoints')}</span>
                    <span className="font-medium text-gray-900">
                      {account.total_points.toLocaleString()} pts
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-xs">
                    <span className="text-gray-500">{t('tier')}</span>
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

              {/* Menu items */}
              <div className="py-1">
                <a
                  href="/account"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                  onClick={() => setShowUserMenu(false)}
                >
                  <User className="h-4 w-4 text-gray-400" />
                  {t('myAccount')}
                </a>
                <a
                  href="/settings"
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                  onClick={() => setShowUserMenu(false)}
                >
                  <Settings className="h-4 w-4 text-gray-400" />
                  {t('settings')}
                </a>
              </div>

              {/* Sign out */}
              <div className="border-t border-gray-200 py-1">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  {t('signOut')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
