'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiveDimensionsEditor, SocialConnections, WalletConnection, LoyaltyCard } from '@/components/profile';
import type { HealthProfile } from '@/components/profile';

// Mock data - in production this would come from auth/database
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: null,
  plan: 'free' as const,
  createdAt: '2024-01-15',
};

const mockHealthProfile: HealthProfile = {
  allergens: ['peanuts', 'shellfish'],
  dietaryPreferences: ['vegetarian'],
  intolerances: ['lactose'],
  healthConditions: [],
  tastePreferences: ['no_spicy'],
};

const mockSocialConnections = [
  { id: '1', provider: 'google', username: 'john.doe@gmail.com', connected: true },
  { id: '2', provider: 'apple', connected: false },
  { id: '3', provider: 'facebook', connected: false },
  { id: '4', provider: 'x', connected: false },
  { id: '5', provider: 'instagram', connected: false },
];

type SettingsTab = 'profile' | 'loyalty' | 'preferences' | 'connections' | 'wallet' | 'subscription';

export default function AccountSettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [healthProfile, setHealthProfile] = useState<HealthProfile>(mockHealthProfile);
  const [socialConnections, setSocialConnections] = useState(mockSocialConnections);
  const [wallet, setWallet] = useState<{ address: string; chain: 'solana' | 'ethereum'; connected: boolean; balance?: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async () => {
    setIsSaving(true);
    // TODO: Save to database
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  const handleSocialConnect = async (provider: string) => {
    // TODO: OAuth flow
    console.log('Connect:', provider);
    setSocialConnections(prev =>
      prev.map(c => c.provider === provider ? { ...c, connected: true, username: 'connected_user' } : c)
    );
  };

  const handleSocialDisconnect = async (provider: string) => {
    // TODO: Disconnect OAuth
    console.log('Disconnect:', provider);
    setSocialConnections(prev =>
      prev.map(c => c.provider === provider ? { ...c, connected: false, username: undefined } : c)
    );
  };

  const handleWalletConnect = async (chain: 'solana' | 'ethereum') => {
    // TODO: Real wallet connection with @solana/wallet-adapter or wagmi
    console.log('Connect wallet:', chain);
    // Simulate connection
    await new Promise(resolve => setTimeout(resolve, 1500));
    setWallet({
      address: chain === 'solana'
        ? '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU'
        : '0x742d35Cc6634C0532925a3b844Bc9e7595f8a2b1',
      chain,
      connected: true,
      balance: chain === 'solana' ? '12.5 SOL' : '0.85 ETH',
    });
  };

  const handleWalletDisconnect = async () => {
    // TODO: Real wallet disconnect
    await new Promise(resolve => setTimeout(resolve, 500));
    setWallet(null);
  };

  const tabs: { id: SettingsTab; label: string; icon: string }[] = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'loyalty', label: 'Loyalty & Points', icon: '🏆' },
    { id: 'preferences', label: 'Food Preferences', icon: '🍽️' },
    { id: 'connections', label: 'Connections', icon: '🔗' },
    { id: 'wallet', label: 'Wallet', icon: '💎' },
    { id: 'subscription', label: 'Subscription', icon: '⭐' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Account Settings</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">Manage your profile and preferences</p>
              </div>
            </div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">📱</span>
              <span className="font-bold text-gray-900 dark:text-white hidden sm:block">GUDBRO</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <nav className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>

            {/* User card */}
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-lg font-bold">
                  {mockUser.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{mockUser.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{mockUser.email}</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                  mockUser.plan === 'free'
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                }`}>
                  {mockUser.plan === 'free' ? 'Free Plan' : 'Premium'}
                </span>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <main className="flex-1 space-y-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Profile Information</h2>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      defaultValue={mockUser.name}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={mockUser.email}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent outline-none bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Profile Photo
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {mockUser.name.charAt(0)}
                      </div>
                      <button type="button" className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                        Upload Photo
                      </button>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Loyalty Tab */}
            {activeTab === 'loyalty' && (
              <LoyaltyCard />
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <FiveDimensionsEditor
                data={healthProfile}
                onUpdate={setHealthProfile}
                onSave={handleSaveProfile}
                isSaving={isSaving}
              />
            )}

            {/* Connections Tab */}
            {activeTab === 'connections' && (
              <SocialConnections
                connections={socialConnections}
                onConnect={handleSocialConnect}
                onDisconnect={handleSocialDisconnect}
              />
            )}

            {/* Wallet Tab */}
            {activeTab === 'wallet' && (
              <WalletConnection
                wallet={wallet}
                onConnect={handleWalletConnect}
                onDisconnect={handleWalletDisconnect}
              />
            )}

            {/* Subscription Tab */}
            {activeTab === 'subscription' && (
              <div className="space-y-6">
                {/* Current plan */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Current Plan</h2>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">Free Plan</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Basic features included</p>
                    </div>
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">€0</span>
                  </div>
                </div>

                {/* Upgrade card */}
                <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">⭐</span>
                    <h3 className="text-xl font-bold">Upgrade to Premium</h3>
                  </div>
                  <p className="text-purple-100 mb-4">
                    Unlock all features for just €1.50/month - the price of a coffee!
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <span>✓</span> Unlimited referrals & earnings
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✓</span> Food diary & personal analytics
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✓</span> No ads
                    </li>
                    <li className="flex items-center gap-2">
                      <span>✓</span> Priority support
                    </li>
                  </ul>
                  <button className="w-full py-3 bg-white text-purple-600 font-medium rounded-xl hover:bg-purple-50">
                    Upgrade Now - €1.50/month
                  </button>
                </div>

                {/* NFT option */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-2 border-dashed border-gray-300 dark:border-gray-600">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">💎</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">GUDBRO Genesis Pass</h3>
                    <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    One-time purchase for lifetime premium + earn $GUD tokens from every referral.
                  </p>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-xl" disabled>
                    Join Waitlist
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
