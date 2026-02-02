'use client';

import { useState } from 'react';
import { AVAILABLE_CURRENCIES, currencyPreferencesStore } from '../lib/currency';
import { AVAILABLE_LANGUAGES, languagePreferencesStore } from '../lib/language-preferences';

interface DisplayPreferencesModalProps {
  onClose: () => void;
  onSave?: () => void;
  onBack?: () => void;
  showAsOnboarding?: boolean;
}

export function DisplayPreferencesModal({
  onClose,
  onSave,
  onBack,
  showAsOnboarding = false,
}: DisplayPreferencesModalProps) {
  const currentCurrencyPrefs = currencyPreferencesStore.get();
  const currentLanguagePrefs = languagePreferencesStore.get();

  const [selectedCurrency, setSelectedCurrency] = useState(currentCurrencyPrefs.selectedCurrency);
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguagePrefs.selectedLanguage);

  const handleSave = () => {
    // Save currency preferences
    const currencyEnabled = selectedCurrency !== 'EUR'; // Enable conversion if not EUR (base currency)
    currencyPreferencesStore.set({
      enabled: currencyEnabled,
      selectedCurrency,
    });

    // Save language preferences
    languagePreferencesStore.set({
      selectedLanguage,
    });

    if (onSave) {
      onSave();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-theme-bg-elevated relative flex w-full max-w-md flex-col overflow-hidden rounded-2xl">
        {/* Header */}
        <div className="border-theme-bg-tertiary relative border-b p-6">
          {/* Emoji Icon - Left */}
          <div className="absolute left-6 top-6 flex h-6 w-6 items-center justify-center text-xl">
            ⚙️
          </div>

          {/* Close Button - Right */}
          <button
            onClick={onClose}
            className="text-theme-text-tertiary hover:text-theme-text-secondary focus:ring-theme-bg-tertiary absolute right-6 top-6 rounded transition-all duration-150 focus:outline-none focus:ring-2 active:scale-90"
            aria-label="Chiudi"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Centered Title */}
          <div className="mb-4 text-center">
            <h2 className="text-theme-text-primary text-2xl font-bold">Visualizzazione</h2>
            <p className="text-theme-text-tertiary text-sm">
              {showAsOnboarding ? 'Step 4 di 4' : 'Impostazioni'}
            </p>
          </div>

          {/* Progress Bar - only for onboarding */}
          {showAsOnboarding && (
            <div className="mb-4 flex gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-2 flex-1 rounded-full transition-all ${
                    step <= 4 ? 'bg-green-500' : 'bg-theme-bg-tertiary'
                  }`}
                />
              ))}
            </div>
          )}

          <p className="text-theme-text-secondary text-sm">
            Scegli come visualizzare prezzi e contenuti.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Language Selection */}
          <div>
            <label className="text-theme-text-secondary mb-2 block flex items-center gap-2 text-sm font-medium">
              <span className="text-lg">🌍</span>
              Lingua
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="border-theme-bg-tertiary w-full rounded-lg border-2 p-3 text-lg focus:border-blue-500 focus:outline-none"
            >
              {AVAILABLE_LANGUAGES.map((language) => (
                <option key={language.code} value={language.code}>
                  {language.flag} {language.nativeName}
                </option>
              ))}
            </select>
          </div>

          {/* Currency Selection */}
          <div>
            <label className="text-theme-text-secondary mb-2 block flex items-center gap-2 text-sm font-medium">
              <span className="text-lg">💱</span>
              Valuta
            </label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="border-theme-bg-tertiary w-full rounded-lg border-2 p-3 text-lg focus:border-blue-500 focus:outline-none"
            >
              {AVAILABLE_CURRENCIES.map((currency) => (
                <option key={currency.code} value={currency.code}>
                  {currency.symbol} {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>

          {/* Warning if currency not VND */}
          {selectedCurrency !== 'VND' && (
            <div className="bg-theme-brand-secondary border-theme-brand-accent rounded-lg border p-3">
              <div className="flex gap-2">
                <div className="text-theme-brand-primary text-lg">⚠️</div>
                <div className="flex-1">
                  <p className="text-theme-brand-primary text-sm">
                    Il pagamento verrà effettuato in <strong>VND</strong>. La conversione è solo
                    informativa.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with buttons */}
        <div className="border-theme-bg-tertiary bg-theme-bg-secondary border-t p-6">
          <div className="flex gap-3">
            {showAsOnboarding ? (
              <>
                {onBack && (
                  <button
                    onClick={onBack}
                    className="border-theme-bg-tertiary text-theme-text-secondary hover:bg-theme-bg-tertiary focus:ring-theme-bg-tertiary flex-1 rounded-lg border px-4 py-3 font-medium transition-all duration-150 focus:outline-none focus:ring-2 active:scale-95"
                  >
                    Indietro
                  </button>
                )}
                <button
                  onClick={handleSave}
                  className="flex-1 rounded-lg bg-blue-500 px-4 py-3 font-bold text-white transition-all duration-150 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95"
                >
                  Conferma
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="border-theme-bg-tertiary text-theme-text-secondary hover:bg-theme-bg-tertiary focus:ring-theme-bg-tertiary flex-1 rounded-lg border px-4 py-3 font-medium transition-all duration-150 focus:outline-none focus:ring-2 active:scale-95"
                >
                  Annulla
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 rounded-lg bg-blue-500 px-4 py-3 font-bold text-white transition-all duration-150 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 active:scale-95"
                >
                  Conferma
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
