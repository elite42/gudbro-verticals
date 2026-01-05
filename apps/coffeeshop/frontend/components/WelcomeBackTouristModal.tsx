'use client';

import React, { useState, useEffect } from 'react';
import { useSwipeToDismiss } from '../hooks/useSwipeToDismiss';
import { handleTouristReturn } from '@/lib/follower-service';

interface WelcomeBackTouristModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  merchantId: string;
  merchantName?: string;
  previousVisits: number;
  wasArchived: boolean;
}

export function WelcomeBackTouristModal({
  isOpen,
  onClose,
  onComplete,
  merchantId,
  merchantName,
  previousVisits,
  wasArchived,
}: WelcomeBackTouristModalProps) {
  const [step, setStep] = useState<'welcome' | 'date' | 'success'>('welcome');
  const [tripEndDate, setTripEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const swipe = useSwipeToDismiss({ isOpen, onClose });

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep('welcome');
      setTripEndDate('');
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

  const handleContinue = () => {
    setStep('date');
  };

  const handleSubmit = async () => {
    if (!tripEndDate) return;

    setIsLoading(true);
    try {
      const result = await handleTouristReturn(merchantId, tripEndDate);

      if (result.success) {
        setStep('success');
        setTimeout(() => {
          onComplete();
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Error handling tourist return:', error);
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
        className="bg-theme-bg-elevated fixed bottom-0 left-0 right-0 z-[90] max-h-[85vh] select-none overflow-hidden rounded-t-3xl shadow-2xl"
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

        {/* Step 1: Welcome Back */}
        {step === 'welcome' && (
          <div className="px-6 py-6 text-center">
            {/* Animated Welcome */}
            <div className="relative mb-6">
              <div className="mx-auto flex h-28 w-28 animate-bounce items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
                <span className="text-5xl">{wasArchived ? '🎊' : '👋'}</span>
              </div>
              {/* Sparkles */}
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-2">
                <span className="animate-ping text-2xl">✨</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-theme-text-primary mb-3 text-3xl font-bold">
              {wasArchived ? 'Che bella sorpresa!' : 'Bentornato!'}
            </h2>

            {/* Message */}
            <p className="text-theme-text-secondary mb-2 text-lg">
              {merchantName
                ? `Siamo felici di rivederti da ${merchantName}!`
                : 'Siamo felici di rivederti!'}
            </p>

            {/* Visit count badge */}
            {previousVisits > 1 && (
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                <span className="text-lg">🌟</span>
                <span>Questa è la tua visita #{previousVisits + 1}!</span>
              </div>
            )}

            {wasArchived && (
              <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-900/20">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🎁</span>
                  <div className="text-left">
                    <p className="font-semibold text-green-700 dark:text-green-300">
                      I tuoi punti sono ancora qui!
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Abbiamo conservato tutti i tuoi punti fedeltà
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <button
              onClick={handleContinue}
              className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-4 text-lg font-bold text-white shadow-lg transition-all hover:from-amber-600 hover:to-orange-600"
            >
              Continua
            </button>

            {/* Skip */}
            <button
              onClick={onClose}
              className="text-theme-text-tertiary hover:text-theme-text-secondary mt-3 w-full py-3 text-sm transition-colors"
            >
              Più tardi
            </button>
          </div>
        )}

        {/* Step 2: New Trip End Date */}
        {step === 'date' && (
          <div className="px-6 py-6">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
              <button
                onClick={() => setStep('welcome')}
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
                <h2 className="text-theme-text-primary text-xl font-bold">
                  Quanto rimani questa volta?
                </h2>
                <p className="text-theme-text-secondary text-sm">
                  Per gestire le notifiche al meglio
                </p>
              </div>
            </div>

            {/* Date Picker */}
            <div className="mb-6">
              <label className="text-theme-text-primary mb-2 block text-sm font-semibold">
                Data di fine vacanza
              </label>
              <input
                type="date"
                value={tripEndDate}
                onChange={(e) => setTripEndDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-theme-bg-secondary border-theme-bg-tertiary text-theme-text-primary w-full rounded-xl border-2 px-4 py-4 text-lg transition-colors focus:border-amber-500 focus:outline-none"
              />
            </div>

            {/* Quick options */}
            <div className="mb-6 grid grid-cols-3 gap-2">
              {[
                { days: 3, label: '3 giorni' },
                { days: 7, label: '1 settimana' },
                { days: 14, label: '2 settimane' },
              ].map(({ days, label }) => {
                const date = new Date();
                date.setDate(date.getDate() + days);
                const dateStr = date.toISOString().split('T')[0];
                const isSelected = tripEndDate === dateStr;

                return (
                  <button
                    key={days}
                    onClick={() => setTripEndDate(dateStr)}
                    className={`rounded-xl border-2 px-2 py-3 text-sm font-medium transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                        : 'border-theme-bg-tertiary bg-theme-bg-secondary text-theme-text-secondary hover:border-amber-300'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={!tripEndDate || isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-4 font-bold text-white transition-all hover:from-amber-600 hover:to-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
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
                  <span>Aggiornamento...</span>
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
          </div>
        )}

        {/* Step 3: Success */}
        {step === 'success' && (
          <div className="px-6 py-10 text-center">
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
            <h2 className="text-theme-text-primary mb-2 text-2xl font-bold">Tutto pronto!</h2>
            <p className="text-theme-text-secondary">Buona vacanza! Ti aspettiamo</p>
          </div>
        )}
      </div>
    </>
  );
}
