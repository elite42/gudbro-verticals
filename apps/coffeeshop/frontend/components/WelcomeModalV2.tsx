'use client';

import React, { useState, useId, useEffect, useRef } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useSwipeToDismiss } from '../hooks/useSwipeToDismiss';
import { useTranslation } from '@/lib/use-translation';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { defaultVenueConfig, type VenueOnboardingConfig } from '@/lib/venue-config';
import { WiFiCredentials } from './WiFiCredentials';
import { QuickActionsBar } from './QuickActionsBar';
import { Button } from './ui/button';

interface WelcomeModalV2Props {
  isOpen: boolean;
  onClose: () => void;
  restaurantName?: string;
  tableNumber?: string;
  venueConfig?: VenueOnboardingConfig;
}

/**
 * Flat Flag Icon Component
 * Modern rounded-square flags for language selector
 */
const FlagIcon = ({ code, size = 24 }: { code: string; size?: number }) => {
  const flags: Record<string, JSX.Element> = {
    en: (
      // England Flag (St George's Cross) - Much simpler and clearer than Union Jack
      <svg width={size} height={size} viewBox="0 0 60 60" className="rounded-md overflow-hidden shadow-sm">
        <rect width="60" height="60" fill="white"/>
        {/* Red cross */}
        <rect x="0" y="24" width="60" height="12" fill="#CE1124"/>
        <rect x="24" y="0" width="12" height="60" fill="#CE1124"/>
      </svg>
    ),
    it: (
      // Italy Flag - Tricolor
      <svg width={size} height={size} viewBox="0 0 60 60" className="rounded-md overflow-hidden shadow-sm">
        <rect width="60" height="60" fill="white"/>
        <rect width="20" height="60" fill="#009246"/>
        <rect x="40" width="20" height="60" fill="#CE2B37"/>
      </svg>
    ),
    vi: (
      // Vietnam Flag - Red with yellow star
      <svg width={size} height={size} viewBox="0 0 60 60" className="rounded-md overflow-hidden shadow-sm">
        <rect width="60" height="60" fill="#DA251D"/>
        <path d="M30 15 L34.5 27.5 L48 27.5 L37 35 L41.5 47.5 L30 40 L18.5 47.5 L23 35 L12 27.5 L25.5 27.5 Z" fill="#FFCD00"/>
      </svg>
    ),
  };

  return flags[code] || flags.en;
};

/**
 * WelcomeModal V2 - Redesigned Onboarding Experience
 *
 * Features:
 * - Single-screen compact layout (no multi-step friction)
 * - Language + Currency dropdowns (side-by-side, no labels)
 * - WiFi credentials with QR code
 * - Quick Actions (Share, Call Staff)
 * - Auth CTA for loyalty/advanced features
 * - 100% backoffice-configurable via venue-config.ts
 */
export function WelcomeModalV2({
  isOpen,
  onClose,
  restaurantName = coffeeshopConfig.name,
  tableNumber,
  venueConfig = defaultVenueConfig,
}: WelcomeModalV2Props) {
  const { t, language, setLanguage } = useTranslation();
  const [currency, setCurrency] = useState(coffeeshopConfig.i18n.defaultCurrency);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);

  // Accessibility: Focus trap and keyboard navigation
  const modalRef = useFocusTrap(isOpen);
  const titleId = useId();
  const descId = useId();

  useKeyboardNavigation({
    isOpen,
    onClose: handleClose,
    onEscape: handleClose,
  });

  // Swipe-to-dismiss functionality
  const swipe = useSwipeToDismiss({ isOpen, onClose: handleClose });

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setShowCurrencyDropdown(false);
      }
    }

    if (showLanguageDropdown || showCurrencyDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showLanguageDropdown, showCurrencyDropdown]);

  function handleClose() {
    // Mark onboarding as completed in localStorage
    if (typeof window !== 'undefined' && venueConfig.behavior.showOnce) {
      localStorage.setItem('gudbro_onboarding_completed', 'true');
    }
    onClose();
  }

  function handleLogin() {
    handleClose();
    // TODO: Open login modal or redirect to /login
    console.log('TODO: Open login modal');
  }

  function handleSignup() {
    handleClose();
    // TODO: Open signup modal or redirect to /signup
    console.log('TODO: Open signup modal');
  }

  function handleCallStaff() {
    // TODO: Implement WebSocket notification
    console.log('Staff called for table:', tableNumber);
  }

  if (!isOpen) return null;

  // Replace placeholders in welcome message
  const welcomeTitle = venueConfig.welcomeMessage.title[language as 'en' | 'vi' | 'it']
    .replace('{venueName}', restaurantName);
  const welcomeSubtitle = venueConfig.welcomeMessage.subtitle?.[language as 'en' | 'vi' | 'it']
    ?.replace('{tableNumber}', tableNumber || '');

  // Get language-specific content
  const authTitle = venueConfig.authCTA.title[language as 'en' | 'vi' | 'it'] || venueConfig.authCTA.title.en;
  const authBenefits = venueConfig.authCTA.benefits[language as 'en' | 'vi' | 'it'] || venueConfig.authCTA.benefits.en;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[100] bg-black/50 transition-opacity"
        style={swipe.getBackdropStyle()}
        onClick={handleClose}
      />

      {/* Bottom Sheet */}
      <div
        ref={modalRef}
        className="fixed bottom-0 left-0 right-0 z-[120] bg-theme-bg-elevated rounded-t-3xl shadow-2xl max-h-[92vh] overflow-hidden select-none"
        style={swipe.getModalStyle()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        onTouchStart={swipe.handleTouchStart}
        onTouchMove={swipe.handleTouchMove}
        onTouchEnd={swipe.handleTouchEnd}
        onMouseDown={swipe.handleMouseDown}
        onMouseMove={swipe.handleMouseMove}
        onMouseUp={swipe.handleMouseUp}
        onMouseLeave={swipe.handleMouseLeave}
      >
        {/* Handle Bar with Close Button */}
        <div className="flex justify-between items-center pt-3 pb-2 px-4">
          <div className="w-8" /> {/* Spacer */}
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          {venueConfig.behavior.allowDismiss && (
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-theme-bg-secondary transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="px-6 py-3 overflow-y-auto max-h-[calc(92vh-140px)] space-y-4">
          {/* Welcome Message */}
          {venueConfig.welcomeMessage.enabled && (
            <div className="text-center mb-2">
              <div className="text-6xl mb-4" aria-hidden="true">
                {venueConfig.welcomeMessage.icon}
              </div>
              <h2 id={titleId} className="text-3xl font-bold text-theme-text-primary mb-2">
                {welcomeTitle}
              </h2>
              {welcomeSubtitle && (
                <p id={descId} className="text-base text-theme-text-secondary font-medium">
                  {welcomeSubtitle}
                </p>
              )}
            </div>
          )}

          {/* Language + Currency Selectors - Custom Dropdown Design */}
          {venueConfig.quickActions.languageCurrency.enabled && (
            <div className="flex gap-3">
              {/* Language Dropdown */}
              {venueConfig.quickActions.languageCurrency.showLanguageSelector && (
                <div ref={languageDropdownRef} className="relative flex-1">
                  <button
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="w-full px-4 py-3 bg-theme-bg-elevated border-2 border-theme-border-secondary rounded-xl text-base font-semibold text-theme-text-primary hover:border-theme-border-primary hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between min-h-[56px]"
                  >
                    <span className="flex items-center gap-2">
                      <FlagIcon code={language} size={28} />
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
                            setLanguage(lang.code as any);
                            setShowLanguageDropdown(false);
                          }}
                          className={`w-full px-4 py-3 text-left text-base font-semibold transition-colors flex items-center gap-3 ${
                            language === lang.code
                              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white'
                              : 'text-theme-text-primary hover:bg-theme-bg-secondary'
                          }`}
                        >
                          <FlagIcon code={lang.code} size={28} />
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Currency Dropdown */}
              {venueConfig.quickActions.languageCurrency.showCurrencySelector && (
                <div ref={currencyDropdownRef} className="relative flex-1">
                  <button
                    onClick={() => setShowCurrencyDropdown(!showCurrencyDropdown)}
                    className="w-full px-4 py-3 bg-theme-bg-elevated border-2 border-theme-border-secondary rounded-xl text-base font-semibold text-theme-text-primary hover:border-theme-border-primary hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between min-h-[56px]"
                  >
                    <span>
                      {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'VND' ? 'đ' : currency === 'GBP' ? '£' : currency} {currency}
                    </span>
                    <svg className={`w-5 h-5 transition-transform ${showCurrencyDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showCurrencyDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-theme-bg-elevated border-2 border-theme-border-secondary rounded-xl shadow-lg overflow-hidden z-50">
                      {coffeeshopConfig.i18n.supportedCurrencies.map((curr) => {
                        const symbol = curr === 'USD' ? '$' : curr === 'EUR' ? '€' : curr === 'VND' ? 'đ' : curr === 'GBP' ? '£' : curr;
                        return (
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
                            {symbol} {curr}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* WiFi Credentials */}
          {venueConfig.quickActions.wifi.enabled && (
            <WiFiCredentials
              ssid={venueConfig.quickActions.wifi.ssid}
              password={venueConfig.quickActions.wifi.password}
              showQRCode={venueConfig.quickActions.wifi.showQRCode}
            />
          )}

          {/* Quick Actions Bar */}
          {(venueConfig.quickActions.shareLocation.enabled || venueConfig.quickActions.callWaiter.enabled) && (
            <QuickActionsBar
              venueName={restaurantName}
              showShareLocation={venueConfig.quickActions.shareLocation.enabled}
              showCallStaff={venueConfig.quickActions.callWaiter.enabled}
              onCallStaff={handleCallStaff}
            />
          )}

          {/* Auth CTA (Login/Signup for Advanced Features) - Compact */}
          {venueConfig.authCTA.enabled && (
            <div className="bg-theme-bg-tertiary border-2 border-theme-border-secondary rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">✨</div>
                <div className="flex-1">
                  <h3 className="text-base font-bold text-theme-text-primary">{authTitle}</h3>
                  <p className="text-xs text-theme-text-secondary">{t.auth.benefitsSubtitle}</p>
                </div>
              </div>

              {/* Auth Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleLogin}
                  className="flex-1 px-4 py-2.5 bg-theme-bg-elevated border-2 border-theme-border-secondary text-theme-text-primary font-semibold rounded-lg hover:border-theme-border-primary hover:bg-theme-bg-secondary active:scale-[0.98] transition-all"
                >
                  {t.auth.login}
                </button>
                <button
                  onClick={handleSignup}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all shadow-md"
                >
                  {t.auth.signup}
                </button>
              </div>
            </div>
          )}

          {/* Go to Menu Button - Inside scrollable area */}
          <div className="pt-4 pb-2">
            <button
              onClick={handleClose}
              className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-base font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] transition-all shadow-lg"
            >
              {t.auth.goToMenu}
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
