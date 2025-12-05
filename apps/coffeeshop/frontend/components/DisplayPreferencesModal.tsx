'use client';

import { useState } from 'react';
import {
  AVAILABLE_CURRENCIES,
  currencyPreferencesStore
} from '../lib/currency-preferences';
import {
  AVAILABLE_LANGUAGES,
  languagePreferencesStore
} from '../lib/language-preferences';

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
  showAsOnboarding = false
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-theme-bg-elevated rounded-2xl max-w-md w-full overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="p-6 border-b border-theme-bg-tertiary relative">
          {/* Emoji Icon - Left */}
          <div className="absolute left-6 top-6 flex items-center justify-center w-6 h-6 text-xl">
            ⚙️
          </div>

          {/* Close Button - Right */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-theme-text-tertiary hover:text-theme-text-secondary
              active:scale-90 focus:outline-none focus:ring-2 focus:ring-theme-bg-tertiary rounded
              transition-all duration-150"
            aria-label="Chiudi"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Centered Title */}
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-theme-text-primary">
              Visualizzazione
            </h2>
            <p className="text-sm text-theme-text-tertiary">
              {showAsOnboarding ? 'Step 4 di 4' : 'Impostazioni'}
            </p>
          </div>

          {/* Progress Bar - only for onboarding */}
          {showAsOnboarding && (
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex-1 h-2 rounded-full transition-all ${
                    step <= 4 ? 'bg-green-500' : 'bg-theme-bg-tertiary'
                  }`}
                />
              ))}
            </div>
          )}

          <p className="text-sm text-theme-text-secondary">
            Scegli come visualizzare prezzi e contenuti.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-theme-text-secondary mb-2 flex items-center gap-2">
              <span className="text-lg">🌍</span>
              Lingua
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-3 border-2 border-theme-bg-tertiary rounded-lg text-lg focus:border-blue-500 focus:outline-none"
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
            <label className="block text-sm font-medium text-theme-text-secondary mb-2 flex items-center gap-2">
              <span className="text-lg">💱</span>
              Valuta
            </label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              className="w-full p-3 border-2 border-theme-bg-tertiary rounded-lg text-lg focus:border-blue-500 focus:outline-none"
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
            <div className="p-3 bg-theme-brand-secondary border border-theme-brand-accent rounded-lg">
              <div className="flex gap-2">
                <div className="text-theme-brand-primary text-lg">⚠️</div>
                <div className="flex-1">
                  <p className="text-sm text-theme-brand-primary">
                    Il pagamento verrà effettuato in <strong>VND</strong>. La conversione è solo informativa.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with buttons */}
        <div className="p-6 border-t border-theme-bg-tertiary bg-theme-bg-secondary">
          <div className="flex gap-3">
            {showAsOnboarding ? (
              <>
                {onBack && (
                  <button
                    onClick={onBack}
                    className="flex-1 py-3 px-4 border border-theme-bg-tertiary rounded-lg text-theme-text-secondary font-medium
                      hover:bg-theme-bg-tertiary active:scale-95 focus:outline-none focus:ring-2 focus:ring-theme-bg-tertiary
                      transition-all duration-150"
                  >
                    Indietro
                  </button>
                )}
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-lg font-bold
                    hover:bg-blue-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400
                    transition-all duration-150"
                >
                  Conferma
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 border border-theme-bg-tertiary rounded-lg text-theme-text-secondary font-medium
                    hover:bg-theme-bg-tertiary active:scale-95 focus:outline-none focus:ring-2 focus:ring-theme-bg-tertiary
                    transition-all duration-150"
                >
                  Annulla
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-lg font-bold
                    hover:bg-blue-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400
                    transition-all duration-150"
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
