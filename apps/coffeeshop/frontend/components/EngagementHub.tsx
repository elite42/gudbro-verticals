'use client';

import { useState, useEffect } from 'react';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { engagementStore, type EngagementAction } from '../lib/engagement-store';
import { ReviewModal } from './ReviewModal';
import { SocialShareModal } from './SocialShareModal';
import { useTranslation } from '../lib/use-translation';

export function EngagementHub() {
  const { t } = useTranslation();

  // Check if engagement system is enabled BEFORE any hooks
  // @ts-ignore - engagement feature not yet in VerticalConfig type
  if (!coffeeshopConfig.features?.enableEngagementSystem || !coffeeshopConfig.engagement) {
    return null;
  }

  // @ts-ignore
  const { rewards } = coffeeshopConfig.engagement;

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [selectedSocialAction, setSelectedSocialAction] = useState<'photo' | 'checkin' | 'follow'>('photo');
  const [completedActions, setCompletedActions] = useState<Set<EngagementAction>>(new Set());

  // Load completed actions
  useEffect(() => {
    const loadCompletedActions = () => {
      const completed = new Set<EngagementAction>();
      if (engagementStore.hasCompleted('review')) completed.add('review');
      if (engagementStore.hasCompleted('photo')) completed.add('photo');
      if (engagementStore.hasCompleted('checkin')) completed.add('checkin');
      if (engagementStore.hasCompleted('follow')) completed.add('follow');
      setCompletedActions(completed);
    };

    loadCompletedActions();

    // Listen for engagement updates
    const handleEngagementUpdate = () => {
      loadCompletedActions();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('engagement-updated', handleEngagementUpdate);
      return () => window.removeEventListener('engagement-updated', handleEngagementUpdate);
    }
  }, []);

  const handleSocialClick = (action: 'photo' | 'checkin' | 'follow') => {
    setSelectedSocialAction(action);
    setShowSocialModal(true);
  };

  const actions = [
    {
      id: 'review' as EngagementAction,
      icon: '⭐',
      title: t.home.engagement.actions.review.title,
      description: t.home.engagement.actions.review.description,
      reward: Math.max(rewards.review_positive.value, rewards.review_negative.value),
      onClick: () => setShowReviewModal(true),
    },
    {
      id: 'photo' as EngagementAction,
      icon: '📸',
      title: t.home.engagement.actions.photo.title,
      description: t.home.engagement.actions.photo.description,
      reward: rewards.photo_share.value,
      onClick: () => handleSocialClick('photo'),
    },
    {
      id: 'checkin' as EngagementAction,
      icon: '📍',
      title: t.home.engagement.actions.checkin.title,
      description: t.home.engagement.actions.checkin.description,
      reward: rewards.checkin.value,
      onClick: () => handleSocialClick('checkin'),
    },
    {
      id: 'follow' as EngagementAction,
      icon: '👥',
      title: t.home.engagement.actions.follow.title,
      description: t.home.engagement.actions.follow.description,
      reward: rewards.follow.value,
      onClick: () => handleSocialClick('follow'),
    },
  ];

  return (
    <>
      {/* Engagement Hub Box */}
      <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-6 shadow-xl">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            {t.home.engagement.title}
          </h2>
          <p className="text-white/90 text-sm">
            {t.home.engagement.subtitle}
          </p>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const isCompleted = completedActions.has(action.id);

            return (
              <button
                key={action.id}
                onClick={action.onClick}
                disabled={isCompleted}
                className={`
                  relative p-4 rounded-xl text-left transition-all transform
                  ${isCompleted
                    ? 'bg-theme-bg-elevated/30 cursor-not-allowed'
                    : 'bg-theme-bg-elevated hover:bg-theme-bg-elevated/95 hover:scale-105 active:scale-95 shadow-md'
                  }
                `}
                aria-label={`${action.title}: ${action.description}${!isCompleted ? `. Earn ${action.reward}% discount` : ' - Already completed'}`}
                aria-disabled={isCompleted}
              >
                {/* Completed Badge */}
                {isCompleted && (
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full" aria-hidden="true">
                    ✓ Done
                  </div>
                )}

                {/* Icon */}
                <div className="text-3xl mb-2" aria-hidden="true">{action.icon}</div>

                {/* Title */}
                <h3 className={`font-bold mb-1 ${isCompleted ? 'text-theme-text-tertiary' : 'text-theme-text-primary'}`} aria-hidden="true">
                  {action.title}
                </h3>

                {/* Description */}
                <p className={`text-xs mb-2 ${isCompleted ? 'text-theme-text-tertiary' : 'text-theme-text-secondary'}`} aria-hidden="true">
                  {action.description}
                </p>

                {/* Reward */}
                {!isCompleted && (
                  <div className="bg-theme-brand-secondary text-theme-brand-primary text-xs font-bold px-2 py-1 rounded-full inline-block" aria-hidden="true">
                    {action.reward}% OFF
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Discount Codes */}
        <ActiveDiscounts />
      </div>

      {/* Modals */}
      {showReviewModal && (
        <ReviewModal onClose={() => setShowReviewModal(false)} />
      )}

      {showSocialModal && (
        <SocialShareModal
          action={selectedSocialAction}
          onClose={() => setShowSocialModal(false)}
        />
      )}
    </>
  );
}

/**
 * Show active discount codes
 */
function ActiveDiscounts() {
  const [activeCodes, setActiveCodes] = useState(() => engagementStore.getActiveCodes());

  useEffect(() => {
    const handleUpdate = () => {
      setActiveCodes(engagementStore.getActiveCodes());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('engagement-updated', handleUpdate);
      return () => window.removeEventListener('engagement-updated', handleUpdate);
    }
  }, []);

  if (activeCodes.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-white/20">
      <h3 className="text-white font-bold mb-2 text-sm">Your Active Discount Codes:</h3>
      <div className="space-y-2">
        {activeCodes.map((code) => (
          <div
            key={code.id}
            className="bg-white/20 backdrop-blur-sm rounded-lg p-3 flex items-center justify-between"
          >
            <div>
              <div className="text-white font-mono font-bold">{code.discountCode}</div>
              <div className="text-white/80 text-xs">
                {code.discountValue}% off • Expires {new Date(code.expiresAt).toLocaleDateString()}
              </div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(code.discountCode);
                alert('Code copied to clipboard!');
              }}
              className="bg-white text-green-600 px-3 py-1 rounded-full text-xs font-bold hover:bg-green-50 transition-colors"
              aria-label={`Copy discount code ${code.discountCode} to clipboard`}
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
