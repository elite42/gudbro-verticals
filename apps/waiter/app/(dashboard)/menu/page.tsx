'use client';

/**
 * Menu Page - Additional options and settings
 */

import { useAuth } from '@/components/providers/AuthProvider';
import { useTheme } from '@/lib/theme';
import {
  User,
  Gear,
  Bell,
  Moon,
  Sun,
  SignOut,
  Info,
  CaretRight
} from '@phosphor-icons/react';
import Link from 'next/link';

export default function MenuPage() {
  const { user, signOut } = useAuth();
  const { themeMode, toggleTheme } = useTheme();

  const menuItems = [
    {
      icon: User,
      label: 'Profilo',
      href: '/profile',
      description: user?.email,
    },
    {
      icon: Bell,
      label: 'Notifiche',
      href: '/notifications',
      description: 'Gestisci le notifiche push',
    },
    {
      icon: Gear,
      label: 'Impostazioni',
      href: '/settings',
      description: 'Preferenze app',
    },
    {
      icon: Info,
      label: 'Info',
      href: '/about',
      description: 'Versione e crediti',
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* User card */}
      <div className="card p-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-theme-brand-primary flex items-center justify-center">
          <User size={28} weight="bold" className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-theme-text-primary">{user?.name}</h3>
          <p className="text-sm text-theme-text-secondary capitalize">{user?.role}</p>
        </div>
      </div>

      {/* Theme toggle */}
      <div className="card p-4">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            {themeMode === 'dark' ? (
              <Moon size={24} weight="duotone" className="text-theme-text-secondary" />
            ) : (
              <Sun size={24} weight="duotone" className="text-theme-text-secondary" />
            )}
            <div>
              <p className="font-medium text-theme-text-primary">Tema</p>
              <p className="text-sm text-theme-text-secondary">
                {themeMode === 'dark' ? 'Scuro' : 'Chiaro'}
              </p>
            </div>
          </div>
          <div className={`w-12 h-7 rounded-full p-1 transition-colors ${
            themeMode === 'dark' ? 'bg-theme-brand-primary' : 'bg-theme-bg-tertiary'
          }`}>
            <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
              themeMode === 'dark' ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </div>
        </button>
      </div>

      {/* Menu items */}
      <div className="card divide-y divide-theme-border-light">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 p-4 hover:bg-theme-bg-secondary transition-colors"
          >
            <item.icon size={24} weight="duotone" className="text-theme-text-secondary" />
            <div className="flex-1">
              <p className="font-medium text-theme-text-primary">{item.label}</p>
              <p className="text-sm text-theme-text-tertiary">{item.description}</p>
            </div>
            <CaretRight size={20} weight="bold" className="text-theme-text-tertiary" />
          </Link>
        ))}
      </div>

      {/* Sign out */}
      <button
        onClick={signOut}
        className="btn-danger w-full btn-lg"
      >
        <SignOut size={20} weight="bold" />
        Esci
      </button>

      {/* Version */}
      <p className="text-center text-xs text-theme-text-tertiary">
        GudBro Waiter v1.0.0
      </p>
    </div>
  );
}
