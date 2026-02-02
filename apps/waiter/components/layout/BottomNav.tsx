'use client';

/**
 * Bottom Navigation for Waiter PWA
 *
 * Mobile-first thumb-friendly navigation with 5 tabs:
 * - Home (Dashboard)
 * - Requests (Richieste)
 * - Scan (QR Scanner)
 * - Orders (Ordini)
 * - Menu (More options)
 */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  House,
  Bell,
  QrCode,
  ClipboardText,
  Chair,
} from '@phosphor-icons/react';
import { motion } from 'framer-motion';

interface NavItem {
  href: string;
  label: string;
  icon: typeof House;
  badge?: number;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: House },
  { href: '/requests', label: 'Richieste', icon: Bell },
  { href: '/scan', label: 'Scan', icon: QrCode },
  { href: '/orders', label: 'Ordini', icon: ClipboardText },
  { href: '/tables', label: 'Tavoli', icon: Chair },
];

interface BottomNavProps {
  requestCount?: number;
}

export function BottomNav({ requestCount = 0 }: BottomNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-theme-bg-primary border-t border-theme-border-light safe-area-pb">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          const showBadge = item.href === '/requests' && requestCount > 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative flex flex-col items-center justify-center
                w-full h-full min-w-[64px]
                transition-colors duration-200
                ${active
                  ? 'text-theme-brand-primary'
                  : 'text-theme-text-tertiary hover:text-theme-text-secondary'
                }
              `}
              aria-label={item.label}
              aria-current={active ? 'page' : undefined}
            >
              {/* Active indicator */}
              {active && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-theme-brand-primary rounded-b-full"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}

              {/* Icon with optional badge */}
              <div className="relative">
                <Icon
                  size={24}
                  weight={active ? 'fill' : 'regular'}
                  className="transition-transform duration-200"
                />
                {showBadge && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center px-1 text-xs font-bold text-white bg-theme-interactive-danger rounded-full">
                    {requestCount > 99 ? '99+' : requestCount}
                  </span>
                )}
              </div>

              {/* Label */}
              <span className={`text-xs mt-1 font-medium ${active ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
