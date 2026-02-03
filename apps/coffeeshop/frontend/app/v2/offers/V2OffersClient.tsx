'use client';

/**
 * V2 Offers Client Component
 *
 * Pagina offerte con card gradient e timer.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Tag, Clock, Percent, Gift, Copy, Check } from '@phosphor-icons/react';
import { Header } from '@/components/v2/Header';
import { BottomNav } from '@/components/v2/BottomNav';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { cartStore } from '@/lib/cart-store';
import { formatDate } from '@gudbro/utils';

interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  validUntil: string;
  gradient: string;
  icon: typeof Tag;
  terms: string;
}

const MOCK_OFFERS: Offer[] = [
  {
    id: '1',
    title: 'First Order Discount',
    description: 'Get 15% off your first order with us!',
    code: 'WELCOME15',
    discount: '15% OFF',
    validUntil: '2024-12-31',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
    icon: Gift,
    terms: 'Valid for new customers only. Minimum order 100K VND.',
  },
  {
    id: '2',
    title: 'Smoothie Bowl Special',
    description: 'Buy 2 smoothie bowls and get 1 free!',
    code: 'BOWL3FOR2',
    discount: 'Buy 2 Get 1',
    validUntil: '2024-06-30',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    icon: Percent,
    terms: 'Valid for dine-in and takeaway. Cannot be combined with other offers.',
  },
  {
    id: '3',
    title: 'Happy Hour',
    description: '20% off all beverages from 2-5 PM',
    code: 'HAPPYHOUR',
    discount: '20% OFF',
    validUntil: '2024-12-31',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    icon: Clock,
    terms: 'Valid Monday to Friday, 2-5 PM only.',
  },
  {
    id: '4',
    title: 'Loyalty Reward',
    description: 'Collect 10 stamps and get a free meal!',
    code: 'LOYALTY10',
    discount: 'Free Meal',
    validUntil: '2024-12-31',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
    icon: Tag,
    terms: 'One stamp per visit with minimum purchase of 100K VND.',
  },
];

export default function V2OffersClient() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);

    const updateCartCount = () => setCartCount(cartStore.count());
    updateCartCount();
    window.addEventListener('cart-updated', updateCartCount);
    return () => window.removeEventListener('cart-updated', updateCartCount);
  }, []);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  const handleNavigate = (pageId: string) => {
    switch (pageId) {
      case 'home':
        router.push('/v2');
        break;
      case 'menu':
        router.push('/v2/menu');
        break;
      case 'cart':
        router.push('/v2/cart');
        break;
      case 'favorites':
        router.push('/v2/favorites');
        break;
      case 'orders':
        router.push('/v2/orders');
        break;
      case 'account':
        router.push('/v2/account');
        break;
    }
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div
      data-theme={isDark ? 'dark' : 'light'}
      className="min-h-screen"
      style={{ background: 'var(--bg-primary)' }}
    >
      <Header
        merchantName={coffeeshopConfig.business.name}
        merchantLogo={coffeeshopConfig.business.logo}
        showSearch={false}
        onThemeToggle={handleThemeToggle}
        isDark={isDark}
      />

      <main className="container-app safe-area-bottom pb-24 pt-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 text-sm font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="font-display text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
            Special Offers
          </h1>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
            Exclusive deals just for you
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid gap-4">
          {MOCK_OFFERS.map((offer, index) => {
            const Icon = offer.icon;
            const isCopied = copiedCode === offer.code;

            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="overflow-hidden rounded-2xl"
                style={{ background: offer.gradient }}
              >
                <div className="relative p-5">
                  {/* Background decoration */}
                  <div
                    className="absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-20"
                    style={{ background: 'white' }}
                  />

                  {/* Content */}
                  <div className="relative">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <Icon size={20} weight="fill" style={{ color: 'white' }} />
                          <span
                            className="rounded-full px-2 py-0.5 text-sm font-bold"
                            style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}
                          >
                            {offer.discount}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold" style={{ color: 'white' }}>
                          {offer.title}
                        </h3>
                        <p className="mt-1 text-sm" style={{ color: 'rgba(255,255,255,0.9)' }}>
                          {offer.description}
                        </p>
                      </div>
                    </div>

                    {/* Code */}
                    <div className="mt-4 flex items-center gap-2">
                      <div
                        className="flex items-center gap-2 rounded-lg px-3 py-2"
                        style={{ background: 'rgba(255,255,255,0.2)' }}
                      >
                        <span
                          className="font-mono text-sm font-bold tracking-wider"
                          style={{ color: 'white' }}
                        >
                          {offer.code}
                        </span>
                      </div>
                      <motion.button
                        onClick={() => handleCopyCode(offer.code)}
                        className="flex items-center gap-1 rounded-lg px-3 py-2"
                        style={{ background: 'white', color: 'var(--text-primary)' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isCopied ? (
                          <>
                            <Check size={16} weight="bold" />
                            <span className="text-sm font-medium">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} />
                            <span className="text-sm font-medium">Copy</span>
                          </>
                        )}
                      </motion.button>
                    </div>

                    {/* Terms & Validity */}
                    <div className="mt-4 space-y-1">
                      <p className="text-xs" style={{ color: 'rgba(255,255,255,0.7)' }}>
                        {offer.terms}
                      </p>
                      <p
                        className="flex items-center gap-1 text-xs"
                        style={{ color: 'rgba(255,255,255,0.7)' }}
                      >
                        <Clock size={12} />
                        Valid until {formatDate(offer.validUntil)}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Apply offer codes at checkout
          </p>
          <motion.button
            onClick={() => router.push('/v2/menu')}
            className="mt-4 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium"
            style={{ background: 'var(--interactive-primary)', color: 'white' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Browse Menu
          </motion.button>
        </motion.div>
      </main>

      <BottomNav cartCount={cartCount} activePage="home" onNavigate={handleNavigate} />
    </div>
  );
}
