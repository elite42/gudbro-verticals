'use client';

import { useState, useEffect, useRef } from 'react';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { languagePreferencesStore } from '../lib/language-preferences';
import { currencyPreferencesStore } from '../lib/currency';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useTheme } from '../lib/theme/theme-context';
import { useMerchantConfig } from '../lib/contexts/MerchantConfigContext';

export function HomeHeader() {
  const { business, i18n } = coffeeshopConfig;
  const { themeMode, toggleTheme } = useTheme();
  const { enabledLanguages, isLoading: isLoadingConfig } = useMerchantConfig();
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
    return i18n.baseCurrency;
  });

  const languageDropdownRef = useRef<HTMLDivElement>(null);
  const currencyDropdownRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for language dropdown
  useKeyboardNavigation({
    isOpen: showLanguageMenu,
    onClose: () => setShowLanguageMenu(false),
    onEscape: () => setShowLanguageMenu(false),
  });

  // Keyboard navigation for currency dropdown
  useKeyboardNavigation({
    isOpen: showCurrencyMenu,
    onClose: () => setShowCurrencyMenu(false),
    onEscape: () => setShowCurrencyMenu(false),
  });

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageDropdownRef.current &&
        !languageDropdownRef.current.contains(event.target as Node)
      ) {
        setShowLanguageMenu(false);
      }
      if (
        currencyDropdownRef.current &&
        !currencyDropdownRef.current.contains(event.target as Node)
      ) {
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
      enabled: currency !== 'EUR', // Enable conversion if not EUR (base currency)
    });
    setShowCurrencyMenu(false);
  };

  // Find current language and currency - use dynamic languages from merchant config
  const currentLanguage =
    enabledLanguages.find((lang) => lang.code === selectedLanguage) || enabledLanguages[0];
  const currentCurrency = selectedCurrency;

  return (
    <div className="relative">
      {/* Hero Image Background - Responsive height */}
      <div className="relative h-56 md:h-72 lg:h-96">
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
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-base font-bold uppercase text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/30"
                aria-label={`Select language. Current: ${currentLanguage?.name}`}
                aria-haspopup="true"
                aria-expanded={showLanguageMenu}
              >
                {currentLanguage?.code}
              </button>

              {/* Language Dropdown - Uses dynamic languages from merchant config */}
              {showLanguageMenu && (
                <div
                  className="bg-theme-bg-elevated pointer-events-auto absolute left-0 top-12 z-[9999] min-w-[160px] overflow-hidden rounded-xl shadow-2xl"
                  role="menu"
                  aria-label="Language options"
                >
                  {enabledLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLanguageSelect(lang.code);
                      }}
                      className={`hover:bg-theme-bg-tertiary flex w-full items-center gap-3 px-4 py-3 transition-colors ${
                        lang.code === selectedLanguage ? 'bg-theme-bg-secondary' : ''
                      }`}
                      role="menuitem"
                      aria-label={`Select ${lang.name}`}
                      aria-current={lang.code === selectedLanguage ? 'true' : undefined}
                    >
                      <img
                        src={`https://flagcdn.com/w80/${lang.countryCode}.png`}
                        alt=""
                        className="h-7 w-7 rounded-full object-cover"
                        aria-hidden="true"
                      />
                      <span className="text-theme-text-primary text-sm font-medium">
                        {lang.nativeName || lang.name}
                        {lang.direction === 'rtl' && (
                          <span className="ml-1 text-xs opacity-60">RTL</span>
                        )}
                      </span>
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
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-base font-bold text-white shadow-lg backdrop-blur-sm transition-colors hover:bg-white/30"
                aria-label={`Select currency. Current: ${currentCurrency}`}
                aria-haspopup="true"
                aria-expanded={showCurrencyMenu}
              >
                {currentCurrency}
              </button>

              {/* Currency Dropdown */}
              {showCurrencyMenu && (
                <div
                  className="bg-theme-bg-elevated pointer-events-auto absolute left-0 top-12 z-[9999] min-w-[140px] overflow-hidden rounded-xl shadow-2xl"
                  role="menu"
                  aria-label="Currency options"
                >
                  {i18n.supportedCurrencies.map((currency) => {
                    const currencyCountryCodes: Record<string, string> = {
                      VND: 'vn',
                      USD: 'us',
                      EUR: 'eu',
                      GBP: 'gb',
                    };
                    return (
                      <button
                        key={currency}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCurrencySelect(currency);
                        }}
                        className={`hover:bg-theme-bg-tertiary flex w-full items-center gap-3 px-4 py-3 transition-colors ${
                          currency === selectedCurrency ? 'bg-theme-bg-secondary' : ''
                        }`}
                        role="menuitem"
                        aria-label={`Select ${currency}`}
                        aria-current={currency === selectedCurrency ? 'true' : undefined}
                      >
                        <img
                          src={`https://flagcdn.com/w80/${currencyCountryCodes[currency]}.png`}
                          alt=""
                          className="h-7 w-7 rounded-full object-cover"
                          aria-hidden="true"
                        />
                        <span className="text-theme-text-primary text-sm font-bold">
                          {currency}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right: Theme Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="relative rounded-full bg-white/20 p-3 backdrop-blur-sm transition-colors hover:bg-white/30"
              aria-label={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}
            >
              {themeMode === 'light' ? (
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Logo positioned at bottom of banner, overlapping */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 transform">
          <div className="bg-theme-bg-elevated border-theme-bg-elevated h-32 w-32 overflow-hidden rounded-full border-4 shadow-2xl">
            <img src={business.logo} alt={business.name} className="h-full w-full object-cover" />
          </div>
        </div>
      </div>

      {/* Restaurant Name - below banner */}
      <div className="bg-theme-bg-secondary pb-2 pt-20">
        <h1 className="text-theme-text-primary text-center text-2xl font-bold">{business.name}</h1>
      </div>
    </div>
  );
}
