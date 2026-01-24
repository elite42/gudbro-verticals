'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Gift,
  CaretDown,
  CaretUp,
  Check,
  SpinnerGap,
  Crown,
  Medal,
  Trophy,
} from '@phosphor-icons/react';

type LoyaltyTier = 'bronze' | 'silver' | 'gold' | 'platinum';

interface LoyaltyRedeemCardProps {
  points: number;
  pointsValue: number; // Value in currency (e.g., 3100 for $31.00)
  tier: LoyaltyTier;
  nextTier?: LoyaltyTier;
  pointsToNextTier?: number;
  onRedeem: (points: number) => Promise<boolean>;
  formatPrice: (price: number) => string;
  isLoading?: boolean;
}

const TIER_CONFIG: Record<
  LoyaltyTier,
  { label: string; color: string; icon: typeof Crown; multiplier: string }
> = {
  bronze: {
    label: 'Bronze',
    color: '#CD7F32',
    icon: Medal,
    multiplier: '1x',
  },
  silver: {
    label: 'Silver',
    color: '#A8A9AD',
    icon: Medal,
    multiplier: '1.25x',
  },
  gold: {
    label: 'Gold',
    color: '#FFD700',
    icon: Trophy,
    multiplier: '1.5x',
  },
  platinum: {
    label: 'Platinum',
    color: '#E5E4E2',
    icon: Crown,
    multiplier: '2x',
  },
};

export function LoyaltyRedeemCard({
  points,
  pointsValue,
  tier,
  nextTier,
  pointsToNextTier,
  onRedeem,
  formatPrice,
  isLoading = false,
}: LoyaltyRedeemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState(0);

  const tierConfig = TIER_CONFIG[tier];
  const TierIcon = tierConfig.icon;

  // Calculate redemption options (25%, 50%, 75%, 100%)
  const redemptionOptions = [
    { percent: 25, points: Math.floor(points * 0.25) },
    { percent: 50, points: Math.floor(points * 0.5) },
    { percent: 75, points: Math.floor(points * 0.75) },
    { percent: 100, points: points },
  ].filter((opt) => opt.points > 0);

  // Calculate value per point (simplified: pointsValue / points)
  const valuePerPoint = points > 0 ? pointsValue / points : 0;

  const handleRedeem = async () => {
    if (selectedPoints <= 0 || isRedeeming) return;

    setIsRedeeming(true);
    try {
      const success = await onRedeem(selectedPoints);
      if (success) {
        setRedeemSuccess(true);
        setTimeout(() => {
          setRedeemSuccess(false);
          setSelectedPoints(0);
        }, 2000);
      }
    } catch (error) {
      console.error('Redeem failed:', error);
    } finally {
      setIsRedeeming(false);
    }
  };

  // If no points, show minimal state
  if (points <= 0) {
    return (
      <div className="rounded-xl p-4" style={{ background: 'var(--bg-secondary)' }}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <Star size={20} style={{ color: 'var(--text-tertiary)' }} />
          </div>
          <div>
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Start earning rewards
            </p>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Complete orders to collect points
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-xl"
      style={{
        background: `linear-gradient(135deg, ${tierConfig.color}15 0%, var(--bg-secondary) 100%)`,
        border: `1px solid ${tierConfig.color}30`,
      }}
    >
      {/* Header - Always visible */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center justify-between p-4"
      >
        <div className="flex items-center gap-3">
          {/* Tier badge */}
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full"
            style={{
              background: `${tierConfig.color}20`,
              border: `2px solid ${tierConfig.color}`,
            }}
          >
            <TierIcon size={24} weight="fill" style={{ color: tierConfig.color }} />
          </div>

          <div className="text-left">
            <div className="flex items-center gap-2">
              <p
                className="font-display text-lg font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {points.toLocaleString()} pts
              </p>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
                style={{
                  background: tierConfig.color,
                  color: tier === 'silver' || tier === 'platinum' ? '#1a1a1a' : '#fff',
                }}
              >
                {tierConfig.label}
              </span>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Worth {formatPrice(pointsValue)}
            </p>
          </div>
        </div>

        {/* Expand/collapse */}
        <div
          className="flex h-8 w-8 items-center justify-center rounded-full"
          style={{ background: 'var(--bg-tertiary)' }}
        >
          {isExpanded ? (
            <CaretUp size={16} style={{ color: 'var(--text-secondary)' }} />
          ) : (
            <CaretDown size={16} style={{ color: 'var(--text-secondary)' }} />
          )}
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t px-4 pb-4" style={{ borderColor: 'var(--border-light)' }}>
              {/* Progress to next tier */}
              {nextTier && pointsToNextTier && (
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span style={{ color: 'var(--text-tertiary)' }}>
                      {pointsToNextTier} pts to {TIER_CONFIG[nextTier].label}
                    </span>
                    <span style={{ color: tierConfig.color }}>{tierConfig.multiplier} points</span>
                  </div>
                  <div
                    className="h-2 overflow-hidden rounded-full"
                    style={{ background: 'var(--bg-tertiary)' }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(100, (points / (points + pointsToNextTier)) * 100)}%`,
                      }}
                      className="h-full rounded-full"
                      style={{ background: tierConfig.color }}
                    />
                  </div>
                </div>
              )}

              {/* Redemption options */}
              <div className="mt-4">
                <p className="mb-2 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                  Redeem points
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {redemptionOptions.map((option) => {
                    const isSelected = selectedPoints === option.points;
                    const optionValue = Math.floor(option.points * valuePerPoint);

                    return (
                      <button
                        key={option.percent}
                        onClick={() => setSelectedPoints(isSelected ? 0 : option.points)}
                        className="rounded-lg p-3 text-left transition-all"
                        style={{
                          background: isSelected
                            ? 'var(--interactive-primary)'
                            : 'var(--bg-tertiary)',
                          border: isSelected
                            ? '2px solid var(--interactive-primary)'
                            : '2px solid transparent',
                        }}
                      >
                        <p
                          className="text-sm font-semibold"
                          style={{
                            color: isSelected ? 'var(--text-inverse)' : 'var(--text-primary)',
                          }}
                        >
                          {option.points.toLocaleString()} pts
                        </p>
                        <p
                          className="text-xs"
                          style={{
                            color: isSelected ? 'rgba(255,255,255,0.8)' : 'var(--text-tertiary)',
                          }}
                        >
                          = {formatPrice(optionValue)}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Redeem button */}
              <button
                onClick={handleRedeem}
                disabled={selectedPoints <= 0 || isRedeeming || isLoading}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all disabled:opacity-50"
                style={{
                  background:
                    selectedPoints > 0 ? 'var(--interactive-primary)' : 'var(--bg-tertiary)',
                  color: selectedPoints > 0 ? 'var(--text-inverse)' : 'var(--text-tertiary)',
                }}
              >
                {isRedeeming ? (
                  <>
                    <SpinnerGap size={18} className="animate-spin" />
                    Applying...
                  </>
                ) : redeemSuccess ? (
                  <>
                    <Check size={18} weight="bold" />
                    Applied!
                  </>
                ) : (
                  <>
                    <Gift size={18} />
                    {selectedPoints > 0
                      ? `Redeem ${formatPrice(Math.floor(selectedPoints * valuePerPoint))}`
                      : 'Select points to redeem'}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
