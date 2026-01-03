'use client';

import { useState } from 'react';
import {
  UserPreferences,
  AVAILABLE_ALLERGENS,
  AVAILABLE_INTOLERANCES,
  AVAILABLE_DIETS,
  preferencesStore,
} from '../lib/user-preferences';
import { useSwipeToDismiss } from '../hooks/useSwipeToDismiss';
import { uploadPreferences } from '../lib/preference-sync-service';

interface PreferencesModalProps {
  onClose: () => void;
  onSave?: () => void;
}

export function PreferencesModal({ onClose, onSave }: PreferencesModalProps) {
  const [preferences, setPreferences] = useState<UserPreferences>(() =>
    preferencesStore.get()
  );

  const toggleAllergen = (allergen: string) => {
    const current = preferences.allergens_to_avoid;
    const updated = current.includes(allergen)
      ? current.filter((a) => a !== allergen)
      : [...current, allergen];

    setPreferences({ ...preferences, allergens_to_avoid: updated });
  };

  const toggleIntolerance = (intolerance: string) => {
    const current = preferences.intolerances;
    const updated = current.includes(intolerance)
      ? current.filter((i) => i !== intolerance)
      : [...current, intolerance];

    setPreferences({ ...preferences, intolerances: updated });
  };

  // Define incompatible diets
  const incompatibleDiets: Record<string, string[]> = {
    'vegan': ['vegetarian', 'pescatarian'],
    'vegetarian': ['vegan', 'pescatarian'],
    'pescatarian': ['vegan', 'vegetarian'],
  };

  // Check if a diet is disabled due to incompatibility
  const isDietDisabled = (diet: string): boolean => {
    const selected = preferences.dietary_preferences;
    // Check if any selected diet makes this diet incompatible
    return selected.some(selectedDiet =>
      incompatibleDiets[selectedDiet]?.includes(diet)
    );
  };

  const toggleDiet = (diet: string) => {
    // Don't toggle if diet is disabled
    if (isDietDisabled(diet)) return;

    const current = preferences.dietary_preferences;
    const updated = current.includes(diet)
      ? current.filter((d) => d !== diet)
      : [...current, diet];

    setPreferences({ ...preferences, dietary_preferences: updated });
  };

  const handleSave = async () => {
    preferencesStore.set(preferences);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('preferences-updated'));
    }

    // ACC-SYNC-PREFS: Upload preferences to cloud (async, non-blocking)
    uploadPreferences().catch((err) => {
      console.error('[PreferencesModal] Failed to sync preferences to cloud:', err);
    });

    // Call onSave callback if provided (for onboarding flow)
    // Do NOT close the modal here - let the parent component control the flow
    if (onSave) {
      onSave();
    } else {
      // If no onSave callback (used from menu page), close normally
      onClose();
    }
  };

  const handleClear = () => {
    preferencesStore.clear();
    setPreferences(preferencesStore.get());
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('preferences-updated'));
    }
  };

  const swipe = useSwipeToDismiss({ isOpen: true, onClose });

  // Format display names
  const formatName = (name: string) => {
    return name
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Count total selections
  const totalSelections =
    preferences.allergens_to_avoid.length +
    preferences.intolerances.length +
    preferences.dietary_preferences.length;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[80]"
        style={swipe.getBackdropStyle()}
        onClick={onClose}
      />

      {/* Bottom Sheet Modal */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[90] bg-theme-bg-elevated rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden select-none"
        style={swipe.getModalStyle()}
        onTouchStart={swipe.handleTouchStart}
        onTouchMove={swipe.handleTouchMove}
        onTouchEnd={swipe.handleTouchEnd}
        onMouseDown={swipe.handleMouseDown}
        onMouseMove={swipe.handleMouseMove}
        onMouseUp={swipe.handleMouseUp}
        onMouseLeave={swipe.handleMouseLeave}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-theme-bg-tertiary rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 pt-2 pb-4 border-b border-theme-bg-tertiary sticky top-0 bg-theme-bg-elevated z-10">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌱</span>
              <h2 className="text-2xl font-bold text-theme-text-primary">Preferenze Dietetiche</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-theme-bg-tertiary rounded-full transition-colors"
              aria-label="Chiudi"
            >
              <svg className="w-6 h-6 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {totalSelections > 0 && (
            <p className="text-sm text-green-600 font-medium">
              {totalSelections} {totalSelections === 1 ? 'preferenza selezionata' : 'preferenze selezionate'}
            </p>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)] px-6 py-4">
          {/* Allergens Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">⚠️</span>
              <h3 className="text-lg font-bold text-theme-text-primary">Allergeni</h3>
              {preferences.allergens_to_avoid.length > 0 && (
                <span className="ml-auto text-xs font-semibold bg-red-100 text-red-700 px-2 py-1 rounded-full">
                  {preferences.allergens_to_avoid.length}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 mb-3">
              I prodotti che contengono questi allergeni saranno evidenziati
            </p>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_ALLERGENS.map((allergen) => {
                const isSelected = preferences.allergens_to_avoid.includes(allergen);
                return (
                  <button
                    key={allergen}
                    onClick={() => toggleAllergen(allergen)}
                    className={`p-3 rounded-xl border-2 text-left transition-all duration-200 active:scale-95 ${
                      isSelected
                        ? 'border-red-500 bg-red-50 text-red-700'
                        : 'border-theme-bg-tertiary hover:border-theme-bg-tertiary hover:bg-theme-bg-secondary'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-red-500 bg-red-500' : 'border-theme-bg-tertiary'
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium">{formatName(allergen)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intolerances Section */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🚫</span>
              <h3 className="text-lg font-bold text-theme-text-primary">Intolleranze</h3>
              {preferences.intolerances.length > 0 && (
                <span className="ml-auto text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                  {preferences.intolerances.length}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Filtra i prodotti in base alle tue intolleranze alimentari
            </p>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_INTOLERANCES.map((intolerance) => {
                const isSelected = preferences.intolerances.includes(intolerance);
                return (
                  <button
                    key={intolerance}
                    onClick={() => toggleIntolerance(intolerance)}
                    className={`p-3 rounded-xl border-2 text-left transition-all duration-200 active:scale-95 ${
                      isSelected
                        ? 'border-theme-brand-primary bg-theme-brand-secondary text-theme-brand-primary'
                        : 'border-theme-bg-tertiary hover:border-theme-bg-tertiary hover:bg-theme-bg-secondary'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-theme-brand-primary bg-theme-brand-primary' : 'border-theme-bg-tertiary'
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium">{formatName(intolerance)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dietary Preferences Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🥗</span>
              <h3 className="text-lg font-bold text-theme-text-primary">Diete</h3>
              {preferences.dietary_preferences.length > 0 && (
                <span className="ml-auto text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {preferences.dietary_preferences.length}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Seleziona le tue preferenze dietetiche o stili alimentari
            </p>
            <div className="grid grid-cols-2 gap-2">
              {AVAILABLE_DIETS.map((diet) => {
                const isSelected = preferences.dietary_preferences.includes(diet);
                const isDisabled = isDietDisabled(diet);
                return (
                  <button
                    key={diet}
                    onClick={() => toggleDiet(diet)}
                    disabled={isDisabled}
                    className={`p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                      isDisabled
                        ? 'border-theme-bg-secondary bg-theme-bg-secondary text-theme-text-tertiary cursor-not-allowed opacity-50'
                        : isSelected
                        ? 'border-green-500 bg-green-50 text-green-700 active:scale-95'
                        : 'border-theme-bg-tertiary hover:border-theme-bg-tertiary hover:bg-theme-bg-secondary active:scale-95'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'border-green-500 bg-green-500' : 'border-theme-bg-tertiary'
                        }`}
                      >
                        {isSelected && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm font-medium">{formatName(diet)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info Box */}
          {totalSelections === 0 && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-blue-900">
                    Seleziona le tue preferenze per vedere solo i prodotti compatibili con le tue esigenze alimentari.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Sticky Buttons */}
        <div className="sticky bottom-0 bg-theme-bg-elevated border-t border-theme-bg-tertiary p-6">
          <div className="flex gap-3">
            <button
              onClick={handleClear}
              className="flex-1 py-3 px-4 border-2 border-theme-bg-tertiary rounded-xl text-theme-text-primary font-semibold
                hover:bg-theme-bg-secondary active:scale-95 transition-all duration-200"
            >
              Resetta
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold
                hover:from-green-600 hover:to-green-700 active:scale-95 transition-all duration-200 shadow-lg"
            >
              Salva Preferenze
            </button>
          </div>
        </div>
      </div>

    </>
  );
}
