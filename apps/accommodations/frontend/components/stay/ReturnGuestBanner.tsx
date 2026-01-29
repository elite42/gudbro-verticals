'use client';

import { useState, useEffect } from 'react';

const DISMISSED_KEY = 'gudbro_return_banner_dismissed';

interface ReturnGuestBannerProps {
  text: string;
  url: string;
}

export default function ReturnGuestBanner({ text, url }: ReturnGuestBannerProps) {
  const [dismissed, setDismissed] = useState(true); // Start hidden to avoid flash

  useEffect(() => {
    try {
      const wasDismissed = localStorage.getItem(DISMISSED_KEY) === 'true';
      setDismissed(wasDismissed);
    } catch {
      setDismissed(false);
    }
  }, []);

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISSED_KEY, 'true');
    } catch {
      // localStorage unavailable
    }
  };

  return (
    <section className="mb-5 px-4">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#E07A5F] to-[#C4634B] p-4">
        <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10" />

        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-white/80 hover:bg-white/30"
          aria-label="Dismiss"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative z-10">
          <div className="mb-1.5 flex items-center gap-2">
            <span className="text-xl">🎁</span>
            <span className="text-xs font-medium text-white/80">Guest Exclusive</span>
          </div>
          <p className="mb-2 text-base font-semibold text-white">{text}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[#E07A5F] transition-colors hover:bg-white/90"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
