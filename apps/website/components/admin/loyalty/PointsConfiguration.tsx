'use client';

import { useState } from 'react';

export interface PointsAction {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  isOneTime: boolean;
  cooldown?: number; // hours between earning
  isActive: boolean;
  category: 'engagement' | 'social' | 'referral' | 'purchase' | 'web3';
}

const defaultActions: PointsAction[] = [
  // Engagement
  { id: 'checkin', name: 'Check-in', description: 'Scan QR at venue', icon: '📍', points: 10, isOneTime: false, cooldown: 4, isActive: true, category: 'engagement' },
  { id: 'order', name: 'Order Placed', description: 'Per €1 spent', icon: '🧾', points: 1, isOneTime: false, isActive: true, category: 'purchase' },
  { id: 'first_visit', name: 'First Visit', description: 'New venue explored', icon: '🆕', points: 20, isOneTime: false, isActive: true, category: 'engagement' },
  { id: 'review', name: 'Verified Review', description: 'After ordering', icon: '⭐', points: 25, isOneTime: false, isActive: true, category: 'engagement' },
  { id: 'photo_review', name: 'Photo Review', description: 'Review with photo', icon: '📸', points: 40, isOneTime: false, isActive: true, category: 'engagement' },

  // Profile & Social
  { id: 'complete_profile', name: 'Complete Profile', description: '5 Dimensions setup', icon: '✅', points: 50, isOneTime: true, isActive: true, category: 'social' },
  { id: 'connect_social', name: 'Connect Social', description: 'Per social account', icon: '🔗', points: 15, isOneTime: false, isActive: true, category: 'social' },
  { id: 'share_review', name: 'Share Review', description: 'Share on social media', icon: '📤', points: 10, isOneTime: false, isActive: true, category: 'social' },

  // Referral
  { id: 'referral_user', name: 'Refer User', description: 'New user signs up', icon: '👥', points: 100, isOneTime: false, isActive: true, category: 'referral' },
  { id: 'referral_business', name: 'Refer Business', description: 'Business activates', icon: '🏪', points: 500, isOneTime: false, isActive: true, category: 'referral' },

  // Web3
  { id: 'connect_wallet', name: 'Connect Wallet', description: 'Link crypto wallet', icon: '💎', points: 100, isOneTime: true, isActive: true, category: 'web3' },
  { id: 'first_stake', name: 'First Stake', description: 'Stake $GUD tokens', icon: '🔒', points: 200, isOneTime: true, isActive: true, category: 'web3' },
  { id: 'nft_holder', name: 'Genesis NFT', description: 'Own Genesis Pass', icon: '🎫', points: 1000, isOneTime: true, isActive: true, category: 'web3' },
];

interface PointsConfigurationProps {
  actions?: PointsAction[];
  onUpdate?: (actions: PointsAction[]) => void;
}

export function PointsConfiguration({ actions: initialActions, onUpdate }: PointsConfigurationProps) {
  const [actions, setActions] = useState<PointsAction[]>(initialActions || defaultActions);
  const [hasChanges, setHasChanges] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All', icon: '📋' },
    { id: 'engagement', label: 'Engagement', icon: '🎯' },
    { id: 'purchase', label: 'Purchase', icon: '💳' },
    { id: 'social', label: 'Social', icon: '📱' },
    { id: 'referral', label: 'Referral', icon: '👥' },
    { id: 'web3', label: 'Web3', icon: '💎' },
  ];

  const filteredActions = filter === 'all'
    ? actions
    : actions.filter(a => a.category === filter);

  const handleActionUpdate = (actionId: string, updates: Partial<PointsAction>) => {
    setActions(prev => prev.map(a => a.id === actionId ? { ...a, ...updates } : a));
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdate?.(actions);
    setHasChanges(false);
  };

  const totalActiveActions = actions.filter(a => a.isActive).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Points Actions</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {totalActiveActions} active actions
          </p>
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

      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === cat.id
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Actions Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Action</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Points</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Cooldown</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Active</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredActions.map((action) => (
              <tr key={action.id} className={`${!action.isActive ? 'opacity-50' : ''} hover:bg-gray-50 dark:hover:bg-gray-700/50`}>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{action.icon}</span>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{action.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{action.description}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <input
                    type="number"
                    value={action.points}
                    onChange={(e) => handleActionUpdate(action.id, { points: parseInt(e.target.value) || 0 })}
                    className="w-20 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    action.isOneTime
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  }`}>
                    {action.isOneTime ? 'One-time' : 'Repeatable'}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  {!action.isOneTime && (
                    <div className="flex items-center justify-center gap-1">
                      <input
                        type="number"
                        value={action.cooldown || 0}
                        onChange={(e) => handleActionUpdate(action.id, { cooldown: parseInt(e.target.value) || 0 })}
                        className="w-16 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                      />
                      <span className="text-xs text-gray-500 dark:text-gray-400">hrs</span>
                    </div>
                  )}
                  {action.isOneTime && (
                    <span className="text-gray-400 dark:text-gray-500">-</span>
                  )}
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    onClick={() => handleActionUpdate(action.id, { isActive: !action.isActive })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${
                      action.isActive ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                        action.isActive ? 'left-7' : 'left-1'
                      }`}
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Card */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white">
        <h3 className="font-bold text-lg mb-3">Points Economy Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-purple-100 text-sm">One-time Earnable</p>
            <p className="text-2xl font-bold">
              {actions.filter(a => a.isOneTime && a.isActive).reduce((sum, a) => sum + a.points, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-purple-100 text-sm">Max Daily (est.)</p>
            <p className="text-2xl font-bold">
              {actions.filter(a => !a.isOneTime && a.isActive).reduce((sum, a) => sum + a.points * 2, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-purple-100 text-sm">Referral Value</p>
            <p className="text-2xl font-bold">
              {actions.filter(a => a.category === 'referral' && a.isActive).reduce((sum, a) => sum + a.points, 0).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-purple-100 text-sm">Web3 Bonus</p>
            <p className="text-2xl font-bold">
              {actions.filter(a => a.category === 'web3' && a.isActive).reduce((sum, a) => sum + a.points, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
