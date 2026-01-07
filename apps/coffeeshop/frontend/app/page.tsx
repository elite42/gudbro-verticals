'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { HomeHeader } from '../components/HomeHeader';
import { BottomNavLocal } from '../components/BottomNavLocal';
import { WelcomeBackBanner } from '../components/WelcomeBackBanner';
import { EngagementHub } from '../components/EngagementHub';
import { WiFiQuickConnect } from '../components/WiFiQuickConnect';
import { FeedbackRatingModal } from '../components/FeedbackRatingModal';
import { WelcomeModal } from '../components/WelcomeModal';
import { AuthModal } from '../components/AuthModal';
import { OpenStatusBadge, OpeningHoursDisplay } from '../components/OpenStatusBadge';
import { ChallengesCarousel } from '../components/challenges';
import { userProfileStore } from '../lib/user-profile-store';
import { getROOTSMenuItemsSync } from '../lib/roots-menu';
import { DishItem } from '../components/DishCard';
import { currencyPreferencesStore } from '../lib/currency-preferences';
import { formatConvertedPrice } from '../lib/currency-converter';
import { useTranslation } from '../lib/use-translation';

export default function HomePage() {
  const { t, language } = useTranslation();
  const { business, contact, location, social } = coffeeshopConfig;
  const [currencyPrefs, setCurrencyPrefs] = useState(() => currencyPreferencesStore.get());
  const [isClient, setIsClient] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(true); // Always show on refresh for testing
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Load menu items
  const menuItems: DishItem[] = getROOTSMenuItemsSync();

  // Get popular items (showing new items + best sellers from key categories)
  const popularItems = menuItems
    .filter(
      (item) => item.isNew || ['coffee', 'smoothie', 'dessert', 'pizza'].includes(item.category)
    )
    .slice(0, 8); // Limit to 8 items

  // Track visit on page load
  useEffect(() => {
    userProfileStore.get(); // This increments visit count
    setIsClient(true);
  }, []);

  // Listen for currency preferences changes
  useEffect(() => {
    const handleCurrencyUpdate = () => {
      setCurrencyPrefs(currencyPreferencesStore.get());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('currency-preferences-updated', handleCurrencyUpdate);
      return () => window.removeEventListener('currency-preferences-updated', handleCurrencyUpdate);
    }
  }, []);

  // Format price based on currency preferences
  const formatPrice = (price: number) => {
    if (currencyPrefs.enabled && currencyPrefs.selectedCurrency !== 'VND') {
      return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
    }
    const priceInK = Math.round(price / 1000);
    return `${priceInK}K`;
  };

  return (
    <div className="bg-theme-bg-secondary min-h-screen pb-28">
      {/* Header */}
      <HomeHeader />

      {/* Welcome Back Banner - Disabled */}
      {/* <WelcomeBackBanner /> */}

      {/* WiFi Quick Connect */}
      <div className="container relative z-10 mx-auto px-4 pt-6">
        <WiFiQuickConnect />

        {/* Leave Feedback Button */}
        <button
          onClick={() => setShowFeedbackModal(true)}
          className="to-theme-brand-primary mb-8 w-full transform rounded-2xl bg-gradient-to-r from-yellow-400 px-6 py-5 text-white shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
        >
          <div className="flex items-center justify-center gap-3">
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-xl font-bold">{t.home.feedbackButton.title}</span>
          </div>
          <p className="mt-2 text-sm text-white/90">{t.home.feedbackButton.subtitle}</p>
        </button>

        {/* Popular Items Section */}
        {isClient && popularItems.length > 0 && (
          <div className="mb-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-theme-text-primary text-2xl font-bold">
                {t.home.sections.popular?.title || '⭐ Popular'}
              </h2>
              <Link
                href="/menu"
                className="flex items-center gap-1 font-semibold text-pink-500 hover:underline"
              >
                {t.home.sections.popular?.viewAll || 'View All'}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <div className="scrollbar-hide -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
              {popularItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/menu?highlight=${item.id}`}
                  className="group flex w-36 flex-shrink-0 flex-col"
                >
                  <div className="bg-theme-bg-tertiary relative mb-2 h-36 w-36 overflow-hidden rounded-2xl shadow-md transition-shadow group-hover:shadow-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop';
                      }}
                    />
                    {item.isNew && (
                      <span className="absolute left-2 top-2 rounded-full bg-pink-500 px-2 py-1 text-xs font-bold text-white">
                        NEW
                      </span>
                    )}
                  </div>

                  <h3 className="text-theme-text-primary mb-1 line-clamp-2 text-sm font-bold leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-sm font-bold text-pink-500">{formatPrice(item.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Engagement Hub - PRO TIER Feature */}
        <EngagementHub />

        {/* Food Challenges - PRO TIER Feature */}
        <div className="mb-8">
          <ChallengesCarousel merchantId={coffeeshopConfig.merchant.id} />
        </div>

        {/* Social Media */}
        <div className="bg-theme-bg-elevated mb-8 rounded-2xl p-6 shadow-lg">
          <h2 className="text-theme-text-primary mb-4 text-2xl font-bold">
            🌟 {t.home.sections.followUs.title}
          </h2>
          <div className="flex gap-4">
            {social?.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl bg-blue-600 p-4 text-center font-bold text-white transition-colors hover:bg-blue-700"
              >
                Facebook
              </a>
            )}
            {social?.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl bg-pink-500 p-4 text-center font-bold text-white transition-colors hover:bg-pink-600"
              >
                Instagram
              </a>
            )}
            {social?.tiktok && (
              <a
                href={social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 rounded-xl bg-green-600 p-4 text-center text-sm font-bold text-white transition-colors hover:bg-green-700"
              >
                TripAdvisor
              </a>
            )}
          </div>
        </div>

        {/* Opening Hours */}
        <div className="bg-theme-bg-elevated mb-8 rounded-2xl p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-theme-text-primary text-2xl font-bold">
              {t.home.sections.openingHours.title}
            </h2>
            <OpenStatusBadge showHours={false} />
          </div>
          <OpeningHoursDisplay />
        </div>

        {/* Description - Collapsible */}
        <div className="bg-theme-bg-elevated mb-8 rounded-2xl p-6 shadow-lg">
          <button
            onClick={() => {
              const content = document.getElementById('mission-content');
              const icon = document.getElementById('mission-icon');
              if (content && icon) {
                const isExpanded = content.style.maxHeight && content.style.maxHeight !== '0px';
                if (isExpanded) {
                  content.style.maxHeight = '0px';
                  content.style.opacity = '0';
                  icon.style.transform = 'rotate(0deg)';
                } else {
                  content.style.maxHeight = content.scrollHeight + 'px';
                  content.style.opacity = '1';
                  icon.style.transform = 'rotate(180deg)';
                }
              }
            }}
            className="flex w-full items-center justify-between transition-opacity hover:opacity-70"
          >
            <h2 className="text-theme-text-primary text-2xl font-bold">
              🌿 {t.home.sections.ourMission.title}
            </h2>
            <svg
              id="mission-icon"
              className="text-theme-text-secondary h-6 w-6 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            id="mission-content"
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: '0px', opacity: '0' }}
          >
            <div className="pt-4">
              <p className="text-theme-text-secondary mb-4 leading-relaxed">
                {business.description}
              </p>
              <p className="text-theme-text-secondary leading-relaxed">
                We're committed to serving delicious plant-based food and beverages that nourish
                both body and planet. All our ingredients are fresh, locally sourced when possible,
                and prepared with love. Come experience the power of plants in Đà Nẵng!
              </p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="bg-theme-bg-elevated mb-8 rounded-2xl p-6 shadow-lg">
          <h2 className="text-theme-text-primary mb-4 text-2xl font-bold">
            📍 {t.home.sections.findUs.title}
          </h2>
          <a
            href={location?.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary inline-block rounded-full px-6 py-3 font-bold text-white transition-all hover:shadow-lg"
          >
            🗺️ {t.home.sections.findUs.buttonText}
          </a>
        </div>

        {/* Contact */}
        <div className="bg-theme-bg-elevated mb-8 rounded-2xl p-6 shadow-lg">
          <h2 className="text-theme-text-primary mb-4 text-2xl font-bold">
            📞 {t.home.sections.contactUs.title}
          </h2>
          <div className="space-y-3">
            <a
              href={`tel:${contact.phone}`}
              className="bg-theme-bg-secondary hover:bg-theme-bg-tertiary flex items-center gap-3 rounded-xl p-3 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-xl text-white">
                📞
              </div>
              <div>
                <div className="text-theme-text-primary font-semibold">
                  {t.home.sections.contactUs.phone}
                </div>
                <div className="text-theme-text-secondary">{contact.phone}</div>
              </div>
            </a>

            <a
              href={`https://zalo.me/${contact.zaloId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-theme-bg-secondary hover:bg-theme-bg-tertiary flex items-center gap-3 rounded-xl p-3 transition-colors"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-xl text-white">
                💬
              </div>
              <div>
                <div className="text-theme-text-primary font-semibold">
                  {t.home.sections.contactUs.zalo}
                </div>
                <div className="text-theme-text-secondary">
                  {t.home.sections.contactUs.zaloDescription}
                </div>
              </div>
            </a>

            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="bg-theme-bg-secondary hover:bg-theme-bg-tertiary flex items-center gap-3 rounded-xl p-3 transition-colors"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500 text-xl text-white">
                  ✉️
                </div>
                <div>
                  <div className="text-theme-text-primary font-semibold">
                    {t.home.sections.contactUs.email}
                  </div>
                  <div className="text-theme-text-secondary">{contact.email}</div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Rating Modal */}
      <FeedbackRatingModal isOpen={showFeedbackModal} onClose={() => setShowFeedbackModal(false)} />

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        onLoginClick={() => {
          setAuthMode('login');
          setShowWelcomeModal(false);
          setShowAuthModal(true);
        }}
        onSignupClick={() => {
          setAuthMode('register');
          setShowWelcomeModal(false);
          setShowAuthModal(true);
        }}
        venueName={business.name}
        tableNumber="12"
      />

      {/* Auth Modal - Rendered at page level, independent of WelcomeModal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={(user) => {
          setShowAuthModal(false);
          // Could redirect to menu or show welcome message
        }}
        defaultMode={authMode}
      />

      {/* Bottom Navigation - Hidden when welcome modal is open */}
      {!showWelcomeModal && !showAuthModal && <BottomNavLocal />}
    </div>
  );
}
