'use client';

/**
 * V2 About Client Component
 *
 * Pagina about con storia, valori e team.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Leaf, Heart, Users, MapPin, Clock } from '@phosphor-icons/react';
import { Header } from '@/components/v2/Header';
import { BottomNav } from '@/components/v2/BottomNav';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { cartStore } from '@/lib/cart-store';

export default function V2AboutClient() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cartCount, setCartCount] = useState(0);

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
      case 'home': router.push('/v2'); break;
      case 'menu': router.push('/v2/menu'); break;
      case 'cart': router.push('/v2/cart'); break;
      case 'favorites': router.push('/v2/favorites'); break;
      case 'orders': router.push('/v2/orders'); break;
      case 'account': router.push('/v2/account'); break;
    }
  };

  const values = [
    {
      icon: Leaf,
      title: 'Plant-Based',
      description: 'We believe in the power of plants to nourish both people and planet.',
    },
    {
      icon: Heart,
      title: 'Made with Love',
      description: 'Every dish is crafted with care and passion for healthy eating.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a community of health-conscious food lovers.',
    },
  ];

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div data-theme={isDark ? 'dark' : 'light'} className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
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

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div
            className="relative overflow-hidden rounded-2xl"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <img
              src={coffeeshopConfig.business.logo}
              alt={coffeeshopConfig.business.name}
              className="mx-auto h-32 w-32 object-contain py-8"
            />
          </div>

          <h1
            className="font-display mt-6 text-center text-3xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            {coffeeshopConfig.business.name}
          </h1>

          <p
            className="mt-2 text-center text-lg"
            style={{ color: 'var(--text-secondary)' }}
          >
            {coffeeshopConfig.business.tagline}
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <h2
            className="font-display mb-4 text-xl font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Our Story
          </h2>
          <div
            className="rounded-xl p-4"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              ROOTS was founded with a simple mission: to make clean, plant-based food
              accessible to everyone. Located in the heart of Da Nang, we serve
              nutritious and delicious meals that prove healthy eating doesn't mean
              compromising on taste.
            </p>
            <p className="mt-4 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Our menu features locally-sourced ingredients, prepared fresh daily
              with love and care. From our signature smoothie bowls to hearty salads
              and warm comfort foods, every dish is designed to nourish your body
              and delight your taste buds.
            </p>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2
            className="font-display mb-4 text-xl font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Our Values
          </h2>
          <div className="grid gap-4">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 rounded-xl p-4"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'var(--interactive-primary)', color: 'white' }}
                  >
                    <Icon size={24} weight="fill" />
                  </div>
                  <div>
                    <h3
                      className="font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {value.title}
                    </h3>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Location & Hours */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2
            className="font-display mb-4 text-xl font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Visit Us
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div
              className="flex items-start gap-3 rounded-xl p-4"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <MapPin size={24} style={{ color: 'var(--interactive-primary)' }} />
              <div>
                <h3
                  className="font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Location
                </h3>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {coffeeshopConfig.location.address}
                </p>
              </div>
            </div>

            <div
              className="flex items-start gap-3 rounded-xl p-4"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <Clock size={24} style={{ color: 'var(--interactive-primary)' }} />
              <div>
                <h3
                  className="font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Hours
                </h3>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  Mon-Sun: 7:00 AM - 9:00 PM
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <BottomNav cartCount={cartCount} activePage="account" onNavigate={handleNavigate} />
    </div>
  );
}
