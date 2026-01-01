'use client';

import { useMemo } from 'react';
import {
  UserLoyaltyState,
  LoyaltyTier,
  DEFAULT_TIERS,
  getTierForPoints,
  getTierProgress,
} from '@/types/loyalty';

interface LoyaltyCardProps {
  loyalty: UserLoyaltyState;
  tiers?: LoyaltyTier[];
  language?: 'en' | 'it';
  onViewRewards?: () => void;
  onEarnPoints?: () => void;
  onViewHistory?: () => void;
}

export function LoyaltyCard({
  loyalty,
  tiers = DEFAULT_TIERS,
  language = 'it',
  onViewRewards,
  onEarnPoints,
  onViewHistory,
}: LoyaltyCardProps) {
  const currentTier = useMemo(
    () => getTierForPoints(loyalty.pointsTotal, tiers),
    [loyalty.pointsTotal, tiers]
  );

  const { progress, pointsToNext, nextTier } = useMemo(
    () => getTierProgress(loyalty.pointsTotal, currentTier, tiers),
    [loyalty.pointsTotal, currentTier, tiers]
  );

  const tierName = language === 'it' ? currentTier.nameIt : currentTier.name;
  const nextTierName = nextTier ? (language === 'it' ? nextTier.nameIt : nextTier.name) : null;

  return (
    <div className="bg-theme-bg-elevated rounded-2xl overflow-hidden shadow-lg">
      {/* Tier Header with Gradient */}
      <div className={`bg-gradient-to-r ${currentTier.gradientFrom} ${currentTier.gradientTo} p-5 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{currentTier.icon}</span>
            <div>
              <p className="text-sm opacity-90">
                {language === 'it' ? 'Livello' : 'Level'}
              </p>
              <h3 className="text-xl font-bold">{tierName}</h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black">{loyalty.pointsAvailable.toLocaleString()}</p>
            <p className="text-sm opacity-90">
              {language === 'it' ? 'punti disponibili' : 'available points'}
            </p>
          </div>
        </div>

        {/* Progress to next tier */}
        {nextTier && pointsToNext !== null && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="opacity-90">{tierName}</span>
              <span className="opacity-90">{nextTierName}</span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-center mt-2 opacity-90">
              {language === 'it'
                ? `${pointsToNext.toLocaleString()} punti al prossimo livello`
                : `${pointsToNext.toLocaleString()} points to next level`}
            </p>
          </div>
        )}

        {/* Max tier message */}
        {!nextTier && (
          <div className="mt-4 text-center">
            <p className="text-sm opacity-90">
              {language === 'it'
                ? 'Hai raggiunto il livello massimo!'
                : 'You reached the highest level!'}
            </p>
          </div>
        )}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 divide-x divide-theme-border-light">
        <div className="p-4 text-center">
          <p className="text-2xl font-bold text-theme-text-primary">
            {loyalty.pointsTotal.toLocaleString()}
          </p>
          <p className="text-xs text-theme-text-secondary">
            {language === 'it' ? 'Totale guadagnati' : 'Total earned'}
          </p>
        </div>
        <div className="p-4 text-center">
          <p className="text-2xl font-bold text-theme-text-primary">
            {loyalty.rewardsRedeemed}
          </p>
          <p className="text-xs text-theme-text-secondary">
            {language === 'it' ? 'Premi riscattati' : 'Rewards claimed'}
          </p>
        </div>
        <div className="p-4 text-center">
          <p className="text-2xl font-bold text-theme-text-primary">
            {loyalty.currentStreak}
          </p>
          <p className="text-xs text-theme-text-secondary">
            {language === 'it' ? 'Settimane streak' : 'Week streak'}
          </p>
        </div>
      </div>

      {/* Tier Benefits */}
      {currentTier.benefits.length > 0 && (
        <div className="px-5 py-4 border-t border-theme-border-light">
          <p className="text-xs font-medium text-theme-text-secondary mb-2 uppercase tracking-wide">
            {language === 'it' ? 'I tuoi benefici' : 'Your benefits'}
          </p>
          <div className="flex flex-wrap gap-2">
            {currentTier.benefits.map(benefit => (
              <span
                key={benefit.id}
                className={`px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${currentTier.gradientFrom} ${currentTier.gradientTo} text-white`}
              >
                {benefit.icon} {language === 'it' ? benefit.labelIt : benefit.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2 p-4 border-t border-theme-border-light">
        <button
          onClick={onViewRewards}
          className="flex flex-col items-center gap-1 p-3 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-tertiary transition-colors"
        >
          <span className="text-xl">🎁</span>
          <span className="text-xs font-medium text-theme-text-primary">
            {language === 'it' ? 'Premi' : 'Rewards'}
          </span>
        </button>
        <button
          onClick={onEarnPoints}
          className="flex flex-col items-center gap-1 p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90 transition-opacity"
        >
          <span className="text-xl">⭐</span>
          <span className="text-xs font-medium">
            {language === 'it' ? 'Guadagna' : 'Earn'}
          </span>
        </button>
        <button
          onClick={onViewHistory}
          className="flex flex-col items-center gap-1 p-3 rounded-xl bg-theme-bg-secondary hover:bg-theme-bg-tertiary transition-colors"
        >
          <span className="text-xl">📜</span>
          <span className="text-xs font-medium text-theme-text-primary">
            {language === 'it' ? 'Storico' : 'History'}
          </span>
        </button>
      </div>
    </div>
  );
}
