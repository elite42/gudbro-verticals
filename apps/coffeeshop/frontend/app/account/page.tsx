'use client';

import { useState } from 'react';
import { HomeHeader } from '../../components/HomeHeader';
import { BottomNavLocal } from '../../components/BottomNavLocal';
import { coffeeshopConfig } from '../../config/coffeeshop.config';
import { useTranslation } from '@/lib/use-translation';

export default function AccountPage() {
  const { t } = useTranslation();
  const { business } = coffeeshopConfig;

  return (
    <div className="min-h-screen bg-theme-bg-secondary pb-28">
      {/* Header */}
      <HomeHeader />

      {/* Account Content */}
      <div className="container mx-auto px-4 pt-6">
        <h1 className="text-3xl font-bold text-theme-text-primary mb-6">
          👤 {t.account.pageTitle}
        </h1>

        <div className="bg-theme-bg-elevated rounded-2xl p-6 shadow-lg mb-6">
          <h2 className="text-xl font-bold text-theme-text-primary mb-4">
            {t.account.privateAreaTitle}
          </h2>
          <p className="text-theme-text-secondary mb-4">
            {t.account.comingSoonMessage}
          </p>
          <p className="text-theme-text-secondary">
            {t.account.featuresMessage}
          </p>
        </div>

        <div className="bg-theme-bg-elevated rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-theme-text-primary mb-4">
            {t.account.upcomingFeaturesTitle}
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-theme-text-secondary">{t.account.features.saveFavorites}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-theme-text-secondary">{t.account.features.orderHistory}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-theme-text-secondary">{t.account.features.dietaryPreferences}</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-500 text-xl">✓</span>
              <span className="text-theme-text-secondary">{t.account.features.loyaltyProgram}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavLocal />
    </div>
  );
}
