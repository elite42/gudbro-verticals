'use client';

/**
 * V2 Team Client Component
 *
 * Pagina team con profili staff e recensioni.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  Heart,
  X,
  PaperPlaneTilt,
  Coffee,
  ChefHat,
} from '@phosphor-icons/react';
import { Header } from '@/components/v2/Header';
import { BottomNav } from '@/components/v2/BottomNav';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { cartStore } from '@/lib/cart-store';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  specialty?: string;
  rating: number;
  reviewCount: number;
}

const MOCK_TEAM: StaffMember[] = [
  {
    id: '1',
    name: 'Minh Nguyen',
    role: 'Head Chef',
    image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&h=200&fit=crop',
    bio: 'With 10 years of experience in plant-based cuisine, Chef Minh brings creativity and passion to every dish.',
    specialty: 'Smoothie Bowls',
    rating: 4.9,
    reviewCount: 156,
  },
  {
    id: '2',
    name: 'Linh Tran',
    role: 'Head Barista',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=200&h=200&fit=crop',
    bio: 'A certified Q-grader with a passion for specialty coffee. Linh crafts every cup with precision and care.',
    specialty: 'Latte Art',
    rating: 4.8,
    reviewCount: 203,
  },
  {
    id: '3',
    name: 'Duc Pham',
    role: 'Pastry Chef',
    image: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=200&h=200&fit=crop',
    bio: 'Duc creates healthy, delicious desserts that prove you can have your cake and eat it too.',
    specialty: 'Vegan Cakes',
    rating: 4.7,
    reviewCount: 89,
  },
  {
    id: '4',
    name: 'Ha Le',
    role: 'Service Manager',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=200&h=200&fit=crop',
    bio: 'Ha ensures every guest feels welcomed and cared for. Her warmth is infectious!',
    specialty: 'Guest Experience',
    rating: 5.0,
    reviewCount: 312,
  },
];

export default function V2TeamClient() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [selectedMember, setSelectedMember] = useState<StaffMember | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmitReview = async () => {
    if (!selectedMember || rating === 0) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);

    setTimeout(() => {
      setShowReviewModal(false);
      setIsSubmitted(false);
      setReviewText('');
      setRating(0);
      setSelectedMember(null);
    }, 2000);
  };

  const getRoleIcon = (role: string) => {
    if (role.toLowerCase().includes('chef')) return ChefHat;
    if (role.toLowerCase().includes('barista')) return Coffee;
    return Heart;
  };

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

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1
            className="font-display text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Our Team
          </h1>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
            Meet the passionate people behind your experience
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {MOCK_TEAM.map((member, index) => {
            const RoleIcon = getRoleIcon(member.role);

            return (
              <motion.button
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setSelectedMember(member);
                }}
                className="w-full overflow-hidden rounded-xl text-left"
                style={{ background: 'var(--bg-secondary)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-40 w-full object-cover"
                  />
                  <div
                    className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium"
                    style={{ background: 'rgba(0,0,0,0.7)', color: 'white' }}
                  >
                    <Star size={12} weight="fill" style={{ color: '#fbbf24' }} />
                    {member.rating} ({member.reviewCount})
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-1 flex items-center gap-2">
                    <RoleIcon size={16} style={{ color: 'var(--interactive-primary)' }} />
                    <span
                      className="text-xs font-medium"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      {member.role}
                    </span>
                  </div>

                  <h3
                    className="font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {member.name}
                  </h3>

                  {member.specialty && (
                    <p
                      className="mt-1 text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      Specialty: {member.specialty}
                    </p>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </main>

      <BottomNav cartCount={cartCount} activePage="account" onNavigate={handleNavigate} />

      {/* Member Details Modal */}
      <AnimatePresence>
        {selectedMember && !showReviewModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => setSelectedMember(null)}
            />

            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl"
              style={{ background: 'var(--bg-primary)' }}
            >
              {/* Header Image */}
              <div className="relative h-48">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute right-4 top-4 rounded-full p-2"
                  style={{ background: 'rgba(0,0,0,0.5)', color: 'white' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {/* Name & Role */}
                <div className="flex items-start justify-between">
                  <div>
                    <h2
                      className="font-display text-2xl font-bold"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {selectedMember.name}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      {selectedMember.role}
                    </p>
                  </div>

                  <div
                    className="flex items-center gap-1 rounded-full px-3 py-1"
                    style={{ background: 'var(--bg-secondary)' }}
                  >
                    <Star size={16} weight="fill" style={{ color: '#fbbf24' }} />
                    <span
                      className="font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {selectedMember.rating}
                    </span>
                    <span style={{ color: 'var(--text-tertiary)' }}>
                      ({selectedMember.reviewCount})
                    </span>
                  </div>
                </div>

                {/* Specialty */}
                {selectedMember.specialty && (
                  <div
                    className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1"
                    style={{ background: 'var(--interactive-primary)', color: 'white' }}
                  >
                    <span className="text-sm font-medium">
                      Specialty: {selectedMember.specialty}
                    </span>
                  </div>
                )}

                {/* Bio */}
                <div className="mt-4">
                  <h3
                    className="mb-2 font-medium"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    About
                  </h3>
                  <p style={{ color: 'var(--text-secondary)' }}>
                    {selectedMember.bio}
                  </p>
                </div>

                {/* Leave Review Button */}
                <motion.button
                  onClick={() => setShowReviewModal(true)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-medium"
                  style={{ background: 'var(--interactive-primary)', color: 'white' }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Star size={20} weight="fill" />
                  Leave a Review
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Review Modal */}
      <AnimatePresence>
        {showReviewModal && selectedMember && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/50"
              onClick={() => {
                setShowReviewModal(false);
                setSelectedMember(null);
              }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-4 right-4 top-1/2 z-50 -translate-y-1/2 rounded-2xl p-6 md:left-1/2 md:max-w-md md:-translate-x-1/2"
              style={{
                background: 'var(--bg-primary)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              {isSubmitted ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div
                    className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                    style={{ background: 'var(--status-success)', color: 'white' }}
                  >
                    <Heart size={32} weight="fill" />
                  </div>
                  <h3
                    className="font-display text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Thank You!
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    Your review helps {selectedMember.name} grow.
                  </p>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowReviewModal(false);
                    }}
                    className="absolute right-4 top-4 rounded-full p-1"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    <X size={20} />
                  </button>

                  <h2
                    className="mb-2 font-display text-xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Review {selectedMember.name}
                  </h2>
                  <p className="mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    How was your experience?
                  </p>

                  {/* Star Rating */}
                  <div className="mb-4 flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star
                          size={32}
                          weight={star <= rating ? 'fill' : 'regular'}
                          style={{
                            color: star <= rating ? '#fbbf24' : 'var(--text-tertiary)',
                          }}
                        />
                      </motion.button>
                    ))}
                  </div>

                  {/* Review Text */}
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share your experience (optional)"
                    rows={4}
                    className="w-full resize-none rounded-xl px-4 py-3"
                    style={{
                      background: 'var(--bg-secondary)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-medium)',
                    }}
                  />

                  {/* Submit Button */}
                  <motion.button
                    onClick={handleSubmitReview}
                    disabled={isSubmitting || rating === 0}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-4 font-medium"
                    style={{
                      background:
                        rating === 0
                          ? 'var(--bg-tertiary)'
                          : 'var(--interactive-primary)',
                      color: rating === 0 ? 'var(--text-tertiary)' : 'white',
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                    whileHover={rating > 0 ? { scale: 1.01 } : {}}
                    whileTap={rating > 0 ? { scale: 0.99 } : {}}
                  >
                    {isSubmitting ? (
                      <motion.div
                        className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      />
                    ) : (
                      <>
                        <PaperPlaneTilt size={20} weight="fill" />
                        Submit Review
                      </>
                    )}
                  </motion.button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
