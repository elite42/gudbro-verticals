'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { languagePreferencesStore } from '../lib/language-preferences';
import { currencyPreferencesStore } from '../lib/currency-preferences';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useTheme } from '../lib/theme/theme-context';

export function HomeHeader() {
  const { business, i18n } = coffeeshopConfig;
  const { themeMode, toggleTheme } = useTheme();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return languagePreferencesStore.get().selectedLanguage;
    }
    return i18n.defaultLanguage;
  });
  const [selectedCurrency, setSelectedCurrency] = useState(() => {
    if (typeof window !== 'undefined') {
      return currencyPreferencesStore.get().selectedCurrency;
    }
    return i18n.defaultCurrency;
  });

  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for language dropdown
  useKeyboardNavigation({
    isOpen: showLanguageMenu,
    onClose: () => setShowLanguageMenu(false),
    onEscape: () => setShowLanguageMenu(false)
  });

  // Keyboard navigation for currency dropdown
  useKeyboardNavigation({
    isOpen: showCurrencyMenu,
    onClose: () => setShowCurrencyMenu(false),
    onEscape: () => setShowCurrencyMenu(false)
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(event.target as Node)) {
        setShowCurrencyMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Listen for store updates
  useEffect(() => {
    const handleLanguageUpdate = () => {
      setSelectedLanguage(languagePreferencesStore.get().selectedLanguage);
    };

    const handleCurrencyUpdate = () => {
      setSelectedCurrency(currencyPreferencesStore.get().selectedCurrency);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('language-preferences-updated', handleLanguageUpdate);
      window.addEventListener('currency-preferences-updated', handleCurrencyUpdate);

      return () => {
        window.removeEventListener('language-preferences-updated', handleLanguageUpdate);
        window.removeEventListener('currency-preferences-updated', handleCurrencyUpdate);
      };
    }
  }, []);

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    languagePreferencesStore.set({ selectedLanguage: code });
    setShowLanguageMenu(false);
  };

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    currencyPreferencesStore.set({
      selectedCurrency: currency,
      enabled: currency !== 'VND' // Enable conversion if not VND
    });
    setShowCurrencyMenu(false);
  };

  // Find current language and currency
  const currentLanguage = i18n.supportedLanguages.find(lang => lang.code === selectedLanguage);
  const currentCurrency = selectedCurrency;

  return (
    <div className="relative">
      {/* Hero Image Background */}
      <div className="relative h-56">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&h=400&fit=crop&auto=format&q=75&fm=webp')`,
          }}
          role="img"
          aria-label="Coffee shop hero image"
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Top Bar - Language/Currency Selector */}
        <div className="relative z-20 flex items-center justify-between p-4">
          {/* Left: Language/Currency Selector */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLanguageMenu(!showLanguageMenu);
                  setShowCurrencyMenu(false);
                }}
                className="flex items-center justify-center bg-white/20 backdrop-blur-sm w-12 h-12 rounded-full text-white hover:bg-white/30 transition-colors text-base font-bold shadow-lg uppercase"
                aria-label={`Select language. Current: ${currentLanguage?.name}`}
                aria-haspopup="true"
                aria-expanded={showLanguageMenu}
              >
                {currentLanguage?.code}
              </button>

              {/* Language Dropdown */}
              {showLanguageMenu && (
                <div
                  className="absolute top-12 left-0 bg-theme-bg-elevated rounded-xl shadow-2xl overflow-hidden min-w-[160px] z-[9999] pointer-events-auto"
                  role="menu"
                  aria-label="Language options"
                >
                  {i18n.supportedLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLanguageSelect(lang.code);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-theme-bg-tertiary transition-colors ${
                        lang.code === selectedLanguage ? 'bg-theme-bg-secondary' : ''
                      }`}
                      role="menuitem"
                      aria-label={`Select ${lang.name}`}
                      aria-current={lang.code === selectedLanguage ? 'true' : undefined}
                    >
                      <img
                        src={`https://flagcdn.com/w80/${lang.countryCode}.png`}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover"
                        aria-hidden="true"
                      />
                      <span className="text-sm font-medium text-theme-text-primary">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative" ref={currencyDropdownRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCurrencyMenu(!showCurrencyMenu);
                  setShowLanguageMenu(false);
                }}
                className="flex items-center justify-center bg-white/20 backdrop-blur-sm w-12 h-12 rounded-full text-white hover:bg-white/30 transition-colors text-base font-bold shadow-lg"
                aria-label={`Select currency. Current: ${currentCurrency}`}
                aria-haspopup="true"
                aria-expanded={showCurrencyMenu}
              >
                {currentCurrency}
              </button>

              {/* Currency Dropdown */}
              {showCurrencyMenu && (
                <div
                  className="absolute top-12 left-0 bg-theme-bg-elevated rounded-xl shadow-2xl overflow-hidden min-w-[140px] z-[9999] pointer-events-auto"
                  role="menu"
                  aria-label="Currency options"
                >
                  {i18n.supportedCurrencies.map((currency) => {
                    const currencyCountryCodes: Record<string, string> = {
                      'VND': 'vn',
                      'USD': 'us',
                      'EUR': 'eu',
                      'GBP': 'gb'
                    };
                    return (
                      <button
                        key={currency}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCurrencySelect(currency);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-theme-bg-tertiary transition-colors ${
                          currency === selectedCurrency ? 'bg-theme-bg-secondary' : ''
                        }`}
                        role="menuitem"
                        aria-label={`Select ${currency}`}
                        aria-current={currency === selectedCurrency ? 'true' : undefined}
                      >
                        <img
                          src={`https://flagcdn.com/w80/${currencyCountryCodes[currency]}.png`}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-bold text-theme-text-primary">{currency}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right: Theme Toggle & Account Icon */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="relative bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
              aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
            >
              {themeMode === 'light' ? (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Account Button */}
            <Link
              href="/account"
              className="relative bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Go to account settings"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Logo positioned at bottom of banner, overlapping */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 z-10 pointer-events-none">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-theme-bg-elevated shadow-2xl border-4 border-theme-bg-elevated">
            <img
              src={business.logo}
              alt={business.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Restaurant Name - below banner */}
      <div className="bg-theme-bg-secondary pt-20 pb-2">
        <h1 className="text-2xl font-bold text-theme-text-primary text-center">
          {business.name}
        </h1>
      </div>
    </div>
  );
}
