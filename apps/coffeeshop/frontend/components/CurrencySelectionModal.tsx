'use client';

import { useState } from 'react';
import { AVAILABLE_CURRENCIES, currencyPreferencesStore } from '../lib/currency';

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
  showAsOnboarding = false,
}: CurrencySelectionModalProps) {
  const currentPrefs = currencyPreferencesStore.get();
  const [selectedCurrency, setSelectedCurrency] = useState(currentPrefs.selectedCurrency);

  const handleSave = () => {
    // Always enable if user selects a currency different from EUR (base currency)
    const enabled = selectedCurrency !== 'EUR';

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
    // Keep EUR as default, disabled
    currencyPreferencesStore.set({
      enabled: false,
      selectedCurrency: 'EUR',
    });

    if (onSave) {
      onSave();
    } else {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-theme-bg-elevated flex w-full max-w-md flex-col overflow-hidden rounded-2xl">
        {/* Header */}
        <div className="border-theme-bg-tertiary border-b p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">💱</div>
              <div>
                <h2 className="text-theme-text-primary text-2xl font-bold">Preferenza Valuta</h2>
                <p className="text-theme-text-tertiary text-sm">
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
            Seleziona la tua valuta preferita. I prezzi saranno convertiti automaticamente.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Currency Dropdown */}
          <div className="mb-6">
            <label className="text-theme-text-primary mb-2 block text-sm font-medium">Valuta</label>
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

          {/* Warning if not VND */}
          {selectedCurrency !== 'VND' && (
            <div className="bg-theme-brand-secondary border-theme-brand-accent rounded-lg border p-3">
              <div className="flex gap-2">
                <div className="text-theme-brand-primary">⚠️</div>
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
                    className="border-theme-bg-tertiary text-theme-text-primary hover:bg-theme-bg-tertiary flex-1 rounded-lg border px-4 py-3 font-medium transition-colors"
                  >
                    ← Indietro
                  </button>
                )}
                <button
                  onClick={handleSave}
                  className="flex-1 rounded-lg bg-blue-500 px-4 py-3 font-bold text-white transition-colors hover:bg-blue-600"
                >
                  Inizia a Ordinare →
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="border-theme-bg-tertiary text-theme-text-primary hover:bg-theme-bg-tertiary flex-1 rounded-lg border px-4 py-3 font-medium transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 rounded-lg bg-blue-500 px-4 py-3 font-bold text-white transition-colors hover:bg-blue-600"
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
