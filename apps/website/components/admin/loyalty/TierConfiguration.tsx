'use client';

import { useState } from 'react';

export interface LoyaltyTier {
  id: string;
  name: string;
  icon: string;
  color: string;
  requirement: {
    type: 'points' | 'nft' | 'nft_staking';
    value: number; // points required, or staking amount
    nftRequired?: boolean;
  };
  benefits: {
    pointsMultiplier: number;
    cashbackPercent: number;
    prioritySupport: boolean;
    earlyAccess: boolean;
    exclusiveEvents: boolean;
    governance: boolean;
    revenueShare: boolean;
    customBadge: boolean;
  };
  storeDiscount: number;
  isActive: boolean;
}

const defaultTiers: LoyaltyTier[] = [
  {
    id: 'foodie',
    name: 'Foodie',
    icon: '🍽️',
    color: 'gray',
    requirement: { type: 'points', value: 0 },
    benefits: {
      pointsMultiplier: 1,
      cashbackPercent: 0,
      prioritySupport: false,
      earlyAccess: false,
      exclusiveEvents: false,
      governance: false,
      revenueShare: false,
      customBadge: false,
    },
    storeDiscount: 0,
    isActive: true,
  },
  {
    id: 'explorer',
    name: 'Explorer',
    icon: '🧭',
    color: 'green',
    requirement: { type: 'points', value: 500 },
    benefits: {
      pointsMultiplier: 1.2,
      cashbackPercent: 2,
      prioritySupport: false,
      earlyAccess: true,
      exclusiveEvents: false,
      governance: false,
      revenueShare: false,
      customBadge: true,
    },
    storeDiscount: 5,
    isActive: true,
  },
  {
    id: 'connoisseur',
    name: 'Connoisseur',
    icon: '🎩',
    color: 'blue',
    requirement: { type: 'points', value: 2000 },
    benefits: {
      pointsMultiplier: 1.5,
      cashbackPercent: 5,
      prioritySupport: true,
      earlyAccess: true,
      exclusiveEvents: true,
      governance: false,
      revenueShare: false,
      customBadge: true,
    },
    storeDiscount: 10,
    isActive: true,
  },
  {
    id: 'ambassador',
    name: 'Ambassador',
    icon: '👑',
    color: 'purple',
    requirement: { type: 'points', value: 10000 },
    benefits: {
      pointsMultiplier: 2,
      cashbackPercent: 8,
      prioritySupport: true,
      earlyAccess: true,
      exclusiveEvents: true,
      governance: false,
      revenueShare: false,
      customBadge: true,
    },
    storeDiscount: 15,
    isActive: true,
  },
  {
    id: 'genesis',
    name: 'Genesis',
    icon: '💎',
    color: 'gradient-purple',
    requirement: { type: 'nft', value: 0, nftRequired: true },
    benefits: {
      pointsMultiplier: 3,
      cashbackPercent: 15,
      prioritySupport: true,
      earlyAccess: true,
      exclusiveEvents: true,
      governance: true,
      revenueShare: false,
      customBadge: true,
    },
    storeDiscount: 20,
    isActive: true,
  },
  {
    id: 'diamond',
    name: 'Diamond',
    icon: '💠',
    color: 'gradient-blue',
    requirement: { type: 'nft_staking', value: 10000, nftRequired: true },
    benefits: {
      pointsMultiplier: 5,
      cashbackPercent: 20,
      prioritySupport: true,
      earlyAccess: true,
      exclusiveEvents: true,
      governance: true,
      revenueShare: true,
      customBadge: true,
    },
    storeDiscount: 25,
    isActive: true,
  },
];

interface TierConfigurationProps {
  tiers?: LoyaltyTier[];
  onUpdate?: (tiers: LoyaltyTier[]) => void;
}

export function TierConfiguration({ tiers: initialTiers, onUpdate }: TierConfigurationProps) {
  const [tiers, setTiers] = useState<LoyaltyTier[]>(initialTiers || defaultTiers);
  const [editingTier, setEditingTier] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  const handleTierUpdate = (tierId: string, updates: Partial<LoyaltyTier>) => {
    setTiers(prev => prev.map(t => t.id === tierId ? { ...t, ...updates } : t));
    setHasChanges(true);
  };

  const handleBenefitToggle = (tierId: string, benefit: keyof LoyaltyTier['benefits']) => {
    setTiers(prev => prev.map(t => {
      if (t.id === tierId) {
        return {
          ...t,
          benefits: {
            ...t.benefits,
            [benefit]: !t.benefits[benefit],
          },
        };
      }
      return t;
    }));
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate?.(tiers);
    setHasChanges(false);
    setEditingTier(null);
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      gray: 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-600',
      green: 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700',
      blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-300 dark:border-blue-700',
      purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-300 dark:border-purple-700',
      'gradient-purple': 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-400',
      'gradient-blue': 'bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-400',
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">User Loyalty Tiers</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Configure tier requirements and benefits</p>
        </div>
        {hasChanges && (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
          >
            Save Changes
          </button>
        )}
      </div>

      {/* Tiers Grid */}
      <div className="grid gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`border-2 rounded-xl overflow-hidden ${getColorClasses(tier.color)} ${
              !tier.isActive ? 'opacity-50' : ''
            }`}
          >
            {/* Tier Header */}
            <div
              className="p-4 cursor-pointer"
              onClick={() => setEditingTier(editingTier === tier.id ? null : tier.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{tier.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {tier.requirement.type === 'points' && tier.requirement.value === 0 && 'Default tier'}
                      {tier.requirement.type === 'points' && tier.requirement.value > 0 && `${tier.requirement.value.toLocaleString()} points`}
                      {tier.requirement.type === 'nft' && 'NFT Holder'}
                      {tier.requirement.type === 'nft_staking' && `NFT + ${tier.requirement.value.toLocaleString()} $GUD staked`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{tier.benefits.pointsMultiplier}x points</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{tier.benefits.cashbackPercent}% cashback</p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${editingTier === tier.id ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Expanded Edit Panel */}
            {editingTier === tier.id && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white/50 dark:bg-gray-900/50">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Left: Requirements */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Requirements</h4>

                    {tier.requirement.type === 'points' && tier.id !== 'foodie' && (
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Points Required</label>
                        <input
                          type="number"
                          value={tier.requirement.value}
                          onChange={(e) => handleTierUpdate(tier.id, {
                            requirement: { ...tier.requirement, value: parseInt(e.target.value) || 0 }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    )}

                    {tier.requirement.type === 'nft_staking' && (
                      <div>
                        <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">$GUD Staking Required</label>
                        <input
                          type="number"
                          value={tier.requirement.value}
                          onChange={(e) => handleTierUpdate(tier.id, {
                            requirement: { ...tier.requirement, value: parseInt(e.target.value) || 0 }
                          })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Points Multiplier</label>
                      <input
                        type="number"
                        step="0.1"
                        value={tier.benefits.pointsMultiplier}
                        onChange={(e) => handleTierUpdate(tier.id, {
                          benefits: { ...tier.benefits, pointsMultiplier: parseFloat(e.target.value) || 1 }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Cashback %</label>
                      <input
                        type="number"
                        value={tier.benefits.cashbackPercent}
                        onChange={(e) => handleTierUpdate(tier.id, {
                          benefits: { ...tier.benefits, cashbackPercent: parseInt(e.target.value) || 0 }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Store Discount %</label>
                      <input
                        type="number"
                        value={tier.storeDiscount}
                        onChange={(e) => handleTierUpdate(tier.id, {
                          storeDiscount: parseInt(e.target.value) || 0
                        })}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Right: Benefits */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Benefits</h4>
                    <div className="space-y-2">
                      {[
                        { key: 'prioritySupport', label: 'Priority Support', icon: '🎯' },
                        { key: 'earlyAccess', label: 'Early Access', icon: '🚀' },
                        { key: 'exclusiveEvents', label: 'Exclusive Events', icon: '🎉' },
                        { key: 'governance', label: 'Governance Voting', icon: '🗳️' },
                        { key: 'revenueShare', label: 'Revenue Share', icon: '💰' },
                        { key: 'customBadge', label: 'Custom Badge', icon: '🏅' },
                      ].map(({ key, label, icon }) => (
                        <label
                          key={key}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={tier.benefits[key as keyof typeof tier.benefits] as boolean}
                            onChange={() => handleBenefitToggle(tier.id, key as keyof LoyaltyTier['benefits'])}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-lg">{icon}</span>
                          <span className="text-gray-700 dark:text-gray-300">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Active toggle */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={tier.isActive}
                      onChange={() => handleTierUpdate(tier.id, { isActive: !tier.isActive })}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">Tier Active</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
