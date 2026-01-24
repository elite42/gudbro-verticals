'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { House, ForkKnife, Heart, ShoppingBag, User } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useTierFeature, FeatureKey } from '@/lib/hooks/useTierFeature';

interface NavItem {
  id: string;
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
  /** Feature key that must be enabled to show this nav item */
  requiredFeature?: FeatureKey;
}

interface BottomNavProps {
  cartCount?: number;
  /** Current active page ID (for demo/internal navigation) */
  activePage?: string;
  /** Callback for internal navigation (for demo mode) */
  onNavigate?: (pageId: string) => void;
}

export function BottomNav({ cartCount = 0, activePage, onNavigate }: BottomNavProps) {
  const pathname = usePathname();

  // Check tier features for conditional nav items
  const { isEnabled: cartEnabled } = useTierFeature('enableCart');

  const navItems: NavItem[] = [
    { id: 'home', href: '/', icon: House, label: 'Home' },
    { id: 'menu', href: '/menu', icon: ForkKnife, label: 'Menu' },
    { id: 'favorites', href: '/favorites', icon: Heart, label: 'Favorites' },
    {
      id: 'cart',
      href: '/cart',
      icon: ShoppingBag,
      label: 'Cart',
      badge: cartCount,
      requiredFeature: 'enableCart',
    },
    { id: 'account', href: '/account', icon: User, label: 'Account' },
  ];

  // Use callback-based navigation if provided (demo mode), otherwise use pathname
  const isActive = (item: NavItem) => {
    if (onNavigate && activePage) {
      return item.id === activePage;
    }
    if (item.href === '/') return pathname === '/';
    return pathname.startsWith(item.href);
  };

  // Filter nav items based on tier features
  const visibleNavItems = navItems.filter((item) => {
    // If no feature required, always show
    if (!item.requiredFeature) return true;
    // Check if feature is enabled (using cartEnabled for cart specifically)
    if (item.requiredFeature === 'enableCart') return cartEnabled;
    return true;
  });

  return (
    <nav
      className="glass fixed bottom-0 left-0 right-0 z-50 border-t"
      style={{
        borderColor: 'var(--border-light)',
        paddingBottom: 'var(--safe-area-bottom)',
      }}
    >
      <div className="container-app">
        <ul className="flex items-center justify-around py-2">
          {visibleNavItems.map((item) => {
            const active = isActive(item);
            const Icon = item.icon;

            const navContent = (
              <>
                {/* Active indicator */}
                {active && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute -top-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full"
                    style={{ background: 'var(--interactive-primary)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                {/* Icon with badge */}
                <div className="relative">
                  <Icon size={24} weight={active ? 'fill' : 'regular'} />

                  {/* Cart badge - only show when count > 0 (FIX V-006) */}
                  {item.badge !== undefined && item.badge > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="min-w-4 absolute -right-2 -top-1 flex h-4 items-center justify-center rounded-full px-1 text-[10px] font-bold"
                      style={{
                        background: 'var(--status-error)',
                        color: 'white',
                      }}
                    >
                      {item.badge > 9 ? '9+' : item.badge}
                    </motion.span>
                  )}
                </div>

                {/* Label */}
                <span className="text-[11px] font-medium">{item.label}</span>
              </>
            );

            const navClassName =
              'relative flex flex-col items-center gap-0.5 px-4 py-2 transition-colors';
            const navStyle = {
              color: active ? 'var(--interactive-primary)' : 'var(--text-tertiary)',
            };

            return (
              <li key={item.id}>
                {onNavigate ? (
                  <button
                    type="button"
                    onClick={() => onNavigate(item.id)}
                    className={navClassName}
                    style={navStyle}
                  >
                    {navContent}
                  </button>
                ) : (
                  <Link href={item.href} className={navClassName} style={navStyle}>
                    {navContent}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
