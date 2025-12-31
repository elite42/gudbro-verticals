'use client';

import { useState } from 'react';

export interface Reward {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'discount' | 'product' | 'experience' | 'subscription' | 'nft';
  pointsCost: number;
  value?: number; // € value if applicable
  stock?: number; // null = unlimited
  tierRequired?: string; // minimum tier to redeem
  isActive: boolean;
}

const defaultRewards: Reward[] = [
  // Discounts
  { id: 'discount_1', name: '€1 Store Credit', description: 'Use on any purchase', icon: '💵', type: 'discount', pointsCost: 100, value: 1, isActive: true },
  { id: 'discount_5', name: '€5 Store Credit', description: 'Use on any purchase', icon: '💵', type: 'discount', pointsCost: 450, value: 5, isActive: true },
  { id: 'discount_10', name: '€10 Store Credit', description: 'Use on any purchase', icon: '💵', type: 'discount', pointsCost: 850, value: 10, isActive: true },

  // Products
  { id: 'tshirt', name: 'GUDBRO T-Shirt', description: 'Exclusive merch', icon: '👕', type: 'product', pointsCost: 500, stock: 100, isActive: true },
  { id: 'mug', name: 'GUDBRO Mug', description: 'Ceramic coffee mug', icon: '☕', type: 'product', pointsCost: 300, stock: 200, isActive: true },
  { id: 'tote', name: 'GUDBRO Tote Bag', description: 'Eco-friendly bag', icon: '👜', type: 'product', pointsCost: 400, stock: 150, isActive: true },

  // Experiences
  { id: 'cooking_class', name: 'Online Cooking Class', description: '1-hour session with chef', icon: '👨‍🍳', type: 'experience', pointsCost: 2000, stock: 50, tierRequired: 'explorer', isActive: true },
  { id: 'vip_dinner', name: 'VIP Dinner Event', description: 'Exclusive tasting dinner', icon: '🍷', type: 'experience', pointsCost: 5000, stock: 20, tierRequired: 'connoisseur', isActive: true },

  // Subscription
  { id: 'premium_1m', name: '1 Month Premium', description: 'Premium subscription', icon: '⭐', type: 'subscription', pointsCost: 1000, isActive: true },
  { id: 'premium_3m', name: '3 Months Premium', description: 'Premium subscription', icon: '⭐', type: 'subscription', pointsCost: 2500, isActive: true },
  { id: 'premium_12m', name: '1 Year Premium', description: 'Premium subscription', icon: '⭐', type: 'subscription', pointsCost: 8000, isActive: true },

  // NFT
  { id: 'nft_whitelist', name: 'Genesis Pass Whitelist', description: 'Priority mint access', icon: '💎', type: 'nft', pointsCost: 5000, stock: 500, tierRequired: 'ambassador', isActive: true },
];

interface RewardsConfigurationProps {
  rewards?: Reward[];
  onUpdate?: (rewards: Reward[]) => void;
}

export function RewardsConfiguration({ rewards: initialRewards, onUpdate }: RewardsConfigurationProps) {
  const [rewards, setRewards] = useState<Reward[]>(initialRewards || defaultRewards);
  const [hasChanges, setHasChanges] = useState(false);
  const [editingReward, setEditingReward] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const types = [
    { id: 'all', label: 'All', icon: '📋' },
    { id: 'discount', label: 'Discounts', icon: '💵' },
    { id: 'product', label: 'Products', icon: '🎁' },
    { id: 'experience', label: 'Experiences', icon: '🎭' },
    { id: 'subscription', label: 'Subscription', icon: '⭐' },
    { id: 'nft', label: 'NFT', icon: '💎' },
  ];

  const filteredRewards = filter === 'all'
    ? rewards
    : rewards.filter(r => r.type === filter);

  const handleRewardUpdate = (rewardId: string, updates: Partial<Reward>) => {
    setRewards(prev => prev.map(r => r.id === rewardId ? { ...r, ...updates } : r));
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate?.(rewards);
    setHasChanges(false);
  };

  const addNewReward = () => {
    const newReward: Reward = {
      id: `reward_${Date.now()}`,
      name: 'New Reward',
      description: 'Description here',
      icon: '🎁',
      type: 'product',
      pointsCost: 100,
      isActive: false,
    };
    setRewards(prev => [...prev, newReward]);
    setEditingReward(newReward.id);
    setHasChanges(true);
  };

  const deleteReward = (rewardId: string) => {
    setRewards(prev => prev.filter(r => r.id !== rewardId));
    setEditingReward(null);
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Rewards Catalog</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {rewards.filter(r => r.isActive).length} active rewards
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={addNewReward}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            + Add Reward
          </button>
          {hasChanges && (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>

      {/* Type Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => setFilter(type.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === type.id
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span>{type.icon}</span>
            <span>{type.label}</span>
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRewards.map((reward) => (
          <div
            key={reward.id}
            className={`bg-white dark:bg-gray-800 rounded-xl border-2 overflow-hidden transition-all ${
              reward.isActive
                ? 'border-gray-200 dark:border-gray-700'
                : 'border-dashed border-gray-300 dark:border-gray-600 opacity-60'
            } ${editingReward === reward.id ? 'ring-2 ring-blue-500' : ''}`}
          >
            {/* Card Header */}
            <div
              className="p-4 cursor-pointer"
              onClick={() => setEditingReward(editingReward === reward.id ? null : reward.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{reward.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{reward.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{reward.description}</p>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                  {reward.pointsCost.toLocaleString()} pts
                </span>
                {reward.stock !== undefined && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {reward.stock} left
                  </span>
                )}
              </div>
            </div>

            {/* Edit Panel */}
            {editingReward === reward.id && (
              <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Name</label>
                    <input
                      type="text"
                      value={reward.name}
                      onChange={(e) => handleRewardUpdate(reward.id, { name: e.target.value })}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Icon</label>
                    <input
                      type="text"
                      value={reward.icon}
                      onChange={(e) => handleRewardUpdate(reward.id, { icon: e.target.value })}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Description</label>
                  <input
                    type="text"
                    value={reward.description}
                    onChange={(e) => handleRewardUpdate(reward.id, { description: e.target.value })}
                    className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Points Cost</label>
                    <input
                      type="number"
                      value={reward.pointsCost}
                      onChange={(e) => handleRewardUpdate(reward.id, { pointsCost: parseInt(e.target.value) || 0 })}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Stock (blank = unlimited)</label>
                    <input
                      type="number"
                      value={reward.stock ?? ''}
                      onChange={(e) => handleRewardUpdate(reward.id, { stock: e.target.value ? parseInt(e.target.value) : undefined })}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="∞"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Type</label>
                    <select
                      value={reward.type}
                      onChange={(e) => handleRewardUpdate(reward.id, { type: e.target.value as Reward['type'] })}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="discount">Discount</option>
                      <option value="product">Product</option>
                      <option value="experience">Experience</option>
                      <option value="subscription">Subscription</option>
                      <option value="nft">NFT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Min. Tier</label>
                    <select
                      value={reward.tierRequired ?? ''}
                      onChange={(e) => handleRewardUpdate(reward.id, { tierRequired: e.target.value || undefined })}
                      className="w-full px-2 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    >
                      <option value="">Any tier</option>
                      <option value="explorer">Explorer+</option>
                      <option value="connoisseur">Connoisseur+</option>
                      <option value="ambassador">Ambassador+</option>
                      <option value="genesis">Genesis+</option>
                      <option value="diamond">Diamond only</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={reward.isActive}
                      onChange={() => handleRewardUpdate(reward.id, { isActive: !reward.isActive })}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Active</span>
                  </label>
                  <button
                    onClick={() => deleteReward(reward.id)}
                    className="text-sm text-red-600 dark:text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
