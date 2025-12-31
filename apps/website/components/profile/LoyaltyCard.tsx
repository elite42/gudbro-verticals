'use client';

import { useState } from 'react';
import Link from 'next/link';

interface UserLoyaltyData {
  points: number;
  lifetimePoints: number;
  tier: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
  nextTier?: {
    name: string;
    pointsRequired: number;
  };
  multiplier: number;
  cashbackPercent: number;
  storeDiscount: number;
  hasNFT: boolean;
  stakedAmount: number;
  referralCount: number;
  referralEarnings: number;
}

interface RecentActivity {
  id: string;
  type: 'earned' | 'redeemed';
  description: string;
  points: number;
  date: string;
}

interface AvailableReward {
  id: string;
  name: string;
  icon: string;
  pointsCost: number;
  type: string;
}

interface LoyaltyCardProps {
  userData?: UserLoyaltyData;
  recentActivity?: RecentActivity[];
  availableRewards?: AvailableReward[];
}

const mockUserData: UserLoyaltyData = {
  points: 1250,
  lifetimePoints: 3400,
  tier: {
    id: 'explorer',
    name: 'Explorer',
    icon: '🧭',
    color: 'from-green-500 to-emerald-600',
  },
  nextTier: {
    name: 'Connoisseur',
    pointsRequired: 2000,
  },
  multiplier: 1.2,
  cashbackPercent: 2,
  storeDiscount: 5,
  hasNFT: false,
  stakedAmount: 0,
  referralCount: 3,
  referralEarnings: 300,
};

const mockActivity: RecentActivity[] = [
  { id: '1', type: 'earned', description: 'Check-in at Caffè Rossi', points: 10, date: '2 hours ago' },
  { id: '2', type: 'earned', description: 'Order completed (€25)', points: 25, date: 'Yesterday' },
  { id: '3', type: 'redeemed', description: '€5 Store Credit', points: -450, date: '3 days ago' },
  { id: '4', type: 'earned', description: 'Verified review', points: 25, date: '1 week ago' },
  { id: '5', type: 'earned', description: 'Referral bonus', points: 100, date: '2 weeks ago' },
];

const mockRewards: AvailableReward[] = [
  { id: '1', name: '€1 Credit', icon: '💵', pointsCost: 100, type: 'discount' },
  { id: '2', name: 'GUDBRO Mug', icon: '☕', pointsCost: 300, type: 'product' },
  { id: '3', name: '€5 Credit', icon: '💵', pointsCost: 450, type: 'discount' },
  { id: '4', name: 'T-Shirt', icon: '👕', pointsCost: 500, type: 'product' },
];

export function LoyaltyCard({
  userData = mockUserData,
  recentActivity = mockActivity,
  availableRewards = mockRewards,
}: LoyaltyCardProps) {
  const [activeSection, setActiveSection] = useState<'overview' | 'activity' | 'rewards' | 'referral'>('overview');

  const progressToNextTier = userData.nextTier
    ? Math.min((userData.lifetimePoints / userData.nextTier.pointsRequired) * 100, 100)
    : 100;

  const pointsToNext = userData.nextTier
    ? userData.nextTier.pointsRequired - userData.lifetimePoints
    : 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
      {/* Tier Card Header */}
      <div className={`bg-gradient-to-r ${userData.tier.color} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl">
              {userData.tier.icon}
            </div>
            <div>
              <p className="text-white/80 text-sm">Current Tier</p>
              <h2 className="text-2xl font-bold">{userData.tier.name}</h2>
              {userData.hasNFT && (
                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                  💎 Genesis Holder
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-white/80 text-sm">Available Points</p>
            <p className="text-3xl font-bold">{userData.points.toLocaleString()}</p>
          </div>
        </div>

        {/* Progress to next tier */}
        {userData.nextTier && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-white/80 mb-1">
              <span>Progress to {userData.nextTier.name}</span>
              <span>{pointsToNext.toLocaleString()} pts to go</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${progressToNextTier}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Benefits Summary */}
      <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700 bg-gray-50 dark:bg-gray-800">
        <div className="p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData.multiplier}x</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Points Boost</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData.cashbackPercent}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Cashback</p>
        </div>
        <div className="p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{userData.storeDiscount}%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Store Discount</p>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'activity', label: 'Activity', icon: '📜' },
          { id: 'rewards', label: 'Rewards', icon: '🎁' },
          { id: 'referral', label: 'Referral', icon: '👥' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as typeof activeSection)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              activeSection === tab.id
                ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Section Content */}
      <div className="p-6">
        {/* Overview */}
        {activeSection === 'overview' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Lifetime Points</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{userData.lifetimePoints.toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Referrals</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{userData.referralCount}</p>
              </div>
            </div>

            {/* Boost opportunities */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Boost Your Rewards</h4>

              {!userData.hasNFT && (
                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">💎</span>
                    <div>
                      <p className="font-medium text-purple-700 dark:text-purple-300">Get Genesis Pass</p>
                      <p className="text-xs text-purple-600 dark:text-purple-400">Unlock 3x points + 15% cashback</p>
                    </div>
                  </div>
                  <Link href="/nft" className="px-3 py-1.5 bg-purple-600 text-white text-sm font-medium rounded-lg">
                    Learn More
                  </Link>
                </div>
              )}

              {userData.stakedAmount === 0 && (
                <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🪙</span>
                    <div>
                      <p className="font-medium text-amber-700 dark:text-amber-300">Stake $GUD Tokens</p>
                      <p className="text-xs text-amber-600 dark:text-amber-400">Earn up to +2x points boost</p>
                    </div>
                  </div>
                  <Link href="/account/settings" className="px-3 py-1.5 bg-amber-600 text-white text-sm font-medium rounded-lg">
                    Stake Now
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Activity */}
        {activeSection === 'activity' && (
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-800 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.type === 'earned'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                  }`}>
                    {activity.type === 'earned' ? '+' : '-'}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{activity.description}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.date}</p>
                  </div>
                </div>
                <span className={`font-bold ${
                  activity.type === 'earned'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {activity.points > 0 ? '+' : ''}{activity.points}
                </span>
              </div>
            ))}
            <button className="w-full py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
              View All Activity
            </button>
          </div>
        )}

        {/* Rewards */}
        {activeSection === 'rewards' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You have <span className="font-bold text-gray-900 dark:text-white">{userData.points.toLocaleString()}</span> points to spend
            </p>
            <div className="grid grid-cols-2 gap-3">
              {availableRewards.map((reward) => {
                const canAfford = userData.points >= reward.pointsCost;
                return (
                  <button
                    key={reward.id}
                    disabled={!canAfford}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      canAfford
                        ? 'border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-md'
                        : 'border-gray-100 dark:border-gray-800 opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <span className="text-2xl block mb-2">{reward.icon}</span>
                    <p className="font-medium text-gray-900 dark:text-white">{reward.name}</p>
                    <p className="text-sm text-purple-600 dark:text-purple-400">{reward.pointsCost} pts</p>
                  </button>
                );
              })}
            </div>
            <Link
              href="/rewards"
              className="block w-full py-3 text-center bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              View All Rewards
            </Link>
          </div>
        )}

        {/* Referral */}
        {activeSection === 'referral' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-5 text-white">
              <h4 className="font-bold text-lg mb-2">Invite Friends & Earn</h4>
              <p className="text-blue-100 text-sm mb-4">
                Get 100 points for each friend who signs up, 500 for each business!
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value="gudbro.com/r/john123"
                  className="flex-1 px-3 py-2 bg-white/20 rounded-lg text-white placeholder-white/50 text-sm"
                />
                <button className="px-4 py-2 bg-white text-purple-600 font-medium rounded-lg text-sm">
                  Copy
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{userData.referralCount}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Friends Invited</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">+{userData.referralEarnings}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Points Earned</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button className="flex-1 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl">
                Share on WhatsApp
              </button>
              <button className="flex-1 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl">
                Share Link
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
