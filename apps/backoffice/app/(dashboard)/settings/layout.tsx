'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Settings,
  Clock,
  Calendar,
  Globe,
  DollarSign,
  Shield,
  CreditCard,
  Share2,
  Layout,
  Compass,
} from 'lucide-react';

const settingsTabs = [
  { name: 'General', href: '/settings', icon: Settings },
  { name: 'Site Builder', href: '/settings/site-builder', icon: Layout },
  { name: 'Hours', href: '/settings/hours', icon: Clock },
  { name: 'Calendar', href: '/settings/calendar', icon: Calendar },
  { name: 'Languages', href: '/settings/languages', icon: Globe },
  { name: 'Currency', href: '/settings/currency', icon: DollarSign },
  { name: 'Auth', href: '/settings/auth', icon: Shield },
  { name: 'Payments', href: '/settings/payments', icon: CreditCard },
  { name: 'Social', href: '/settings/social', icon: Share2 },
  { name: 'Concierge', href: '/settings/concierge', icon: Compass },
];

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Determine active tab - exact match for /settings, startsWith for others
  const isActive = (href: string) => {
    if (href === '/settings') {
      return pathname === '/settings';
    }
    return pathname?.startsWith(href);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-1 overflow-x-auto" aria-label="Settings tabs">
          {settingsTabs.map((tab) => {
            const active = isActive(tab.href);
            const Icon = tab.icon;

            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}
