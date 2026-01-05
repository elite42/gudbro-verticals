'use client';

import React, { useState, useEffect } from 'react';
import { useSwipeToDismiss } from '../hooks/useSwipeToDismiss';
import { setVisitorType } from '@/lib/follower-service';

interface VisitorTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (visitorType: 'resident' | 'tourist') => void;
  merchantId: string;
  merchantName?: string;
}

// List of common countries for tourists
const COUNTRIES = [
  { code: 'IT', name: 'Italia', flag: '🇮🇹' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'UK', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
];

export function VisitorTypeModal({
  isOpen,
  onClose,
  onComplete,
  merchantId,
  merchantName,
}: VisitorTypeModalProps) {
  const [step, setStep] = useState<'choice' | 'tourist-details' | 'success'>('choice');
  const [visitorType, setVisitorTypeState] = useState<'resident' | 'tourist' | null>(null);
  const [tripEndDate, setTripEndDate] = useState('');
  const [postTripPref, setPostTripPref] = useState<'pause' | 'occasional' | 'stop'>('pause');
  const [homeCountry, setHomeCountry] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const swipe = useSwipeToDismiss({ isOpen, onClose });

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep('choice');
      setVisitorTypeState(null);
      setTripEndDate('');
      setPostTripPref('pause');
      setHomeCountry('');
      setIsLoading(false);
    }
  }, [isOpen]);

  // Set default trip end date to 7 days from now
  useEffect(() => {
    if (isOpen && !tripEndDate) {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      setTripEndDate(date.toISOString().split('T')[0]);
    }
  }, [isOpen, tripEndDate]);

  const handleResidentSelect = async () => {
    setIsLoading(true);
    try {
      await setVisitorType(merchantId, 'resident');
      setStep('success');
      setVisitorTypeState('resident');
      setTimeout(() => {
        onComplete('resident');
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error setting visitor type:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTouristSelect = () => {
    setVisitorTypeState('tourist');
    setStep('tourist-details');
  };

  const handleTouristSubmit = async () => {
    if (!tripEndDate) return;

    setIsLoading(true);
    try {
      await setVisitorType(
        merchantId,
        'tourist',
        tripEndDate,
        postTripPref,
        undefined, // homeCity
        homeCountry || undefined
      );
      setStep('success');
      setTimeout(() => {
        onComplete('tourist');
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error setting visitor type:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[80]" style={swipe.getBackdropStyle()} onClick={onClose} />

      {/* Bottom Sheet */}
      <div
        className="bg-theme-bg-elevated fixed bottom-0 left-0 right-0 z-[90] max-h-[90vh] select-none overflow-hidden rounded-t-3xl shadow-2xl"
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
        <div className="flex justify-center pb-2 pt-3">
          <div className="bg-theme-bg-tertiary h-1.5 w-12 rounded-full" />
        </div>

        {/* Step 1: Choice */}
        {step === 'choice' && (
          <div className="px-6 py-4">
            {/* Header */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
                <span className="text-4xl">🌍</span>
              </div>
              <h2 className="text-theme-text-primary text-2xl font-bold">Benvenuto!</h2>
              <p className="text-theme-text-secondary mt-2">
                {merchantName
                  ? `Grazie per aver seguito ${merchantName}!`
                  : 'Grazie per averci seguito!'}
              </p>
              <p className="text-theme-text-tertiary mt-1 text-sm">
                Una domanda veloce per personalizzare la tua esperienza
              </p>
            </div>

            {/* Options */}
            <div className="mb-6 space-y-4">
              {/* Resident Option */}
              <button
                onClick={handleResidentSelect}
                disabled={isLoading}
                className="bg-theme-bg-secondary border-theme-bg-tertiary group w-full rounded-2xl border-2 p-5 text-left transition-all hover:border-green-500 disabled:opacity-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-3xl transition-transform group-hover:scale-110 dark:bg-green-900/30">
                    🏠
                  </div>
                  <div className="flex-1">
                    <h3 className="text-theme-text-primary text-lg font-semibold">
                      Sono residente
                    </h3>
                    <p className="text-theme-text-secondary text-sm">
                      Vivo qui e visito regolarmente
                    </p>
                  </div>
                  <svg
                    className="text-theme-text-tertiary h-6 w-6 group-hover:text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              {/* Tourist Option */}
              <button
                onClick={handleTouristSelect}
                disabled={isLoading}
                className="bg-theme-bg-secondary border-theme-bg-tertiary group w-full rounded-2xl border-2 p-5 text-left transition-all hover:border-blue-500 disabled:opacity-50"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-3xl transition-transform group-hover:scale-110 dark:bg-blue-900/30">
                    ✈️
                  </div>
                  <div className="flex-1">
                    <h3 className="text-theme-text-primary text-lg font-semibold">
                      Sono in vacanza
                    </h3>
                    <p className="text-theme-text-secondary text-sm">
                      Sto visitando per un periodo limitato
                    </p>
                  </div>
                  <svg
                    className="text-theme-text-tertiary h-6 w-6 group-hover:text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>
            </div>

            {/* Skip */}
            <button
              onClick={onClose}
              className="text-theme-text-tertiary hover:text-theme-text-secondary w-full py-3 text-sm transition-colors"
            >
              Decidi dopo
            </button>
          </div>
        )}

        {/* Step 2: Tourist Details */}
        {step === 'tourist-details' && (
          <div className="max-h-[calc(90vh-100px)] overflow-y-auto px-6 py-4">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
              <button
                onClick={() => setStep('choice')}
                className="hover:bg-theme-bg-tertiary rounded-full p-2 transition-colors"
              >
                <svg
                  className="text-theme-text-secondary h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div>
                <h2 className="text-theme-text-primary text-xl font-bold">Dettagli vacanza</h2>
                <p className="text-theme-text-secondary text-sm">Per personalizzare le notifiche</p>
              </div>
            </div>

            {/* Trip End Date */}
            <div className="mb-6">
              <label className="text-theme-text-primary mb-2 block text-sm font-semibold">
                Quando finisce la tua vacanza?
              </label>
              <input
                type="date"
                value={tripEndDate}
                onChange={(e) => setTripEndDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-theme-bg-secondary border-theme-bg-tertiary text-theme-text-primary w-full rounded-xl border-2 px-4 py-3 transition-colors focus:border-blue-500 focus:outline-none"
              />
            </div>

            {/* Home Country */}
            <div className="mb-6">
              <label className="text-theme-text-primary mb-2 block text-sm font-semibold">
                Da dove vieni? (opzionale)
              </label>
              <div className="grid max-h-40 grid-cols-3 gap-2 overflow-y-auto">
                {COUNTRIES.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => setHomeCountry(homeCountry === country.code ? '' : country.code)}
                    className={`rounded-xl border-2 p-2 text-center transition-all ${
                      homeCountry === country.code
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-theme-bg-tertiary bg-theme-bg-secondary hover:border-blue-300'
                    }`}
                  >
                    <span className="text-xl">{country.flag}</span>
                    <p className="text-theme-text-secondary mt-1 truncate text-xs">
                      {country.name}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Post-Trip Preferences */}
            <div className="mb-6">
              <label className="text-theme-text-primary mb-2 block text-sm font-semibold">
                Dopo la vacanza, vuoi ricevere nostre notizie?
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setPostTripPref('pause')}
                  className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                    postTripPref === 'pause'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-theme-bg-tertiary bg-theme-bg-secondary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⏸️</span>
                    <div>
                      <p className="text-theme-text-primary font-medium">
                        Pausa fino al mio ritorno
                      </p>
                      <p className="text-theme-text-tertiary text-xs">
                        Riattiva quando torni a trovarci
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPostTripPref('occasional')}
                  className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                    postTripPref === 'occasional'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-theme-bg-tertiary bg-theme-bg-secondary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📬</span>
                    <div>
                      <p className="text-theme-text-primary font-medium">Occasionale (1x/anno)</p>
                      <p className="text-theme-text-tertiary text-xs">
                        Solo per eventi speciali o offerte esclusive
                      </p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setPostTripPref('stop')}
                  className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                    postTripPref === 'stop'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-theme-bg-tertiary bg-theme-bg-secondary'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🔕</span>
                    <div>
                      <p className="text-theme-text-primary font-medium">Stop notifiche</p>
                      <p className="text-theme-text-tertiary text-xs">
                        Nessuna comunicazione dopo la vacanza
                      </p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleTouristSubmit}
              disabled={!tripEndDate || isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 py-4 font-bold text-white transition-all hover:from-blue-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span>Salvataggio...</span>
                </>
              ) : (
                <>
                  <span>Conferma</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </>
              )}
            </button>

            {/* Info */}
            <p className="text-theme-text-tertiary mt-4 text-center text-xs">
              I tuoi punti fedeltà saranno sempre conservati, anche durante la pausa
            </p>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <div className="px-6 py-8 text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <svg
                className="h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-theme-text-primary mb-2 text-2xl font-bold">Perfetto!</h2>
            <p className="text-theme-text-secondary">
              {visitorType === 'resident'
                ? 'Riceverai aggiornamenti su offerte e novità'
                : 'Ti aspettiamo al tuo prossimo ritorno!'}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
