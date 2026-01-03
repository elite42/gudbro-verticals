'use client';

import { useState, useEffect } from 'react';
import {
  getLoyaltySummary,
  getRecentTransactions,
  calculateTierProgress,
  formatTransactionType,
  getTransactionIcon,
  TIER_CONFIG,
  type LoyaltySummary,
  type LoyaltyTransaction,
  type LoyaltyTier,
} from '../lib/loyalty-service';

interface LoyaltyCardProps {
  compact?: boolean;
  showTransactions?: boolean;
  onViewAll?: () => void;
}

export function LoyaltyCard({ compact = false, showTransactions = true, onViewAll }: LoyaltyCardProps) {
  const [summary, setSummary] = useState<LoyaltySummary | null>(null);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [summaryData, txData] = await Promise.all([
          getLoyaltySummary(),
          showTransactions ? getRecentTransactions(5) : Promise.resolve([]),
        ]);
        setSummary(summaryData);
        setTransactions(txData);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [showTransactions]);

  if (isLoading) {
    return <LoyaltyCardSkeleton compact={compact} />;
  }

  if (!summary) {
    return <LoyaltyCardEmpty />;
  }

  const tierInfo = TIER_CONFIG[summary.loyaltyTier];
  const progress = calculateTierProgress(summary);

  if (compact) {
    return (
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TierBadge tier={summary.loyaltyTier} size="sm" />
            <div>
              <p className="text-sm font-semibold text-gray-900">{summary.totalPoints} pts</p>
              <p className="text-xs text-gray-500">{tierInfo.name}</p>
            </div>
          </div>
          {summary.nextTier && (
            <div className="text-right">
              <p className="text-xs text-gray-500">Next: {TIER_CONFIG[summary.nextTier].name}</p>
              <p className="text-xs font-medium text-amber-600">{summary.pointsToNextTier} pts to go</p>
            </div>
          )}
        </div>
        {/* Progress bar */}
        <div className="mt-3 h-1.5 bg-amber-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header with tier badge */}
      <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 text-white">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-amber-100 text-sm mb-1">Your Loyalty Status</p>
            <h3 className="text-3xl font-bold">{summary.totalPoints.toLocaleString()}</h3>
            <p className="text-amber-100 text-sm">total points</p>
          </div>
          <TierBadge tier={summary.loyaltyTier} size="lg" />
        </div>

        {/* Tier progress */}
        {summary.nextTier && (
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span>{tierInfo.name}</span>
              <span>{TIER_CONFIG[summary.nextTier].name}</span>
            </div>
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-sm mt-2 text-amber-100">
              {summary.pointsToNextTier} points to {TIER_CONFIG[summary.nextTier].name}
            </p>
          </div>
        )}
      </div>

      {/* Points breakdown */}
      <div className="p-6 border-b border-gray-100">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Points Breakdown</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-green-600">{summary.consumerPoints}</p>
            <p className="text-xs text-gray-500">Consumer</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{summary.merchantPoints}</p>
            <p className="text-xs text-gray-500">Merchant</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{summary.contributorPoints}</p>
            <p className="text-xs text-gray-500">Contributor</p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="p-6 border-b border-gray-100 bg-gray-50">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Your {tierInfo.name} Benefits</h4>
        <ul className="space-y-2">
          {tierInfo.benefits.map((benefit, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent transactions */}
      {showTransactions && transactions.length > 0 && (
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-700">Recent Activity</h4>
            {onViewAll && (
              <button onClick={onViewAll} className="text-sm text-amber-600 font-medium hover:text-amber-700">
                View All
              </button>
            )}
          </div>
          <div className="space-y-3">
            {transactions.slice(0, 5).map((tx) => (
              <div key={tx.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{getTransactionIcon(tx.transactionType)}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{formatTransactionType(tx.transactionType)}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    tx.pointsChange > 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {tx.pointsChange > 0 ? '+' : ''}{tx.pointsChange}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Referral stats */}
      {summary.successfulReferrals > 0 && (
        <div className="px-6 pb-6">
          <div className="bg-purple-50 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👥</span>
              <div>
                <p className="text-sm font-semibold text-purple-900">Referrals</p>
                <p className="text-xs text-purple-600">{summary.successfulReferrals} friends invited</p>
              </div>
            </div>
            <button className="text-sm text-purple-600 font-medium hover:text-purple-700">
              Invite More
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Tier Badge Component
interface TierBadgeProps {
  tier: LoyaltyTier;
  size?: 'sm' | 'md' | 'lg';
}

function TierBadge({ tier, size = 'md' }: TierBadgeProps) {
  const tierInfo = TIER_CONFIG[tier];

  const sizeClasses = {
    sm: 'w-10 h-10 text-lg',
    md: 'w-14 h-14 text-2xl',
    lg: 'w-16 h-16 text-3xl',
  };

  const tierEmojis: Record<LoyaltyTier, string> = {
    bronze: '🥉',
    silver: '🥈',
    gold: '🥇',
    platinum: '💎',
    founding: '👑',
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-full flex items-center justify-center shadow-lg`}
      style={{ backgroundColor: tierInfo.color }}
    >
      <span>{tierEmojis[tier]}</span>
    </div>
  );
}

// Skeleton loader
function LoyaltyCardSkeleton({ compact }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="bg-gray-100 rounded-xl p-4 animate-pulse">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-20 mb-1" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>
        </div>
        <div className="mt-3 h-1.5 bg-gray-200 rounded-full" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <div className="bg-gray-200 p-6">
        <div className="flex justify-between">
          <div>
            <div className="h-4 bg-gray-300 rounded w-24 mb-2" />
            <div className="h-8 bg-gray-300 rounded w-32 mb-1" />
            <div className="h-3 bg-gray-300 rounded w-16" />
          </div>
          <div className="w-16 h-16 bg-gray-300 rounded-full" />
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center">
              <div className="h-8 bg-gray-200 rounded w-12 mx-auto mb-1" />
              <div className="h-3 bg-gray-200 rounded w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Empty state
function LoyaltyCardEmpty() {
  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 text-center border border-amber-200">
      <span className="text-4xl mb-3 block">🎁</span>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Earning Points!</h3>
      <p className="text-sm text-gray-600 mb-4">
        Sign in to track your loyalty points and unlock exclusive rewards.
      </p>
      <button className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors">
        Sign In
      </button>
    </div>
  );
}

export default LoyaltyCard;
