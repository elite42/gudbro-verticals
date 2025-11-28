'use client';

import React, { useState, useId } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { useSwipeToDismiss } from '../hooks/useSwipeToDismiss';

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSetupPreferences?: () => void;
  restaurantName?: string;
  tableNumber?: string;
}

export function WelcomeModal({
  isOpen,
  onClose,
  onSetupPreferences,
  restaurantName = 'Caffè Dolce Vita',
  tableNumber
}: WelcomeModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  // Accessibility: Focus trap and keyboard navigation
  const modalRef = useFocusTrap(isOpen);
  const titleId = useId();
  const descId = useId();

  useKeyboardNavigation({
    isOpen,
    onClose: handleSkip,
    onEscape: handleSkip
  });

  // Swipe-to-dismiss functionality (includes scroll blocking)
  const swipe = useSwipeToDismiss({ isOpen, onClose: handleSkip });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    // Mark onboarding as completed in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('gudbro_onboarding_completed', 'true');
    }
    onClose();
  };

  const handleSetupPreferences = () => {
    // Mark onboarding as completed
    if (typeof window !== 'undefined') {
      localStorage.setItem('gudbro_onboarding_completed', 'true');
    }
    onClose();
    // Open preferences modal
    if (onSetupPreferences) {
      onSetupPreferences();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[100] transition-opacity"
        style={swipe.getBackdropStyle()}
        onClick={handleSkip}
      />

      {/* Bottom Sheet */}
      <div
        ref={modalRef}
        className="fixed bottom-0 left-0 right-0 z-[110] bg-theme-bg-elevated rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden select-none"
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
          <div className="w-8" /> {/* Spacer for centering */}
          <div className="w-12 h-1.5 bg-theme-text-tertiary rounded-full" />
          <button
            onClick={handleSkip}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-theme-bg-secondary transition-colors"
            aria-label="Chiudi introduzione"
          >
            <svg className="w-6 h-6 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 overflow-y-auto max-h-[calc(85vh-140px)]">
          {/* Step 1: Welcome */}
          {currentStep === 1 && (
            <div className="text-center">
              <div className="mb-4">
                <div className="text-6xl mb-4" aria-hidden="true">👋</div>
                <h2 id={titleId} className="text-3xl font-bold text-theme-text-primary mb-2">
                  Benvenuto!
                </h2>
                <p id={descId} className="text-lg text-theme-text-primary mb-1">
                  {restaurantName}
                </p>
                {tableNumber && (
                  <p className="text-sm text-theme-text-tertiary">
                    Tavolo {tableNumber}
                  </p>
                )}
              </div>
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 mb-4">
                <p className="text-theme-text-primary leading-relaxed">
                  Ordina direttamente dal tuo telefono, visualizza il menu completo con foto e informazioni nutrizionali, e personalizza la tua esperienza.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-theme-bg-elevated border-2 border-theme-bg-tertiary rounded-xl p-4">
                  <div className="text-3xl mb-2" aria-hidden="true">📱</div>
                  <p className="text-xs font-semibold text-theme-text-primary">Menu Digitale</p>
                </div>
                <div className="bg-theme-bg-elevated border-2 border-theme-bg-tertiary rounded-xl p-4">
                  <div className="text-3xl mb-2" aria-hidden="true">🍽️</div>
                  <p className="text-xs font-semibold text-theme-text-primary">Ordina Facile</p>
                </div>
                <div className="bg-theme-bg-elevated border-2 border-theme-bg-tertiary rounded-xl p-4">
                  <div className="text-3xl mb-2" aria-hidden="true">🌱</div>
                  <p className="text-xs font-semibold text-theme-text-primary">Preferenze</p>
                </div>
                <div className="bg-theme-bg-elevated border-2 border-theme-bg-tertiary rounded-xl p-4">
                  <div className="text-3xl mb-2" aria-hidden="true">💳</div>
                  <p className="text-xs font-semibold text-theme-text-primary">Paga al Tavolo</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Features Tour */}
          {currentStep === 2 && (
            <div>
              <div className="text-center mb-6">
                <div className="text-5xl mb-3" aria-hidden="true">✨</div>
                <h2 id={titleId} className="text-2xl font-bold text-theme-text-primary mb-2">
                  Funzionalità Principali
                </h2>
                <p id={descId} className="text-sm text-theme-text-secondary">
                  Esplora cosa puoi fare con la nostra app
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex gap-4 items-start bg-blue-50 border-2 border-blue-100 rounded-xl p-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl" aria-hidden="true">
                    📖
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-theme-text-primary mb-1">Menu Interattivo</h3>
                    <p className="text-sm text-theme-text-primary">
                      Sfoglia il menu completo con foto, descrizioni dettagliate e informazioni sugli allergeni
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-green-50 border-2 border-green-100 rounded-xl p-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl" aria-hidden="true">
                    🌱
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-theme-text-primary mb-1">Preferenze Dietetiche</h3>
                    <p className="text-sm text-theme-text-primary">
                      Imposta allergeni, intolleranze e diete per vedere solo i piatti adatti a te
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-purple-50 border-2 border-purple-100 rounded-xl p-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl" aria-hidden="true">
                    🔔
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-theme-text-primary mb-1">Chiama Staff</h3>
                    <p className="text-sm text-theme-text-primary">
                      Hai bisogno di qualcosa? Chiama lo staff direttamente dall'app
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start bg-pink-50 border-2 border-pink-100 rounded-xl p-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center text-white text-2xl" aria-hidden="true">
                    💳
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-theme-text-primary mb-1">Richiedi Conto</h3>
                    <p className="text-sm text-theme-text-primary">
                      Quando hai finito, richiedi il conto e scegli il metodo di pagamento
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Setup Preferences */}
          {currentStep === 3 && (
            <div className="text-center">
              <div className="mb-6">
                <div className="text-6xl mb-4" aria-hidden="true">🌟</div>
                <h2 id={titleId} className="text-2xl font-bold text-theme-text-primary mb-2">
                  Personalizza la Tua Esperienza
                </h2>
                <p id={descId} className="text-sm text-theme-text-secondary mb-4">
                  Vuoi impostare le tue preferenze dietetiche ora?
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-2xl" aria-hidden="true">⚠️</div>
                  <div className="flex-1 text-left">
                    <h4 className="font-bold text-theme-text-primary text-sm mb-1">Allergeni</h4>
                    <p className="text-xs text-theme-text-primary">
                      Evidenzia i prodotti che contengono allergeni da evitare
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <div className="text-2xl" aria-hidden="true">🚫</div>
                  <div className="flex-1 text-left">
                    <h4 className="font-bold text-theme-text-primary text-sm mb-1">Intolleranze</h4>
                    <p className="text-xs text-theme-text-primary">
                      Filtra i prodotti in base alle tue intolleranze alimentari
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-2xl" aria-hidden="true">🥗</div>
                  <div className="flex-1 text-left">
                    <h4 className="font-bold text-theme-text-primary text-sm mb-1">Diete</h4>
                    <p className="text-xs text-theme-text-primary">
                      Seleziona diete specifiche (vegana, vegetariana, etc.)
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-xs text-blue-900">
                  💡 Puoi sempre modificare le tue preferenze in seguito dal menu Account
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 py-3" role="progressbar" aria-label={`Step ${currentStep} of ${totalSteps}`} aria-valuenow={currentStep} aria-valuemin={1} aria-valuemax={totalSteps}>
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all duration-300 ${
                step === currentStep
                  ? 'w-8 bg-pink-500'
                  : 'w-2 bg-theme-text-tertiary'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Footer - Action Buttons */}
        <div className="sticky bottom-0 bg-theme-bg-elevated border-t border-theme-bg-tertiary p-6">
          <div className="flex gap-3">
            {currentStep < totalSteps ? (
              <>
                <button
                  onClick={handleSkip}
                  className="flex-1 py-3 px-4 border-2 border-theme-bg-tertiary rounded-xl text-theme-text-primary font-semibold
                    hover:bg-theme-bg-secondary active:scale-95 transition-all duration-200"
                >
                  Salta
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold
                    hover:from-pink-600 hover:to-purple-600 active:scale-95 transition-all duration-200 shadow-lg"
                >
                  Avanti
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSkip}
                  className="flex-1 py-3 px-4 border-2 border-theme-bg-tertiary rounded-xl text-theme-text-primary font-semibold
                    hover:bg-theme-bg-secondary active:scale-95 transition-all duration-200"
                >
                  Non Ora
                </button>
                <button
                  onClick={handleSetupPreferences}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold
                    hover:from-green-600 hover:to-emerald-600 active:scale-95 transition-all duration-200 shadow-lg"
                >
                  Imposta Preferenze
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
