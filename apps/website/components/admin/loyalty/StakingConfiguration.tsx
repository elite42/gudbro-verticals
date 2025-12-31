'use client';

import { useState } from 'react';

export interface StakingTier {
  id: string;
  name: string;
  minStake: number; // $GUD tokens
  pointsBoost: number; // multiplier (e.g., 1.5 = +50%)
  cashbackBoost: number; // percentage points added
  extraBenefits: string[];
  isActive: boolean;
}

const defaultStakingTiers: StakingTier[] = [
  {
    id: 'bronze',
    name: 'Bronze Staker',
    minStake: 100,
    pointsBoost: 0.5,
    cashbackBoost: 1,
    extraBenefits: ['Bronze badge'],
    isActive: true,
  },
  {
    id: 'silver',
    name: 'Silver Staker',
    minStake: 500,
    pointsBoost: 1,
    cashbackBoost: 3,
    extraBenefits: ['Silver badge', 'Monthly airdrop'],
    isActive: true,
  },
  {
    id: 'gold',
    name: 'Gold Staker',
    minStake: 1000,
    pointsBoost: 1.5,
    cashbackBoost: 5,
    extraBenefits: ['Gold badge', 'Weekly airdrop', 'Private Discord'],
    isActive: true,
  },
  {
    id: 'platinum',
    name: 'Platinum Staker',
    minStake: 5000,
    pointsBoost: 2,
    cashbackBoost: 8,
    extraBenefits: ['Platinum badge', 'Daily airdrop', 'VIP Discord', 'Governance voting'],
    isActive: true,
  },
];

interface StakingConfigurationProps {
  tiers?: StakingTier[];
  tokenInfo?: {
    price: number;
    totalSupply: number;
    circulatingSupply: number;
    stakingAPY: number;
  };
  onUpdate?: (tiers: StakingTier[]) => void;
}

export function StakingConfiguration({
  tiers: initialTiers,
  tokenInfo = { price: 0.05, totalSupply: 100000000, circulatingSupply: 25000000, stakingAPY: 12 },
  onUpdate
}: StakingConfigurationProps) {
  const [tiers, setTiers] = useState<StakingTier[]>(initialTiers || defaultStakingTiers);
  const [stakingAPY, setStakingAPY] = useState(tokenInfo.stakingAPY);
  const [hasChanges, setHasChanges] = useState(false);

  const handleTierUpdate = (tierId: string, updates: Partial<StakingTier>) => {
    setTiers(prev => prev.map(t => t.id === tierId ? { ...t, ...updates } : t));
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate?.(tiers);
    setHasChanges(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">$GUD Staking Tiers</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Configure staking benefits for token holders</p>
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

      {/* Token Stats */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🪙</span>
          <h3 className="text-lg font-bold">$GUD Token Overview</h3>
          <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">Testnet</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-amber-100 text-sm">Price</p>
            <p className="text-2xl font-bold">${tokenInfo.price}</p>
          </div>
          <div>
            <p className="text-amber-100 text-sm">Total Supply</p>
            <p className="text-2xl font-bold">{(tokenInfo.totalSupply / 1000000).toFixed(0)}M</p>
          </div>
          <div>
            <p className="text-amber-100 text-sm">Circulating</p>
            <p className="text-2xl font-bold">{(tokenInfo.circulatingSupply / 1000000).toFixed(0)}M</p>
          </div>
          <div>
            <p className="text-amber-100 text-sm">Staking APY</p>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={stakingAPY}
                onChange={(e) => {
                  setStakingAPY(parseFloat(e.target.value) || 0);
                  setHasChanges(true);
                }}
                className="w-16 px-2 py-1 text-xl font-bold bg-white/20 border border-white/30 rounded-lg text-white text-center"
              />
              <span className="text-xl font-bold">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Staking Tiers */}
      <div className="grid md:grid-cols-2 gap-4">
        {tiers.map((tier) => (
          <div
            key={tier.id}
            className={`bg-white dark:bg-gray-800 rounded-xl border-2 p-5 transition-all ${
              tier.isActive
                ? 'border-gray-200 dark:border-gray-700'
                : 'border-dashed border-gray-300 dark:border-gray-600 opacity-60'
            }`}
          >
            {/* Tier Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  tier.id === 'bronze' ? 'bg-amber-700' :
                  tier.id === 'silver' ? 'bg-gray-400' :
                  tier.id === 'gold' ? 'bg-yellow-500' :
                  'bg-gradient-to-r from-purple-500 to-blue-500'
                } text-white text-lg font-bold`}>
                  {tier.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Min: {tier.minStake.toLocaleString()} $GUD
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleTierUpdate(tier.id, { isActive: !tier.isActive })}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  tier.isActive ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    tier.isActive ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Configuration */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Min Stake ($GUD)</label>
                  <input
                    type="number"
                    value={tier.minStake}
                    onChange={(e) => handleTierUpdate(tier.id, { minStake: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">
                    USD Value: ${(tier.minStake * tokenInfo.price).toFixed(2)}
                  </label>
                  <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300">
                    ≈ €{(tier.minStake * tokenInfo.price * 0.92).toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Points Boost</label>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">+</span>
                    <input
                      type="number"
                      step="0.1"
                      value={tier.pointsBoost}
                      onChange={(e) => handleTierUpdate(tier.id, { pointsBoost: parseFloat(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                    <span className="text-gray-500">x</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Cashback Boost</label>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500">+</span>
                    <input
                      type="number"
                      value={tier.cashbackBoost}
                      onChange={(e) => handleTierUpdate(tier.id, { cashbackBoost: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                    <span className="text-gray-500">%</span>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Extra Benefits</label>
                <div className="flex flex-wrap gap-1">
                  {tier.extraBenefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Estimated Yearly Rewards */}
              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Yearly staking reward:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    +{Math.round(tier.minStake * (stakingAPY / 100)).toLocaleString()} $GUD
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
        <div className="flex gap-3">
          <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <p className="font-medium">How staking works</p>
            <ul className="mt-1 space-y-1 opacity-80">
              <li>• Users stake $GUD tokens in our smart contract</li>
              <li>• Staking boosts stack with loyalty tier benefits</li>
              <li>• NFT holders get additional multipliers on top</li>
              <li>• Unstaking has a 7-day cooldown period</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
