'use client';

import { useState, useEffect } from 'react';
import { awardCheckin } from '../lib/loyalty-service';
import { coffeeshopConfig } from '../config/coffeeshop.config';

interface CheckinButtonProps {
  merchantId?: string;
  onCheckin?: (pointsAwarded: number) => void;
}

export function CheckinButton({ merchantId, onCheckin }: CheckinButtonProps) {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  // Use merchant ID from config if not provided
  const currentMerchantId = merchantId || coffeeshopConfig.merchant?.id || '';

  // Check if already checked in today (stored in localStorage)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkinKey = `checkin_${currentMerchantId}`;
    const lastCheckin = localStorage.getItem(checkinKey);

    if (lastCheckin) {
      const lastDate = new Date(lastCheckin).toDateString();
      const today = new Date().toDateString();
      setIsCheckedIn(lastDate === today);
    }
  }, [currentMerchantId]);

  const handleCheckin = async () => {
    if (isCheckedIn || isLoading || !currentMerchantId) return;

    setIsLoading(true);

    try {
      const points = await awardCheckin(currentMerchantId);
      setPointsEarned(points);

      if (points > 0) {
        // Mark as checked in
        setIsCheckedIn(true);
        localStorage.setItem(`checkin_${currentMerchantId}`, new Date().toISOString());

        // Show success animation
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        onCheckin?.(points);
      } else {
        // Already checked in today (from server)
        setIsCheckedIn(true);
        localStorage.setItem(`checkin_${currentMerchantId}`, new Date().toISOString());
      }
    } catch (err) {
      console.error('[CheckinButton] Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentMerchantId) return null;

  return (
    <>
      <button
        onClick={handleCheckin}
        disabled={isCheckedIn || isLoading}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
          isCheckedIn
            ? 'bg-green-100 text-green-700 cursor-default'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 active:scale-95 shadow-md'
        } ${isLoading ? 'opacity-70' : ''}`}
      >
        {isLoading ? (
          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : isCheckedIn ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )}

        <span>
          {isCheckedIn ? 'Checked In' : 'Check-in'}
        </span>

        {!isCheckedIn && (
          <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">+5 pts</span>
        )}
      </button>

      {/* Success Toast */}
      {showSuccess && pointsEarned > 0 && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[10002]">
          <div className="bg-green-500 text-white px-6 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
            <span className="text-2xl">📍</span>
            <div>
              <p className="font-bold">Check-in successful!</p>
              <p className="text-sm text-green-100">+{pointsEarned} points earned</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CheckinButton;
