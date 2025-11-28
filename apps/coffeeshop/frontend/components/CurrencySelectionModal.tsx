'use client';

import { useState } from 'react';
import {
  AVAILABLE_CURRENCIES,
  currencyPreferencesStore
} from '../lib/currency-preferences';

interface CurrencySelectionModalProps {
  onClose: () => void;
  onSave?: () => void;
  onBack?: () => void;
  showAsOnboarding?: boolean;
}

export function CurrencySelectionModal({
  onClose,
  onSave,
  onBack,
  showAsOnboarding = false
}: CurrencySelectionModalProps) {
  const currentPrefs = currencyPreferencesStore.get();
  const [selectedCurrency, setSelectedCurrency] = useState(currentPrefs.selectedCurrency);

  const handleSave = () => {
    // Always enable if user selects a currency different from VND
    const enabled = selectedCurrency !== 'VND';

    currencyPreferencesStore.set({
      enabled,
      selectedCurrency,
    });

    if (onSave) {
      onSave();
    } else {
      onClose();
    }
  };

  const handleSkip = () => {
    // Keep VND as default, disabled
    currencyPreferencesStore.set({
      enabled: false,
      selectedCurrency: 'VND',
    });

    if (onSave) {
      onSave();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-theme-bg-elevated rounded-2xl max-w-md w-full overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-theme-bg-tertiary">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">💱</div>
              <div>
                <h2 className="text-2xl font-bold text-theme-text-primary">
                  Preferenza Valuta
                </h2>
                <p className="text-sm text-theme-text-tertiary">
                  {showAsOnboarding ? 'Step 4 di 4' : 'Impostazioni'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-theme-text-tertiary hover:text-theme-text-secondary text-2xl leading-none"
            >
              ×
            </button>
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
            Seleziona la tua valuta preferita. I prezzi saranno convertiti automaticamente.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Currency Dropdown */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-theme-text-primary mb-2">
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

          {/* Warning if not VND */}
          {selectedCurrency !== 'VND' && (
            <div className="p-3 bg-theme-brand-secondary border border-theme-brand-accent rounded-lg">
              <div className="flex gap-2">
                <div className="text-theme-brand-primary">⚠️</div>
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
                    className="flex-1 py-3 px-4 border border-theme-bg-tertiary rounded-lg text-theme-text-primary font-medium hover:bg-theme-bg-tertiary transition-colors"
                  >
                    ← Indietro
                  </button>
                )}
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
                >
                  Inizia a Ordinare →
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 border border-theme-bg-tertiary rounded-lg text-theme-text-primary font-medium hover:bg-theme-bg-tertiary transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 py-3 px-4 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
                >
                  ✓ Salva
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
