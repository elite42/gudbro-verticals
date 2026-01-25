'use client';

/**
 * DesktopMenuLayout v2
 *
 * Responsive layout wrapper that provides:
 * - Mobile: Standard single-column layout with BottomNav
 * - Desktop (1024px+): Sidebar + Main content layout
 *
 * Features:
 * - Sticky sidebar with categories
 * - Merchant branding in sidebar
 * - Smooth responsive transitions
 * - Footer with venue info (desktop only)
 *
 * Aesthetic: "Editorial Menu" - magazine-style browsing on desktop
 */

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  House,
  ForkKnife,
  Heart,
  ShoppingBag,
  User,
  MapPin,
  Clock,
  Phone,
  Globe,
  InstagramLogo,
  FacebookLogo,
  Sun,
  Moon,
} from '@phosphor-icons/react';

interface Category {
  id: string;
  name: string;
  icon?: string;
  count?: number;
}

interface VenueInfo {
  name: string;
  logo?: string;
  tagline?: string;
  address?: string;
  phone?: string;
  hours?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
}

interface DesktopMenuLayoutProps {
  children: ReactNode;
  venue: VenueInfo;
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
  cartCount?: number;
  isDark?: boolean;
  onThemeToggle?: () => void;
  onNavigate?: (page: string) => void;
}

// Custom hook for responsive breakpoint detection
function useIsDesktop(breakpoint = 1024): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= breakpoint);
    checkIsDesktop();

    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, [breakpoint]);

  return isDesktop;
}

// Sidebar navigation items
const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: House, href: '/' },
  { id: 'menu', label: 'Menu', icon: ForkKnife, href: '/menu' },
  { id: 'favorites', label: 'Favorites', icon: Heart, href: '/favorites' },
  { id: 'cart', label: 'Cart', icon: ShoppingBag, href: '/cart' },
  { id: 'account', label: 'Account', icon: User, href: '/account' },
];

export function DesktopMenuLayout({
  children,
  venue,
  categories,
  activeCategory,
  onCategoryChange,
  cartCount = 0,
  isDark = false,
  onThemeToggle,
  onNavigate,
}: DesktopMenuLayoutProps) {
  const isDesktop = useIsDesktop();
  const [activeNav, setActiveNav] = useState('menu');

  const handleNavClick = (navId: string) => {
    setActiveNav(navId);
    onNavigate?.(navId);
  };

  // Mobile layout - just render children
  if (!isDesktop) {
    return <>{children}</>;
  }

  // Desktop layout with sidebar
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed left-0 top-0 z-30 flex h-screen w-72 flex-col"
        style={{
          background: 'var(--surface-card)',
          borderRight: '1px solid var(--border-light)',
        }}
      >
        {/* Sidebar Header - Branding */}
        <div
          className="flex-shrink-0 p-6"
          style={{ borderBottom: '1px solid var(--border-light)' }}
        >
          <div className="flex items-center gap-4">
            {venue.logo ? (
              <img
                src={venue.logo}
                alt={venue.name}
                className="h-14 w-14 rounded-xl object-cover"
                style={{ boxShadow: 'var(--shadow-md)' }}
              />
            ) : (
              <div
                className="font-display flex h-14 w-14 items-center justify-center rounded-xl text-xl font-semibold"
                style={{
                  background: 'var(--brand-warm)',
                  color: 'white',
                }}
              >
                {venue.name.charAt(0)}
              </div>
            )}
            <div>
              <h1
                className="font-display text-lg font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {venue.name}
              </h1>
              {venue.tagline && (
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  {venue.tagline}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div
          className="flex-shrink-0 p-4"
          style={{ borderBottom: '1px solid var(--border-light)' }}
        >
          <nav className="space-y-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;

              return (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-colors"
                  style={{
                    background: isActive ? 'var(--bg-tertiary)' : 'transparent',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                  whileHover={{ background: 'var(--bg-secondary)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} weight={isActive ? 'fill' : 'regular'} />
                  <span className="text-sm font-medium">{item.label}</span>

                  {/* Cart badge */}
                  {item.id === 'cart' && cartCount > 0 && (
                    <span
                      className="min-w-5 ml-auto flex h-5 items-center justify-center rounded-full px-1.5 text-[10px] font-bold"
                      style={{
                        background: 'var(--status-error)',
                        color: 'white',
                      }}
                    >
                      {cartCount > 9 ? '9+' : cartCount}
                    </span>
                  )}

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="sidebarActiveIndicator"
                      className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full"
                      style={{ background: 'var(--interactive-primary)' }}
                    />
                  )}
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Categories Section */}
        <div className="flex-1 overflow-y-auto p-4">
          <h2
            className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Categories
          </h2>

          <div className="space-y-1">
            {categories.map((category) => {
              const isActive = activeCategory === category.id;

              return (
                <motion.button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left transition-colors"
                  style={{
                    background: isActive ? 'var(--interactive-primary)' : 'transparent',
                    color: isActive ? 'white' : 'var(--text-secondary)',
                  }}
                  whileHover={{
                    background: isActive ? 'var(--interactive-primary)' : 'var(--bg-secondary)',
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    {category.icon && <span className="text-sm">{category.icon}</span>}
                    <span className="text-sm font-medium">{category.name}</span>
                  </span>

                  {category.count !== undefined && (
                    <span
                      className="text-xs"
                      style={{
                        color: isActive ? 'rgba(255,255,255,0.7)' : 'var(--text-tertiary)',
                      }}
                    >
                      {category.count}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Sidebar Footer - Venue Info */}
        <div className="flex-shrink-0 p-4" style={{ borderTop: '1px solid var(--border-light)' }}>
          {/* Contact info */}
          <div className="mb-4 space-y-2">
            {venue.address && (
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <MapPin size={14} />
                <span className="truncate">{venue.address}</span>
              </div>
            )}
            {venue.hours && (
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <Clock size={14} />
                <span>{venue.hours}</span>
              </div>
            )}
            {venue.phone && (
              <div
                className="flex items-center gap-2 text-xs"
                style={{ color: 'var(--text-tertiary)' }}
              >
                <Phone size={14} />
                <span>{venue.phone}</span>
              </div>
            )}
          </div>

          {/* Social & Theme */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {venue.instagram && (
                <a
                  href={venue.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <InstagramLogo size={16} />
                </a>
              )}
              {venue.facebook && (
                <a
                  href={venue.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <FacebookLogo size={16} />
                </a>
              )}
              {venue.website && (
                <a
                  href={venue.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                  style={{
                    background: 'var(--bg-tertiary)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <Globe size={16} />
                </a>
              )}
            </div>

            {/* Theme toggle */}
            {onThemeToggle && (
              <button
                onClick={onThemeToggle}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors"
                style={{
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-secondary)',
                }}
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDark ? 'moon' : 'sun'}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? <Moon size={16} weight="fill" /> : <Sun size={16} weight="regular" />}
                  </motion.div>
                </AnimatePresence>
              </button>
            )}
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="ml-72 min-h-screen flex-1" style={{ background: 'var(--bg-primary)' }}>
        {/* Desktop Header */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-20 flex items-center justify-between px-8 py-4"
          style={{
            background: 'var(--bg-primary)',
            borderBottom: '1px solid var(--border-light)',
          }}
        >
          <div>
            <h2
              className="font-display text-2xl font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              {categories.find((c) => c.id === activeCategory)?.name || 'Menu'}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              {categories.find((c) => c.id === activeCategory)?.count || 0} items
            </p>
          </div>

          {/* Could add search, filters here */}
        </motion.header>

        {/* Content */}
        <div className="px-8 py-6">{children}</div>

        {/* Desktop Footer */}
        <footer
          className="mt-auto px-8 py-6"
          style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              Powered by{' '}
              <span className="font-medium" style={{ color: 'var(--brand-warm)' }}>
                GUDBRO
              </span>
            </p>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              © {new Date().getFullYear()} {venue.name}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default DesktopMenuLayout;
