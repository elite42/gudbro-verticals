'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Traffic source configurations
interface SourceConfig {
  title: string;
  subtitle: string;
  icon: string;
  bgColor: string;
  textColor: string;
  promoCode?: string;
  promoText?: string;
}

const SOURCE_CONFIGS: Record<string, SourceConfig> = {
  google_maps: {
    title: 'Welcome from Google Maps!',
    subtitle: "Thanks for finding us. Here's our menu.",
    icon: '📍',
    bgColor: 'bg-gradient-to-r from-blue-500 to-blue-600',
    textColor: 'text-white',
  },
  instagram: {
    title: 'Welcome from Instagram!',
    subtitle: 'Thanks for following us! Check out our latest dishes.',
    icon: '📸',
    bgColor: 'bg-gradient-to-r from-pink-500 to-purple-600',
    textColor: 'text-white',
    promoCode: 'INSTA10',
    promoText: '10% off your first order',
  },
  facebook: {
    title: 'Welcome, Facebook friend!',
    subtitle: 'Thanks for connecting with us.',
    icon: '👋',
    bgColor: 'bg-gradient-to-r from-blue-600 to-blue-700',
    textColor: 'text-white',
  },
  flyer: {
    title: 'Welcome!',
    subtitle: 'Thanks for scanning our flyer.',
    icon: '📄',
    bgColor: 'bg-gradient-to-r from-emerald-500 to-teal-600',
    textColor: 'text-white',
    promoCode: 'FLYER15',
    promoText: '15% off with your flyer',
  },
  event: {
    title: 'Welcome, Event Guest!',
    subtitle: 'Enjoy our special event menu.',
    icon: '🎉',
    bgColor: 'bg-gradient-to-r from-amber-500 to-orange-600',
    textColor: 'text-white',
  },
  newspaper: {
    title: 'Welcome, Reader!',
    subtitle: 'Thanks for finding us in print.',
    icon: '📰',
    bgColor: 'bg-gradient-to-r from-gray-600 to-gray-700',
    textColor: 'text-white',
  },
  poster: {
    title: 'Welcome!',
    subtitle: 'Thanks for scanning our poster.',
    icon: '🖼️',
    bgColor: 'bg-gradient-to-r from-violet-500 to-purple-600',
    textColor: 'text-white',
  },
  business_card: {
    title: 'Welcome!',
    subtitle: 'Nice to meet you! Explore our menu.',
    icon: '💼',
    bgColor: 'bg-gradient-to-r from-indigo-500 to-blue-600',
    textColor: 'text-white',
  },
  partnership: {
    title: 'Welcome, Partner!',
    subtitle: 'Enjoy our exclusive partner menu.',
    icon: '🤝',
    bgColor: 'bg-gradient-to-r from-green-500 to-emerald-600',
    textColor: 'text-white',
    promoCode: 'PARTNER20',
    promoText: '20% partner discount',
  },
  tripadvisor: {
    title: 'Welcome, Traveler!',
    subtitle: 'Thanks for finding us on TripAdvisor.',
    icon: '🌍',
    bgColor: 'bg-gradient-to-r from-green-600 to-green-700',
    textColor: 'text-white',
  },
  yelp: {
    title: 'Welcome from Yelp!',
    subtitle: "We're glad you found us.",
    icon: '⭐',
    bgColor: 'bg-gradient-to-r from-red-500 to-red-600',
    textColor: 'text-white',
  },
};

const DEFAULT_CONFIG: SourceConfig = {
  title: 'Welcome!',
  subtitle: 'Explore our menu',
  icon: '👋',
  bgColor: 'bg-gradient-to-r from-gray-500 to-gray-600',
  textColor: 'text-white',
};

interface SourceWelcomeBannerProps {
  onPromoApply?: (code: string) => void;
  onDismiss?: () => void;
}

export function SourceWelcomeBanner({ onPromoApply, onDismiss }: SourceWelcomeBannerProps) {
  const searchParams = useSearchParams();
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [hasAppliedPromo, setHasAppliedPromo] = useState(false);

  const source = searchParams.get('source');

  useEffect(() => {
    setIsMounted(true);

    // Check if we've already shown this banner for this source
    if (typeof window !== 'undefined' && source) {
      const shownSources = JSON.parse(localStorage.getItem('gudbro_shown_source_banners') || '[]');
      if (shownSources.includes(source)) {
        setIsVisible(false);
      } else {
        // Track scan event
        trackSourceScan(source);
      }
    }
  }, [source]);

  // Track source scan (analytics)
  const trackSourceScan = (source: string) => {
    // Dispatch event for analytics
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('qr-scan', {
          detail: { source, timestamp: new Date().toISOString() },
        })
      );
    }
  };

  const handleDismiss = () => {
    if (typeof window !== 'undefined' && source) {
      // Remember we've shown this source
      const shownSources = JSON.parse(localStorage.getItem('gudbro_shown_source_banners') || '[]');
      if (!shownSources.includes(source)) {
        shownSources.push(source);
        localStorage.setItem('gudbro_shown_source_banners', JSON.stringify(shownSources));
      }
    }
    setIsVisible(false);
    onDismiss?.();
  };

  const handleApplyPromo = (code: string) => {
    setHasAppliedPromo(true);
    onPromoApply?.(code);
    // Auto-dismiss after applying promo
    setTimeout(() => handleDismiss(), 2000);
  };

  // Don't render on server or if no source
  if (!isMounted || !source || !isVisible) {
    return null;
  }

  const config = SOURCE_CONFIGS[source] || DEFAULT_CONFIG;

  return (
    <div className={`${config.bgColor} relative overflow-hidden shadow-lg`}>
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-0 top-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white" />
        <div className="absolute bottom-0 right-0 h-32 w-32 translate-x-1/2 translate-y-1/2 transform rounded-full bg-white" />
      </div>

      <div className="container relative mx-auto px-4 py-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-1 items-center gap-3">
            <span className="text-4xl">{config.icon}</span>
            <div>
              <h3 className={`text-xl font-bold ${config.textColor}`}>{config.title}</h3>
              <p className={`text-sm ${config.textColor} opacity-90`}>{config.subtitle}</p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className={`rounded-full bg-white/20 p-2 hover:bg-white/30 ${config.textColor} transition-colors`}
            aria-label="Dismiss"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Promo section */}
        {config.promoCode && !hasAppliedPromo && (
          <div className="mt-4 border-t border-white/20 pt-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🎁</span>
                <div>
                  <p className={`font-bold ${config.textColor}`}>{config.promoText}</p>
                  <p className={`text-xs ${config.textColor} opacity-75`}>
                    Code: {config.promoCode}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleApplyPromo(config.promoCode!)}
                className="rounded-full bg-white px-4 py-2 text-sm font-bold text-gray-900 shadow-md transition-all hover:bg-gray-100 active:scale-95"
              >
                Apply
              </button>
            </div>
          </div>
        )}

        {/* Success message after applying promo */}
        {hasAppliedPromo && (
          <div className="mt-4 border-t border-white/20 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">✅</span>
              <p className={`font-bold ${config.textColor}`}>
                Promo applied! Discount will show at checkout.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Re-export for convenience
export const TRAFFIC_SOURCES = Object.keys(SOURCE_CONFIGS);
