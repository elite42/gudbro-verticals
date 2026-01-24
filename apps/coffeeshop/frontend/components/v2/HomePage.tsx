'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  WifiHigh,
  Star,
  Fire,
  MapPinLine,
  Gift,
} from '@phosphor-icons/react';
import { Header } from './Header';
import { BottomNav } from './BottomNav';
import { ProductCard } from './ProductCard';
import { TierGate } from './TierGate';
import { useTierFeature } from '@/lib/hooks/useTierFeature';

interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  category?: string;
  isNew?: boolean;
  isPopular?: boolean;
  isVegan?: boolean;
  prepTime?: number;
}

interface HomePageProps {
  merchantName: string;
  merchantLogo?: string;
  tagline?: string;
  heroImage?: string;
  popularItems: MenuItem[];
  newItems: MenuItem[];
  openingHours?: {
    today: string;
    isOpen: boolean;
  };
  wifiPassword?: string;
  address?: string;
  phone?: string;
  onProductClick: (product: MenuItem) => void;
  onThemeToggle: () => void;
  isDark: boolean;
  cartCount: number;
  formatPrice: (price: number) => string;
  // Gamification
  userPoints?: number;
  isCheckedIn?: boolean;
  onCheckIn?: () => void;
  // Navigation (for demo mode) - FIX V-001
  activePage?: string;
  onNavigate?: (pageId: string) => void;
}

export function HomePage({
  merchantName,
  merchantLogo,
  tagline = 'Fresh, local, delicious',
  heroImage,
  popularItems,
  newItems,
  openingHours,
  wifiPassword,
  address,
  phone,
  onProductClick,
  onThemeToggle,
  isDark,
  cartCount,
  formatPrice,
  userPoints = 0,
  isCheckedIn = false,
  onCheckIn,
  activePage,
  onNavigate,
}: HomePageProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' as const },
    },
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Header
        merchantName={merchantName}
        merchantLogo={merchantLogo}
        onThemeToggle={onThemeToggle}
        isDark={isDark}
      />

      <main className="safe-area-bottom pb-8">
        {/* Hero Section */}
        <section className="relative mb-8 overflow-hidden">
          {heroImage && (
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img src={heroImage} alt={merchantName} className="img-cover" />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, var(--bg-primary) 0%, transparent 50%)',
                }}
              />
            </div>
          )}

          {/* Hero content */}
          <div className="container-app relative z-10 -mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h1
                className="font-display text-3xl font-semibold leading-tight md:text-4xl"
                style={{ color: 'var(--text-primary)' }}
              >
                {tagline}
              </h1>

              {/* Quick info row */}
              <div className="mt-4 flex flex-wrap gap-4">
                {openingHours && (
                  <div
                    className="flex items-center gap-2 text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <Clock size={16} />
                    <span
                      className="font-medium"
                      style={{
                        color: openingHours.isOpen
                          ? 'var(--status-success)'
                          : 'var(--status-error)',
                      }}
                    >
                      {openingHours.isOpen ? 'Open' : 'Closed'}
                    </span>
                    <span>· {openingHours.today}</span>
                  </div>
                )}
              </div>

              {/* CTA Button - FIX V-004: added whitespace-nowrap to prevent truncation */}
              {onNavigate ? (
                <button
                  onClick={() => onNavigate('menu')}
                  className="btn btn-primary animate-pulse-glow mt-6 whitespace-nowrap"
                >
                  View Full Menu
                  <ArrowRight size={18} weight="bold" />
                </button>
              ) : (
                <Link
                  href="/menu"
                  className="btn btn-primary animate-pulse-glow mt-6 whitespace-nowrap"
                >
                  View Full Menu
                  <ArrowRight size={18} weight="bold" />
                </Link>
              )}
            </motion.div>
          </div>
        </section>

        {/* Check-in & Rewards Section - TIER GATED: only PRO+ tiers */}
        <TierGate feature="enableEngagementSystem">
          {isClient && onCheckIn && (
            <section className="container-app mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="card overflow-hidden"
                style={{
                  background: isCheckedIn
                    ? 'linear-gradient(135deg, var(--status-success-bg) 0%, var(--bg-tertiary) 100%)'
                    : 'linear-gradient(135deg, var(--bg-tertiary) 0%, var(--surface-card) 100%)',
                  border: isCheckedIn ? '1px solid var(--status-success)' : 'none',
                }}
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-full"
                      style={{
                        background: isCheckedIn ? 'var(--status-success)' : 'var(--brand-warm)',
                      }}
                    >
                      {isCheckedIn ? (
                        <Gift size={28} weight="fill" style={{ color: 'white' }} />
                      ) : (
                        <MapPinLine size={28} weight="fill" style={{ color: 'white' }} />
                      )}
                    </div>
                    <div>
                      <h3
                        className="font-display text-lg font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {isCheckedIn ? 'Welcome back!' : 'Check-in & Earn'}
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {isCheckedIn
                          ? `You have ${userPoints} points`
                          : 'Earn +5 points for checking in'}
                      </p>
                    </div>
                  </div>

                  {!isCheckedIn && (
                    <motion.button
                      onClick={onCheckIn}
                      className="btn"
                      style={{
                        background: 'var(--brand-warm)',
                        color: 'white',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <MapPinLine size={18} weight="bold" />
                      +5 pts
                    </motion.button>
                  )}

                  {isCheckedIn &&
                    (onNavigate ? (
                      <button
                        onClick={() => onNavigate('rewards')}
                        className="btn btn-ghost text-sm"
                        style={{ color: 'var(--status-success)' }}
                      >
                        View Rewards
                        <ArrowRight size={16} />
                      </button>
                    ) : (
                      <Link
                        href="/rewards"
                        className="btn btn-ghost text-sm"
                        style={{ color: 'var(--status-success)' }}
                      >
                        View Rewards
                        <ArrowRight size={16} />
                      </Link>
                    ))}
                </div>
              </motion.div>
            </section>
          )}
        </TierGate>

        {/* Quick Info Cards */}
        {isClient && (wifiPassword || address) && (
          <motion.section
            className="container-app mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {/* WiFi Card */}
              {wifiPassword && (
                <motion.div variants={itemVariants} className="card flex items-center gap-4 p-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: 'var(--bg-tertiary)' }}
                  >
                    <WifiHigh size={24} style={{ color: 'var(--brand-warm)' }} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      WiFi Password
                    </p>
                    <p
                      className="font-display font-semibold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {wifiPassword}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Location Card */}
              {address && (
                <motion.div variants={itemVariants} className="card flex items-center gap-4 p-4">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ background: 'var(--bg-tertiary)' }}
                  >
                    <MapPin size={24} style={{ color: 'var(--brand-warm)' }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      Location
                    </p>
                    <p className="truncate font-medium" style={{ color: 'var(--text-primary)' }}>
                      {address}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}

        {/* Popular Section */}
        {popularItems.length > 0 && (
          <section className="mb-8">
            <div className="container-app mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Fire size={24} weight="fill" style={{ color: 'var(--status-error)' }} />
                <h2
                  className="font-display text-xl font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Popular
                </h2>
              </div>
              {onNavigate ? (
                <button
                  onClick={() => onNavigate('menu')}
                  className="flex items-center gap-1 text-sm font-medium"
                  style={{ color: 'var(--brand-warm)' }}
                >
                  See all
                  <ArrowRight size={14} />
                </button>
              ) : (
                <Link
                  href="/menu?filter=popular"
                  className="flex items-center gap-1 text-sm font-medium"
                  style={{ color: 'var(--brand-warm)' }}
                >
                  See all
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>

            {/* Horizontal scroll */}
            <div className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2">
              {popularItems.slice(0, 6).map((item, index) => (
                <motion.div
                  key={item.id}
                  className="w-56 shrink-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard
                    {...item}
                    isPopular
                    onClick={() => onProductClick(item)}
                    formatPrice={formatPrice}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* New Items Section */}
        {newItems.length > 0 && (
          <section className="mb-8">
            <div className="container-app mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star size={24} weight="fill" style={{ color: 'var(--status-warning)' }} />
                <h2
                  className="font-display text-xl font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  New Arrivals
                </h2>
              </div>
              {onNavigate ? (
                <button
                  onClick={() => onNavigate('menu')}
                  className="flex items-center gap-1 text-sm font-medium"
                  style={{ color: 'var(--brand-warm)' }}
                >
                  See all
                  <ArrowRight size={14} />
                </button>
              ) : (
                <Link
                  href="/menu?filter=new"
                  className="flex items-center gap-1 text-sm font-medium"
                  style={{ color: 'var(--brand-warm)' }}
                >
                  See all
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>

            {/* Horizontal scroll */}
            <div className="scrollbar-hide flex gap-4 overflow-x-auto px-4 pb-2">
              {newItems.slice(0, 6).map((item, index) => (
                <motion.div
                  key={item.id}
                  className="w-56 shrink-0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ProductCard
                    {...item}
                    isNew
                    onClick={() => onProductClick(item)}
                    formatPrice={formatPrice}
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        {phone && (
          <section className="container-app">
            <motion.a
              href={`tel:${phone}`}
              className="card flex items-center gap-4 p-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-full"
                style={{ background: 'var(--status-success-bg)' }}
              >
                <Phone size={24} style={{ color: 'var(--status-success)' }} />
              </div>
              <div>
                <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                  Need help?
                </p>
                <p className="font-display font-semibold" style={{ color: 'var(--text-primary)' }}>
                  Call us: {phone}
                </p>
              </div>
              <ArrowRight size={20} className="ml-auto" style={{ color: 'var(--text-tertiary)' }} />
            </motion.a>
          </section>
        )}
      </main>

      <BottomNav cartCount={cartCount} activePage={activePage} onNavigate={onNavigate} />
    </div>
  );
}
