'use client';

import Link from 'next/link';
import { coffeeshopConfig } from '../../config/coffeeshop.config';
import { HomeHeader } from '../../components/HomeHeader';
import { BottomNavLocal } from '../../components/BottomNavLocal';
import { useTranslation } from '@/lib/use-translation';

export default function OffersPage() {
  const { t } = useTranslation();
  const { business } = coffeeshopConfig;

  // Happy Hour offers
  const happyHourOffers = [
    {
      id: 1,
      title: t.offers.smoothieHappyHour.title,
      description: t.offers.smoothieHappyHour.description,
      time: t.offers.smoothieHappyHour.time,
      discount: 10,
      emoji: '🥤',
      image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
    },
  ];

  // Combo Menus
  const comboMenus = [
    {
      id: 1,
      title: t.offers.lunchCombo.title,
      description: t.offers.lunchCombo.description,
      originalPrice: 150000,
      comboPrice: 120000,
      saving: 30000,
      emoji: '🍽️',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: t.offers.brunchCombo.title,
      description: t.offers.brunchCombo.description,
      originalPrice: 120000,
      comboPrice: 95000,
      saving: 25000,
      emoji: '🥗',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      title: t.offers.apertifCombo.title,
      description: t.offers.apertifCombo.description,
      originalPrice: 100000,
      comboPrice: 80000,
      saving: 20000,
      emoji: '🍹',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop',
    },
  ];

  // Special offers
  const specialOffers = [
    {
      id: 1,
      title: t.offers.weekendSpecial.title,
      description: t.offers.weekendSpecial.description,
      validity: t.offers.weekendSpecial.validity,
      emoji: '🎉',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      title: t.offers.smoothie3x2.title,
      description: t.offers.smoothie3x2.description,
      validity: t.offers.smoothie3x2.validity,
      emoji: '🥤',
      image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&h=300&fit=crop',
    },
  ];

  // Format price in VND
  const formatPrice = (price: number) => {
    const priceInK = Math.round(price / 1000);
    return `${priceInK}K`;
  };

  return (
    <div className="min-h-screen bg-theme-bg-secondary pb-28">
      {/* Header */}
      <HomeHeader />

      {/* Title Section */}
      <div className="container mx-auto px-4 pt-6">
        <h1 className="text-3xl font-bold text-theme-text-primary mb-2">
          🎁 {t.offers.pageTitle}
        </h1>
        <p className="text-theme-text-secondary mb-6">
          {t.offers.pageSubtitle}
        </p>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pb-8">
        {/* Happy Hour Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-theme-text-primary mb-4">
            🎉 {t.offers.happyHourTitle}
          </h2>
          <div className="space-y-4">
            {happyHourOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 shadow-xl text-white"
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{offer.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                    <p className="text-white/90 mb-2">{offer.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                        {offer.time}
                      </span>
                      <span className="bg-white text-green-600 px-3 py-1 rounded-full text-sm font-bold">
                        {offer.discount}% OFF
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Combo Menu Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-theme-text-primary mb-4">
            🍽️ {t.offers.comboMenuTitle}
          </h2>
          <div className="space-y-4">
            {comboMenus.map((combo) => (
              <div
                key={combo.id}
                className="bg-theme-bg-elevated rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="flex">
                  {/* Image */}
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={combo.image}
                      alt={combo.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-2xl">{combo.emoji}</span>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-theme-text-primary">{combo.title}</h3>
                        <p className="text-sm text-theme-text-secondary">{combo.description}</p>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center gap-3">
                      <span className="text-theme-text-tertiary line-through text-sm">
                        {formatPrice(combo.originalPrice)}
                      </span>
                      <span className="text-primary font-bold text-xl">
                        {formatPrice(combo.comboPrice)}
                      </span>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                        {t.offers.save} {formatPrice(combo.saving)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Offers Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-theme-text-primary mb-4">
            ⭐ {t.offers.specialOffersTitle}
          </h2>
          <div className="space-y-4">
            {specialOffers.map((offer) => (
              <div
                key={offer.id}
                className="bg-theme-bg-elevated rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{offer.emoji}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-theme-text-primary mb-2">
                      {offer.title}
                    </h3>
                    <p className="text-theme-text-secondary mb-3">{offer.description}</p>
                    <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-bold">
                      📅 {offer.validity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Engagement CTA */}
        <div className="bg-theme-bg-elevated rounded-2xl p-6 shadow-lg border-2 border-pink-100 mb-6">
          <h2 className="text-2xl font-bold text-theme-text-primary mb-2">
            💝 {t.offers.earnExtraDiscounts}
          </h2>
          <p className="text-theme-text-secondary mb-4">
            {t.offers.shareExperienceText}
          </p>
          <Link
            href="/"
            className="inline-block bg-secondary text-white px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all"
          >
            {t.offers.goToEngagementHub}
          </Link>
        </div>

        {/* CTA to Menu */}
        <div className="text-center mt-8">
          <Link
            href="/menu"
            className="inline-block bg-primary text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            🌱 {t.offers.browseFullMenu}
          </Link>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavLocal />
    </div>
  );
}
