'use client';

import { useState, useEffect } from 'react';

interface PromotionalBannerProps {
  title: string;
  description: string;
  emoji?: string;
  bgColor?: string;
  textColor?: string;
  dismissible?: boolean; // Can be dismissed by user
  storageKey?: string; // localStorage key to persist dismiss state
}

export function PromotionalBanner({
  title,
  description,
  emoji = '🎉',
  bgColor = 'bg-gradient-to-r from-green-500 to-emerald-600',
  textColor = 'text-white',
  dismissible = true,
  storageKey = 'promotional-banner-dismissed'
}: PromotionalBannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  // Check if banner was previously dismissed
  useEffect(() => {
    if (typeof window !== 'undefined' && dismissible && storageKey) {
      const dismissed = localStorage.getItem(storageKey);
      if (dismissed === 'true') {
        setIsVisible(false);
      }
    }
  }, [dismissible, storageKey]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== 'undefined' && storageKey) {
      localStorage.setItem(storageKey, 'true');
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`${bgColor} ${textColor} mx-4 my-4 rounded-2xl p-5 shadow-lg relative`}>
      <div className="flex items-center gap-3">
        <div className="text-3xl flex-shrink-0">{emoji}</div>
        <div className="flex-1">
          <h3 className="font-bold text-lg mb-1">{title}</h3>
          <p className="text-sm opacity-95">{description}</p>
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="flex-shrink-0 p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Chiudi annuncio"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
