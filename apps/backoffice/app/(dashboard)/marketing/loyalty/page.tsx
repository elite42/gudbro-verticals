'use client';

import { useState } from 'react';
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
  { id: 'silver', name: 'Argento', icon: '🥈', minPoints: 500, pointsMultiplier: 1.1, color: 'gray' },
  { id: 'gold', name: 'Oro', icon: '🥇', minPoints: 2000, pointsMultiplier: 1.2, color: 'yellow' },
  { id: 'platinum', name: 'Platino', icon: '💎', minPoints: 5000, pointsMultiplier: 1.3, color: 'cyan' },
  { id: 'diamond', name: 'Diamante', icon: '💠', minPoints: 10000, pointsMultiplier: 1.5, color: 'purple' },
];

const mockActions: PointsAction[] = [
  { id: 'purchase', name: 'Acquisto', description: 'Punti per ogni euro speso', icon: '🛒', category: 'purchase', points: 0, pointsPerUnit: 1, enabled: true },
  { id: 'first_purchase', name: 'Primo Acquisto', description: 'Bonus benvenuto', icon: '🎉', category: 'purchase', points: 50, enabled: true },
  { id: 'checkin', name: 'Check-in', description: 'Check-in al locale', icon: '📍', category: 'engagement', points: 10, maxPerDay: 10, enabled: true },
  { id: 'follow', name: 'Seguici', description: 'Segui il profilo', icon: '❤️', category: 'engagement', points: 25, enabled: true },
  { id: 'birthday', name: 'Compleanno', description: 'Bonus compleanno', icon: '🎂', category: 'engagement', points: 100, enabled: true },
  { id: 'share_intent', name: 'Condivisione', description: 'Condividi sui social', icon: '📤', category: 'social', points: 15, maxPerDay: 30, enabled: true },
  { id: 'share_verified', name: 'Post Verificato', description: 'Post con hashtag verificato', icon: '✅', category: 'social', points: 50, maxPerDay: 50, enabled: true },
  { id: 'photo_upload', name: 'Carica Foto', description: 'Condividi una foto', icon: '📸', category: 'social', points: 25, maxPerDay: 50, enabled: true },
  { id: 'review_google', name: 'Recensione Google', description: 'Lascia una recensione', icon: '⭐', category: 'social', points: 100, enabled: true },
  { id: 'referral_signup', name: 'Amico Iscritto', description: 'Amico si iscrive', icon: '👥', category: 'referral', points: 100, enabled: true },
  { id: 'referral_purchase', name: 'Acquisto Amico', description: 'Amico fa primo acquisto', icon: '🎁', category: 'referral', points: 200, enabled: true },
];

const mockRewards: Reward[] = [
  { id: '1', name: 'Caffè Gratis', description: 'Un caffè espresso omaggio', icon: '☕', pointsCost: 100, type: 'free_item', enabled: true },
  { id: '2', name: 'Dolce Gratis', description: 'Un dolce a scelta', icon: '🍰', pointsCost: 250, type: 'free_item', enabled: true },
  { id: '3', name: 'Sconto 10%', description: '10% di sconto sul conto', icon: '🏷️', pointsCost: 500, type: 'discount_percent', value: 10, enabled: true },
  { id: '4', name: 'Bottiglia di Vino', description: 'Una bottiglia della casa', icon: '🍷', pointsCost: 1000, type: 'free_item', minTier: 'gold', enabled: true },
  { id: '5', name: 'Cena per Due', description: 'Cena completa per 2 persone', icon: '🍽️', pointsCost: 3000, type: 'experience', minTier: 'platinum', enabled: true, usesRemaining: 5 },
];

const mockShareTemplates: ShareTemplate[] = [
  { id: 'dish', name: 'Condividi Piatto', icon: '🍽️', messageTemplate: 'Sto gustando questo fantastico {dish} da {merchant}! 😋', hashtags: ['FoodPorn', 'Foodie'], pointsReward: 25, enabled: true },
  { id: 'drink', name: 'Condividi Drink', icon: '🍹', messageTemplate: 'Cin cin! 🥂 Un {dish} da {merchant}', hashtags: ['Cocktails', 'Cheers'], pointsReward: 25, enabled: true },
  { id: 'selfie', name: 'Selfie', icon: '🤳', messageTemplate: 'Atmosfera fantastica da {merchant}! 📍', hashtags: ['Vibes', 'GoodTimes'], pointsReward: 20, enabled: true },
  { id: 'story', name: 'Storia', icon: '📱', messageTemplate: '', hashtags: [], pointsReward: 30, enabled: true },
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
    { id: 'overview', label: 'Panoramica', icon: '📊' },
    { id: 'tiers', label: 'Livelli', icon: '🏆' },
    { id: 'actions', label: 'Azioni', icon: '⭐' },
    { id: 'rewards', label: 'Premi', icon: '🎁' },
    { id: 'social', label: 'Social', icon: '📱' },
  ];

  const toggleAction = (actionId: string) => {
    setActions(prev => prev.map(a =>
      a.id === actionId ? { ...a, enabled: !a.enabled } : a
    ));
  };

  const updateActionPoints = (actionId: string, points: number) => {
    setActions(prev => prev.map(a =>
      a.id === actionId ? { ...a, points } : a
    ));
  };

  const toggleReward = (rewardId: string) => {
    setRewards(prev => prev.map(r =>
      r.id === rewardId ? { ...r, enabled: !r.enabled } : r
    ));
  };

  const toggleShareTemplate = (templateId: string) => {
    setShareTemplates(prev => prev.map(t =>
      t.id === templateId ? { ...t, enabled: !t.enabled } : t
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/marketing" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Programma Fedeltà</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Configura punti, livelli, premi e condivisione social</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="text-sm text-gray-600 dark:text-gray-400">Attivo</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings.enabled}
                    onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
                    className="sr-only"
                  />
                  <div className={`w-11 h-6 rounded-full transition-colors ${settings.enabled ? 'bg-green-500' : 'bg-gray-300'}`}>
                    <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${settings.enabled ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`} />
                  </div>
                </div>
              </label>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
                Salva Modifiche
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6 flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Membri Totali</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{mockStats.totalMembers.toLocaleString()}</p>
                <p className="text-xs text-green-500 mt-2">+12% questo mese</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Attivi Questo Mese</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{mockStats.activeThisMonth}</p>
                <p className="text-xs text-gray-500 mt-2">{Math.round(mockStats.activeThisMonth / mockStats.totalMembers * 100)}% del totale</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Punti Emessi</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{mockStats.pointsIssued.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-2">Questo mese</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm">
                <p className="text-sm text-gray-500 dark:text-gray-400">Premi Riscattati</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{mockStats.rewardsRedeemed}</p>
                <p className="text-xs text-gray-500 mt-2">{mockStats.pointsRedeemed.toLocaleString()} punti usati</p>
              </div>
            </div>

            {/* Tier Distribution */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Distribuzione Livelli</h3>
              <div className="space-y-3">
                {tiers.map(tier => {
                  const count = mockStats.topTier[tier.id] || 0;
                  const percent = Math.round(count / mockStats.totalMembers * 100);
                  return (
                    <div key={tier.id} className="flex items-center gap-4">
                      <div className="w-24 flex items-center gap-2">
                        <span className="text-xl">{tier.icon}</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tier.name}</span>
                      </div>
                      <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-${tier.color}-500 rounded-full`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                      <div className="w-20 text-right">
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{count}</span>
                        <span className="text-xs text-gray-500 ml-1">({percent}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Social & Referral Stats */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Condivisioni Social</h3>
                  <span className="text-2xl">📱</span>
                </div>
                <p className="text-4xl font-bold text-purple-500">{mockStats.socialShares}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Questo mese</p>
                <div className="mt-4 flex gap-2">
                  <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded text-xs">Instagram: 156</span>
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs">Facebook: 78</span>
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Referral</h3>
                  <span className="text-2xl">👥</span>
                </div>
                <p className="text-4xl font-bold text-green-500">{mockStats.referrals}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Nuovi clienti da referral</p>
                <div className="mt-4">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded text-xs">
                    {Math.round(mockStats.referrals * 200)} punti assegnati
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tiers Tab */}
        {activeTab === 'tiers' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Configura Livelli</h3>
              <div className="space-y-4">
                {tiers.map((tier, index) => (
                  <div key={tier.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
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
                        className="font-bold text-gray-900 dark:text-white bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-purple-500 rounded px-2 py-1"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-500">Da</label>
                      <input
                        type="number"
                        value={tier.minPoints}
                        onChange={(e) => {
                          const newTiers = [...tiers];
                          newTiers[index].minPoints = parseInt(e.target.value) || 0;
                          setTiers(newTiers);
                        }}
                        className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      />
                      <label className="text-sm text-gray-500">punti</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-500">Bonus</label>
                      <select
                        value={tier.pointsMultiplier}
                        onChange={(e) => {
                          const newTiers = [...tiers];
                          newTiers[index].pointsMultiplier = parseFloat(e.target.value);
                          setTiers(newTiers);
                        }}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="1">Nessuno</option>
                        <option value="1.1">+10%</option>
                        <option value="1.2">+20%</option>
                        <option value="1.3">+30%</option>
                        <option value="1.5">+50%</option>
                        <option value="2">+100%</option>
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
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Impostazioni Acquisti</h3>
              <div className="flex items-center gap-4">
                <label className="text-sm text-gray-600 dark:text-gray-400">Punti per ogni</label>
                <input
                  type="number"
                  value={settings.pointsPerEuro}
                  onChange={(e) => setSettings({ ...settings, pointsPerEuro: parseInt(e.target.value) || 1 })}
                  className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                />
                <label className="text-sm text-gray-600 dark:text-gray-400">euro speso</label>
              </div>
            </div>

            {/* Actions List */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Azioni Premiabili</h3>
              <div className="space-y-3">
                {actions.filter(a => a.id !== 'purchase').map(action => (
                  <div key={action.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={action.enabled}
                        onChange={() => toggleAction(action.id)}
                        className="sr-only"
                      />
                      <div className={`w-10 h-6 rounded-full transition-colors ${action.enabled ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${action.enabled ? 'translate-x-4' : 'translate-x-0.5'} mt-0.5`} />
                      </div>
                    </label>
                    <div className="text-2xl">{action.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{action.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{action.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={action.points}
                        onChange={(e) => updateActionPoints(action.id, parseInt(e.target.value) || 0)}
                        disabled={!action.enabled}
                        className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50"
                      />
                      <span className="text-sm text-gray-500">punti</span>
                    </div>
                    {action.maxPerDay && (
                      <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                        Max {action.maxPerDay}/giorno
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
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Premi Disponibili</h3>
              <button
                onClick={() => {
                  setEditingReward(null);
                  setShowRewardModal(true);
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Nuovo Premio
              </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map(reward => (
                <div key={reward.id} className={`bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border-2 ${reward.enabled ? 'border-transparent' : 'border-gray-200 dark:border-gray-700 opacity-60'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="text-4xl">{reward.icon}</div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={reward.enabled}
                        onChange={() => toggleReward(reward.id)}
                        className="sr-only"
                      />
                      <div className={`w-10 h-6 rounded-full transition-colors ${reward.enabled ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${reward.enabled ? 'translate-x-4' : 'translate-x-0.5'} mt-0.5`} />
                      </div>
                    </label>
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">{reward.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{reward.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-purple-600">{reward.pointsCost} pts</span>
                    {reward.minTier && (
                      <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded">
                        Min: {reward.minTier}
                      </span>
                    )}
                  </div>
                  {reward.usesRemaining !== undefined && (
                    <p className="text-xs text-gray-400 mt-2">
                      Rimanenti: {reward.usesRemaining}
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
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Configurazione Social</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Hashtag del Locale (separati da virgola)
                  </label>
                  <input
                    type="text"
                    value={settings.merchantHashtags.join(', ')}
                    onChange={(e) => setSettings({
                      ...settings,
                      merchantHashtags: e.target.value.split(',').map(h => h.trim()).filter(Boolean)
                    })}
                    placeholder="CaffeRossi, IlMioLocale"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Profilo Instagram
                  </label>
                  <div className="flex">
                    <span className="px-3 py-2 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-lg text-gray-500">@</span>
                    <input
                      type="text"
                      value={settings.merchantInstagram}
                      onChange={(e) => setSettings({ ...settings, merchantInstagram: e.target.value })}
                      placeholder="cafferossi"
                      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Share Templates */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Template di Condivisione</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Configura i messaggi pre-impostati che i clienti possono condividere facilmente sui social.
              </p>
              <div className="space-y-4">
                {shareTemplates.map(template => (
                  <div key={template.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={template.enabled}
                        onChange={() => toggleShareTemplate(template.id)}
                        className="sr-only"
                      />
                      <div className={`w-10 h-6 rounded-full transition-colors ${template.enabled ? 'bg-green-500' : 'bg-gray-300'}`}>
                        <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${template.enabled ? 'translate-x-4' : 'translate-x-0.5'} mt-0.5`} />
                      </div>
                    </label>
                    <div className="text-2xl">{template.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{template.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        &quot;{template.messageTemplate || '(Solo tag/menzione)'}&quot;
                      </p>
                      <div className="flex gap-1 mt-1">
                        {template.hashtags.map(h => (
                          <span key={h} className="text-xs text-blue-500">#{h}</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-500">+{template.pointsReward}</p>
                      <p className="text-xs text-gray-500">punti</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Card */}
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Anteprima Condivisione Cliente</h3>
              <p className="text-sm opacity-90 mb-4">Questo è come apparirà al cliente quando vorrà condividere:</p>
              <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center text-xl">🍽️</div>
                  <div>
                    <p className="font-medium">Condividi il Piatto</p>
                    <p className="text-xs opacity-75">+25 punti</p>
                  </div>
                </div>
                <p className="text-sm mb-2">
                  &quot;Sto gustando questo fantastico [piatto] da {settings.merchantInstagram ? `@${settings.merchantInstagram}` : 'Caffè Rossi'}! 😋&quot;
                </p>
                <div className="flex gap-1">
                  {settings.merchantHashtags.slice(0, 3).map(h => (
                    <span key={h} className="text-xs opacity-75">#{h}</span>
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
