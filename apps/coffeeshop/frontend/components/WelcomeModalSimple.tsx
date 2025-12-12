'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/lib/use-translation';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { defaultVenueConfig, type VenueOnboardingConfig } from '@/lib/venue-config';
import { WiFiCredentials } from './WiFiCredentials';

interface WelcomeModalSimpleProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignup: () => void;
  restaurantName?: string;
  tableNumber?: string;
  venueConfig?: VenueOnboardingConfig;
  currentUser?: { email?: string; name?: string } | null;
}

/**
 * WelcomeModalSimple - Simplified version without swipe-to-dismiss
 *
 * Auth state is managed by parent - this component just calls onLogin/onSignup callbacks
 */
export function WelcomeModalSimple({
  isOpen,
  onClose,
  onLogin,
  onSignup,
  restaurantName = coffeeshopConfig.name,
  tableNumber,
  venueConfig = defaultVenueConfig,
  currentUser = null,
}: WelcomeModalSimpleProps) {
  const { t, language, setLanguage } = useTranslation();
  const [currency, setCurrency] = useState(coffeeshopConfig.i18n.baseCurrency);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);

  // Block body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  function handleClose() {
    if (typeof window !== 'undefined' && venueConfig.behavior.showOnce) {
      localStorage.setItem('gudbro_onboarding_completed', 'true');
    }
    onClose();
  }

  // Replace placeholders in welcome message
  const welcomeTitle = venueConfig.welcomeMessage.title[language as 'en' | 'vi' | 'it']
    .replace('{venueName}', restaurantName);
  const welcomeSubtitle = venueConfig.welcomeMessage.subtitle?.[language as 'en' | 'vi' | 'it']
    ?.replace('{tableNumber}', tableNumber || '');

  const authTitle = venueConfig.authCTA.title[language as 'en' | 'vi' | 'it'] || venueConfig.authCTA.title.en;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[100] bg-black/50"
        onClick={handleClose}
      />

      {/* Bottom Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[120] bg-theme-bg-elevated rounded-t-3xl shadow-2xl max-h-[92vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        {/* Close Button */}
        {venueConfig.behavior.allowDismiss && (
          <button
            onClick={handleClose}
            className="absolute top-3 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-theme-bg-secondary transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Content */}
        <div className="px-6 py-3 overflow-y-auto max-h-[calc(92vh-60px)] space-y-4">
          {/* Welcome Message */}
          {venueConfig.welcomeMessage.enabled && (
            <div className="text-center mb-2">
              <div className="text-6xl mb-4">{venueConfig.welcomeMessage.icon}</div>
              <h2 className="text-3xl font-bold text-theme-text-primary mb-2">
                {welcomeTitle}
              </h2>
              {welcomeSubtitle && (
                <p className="text-base text-theme-text-secondary font-medium">
                  {welcomeSubtitle}
                </p>
              )}
            </div>
          )}

          {/* Language Selector */}
          {venueConfig.quickActions.languageCurrency.enabled && (
            <div className="flex gap-3">
              {venueConfig.quickActions.languageCurrency.showLanguageSelector && (
                <div className="relative flex-1">
                  <button
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="w-full px-4 py-3 bg-theme-bg-elevated border-2 border-theme-border-secondary rounded-xl text-base font-semibold text-theme-text-primary hover:border-theme-border-primary transition-all flex items-center justify-between"
                  >
                    <span>
                      {coffeeshopConfig.i18n.supportedLanguages.find(l => l.code === language)?.name}
                    </span>
                    <svg className={`w-5 h-5 transition-transform ${showLanguageDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showLanguageDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-theme-bg-elevated border-2 border-theme-border-secondary rounded-xl shadow-lg overflow-hidden z-50">
                      {coffeeshopConfig.i18n.supportedLanguages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            setLanguage(lang.code as 'en' | 'vi' | 'it');
                            setShowLanguageDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-base font-semibold transition-colors ${
                            language === lang.code
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                              : 'text-theme-text-primary hover:bg-theme-bg-secondary'
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {venueConfig.quickActions.languageCurrency.showCurrencySelector && (
                <div className="relative flex-1">
                  <button
                    onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                    className="w-full px-4 py-3 bg-theme-bg-elevated border-2 border-theme-border-secondary rounded-xl text-base font-semibold text-theme-text-primary hover:border-theme-border-primary transition-all flex items-center justify-between"
                  >
                    <span>{currency}</span>
                    <svg className={`w-5 h-5 transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {showCurrencyDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-theme-bg-elevated border-2 border-theme-border-secondary rounded-xl shadow-lg overflow-hidden z-50">
                      {coffeeshopConfig.i18n.supportedCurrencies.map((curr) => (
                        <button
                          key={curr}
                          onClick={() => {
                            setCurrency(curr);
                            setShowCurrencyDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-base font-semibold transition-colors ${
                            currency === curr
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                              : 'text-theme-text-primary hover:bg-theme-bg-secondary'
                          }`}
                        >
                          {curr}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* WiFi */}
          {venueConfig.quickActions.wifi.enabled && (
            <WiFiCredentials
              ssid={venueConfig.quickActions.wifi.ssid}
              password={venueConfig.quickActions.wifi.password}
              showQRCode={venueConfig.quickActions.wifi.showQRCode}
            />
          )}

          {/* Auth CTA */}
          {venueConfig.authCTA.enabled && (
            <div className="bg-theme-bg-tertiary border-2 border-theme-border-secondary rounded-xl p-4 shadow-sm">
              {currentUser ? (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : currentUser.email?.charAt(0).toUpperCase() || '?'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-theme-text-primary truncate">
                      {language === 'it' ? 'Bentornato' : 'Welcome back'}, {currentUser.name || currentUser.email?.split('@')[0]}!
                    </h3>
                    <p className="text-xs text-theme-text-secondary truncate">{currentUser.email}</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">✨</div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-theme-text-primary">{authTitle}</h3>
                      <p className="text-xs text-theme-text-secondary">{t.auth.benefitsSubtitle}</p>
                    </div>
                  </div>

                  {/* Auth Buttons - Call parent callbacks */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={onLogin}
                      className="flex-1 px-4 py-2.5 bg-theme-bg-elevated border-2 border-theme-border-secondary text-theme-text-primary font-semibold rounded-lg hover:border-theme-border-primary hover:bg-theme-bg-secondary active:scale-[0.98] transition-all"
                    >
                      {t.auth.login}
                    </button>
                    <button
                      type="button"
                      onClick={onSignup}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all shadow-md"
                    >
                      {t.auth.signup}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Go to Menu Button */}
          <div className="pt-4 pb-6">
            <Link
              href="/menu"
              onClick={handleClose}
              className="block w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-base font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all shadow-lg text-center"
            >
              {t.auth.goToMenu}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
