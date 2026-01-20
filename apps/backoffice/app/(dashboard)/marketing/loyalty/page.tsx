'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

// Types for Loyalty Configuration
type LoyaltyTierId = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

interface LoyaltyTier {
  id: LoyaltyTierId;
  name: string;
  icon: string;
  minPoints: number;
  pointsMultiplier: number;
  color: string;
}

interface PointsAction {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'purchase' | 'engagement' | 'social' | 'referral';
  points: number;
  pointsPerUnit?: number;
  maxPerDay?: number;
  enabled: boolean;
}

interface Reward {
  id: string;
  name: string;
  description: string;
  icon: string;
  pointsCost: number;
  type: 'free_item' | 'discount_percent' | 'discount_fixed' | 'experience';
  value?: number;
  minTier?: LoyaltyTierId;
  enabled: boolean;
  usesRemaining?: number;
}

interface ShareTemplate {
  id: string;
  name: string;
  icon: string;
  messageTemplate: string;
  hashtags: string[];
  pointsReward: number;
  enabled: boolean;
}

// Mock data
const mockTiers: LoyaltyTier[] = [
  { id: 'bronze', name: 'Bronzo', icon: '🥉', minPoints: 0, pointsMultiplier: 1.0, color: 'amber' },
  {
    id: 'silver',
    name: 'Argento',
    icon: '🥈',
    minPoints: 500,
    pointsMultiplier: 1.1,
    color: 'gray',
  },
  { id: 'gold', name: 'Oro', icon: '🥇', minPoints: 2000, pointsMultiplier: 1.2, color: 'yellow' },
  {
    id: 'platinum',
    name: 'Platino',
    icon: '💎',
    minPoints: 5000,
    pointsMultiplier: 1.3,
    color: 'cyan',
  },
  {
    id: 'diamond',
    name: 'Diamante',
    icon: '💠',
    minPoints: 10000,
    pointsMultiplier: 1.5,
    color: 'purple',
  },
];

const mockActions: PointsAction[] = [
  {
    id: 'purchase',
    name: 'Acquisto',
    description: 'Punti per ogni euro speso',
    icon: '🛒',
    category: 'purchase',
    points: 0,
    pointsPerUnit: 1,
    enabled: true,
  },
  {
    id: 'first_purchase',
    name: 'Primo Acquisto',
    description: 'Bonus benvenuto',
    icon: '🎉',
    category: 'purchase',
    points: 50,
    enabled: true,
  },
  {
    id: 'checkin',
    name: 'Check-in',
    description: 'Check-in al locale',
    icon: '📍',
    category: 'engagement',
    points: 10,
    maxPerDay: 10,
    enabled: true,
  },
  {
    id: 'follow',
    name: 'Seguici',
    description: 'Segui il profilo',
    icon: '❤️',
    category: 'engagement',
    points: 25,
    enabled: true,
  },
  {
    id: 'birthday',
    name: 'Compleanno',
    description: 'Bonus compleanno',
    icon: '🎂',
    category: 'engagement',
    points: 100,
    enabled: true,
  },
  {
    id: 'share_intent',
    name: 'Condivisione',
    description: 'Condividi sui social',
    icon: '📤',
    category: 'social',
    points: 15,
    maxPerDay: 30,
    enabled: true,
  },
  {
    id: 'share_verified',
    name: 'Post Verificato',
    description: 'Post con hashtag verificato',
    icon: '✅',
    category: 'social',
    points: 50,
    maxPerDay: 50,
    enabled: true,
  },
  {
    id: 'photo_upload',
    name: 'Carica Foto',
    description: 'Condividi una foto',
    icon: '📸',
    category: 'social',
    points: 25,
    maxPerDay: 50,
    enabled: true,
  },
  {
    id: 'review_google',
    name: 'Recensione Google',
    description: 'Lascia una recensione',
    icon: '⭐',
    category: 'social',
    points: 100,
    enabled: true,
  },
  {
    id: 'referral_signup',
    name: 'Amico Iscritto',
    description: 'Amico si iscrive',
    icon: '👥',
    category: 'referral',
    points: 100,
    enabled: true,
  },
  {
    id: 'referral_purchase',
    name: 'Acquisto Amico',
    description: 'Amico fa primo acquisto',
    icon: '🎁',
    category: 'referral',
    points: 200,
    enabled: true,
  },
];

const mockRewards: Reward[] = [
  {
    id: '1',
    name: 'Caffè Gratis',
    description: 'Un caffè espresso omaggio',
    icon: '☕',
    pointsCost: 100,
    type: 'free_item',
    enabled: true,
  },
  {
    id: '2',
    name: 'Dolce Gratis',
    description: 'Un dolce a scelta',
    icon: '🍰',
    pointsCost: 250,
    type: 'free_item',
    enabled: true,
  },
  {
    id: '3',
    name: 'Sconto 10%',
    description: '10% di sconto sul conto',
    icon: '🏷️',
    pointsCost: 500,
    type: 'discount_percent',
    value: 10,
    enabled: true,
  },
  {
    id: '4',
    name: 'Bottiglia di Vino',
    description: 'Una bottiglia della casa',
    icon: '🍷',
    pointsCost: 1000,
    type: 'free_item',
    minTier: 'gold',
    enabled: true,
  },
  {
    id: '5',
    name: 'Cena per Due',
    description: 'Cena completa per 2 persone',
    icon: '🍽️',
    pointsCost: 3000,
    type: 'experience',
    minTier: 'platinum',
    enabled: true,
    usesRemaining: 5,
  },
];

const mockShareTemplates: ShareTemplate[] = [
  {
    id: 'dish',
    name: 'Condividi Piatto',
    icon: '🍽️',
    messageTemplate: 'Sto gustando questo fantastico {dish} da {merchant}! 😋',
    hashtags: ['FoodPorn', 'Foodie'],
    pointsReward: 25,
    enabled: true,
  },
  {
    id: 'drink',
    name: 'Condividi Drink',
    icon: '🍹',
    messageTemplate: 'Cin cin! 🥂 Un {dish} da {merchant}',
    hashtags: ['Cocktails', 'Cheers'],
    pointsReward: 25,
    enabled: true,
  },
  {
    id: 'selfie',
    name: 'Selfie',
    icon: '🤳',
    messageTemplate: 'Atmosfera fantastica da {merchant}! 📍',
    hashtags: ['Vibes', 'GoodTimes'],
    pointsReward: 20,
    enabled: true,
  },
  {
    id: 'story',
    name: 'Storia',
    icon: '📱',
    messageTemplate: '',
    hashtags: [],
    pointsReward: 30,
    enabled: true,
  },
];

// Stats mock
const mockStats = {
  totalMembers: 1247,
  activeThisMonth: 389,
  pointsIssued: 45600,
  pointsRedeemed: 23400,
  rewardsRedeemed: 156,
  topTier: { bronze: 850, silver: 280, gold: 95, platinum: 18, diamond: 4 },
  socialShares: 234,
  referrals: 67,
};

type TabId = 'overview' | 'tiers' | 'actions' | 'rewards' | 'social';

export default function LoyaltyPage() {
  const t = useTranslations('loyalty');
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [tiers, setTiers] = useState(mockTiers);
  const [actions, setActions] = useState(mockActions);
  const [rewards, setRewards] = useState(mockRewards);
  const [shareTemplates, setShareTemplates] = useState(mockShareTemplates);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);

  // Settings state
  const [settings, setSettings] = useState({
    enabled: true,
    programName: 'Club Fedeltà',
    pointsPerEuro: 1,
    pointsExpireMonths: 12,
    referralEnabled: true,
    socialEnabled: true,
    merchantHashtags: ['CaffeRossi', 'IlMioLocale'],
    merchantInstagram: 'cafferossi',
    merchantFacebook: 'cafferossi',
  });

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'overview', label: t('tabs.overview'), icon: '📊' },
    { id: 'tiers', label: t('tabs.tiers'), icon: '🏆' },
    { id: 'actions', label: t('tabs.actions'), icon: '⭐' },
    { id: 'rewards', label: t('tabs.rewards'), icon: '🎁' },
    { id: 'social', label: t('tabs.social'), icon: '📱' },
  ];

  const toggleAction = (actionId: string) => {
    setActions((prev) => prev.map((a) => (a.id === actionId ? { ...a, enabled: !a.enabled } : a)));
  };

  const updateActionPoints = (actionId: string, points: number) => {
    setActions((prev) => prev.map((a) => (a.id === actionId ? { ...a, points } : a)));
  };

  const toggleReward = (rewardId: string) => {
    setRewards((prev) => prev.map((r) => (r.id === rewardId ? { ...r, enabled: !r.enabled } : r)));
  };

  const toggleShareTemplate = (templateId: string) => {
    setShareTemplates((prev) =>
      prev.map((t) => (t.id === templateId ? { ...t, enabled: !t.enabled } : t))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/marketing"
                className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <svg
                  className="h-5 w-5 text-gray-600 dark:text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('title')}</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">{t('description')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">{t('active')}</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings.enabled}
                    onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
                    className="sr-only"
                  />
                  <div
                    className={`h-6 w-11 rounded-full transition-colors ${settings.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <div
                      className={`h-5 w-5 transform rounded-full bg-white shadow transition-transform ${settings.enabled ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}
                    />
                  </div>
                </div>
              </label>
              <button className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800">
                {t('saveChanges')}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 overflow-x-auto px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('overview.totalMembers')}
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                  {mockStats.totalMembers.toLocaleString()}
                </p>
                <p className="mt-2 text-xs text-green-500">+12% {t('overview.thisMonth')}</p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('overview.activeThisMonth')}
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                  {mockStats.activeThisMonth}
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  {Math.round((mockStats.activeThisMonth / mockStats.totalMembers) * 100)}%{' '}
                  {t('overview.ofTotal')}
                </p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('overview.pointsIssued')}
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                  {mockStats.pointsIssued.toLocaleString()}
                </p>
                <p className="mt-2 text-xs text-gray-500">{t('overview.thisMonth')}</p>
              </div>
              <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {t('overview.rewardsRedeemed')}
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">
                  {mockStats.rewardsRedeemed}
                </p>
                <p className="mt-2 text-xs text-gray-500">
                  {mockStats.pointsRedeemed.toLocaleString()} {t('overview.pointsUsed')}
                </p>
              </div>
            </div>

            {/* Tier Distribution */}
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                {t('overview.tierDistribution')}
              </h3>
              <div className="space-y-3">
                {tiers.map((tier) => {
                  const count = mockStats.topTier[tier.id] || 0;
                  const percent = Math.round((count / mockStats.totalMembers) * 100);
                  return (
                    <div key={tier.id} className="flex items-center gap-4">
                      <div className="flex w-24 items-center gap-2">
                        <span className="text-xl">{tier.icon}</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {tier.name}
                        </span>
                      </div>
                      <div className="h-4 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                        <div
                          className={`h-full bg-${tier.color}-500 rounded-full`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="w-20 text-right">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">
                          {count}
                        </span>
                        <span className="ml-1 text-xs text-gray-500">({percent}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social & Referral Stats */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {t('overview.socialShares')}
                  </h3>
                  <span className="text-2xl">📱</span>
                </div>
                <p className="text-4xl font-bold text-purple-500">{mockStats.socialShares}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {t('overview.thisMonth')}
                </p>
                <div className="mt-4 flex gap-2">
                  <span className="rounded bg-pink-100 px-2 py-1 text-xs text-pink-700 dark:bg-pink-900/30 dark:text-pink-300">
                    Instagram: 156
                  </span>
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                    Facebook: 78
                  </span>
                </div>
              </div>
              <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    {t('overview.referrals')}
                  </h3>
                  <span className="text-2xl">👥</span>
                </div>
                <p className="text-4xl font-bold text-green-500">{mockStats.referrals}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {t('overview.newCustomersFromReferral')}
                </p>
                <div className="mt-4">
                  <span className="rounded bg-green-100 px-2 py-1 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-300">
                    {Math.round(mockStats.referrals * 200)} {t('overview.pointsAssigned')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tiers Tab */}
        {activeTab === 'tiers' && (
          <div className="space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                {t('tiers.title')}
              </h3>
              <div className="space-y-4">
                {tiers.map((tier, index) => (
                  <div
                    key={tier.id}
                    className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-700"
                  >
                    <div className="text-3xl">{tier.icon}</div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={tier.name}
                        onChange={(e) => {
                          const newTiers = [...tiers];
                          newTiers[index].name = e.target.value;
                          setTiers(newTiers);
                        }}
                        className="rounded border-none bg-transparent px-2 py-1 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-500">{t('tiers.from')}</label>
                      <input
                        type="number"
                        value={tier.minPoints}
                        onChange={(e) => {
                          const newTiers = [...tiers];
                          newTiers[index].minPoints = parseInt(e.target.value) || 0;
                          setTiers(newTiers);
                        }}
                        className="w-24 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      />
                      <label className="text-sm text-gray-500">{t('tiers.points')}</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-500">{t('tiers.bonus')}</label>
                      <select
                        value={tier.pointsMultiplier}
                        onChange={(e) => {
                          const newTiers = [...tiers];
                          newTiers[index].pointsMultiplier = parseFloat(e.target.value);
                          setTiers(newTiers);
                        }}
                        className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      >
                        <option value="1">{t('tiers.bonusOptions.none')}</option>
                        <option value="1.1">{t('tiers.bonusOptions.plus10')}</option>
                        <option value="1.2">{t('tiers.bonusOptions.plus20')}</option>
                        <option value="1.3">{t('tiers.bonusOptions.plus30')}</option>
                        <option value="1.5">{t('tiers.bonusOptions.plus50')}</option>
                        <option value="2">{t('tiers.bonusOptions.plus100')}</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Actions Tab */}
        {activeTab === 'actions' && (
          <div className="space-y-6">
            {/* Purchase Settings */}
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                {t('actions.purchaseSettings')}
              </h3>
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  {t('actions.pointsPerEuro')}
                </label>
                <input
                  type="number"
                  value={settings.pointsPerEuro}
                  onChange={(e) =>
                    setSettings({ ...settings, pointsPerEuro: parseInt(e.target.value) || 1 })
                  }
                  className="w-20 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
                <label className="text-sm text-gray-600 dark:text-gray-400">
                  {t('actions.euroSpent')}
                </label>
              </div>
            </div>

            {/* Actions List */}
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                {t('actions.rewardableActions')}
              </h3>
              <div className="space-y-3">
                {actions
                  .filter((a) => a.id !== 'purchase')
                  .map((action) => (
                    <div
                      key={action.id}
                      className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-700"
                    >
                      <label className="flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={action.enabled}
                          onChange={() => toggleAction(action.id)}
                          className="sr-only"
                        />
                        <div
                          className={`h-6 w-10 rounded-full transition-colors ${action.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                        >
                          <div
                            className={`h-5 w-5 transform rounded-full bg-white shadow transition-transform ${action.enabled ? 'translate-x-4' : 'translate-x-0.5'} mt-0.5`}
                          />
                        </div>
                      </label>
                      <div className="text-2xl">{action.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{action.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {action.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          value={action.points}
                          onChange={(e) =>
                            updateActionPoints(action.id, parseInt(e.target.value) || 0)
                          }
                          disabled={!action.enabled}
                          className="w-20 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                        />
                        <span className="text-sm text-gray-500">{t('tiers.points')}</span>
                      </div>
                      {action.maxPerDay && (
                        <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-400 dark:bg-gray-600">
                          {t('actions.maxPerDay', { count: action.maxPerDay })}
                        </span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {t('rewards.title')}
              </h3>
              <button
                onClick={() => {
                  setEditingReward(null);
                  setShowRewardModal(true);
                }}
                className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                {t('rewards.newReward')}
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {rewards.map((reward) => (
                <div
                  key={reward.id}
                  className={`rounded-xl border-2 bg-white p-5 shadow-sm dark:bg-gray-800 ${reward.enabled ? 'border-transparent' : 'border-gray-200 opacity-60 dark:border-gray-700'}`}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div className="text-4xl">{reward.icon}</div>
                    <label className="flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={reward.enabled}
                        onChange={() => toggleReward(reward.id)}
                        className="sr-only"
                      />
                      <div
                        className={`h-6 w-10 rounded-full transition-colors ${reward.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <div
                          className={`h-5 w-5 transform rounded-full bg-white shadow transition-transform ${reward.enabled ? 'translate-x-4' : 'translate-x-0.5'} mt-0.5`}
                        />
                      </div>
                    </label>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{reward.name}</h4>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {reward.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-purple-600">
                      {reward.pointsCost} pts
                    </span>
                    {reward.minTier && (
                      <span className="rounded bg-amber-100 px-2 py-1 text-xs text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                        {t('rewards.minTier', { tier: reward.minTier })}
                      </span>
                    )}
                  </div>
                  {reward.usesRemaining !== undefined && (
                    <p className="mt-2 text-xs text-gray-400">
                      {t('rewards.remaining', { count: reward.usesRemaining })}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Social Tab */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            {/* Social Settings */}
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                {t('social.configTitle')}
              </h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('social.venueHashtags')}
                  </label>
                  <input
                    type="text"
                    value={settings.merchantHashtags.join(', ')}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        merchantHashtags: e.target.value
                          .split(',')
                          .map((h) => h.trim())
                          .filter(Boolean),
                      })
                    }
                    placeholder="CaffeRossi, IlMioLocale"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('social.instagramProfile')}
                  </label>
                  <div className="flex">
                    <span className="rounded-l-lg border border-r-0 border-gray-300 bg-gray-100 px-3 py-2 text-gray-500 dark:border-gray-600 dark:bg-gray-700">
                      @
                    </span>
                    <input
                      type="text"
                      value={settings.merchantInstagram}
                      onChange={(e) =>
                        setSettings({ ...settings, merchantInstagram: e.target.value })
                      }
                      placeholder="cafferossi"
                      className="flex-1 rounded-r-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Share Templates */}
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                {t('social.shareTemplates')}
              </h3>
              <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                {t('social.shareTemplatesDesc')}
              </p>
              <div className="space-y-4">
                {shareTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="flex items-center gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-700"
                  >
                    <label className="flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={template.enabled}
                        onChange={() => toggleShareTemplate(template.id)}
                        className="sr-only"
                      />
                      <div
                        className={`h-6 w-10 rounded-full transition-colors ${template.enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                      >
                        <div
                          className={`h-5 w-5 transform rounded-full bg-white shadow transition-transform ${template.enabled ? 'translate-x-4' : 'translate-x-0.5'} mt-0.5`}
                        />
                      </div>
                    </label>
                    <div className="text-2xl">{template.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{template.name}</p>
                      <p className="text-sm italic text-gray-500 dark:text-gray-400">
                        &quot;{template.messageTemplate || t('social.tagMentionOnly')}&quot;
                      </p>
                      <div className="mt-1 flex gap-1">
                        {template.hashtags.map((h) => (
                          <span key={h} className="text-xs text-blue-500">
                            #{h}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-500">+{template.pointsReward}</p>
                      <p className="text-xs text-gray-500">{t('tiers.points')}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Card */}
            <div className="rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 p-6 text-white">
              <h3 className="mb-2 text-lg font-bold">{t('social.customerSharePreview')}</h3>
              <p className="mb-4 text-sm opacity-90">{t('social.previewDesc')}</p>
              <div className="rounded-xl bg-white/20 p-4 backdrop-blur">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/30 text-xl">
                    🍽️
                  </div>
                  <div>
                    <p className="font-medium">{t('social.shareTheDish')}</p>
                    <p className="text-xs opacity-75">+25 {t('tiers.points')}</p>
                  </div>
                </div>
                <p className="mb-2 text-sm">
                  &quot;Sto gustando questo fantastico [piatto] da{' '}
                  {settings.merchantInstagram ? `@${settings.merchantInstagram}` : 'Caffè Rossi'}!
                  😋&quot;
                </p>
                <div className="flex gap-1">
                  {settings.merchantHashtags.slice(0, 3).map((h) => (
                    <span key={h} className="text-xs opacity-75">
                      #{h}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
