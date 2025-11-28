'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PreferencesModal } from './PreferencesModal';
import { DisplayPreferencesModal } from './DisplayPreferencesModal';

interface OnboardingModalProps {
  onClose: () => void;
}

export function OnboardingModal({ onClose }: OnboardingModalProps) {
  const router = useRouter();
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [showDisplayPrefsModal, setShowDisplayPrefsModal] = useState(false);

  const handleGoToMenu = () => {
    router.push('/menu');
    onClose();
  };

  const handleOpenPreferences = () => {
    setShowPreferencesModal(true);
  };

  const handlePreferencesSaved = () => {
    // After saving dietary preferences, show display preferences (currency + language)
    setShowPreferencesModal(false);
    setShowDisplayPrefsModal(true);
  };

  const handleDisplayPrefsSaved = () => {
    // After display preferences (currency + language) selection, go to menu
    setShowDisplayPrefsModal(false);
    router.push('/menu');
    onClose();
  };

  // Close on backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      {/* Simple Welcome Modal */}
      {!showPreferencesModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-theme-bg-elevated rounded-2xl max-w-md w-full p-8 relative">
            {/* X Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-theme-text-tertiary hover:text-theme-text-secondary
                active:scale-90 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded
                transition-all duration-150"
              aria-label="Chiudi"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🌱</span>
              </div>
              <h2 className="text-3xl font-bold text-theme-text-primary mb-2">
                Benvenuto in ROOTS!
              </h2>
              <p className="text-theme-text-secondary">
                A foundation of life
              </p>
            </div>

            {/* Action Buttons - Side by Side */}
            <div className="grid grid-cols-2 gap-3">
              {/* Menu Button */}
              <button
                onClick={handleGoToMenu}
                className="bg-green-600 text-white py-6 px-4 rounded-xl font-bold
                  hover:bg-green-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400
                  transition-all duration-150 shadow-lg flex flex-col items-center justify-center gap-2"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span className="text-sm">Menu</span>
              </button>

              {/* Preferences Button */}
              <button
                onClick={handleOpenPreferences}
                className="bg-green-600 text-white py-6 px-4 rounded-xl font-bold
                  hover:bg-green-700 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400
                  transition-all duration-150 shadow-lg flex flex-col items-center justify-center gap-2"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm">Preferenze</span>
              </button>
            </div>

            {/* Description under buttons */}
            <div className="mt-4 text-center">
              <p className="text-sm text-theme-text-tertiary">
                Imposta: allergeni, intolleranze, diete, valuta e lingua
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preferences Modal (Wizard - Steps 1-3) */}
      {showPreferencesModal && (
        <PreferencesModal
          onClose={() => setShowPreferencesModal(false)}
          onSave={handlePreferencesSaved}
        />
      )}

      {/* Display Preferences Modal (Step 4 - Currency + Language) */}
      {showDisplayPrefsModal && (
        <DisplayPreferencesModal
          onClose={() => {
            setShowDisplayPrefsModal(false);
            router.push('/menu');
            onClose();
          }}
          onSave={handleDisplayPrefsSaved}
          onBack={() => {
            // Go back to dietary preferences (Step 3)
            setShowDisplayPrefsModal(false);
            setShowPreferencesModal(true);
          }}
          showAsOnboarding={true}
        />
      )}
    </>
  );
}
