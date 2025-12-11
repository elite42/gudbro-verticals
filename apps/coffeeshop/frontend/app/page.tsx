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

  // Load menu items
  const menuItems: DishItem[] = getROOTSMenuItemsSync();

  // Get popular items (showing new items + best sellers from key categories)
  const popularItems = menuItems
    .filter(item =>
      item.isNew ||
      ['coffee', 'smoothie', 'dessert', 'pizza'].includes(item.category)
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
    <div className="min-h-screen bg-theme-bg-secondary pb-28">
      {/* Header */}
      <HomeHeader />

      {/* Welcome Back Banner - Disabled */}
      {/* <WelcomeBackBanner /> */}

      {/* WiFi Quick Connect */}
      <div className="container mx-auto px-4 pt-6 relative z-10">
        <WiFiQuickConnect />

        {/* Leave Feedback Button */}
        <button
          onClick={() => setShowFeedbackModal(true)}
          className="w-full bg-gradient-to-r from-yellow-400 to-theme-brand-primary text-white px-6 py-5 rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 mb-8"
        >
          <div className="flex items-center justify-center gap-3">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
            </svg>
            <span className="font-bold text-xl">{t.home.feedbackButton.title}</span>
          </div>
          <p className="text-sm mt-2 text-white/90">
            {t.home.feedbackButton.subtitle}
          </p>
        </button>

        {/* Popular Items Section - DISABLED */}
        {/* {isClient && popularItems.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-theme-text-primary">
                ⭐ Popular
              </h2>
              <Link
                href="/menu"
                className="text-primary font-semibold hover:underline flex items-center gap-1"
              >
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="flex gap-2 overflow-x-auto px-3 pb-2 scrollbar-hide">
              {popularItems.map((item) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-32 flex flex-col"
                >
                  <div className="relative w-32 h-32 bg-gray-900 rounded-2xl overflow-hidden mb-2">
                    <Link href="/menu" className="w-full h-full">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop';
                        }}
                      />
                    </Link>
                  </div>

                  <Link
                    href="/menu"
                    className="flex flex-col text-left"
                  >
                    <h3 className="font-bold text-sm text-theme-text-primary mb-1 line-clamp-2 leading-tight h-8">
                      {item.name}
                    </h3>
                    <p className="text-sm font-bold text-theme-text-primary">
                      {formatPrice(item.price)}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )} */}

        {/* Engagement Hub - PRO TIER Feature */}
        <EngagementHub />

        {/* Social Media */}
        <div className="bg-theme-bg-elevated rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-theme-text-primary mb-4">
            🌟 {t.home.sections.followUs.title}
          </h2>
          <div className="flex gap-4">
            {social?.facebook && (
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 text-white p-4 rounded-xl text-center font-bold hover:bg-blue-700 transition-colors"
              >
                Facebook
              </a>
            )}
            {social?.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-pink-500 text-white p-4 rounded-xl text-center font-bold hover:bg-pink-600 transition-colors"
              >
                Instagram
              </a>
            )}
            {social?.tiktok && (
              <a
                href={social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-600 text-white p-4 rounded-xl text-center font-bold hover:bg-green-700 transition-colors text-sm"
              >
                TripAdvisor
              </a>
            )}
          </div>
        </div>

        {/* Opening Hours */}
        <div className="bg-theme-bg-elevated rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-theme-text-primary mb-4">
            ⏰ {t.home.sections.openingHours.title}
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center py-3">
              <span className="font-semibold text-theme-text-secondary">{t.home.sections.openingHours.everyday}</span>
              <span className="text-primary font-bold text-lg">{t.home.sections.openingHours.hours}</span>
            </div>
          </div>
        </div>

        {/* Description - Collapsible */}
        <div className="bg-theme-bg-elevated rounded-2xl p-6 shadow-lg mb-8">
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
            className="w-full flex items-center justify-between hover:opacity-70 transition-opacity"
          >
            <h2 className="text-2xl font-bold text-theme-text-primary">
              🌿 {t.home.sections.ourMission.title}
            </h2>
            <svg
              id="mission-icon"
              className="w-6 h-6 text-theme-text-secondary transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            id="mission-content"
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{ maxHeight: '0px', opacity: '0' }}
          >
            <div className="pt-4">
              <p className="text-theme-text-secondary leading-relaxed mb-4">
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
        <div className="bg-theme-bg-elevated rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-theme-text-primary mb-4">
            📍 {t.home.sections.findUs.title}
          </h2>
          <a
            href={location?.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all"
          >
            🗺️ {t.home.sections.findUs.buttonText}
          </a>
        </div>

        {/* Contact */}
        <div className="bg-theme-bg-elevated rounded-2xl p-6 shadow-lg mb-8">
          <h2 className="text-2xl font-bold text-theme-text-primary mb-4">
            📞 {t.home.sections.contactUs.title}
          </h2>
          <div className="space-y-3">
            <a
              href={`tel:${contact.phone}`}
              className="flex items-center gap-3 p-3 bg-theme-bg-secondary rounded-xl hover:bg-theme-bg-tertiary transition-colors"
            >
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl">
                📞
              </div>
              <div>
                <div className="font-semibold text-theme-text-primary">{t.home.sections.contactUs.phone}</div>
                <div className="text-theme-text-secondary">{contact.phone}</div>
              </div>
            </a>

            <a
              href={`https://zalo.me/${contact.zaloId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-theme-bg-secondary rounded-xl hover:bg-theme-bg-tertiary transition-colors"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                💬
              </div>
              <div>
                <div className="font-semibold text-theme-text-primary">{t.home.sections.contactUs.zalo}</div>
                <div className="text-theme-text-secondary">{t.home.sections.contactUs.zaloDescription}</div>
              </div>
            </a>

            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 p-3 bg-theme-bg-secondary rounded-xl hover:bg-theme-bg-tertiary transition-colors"
              >
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl">
                  ✉️
                </div>
                <div>
                  <div className="font-semibold text-theme-text-primary">{t.home.sections.contactUs.email}</div>
                  <div className="text-theme-text-secondary">{contact.email}</div>
                </div>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Feedback Rating Modal */}
      <FeedbackRatingModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
      />

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={showWelcomeModal}
        onClose={() => setShowWelcomeModal(false)}
        restaurantName={business.name}
        tableNumber="12"
      />

      {/* Bottom Navigation - Hidden when welcome modal is open */}
      {!showWelcomeModal && <BottomNavLocal />}
    </div>
  );
}
