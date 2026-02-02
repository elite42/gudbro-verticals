'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// ============================================================================
// Types
// ============================================================================

export interface NavItem {
  /** Display label below the icon */
  label: string;
  /** Navigation target (href for Link, ignored if isCenter + onCenterClick) */
  href: string;
  /** Icon renderer — receives active state for styling */
  icon: (active: boolean) => React.ReactNode;
  /** Mark as the center/primary nav item */
  isCenter?: boolean;
}

export interface BottomNavProps {
  /** Navigation items (typically 5) */
  items: NavItem[];
  /** CSS color value for active state (e.g. 'var(--orange-hex)', 'var(--blue-hex)') */
  activeColor: string;
  /** CSS color value for the top border (defaults to 'var(--cloud-dark)') */
  borderColor?: string;
  /** If provided, center item renders as button instead of Link */
  onCenterClick?: () => void;
  /** Badge count on center item (e.g. bag/cart count) */
  centerBadge?: number;
}

// ============================================================================
// Component
// ============================================================================

export function BottomNav({
  items,
  activeColor,
  borderColor = 'var(--cloud-dark)',
  onCenterClick,
  centerBadge,
}: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className="pb-safe fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden"
      style={{ borderColor }}
    >
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {items.map((item) => {
          const isActive =
            !item.isCenter &&
            (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href));

          // Center item with onCenterClick => render as button (gym/laundry pattern)
          if (item.isCenter && onCenterClick) {
            return (
              <button
                key={item.label}
                onClick={onCenterClick}
                className="relative flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-colors"
                style={{ color: 'var(--charcoal-muted)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = activeColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--charcoal-muted)';
                }}
              >
                {item.icon(false)}
                <span className="text-[10px] font-medium">{item.label}</span>
                {centerBadge != null && centerBadge > 0 && (
                  <span
                    className="min-w-4 absolute -top-0.5 right-1 flex h-4 items-center justify-center rounded-full px-1 text-[9px] font-bold text-white"
                    style={{ backgroundColor: activeColor }}
                  >
                    {centerBadge}
                  </span>
                )}
              </button>
            );
          }

          // Center item without onCenterClick => render as Link (pharmacy/workshops pattern)
          if (item.isCenter) {
            const isCenterActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-all"
                style={{
                  color: isCenterActive ? activeColor : 'var(--charcoal-muted)',
                  transform: isCenterActive ? 'scale(1.1)' : 'scale(1)',
                }}
              >
                {item.icon(isCenterActive)}
                <span className="text-[10px]" style={{ fontWeight: isCenterActive ? 700 : 500 }}>
                  {item.label}
                </span>
              </Link>
            );
          }

          // Regular nav item
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-all"
              style={{
                color: isActive ? activeColor : 'var(--charcoal-muted)',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {item.icon(isActive)}
              <span className="text-[10px]" style={{ fontWeight: isActive ? 700 : 500 }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
