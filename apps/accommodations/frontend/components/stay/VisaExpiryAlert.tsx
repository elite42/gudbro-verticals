'use client';

import { useState, useEffect } from 'react';
import { X, Warning } from '@phosphor-icons/react';
import { differenceInCalendarDays } from 'date-fns';

interface VisaExpiryAlertProps {
  visaExpiryDate: string;
  checkInDate: string;
  onDismiss?: () => void;
}

export default function VisaExpiryAlert({
  visaExpiryDate,
  checkInDate,
  onDismiss,
}: VisaExpiryAlertProps) {
  const [dismissed, setDismissed] = useState(false);

  const today = new Date();
  const expiry = new Date(visaExpiryDate);
  const checkIn = new Date(checkInDate);
  const daysRemaining = differenceInCalendarDays(expiry, today);
  const totalDays = Math.max(1, differenceInCalendarDays(expiry, checkIn));
  const percentage = Math.min(100, Math.max(0, (daysRemaining / totalDays) * 100));

  const isExpired = daysRemaining <= 0;

  // Check localStorage for daily dismissal
  const dismissalKey = `dismissed-visa-alert-${visaExpiryDate}`;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = localStorage.getItem(dismissalKey);
    if (stored) {
      const storedDate = new Date(stored).toDateString();
      const todayDate = new Date().toDateString();
      if (storedDate === todayDate) {
        setDismissed(true);
      } else {
        // Clear stale dismissal
        localStorage.removeItem(dismissalKey);
      }
    }
  }, [dismissalKey]);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem(dismissalKey, new Date().toISOString());
    onDismiss?.();
  };

  // Don't render if dismissed (and not expired — expired alerts are non-dismissable)
  if (dismissed && !isExpired) return null;

  // Color logic
  let barColor = 'bg-emerald-500';
  let textColor = 'text-emerald-600';
  if (daysRemaining <= 7) {
    barColor = 'bg-red-500';
    textColor = 'text-red-600';
  } else if (daysRemaining <= 14) {
    barColor = 'bg-amber-500';
    textColor = 'text-amber-600';
  }

  return (
    <section className="mb-4 px-4">
      <div
        className={`rounded-2xl border bg-white p-4 shadow-sm ${
          isExpired ? 'border-red-300' : 'border-[#E8E2D9]'
        }`}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isExpired ? (
              <Warning size={20} weight="fill" className="text-red-500" />
            ) : (
              <span className="text-lg">🛂</span>
            )}
            <span className="font-semibold text-[#2D2016]">
              {isExpired ? 'Visa Expired' : 'Visa Expiry'}
            </span>
          </div>
          {!isExpired && (
            <button
              onClick={handleDismiss}
              className="rounded-full p-1 text-[#8B7355] transition-colors hover:bg-[#FAF8F5] hover:text-[#2D2016]"
              aria-label="Dismiss alert"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {isExpired ? (
          <div className="rounded-xl bg-red-50 p-3">
            <p className="text-sm font-medium text-red-800">
              Your visa has expired. Please contact your host immediately.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex-1">
                <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all ${barColor}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <span className={`min-w-[40px] text-right text-sm font-bold ${textColor}`}>
                {daysRemaining}d
              </span>
            </div>

            <p className="text-xs text-[#8B7355]">
              {daysRemaining} {daysRemaining === 1 ? 'day' : 'days'} until visa expiry
              {daysRemaining <= 7 && ' — consider extending your visa'}
            </p>
          </>
        )}
      </div>
    </section>
  );
}
