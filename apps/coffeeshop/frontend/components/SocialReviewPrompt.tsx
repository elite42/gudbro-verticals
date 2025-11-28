'use client';

import { useState } from 'react';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { useTranslation } from '../lib/use-translation';

interface SocialReviewPromptProps {
  averageRating: number;
  onComplete: () => void;
  onSkip: () => void;
}

interface SocialPlatform {
  name: string;
  url: string;
  icon: string;
  color: string;
  enabled: boolean;
}

export function SocialReviewPrompt({
  averageRating,
  onComplete,
  onSkip
}: SocialReviewPromptProps) {
  const { t } = useTranslation();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  // Get social platforms from config
  // For now, we'll use default config - later this will come from backend manager settings
  const socialPlatforms: SocialPlatform[] = [
    {
      name: 'Google',
      url: 'https://www.google.com/search?q=ROOTS+Da+Nang',
      icon: 'G',
      color: 'bg-blue-600',
      enabled: true
    },
    {
      name: 'TripAdvisor',
      url: 'https://www.tripadvisor.com/',
      icon: 'T',
      color: 'bg-green-600',
      enabled: true
    },
    {
      name: 'Facebook',
      url: coffeeshopConfig.social?.facebook || 'https://www.facebook.com/',
      icon: 'f',
      color: 'bg-blue-700',
      enabled: !!coffeeshopConfig.social?.facebook
    },
    {
      name: 'Yelp',
      url: 'https://www.yelp.com/',
      icon: 'Y',
      color: 'bg-red-600',
      enabled: true
    }
  ].filter(platform => platform.enabled);

  const handlePlatformClick = (platform: SocialPlatform) => {
    setSelectedPlatform(platform.name);

    // Open platform review page in new tab
    window.open(platform.url, '_blank');

    // Wait a bit, then complete
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="text-center">
      <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-theme-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      </div>

      <h2 className="text-2xl font-bold text-theme-text-primary mb-2">
        {t.social.title}
      </h2>
      <p className="text-theme-text-secondary mb-2">
        {t.social.subtitle}
      </p>
      <p className="text-sm text-green-600 font-semibold mb-6">
        {t.social.earnPoints}
      </p>

      {/* Star rating display */}
      <div className="flex justify-center gap-1 mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-8 h-8 ${
              star <= Math.round(averageRating)
                ? 'text-yellow-400 fill-current'
                : 'text-theme-text-tertiary'
            }`}
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Social platforms grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {socialPlatforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => handlePlatformClick(platform)}
            className={`${platform.color} text-white p-4 rounded-xl hover:opacity-90 transition-all transform hover:scale-105 ${
              selectedPlatform === platform.name ? 'ring-4 ring-green-400' : ''
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold">{platform.icon}</span>
              </div>
              <span className="font-bold">{platform.name}</span>
              {selectedPlatform === platform.name && (
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  Opening...
                </span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Reward info */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl">🎁</span>
          </div>
          <div className="text-left flex-1">
            <p className="font-semibold text-theme-text-primary text-sm">{t.social.rewardInfo.title}</p>
            <p className="text-xs text-theme-text-secondary">
              {t.social.rewardInfo.description}
            </p>
          </div>
        </div>
      </div>

      {/* Skip button */}
      <button
        onClick={onSkip}
        className="text-theme-text-tertiary hover:text-theme-text-primary font-medium underline"
      >
        {t.social.maybelater}
      </button>
    </div>
  );
}
