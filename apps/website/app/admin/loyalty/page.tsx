'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  TierConfiguration,
  PointsConfiguration,
  RewardsConfiguration,
  StakingConfiguration,
} from '@/components/admin/loyalty';

type AdminTab = 'overview' | 'tiers' | 'points' | 'rewards' | 'staking' | 'business';

// Mock stats
const mockStats = {
  totalUsers: 12500,
  activeUsers: 8200,
  totalPointsIssued: 2850000,
  totalPointsRedeemed: 1200000,
  totalRedemptions: 3400,
  avgPointsPerUser: 228,
  nftHolders: 156,
  totalStaked: 450000,
};

export default function AdminLoyaltyPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  const tabs: { id: AdminTab; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'tiers', label: 'User Tiers', icon: '🏆' },
    { id: 'points', label: 'Points Actions', icon: '⭐' },
    { id: 'rewards', label: 'Rewards', icon: '🎁' },
    { id: 'staking', label: '$GUD Staking', icon: '🪙' },
    { id: 'business', label: 'Business Tiers', icon: '🏪' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <span className="font-bold text-gray-900 dark:text-white">GUDBRO</span>
              </Link>
              <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs font-medium rounded">
                ADMIN
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Loyalty Management</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{mockStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600 dark:text-green-400">+12% this month</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{mockStats.activeUsers.toLocaleString()}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{Math.round(mockStats.activeUsers / mockStats.totalUsers * 100)}% of total</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Points Issued</p>
                <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{(mockStats.totalPointsIssued / 1000000).toFixed(2)}M</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{(mockStats.totalPointsRedeemed / 1000000).toFixed(2)}M redeemed</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Avg Points/User</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{mockStats.avgPointsPerUser}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{mockStats.totalRedemptions.toLocaleString()} redemptions</p>
              </div>
            </div>

            {/* Web3 Stats */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Web3 Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-purple-200 text-sm">NFT Holders</p>
                  <p className="text-3xl font-bold">{mockStats.nftHolders}</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm">$GUD Staked</p>
                  <p className="text-3xl font-bold">{(mockStats.totalStaked / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm">Genesis Tier</p>
                  <p className="text-3xl font-bold">{mockStats.nftHolders}</p>
                </div>
                <div>
                  <p className="text-purple-200 text-sm">Diamond Tier</p>
                  <p className="text-3xl font-bold">23</p>
                </div>
              </div>
            </div>

            {/* Tier Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">User Tier Distribution</h3>
              <div className="space-y-3">
                {[
                  { tier: 'Foodie', count: 8500, percent: 68, color: 'bg-gray-400' },
                  { tier: 'Explorer', count: 2800, percent: 22, color: 'bg-green-500' },
                  { tier: 'Connoisseur', count: 850, percent: 7, color: 'bg-blue-500' },
                  { tier: 'Ambassador', count: 194, percent: 2, color: 'bg-purple-500' },
                  { tier: 'Genesis', count: 133, percent: 1, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
                  { tier: 'Diamond', count: 23, percent: 0.2, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
                ].map((item) => (
                  <div key={item.tier} className="flex items-center gap-4">
                    <div className="w-24 text-sm font-medium text-gray-700 dark:text-gray-300">{item.tier}</div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full`}
                          style={{ width: `${Math.max(item.percent, 1)}%` }}
                        />
                      </div>
                    </div>
                    <div className="w-20 text-right text-sm text-gray-600 dark:text-gray-400">
                      {item.count.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab('tiers')}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm text-left hover:shadow-md transition-shadow"
              >
                <span className="text-3xl mb-2 block">🏆</span>
                <h4 className="font-bold text-gray-900 dark:text-white">Configure Tiers</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Edit requirements and benefits</p>
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm text-left hover:shadow-md transition-shadow"
              >
                <span className="text-3xl mb-2 block">🎁</span>
                <h4 className="font-bold text-gray-900 dark:text-white">Manage Rewards</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Add or edit rewards catalog</p>
              </button>
              <button
                onClick={() => setActiveTab('staking')}
                className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm text-left hover:shadow-md transition-shadow"
              >
                <span className="text-3xl mb-2 block">🪙</span>
                <h4 className="font-bold text-gray-900 dark:text-white">$GUD Staking</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Configure staking tiers & APY</p>
              </button>
            </div>
          </div>
        )}

        {/* Tiers Tab */}
        {activeTab === 'tiers' && (
          <TierConfiguration onUpdate={(tiers) => console.log('Tiers updated:', tiers)} />
        )}

        {/* Points Tab */}
        {activeTab === 'points' && (
          <PointsConfiguration onUpdate={(actions) => console.log('Actions updated:', actions)} />
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
          <RewardsConfiguration onUpdate={(rewards) => console.log('Rewards updated:', rewards)} />
        )}

        {/* Staking Tab */}
        {activeTab === 'staking' && (
          <StakingConfiguration onUpdate={(tiers) => console.log('Staking tiers updated:', tiers)} />
        )}

        {/* Business Tiers Tab */}
        {activeTab === 'business' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Business Partner Tiers</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { name: 'Partner', fee: 'Standard', color: 'gray', benefits: ['Dashboard base', 'Email support'] },
                { name: 'Gold Partner', fee: '-10%', color: 'yellow', benefits: ['Analytics avanzati', 'Priority support', '6+ mesi attivo'] },
                { name: 'Platinum', fee: '-20%', color: 'purple', benefits: ['Featured placement', 'Dedicated manager', '50+ ordini/mese'] },
                { name: 'Genesis Business', fee: '-30%', color: 'gradient', benefits: ['White label', 'API priority', 'NFT Business Pass'] },
              ].map((tier) => (
                <div
                  key={tier.name}
                  className={`border-2 rounded-xl p-5 ${
                    tier.color === 'gradient'
                      ? 'border-purple-400 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20'
                      : tier.color === 'purple'
                      ? 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20'
                      : tier.color === 'yellow'
                      ? 'border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                      tier.fee === 'Standard'
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    }`}>
                      {tier.fee} fee
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                        <span className="text-green-500">✓</span> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Business tiers are managed in the Backoffice admin panel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
