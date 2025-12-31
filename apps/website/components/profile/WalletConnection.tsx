'use client';

import { useState } from 'react';

interface WalletInfo {
  address: string;
  chain: 'solana' | 'ethereum';
  connected: boolean;
  balance?: string;
}

interface WalletConnectionProps {
  wallet: WalletInfo | null;
  onConnect: (chain: 'solana' | 'ethereum') => void;
  onDisconnect: () => void;
}

const walletProviders = [
  {
    id: 'solana',
    name: 'Solana',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 128 128">
        <defs>
          <linearGradient id="solana-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00FFA3"/>
            <stop offset="100%" stopColor="#DC1FFF"/>
          </linearGradient>
        </defs>
        <path fill="url(#solana-gradient)" d="M93.94 42.63H37.45c-.93 0-1.8.42-2.38 1.14L22.1 59.63c-.95 1.18-.18 2.94 1.3 2.94h56.49c.93 0 1.8-.42 2.38-1.14l12.97-15.86c.95-1.18.18-2.94-1.3-2.94zM93.94 85.43H37.45c-.93 0-1.8-.42-2.38-1.14L22.1 68.43c-.95-1.18-.18-2.94 1.3-2.94h56.49c.93 0 1.8.42 2.38 1.14l12.97 15.86c.95 1.18.18 2.94-1.3 2.94zM22.1 47.57l12.97-15.86c.58-.72 1.45-1.14 2.38-1.14h56.49c1.48 0 2.25 1.76 1.3 2.94L82.27 49.37c-.58.72-1.45 1.14-2.38 1.14H23.4c-1.48 0-2.25-1.76-1.3-2.94z"/>
      </svg>
    ),
    color: 'from-[#00FFA3] to-[#DC1FFF]',
    wallets: ['Phantom', 'Solflare', 'Backpack'],
    features: ['Fast transactions', 'Low fees (~$0.00025)', 'NFT support'],
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 32 32">
        <path fill="#627EEA" d="M16 0l-.38.63v21.32l.38.22 9.62-5.69z"/>
        <path fill="#8C8C8C" d="M16 0L6.38 16.48 16 22.17V0z"/>
        <path fill="#627EEA" d="M16 24.05l-.22.26v7.38l.22.31 9.63-13.57z"/>
        <path fill="#8C8C8C" d="M16 32V24.05l-9.62-5.62z"/>
        <path fill="#3C3C3D" d="M16 22.17l9.62-5.69L16 12.1z"/>
        <path fill="#8C8C8C" d="M6.38 16.48L16 22.17V12.1z"/>
      </svg>
    ),
    color: 'from-[#627EEA] to-[#3C3C3D]',
    wallets: ['MetaMask', 'Rainbow', 'Coinbase Wallet'],
    features: ['Widest adoption', 'ERC-20 tokens', 'DeFi ecosystem'],
  },
];

export function WalletConnection({ wallet, onConnect, onDisconnect }: WalletConnectionProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<string | null>(null);

  const handleConnect = async (chain: 'solana' | 'ethereum') => {
    setLoading(chain);
    try {
      await onConnect(chain);
    } finally {
      setLoading(null);
    }
  };

  const handleDisconnect = async () => {
    setLoading('disconnect');
    try {
      await onDisconnect();
    } finally {
      setLoading(null);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Crypto Wallet
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Connect your wallet for NFT benefits and $GUD tokens
            </p>
          </div>
          {wallet?.connected && (
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-full">
              Connected
            </span>
          )}
        </div>
      </div>

      {wallet?.connected ? (
        // Connected state
        <div className="p-6">
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
              wallet.chain === 'solana' ? 'from-[#00FFA3] to-[#DC1FFF]' : 'from-[#627EEA] to-[#3C3C3D]'
            } flex items-center justify-center`}>
              {wallet.chain === 'solana' ? walletProviders[0].icon : walletProviders[1].icon}
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-white">
                {wallet.chain === 'solana' ? 'Solana' : 'Ethereum'} Wallet
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                {formatAddress(wallet.address)}
              </p>
              {wallet.balance && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Balance: {wallet.balance}
                </p>
              )}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(wallet.address)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              title="Copy address"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Your Web3 Benefits</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li className="flex items-center gap-2">
                <span className="text-purple-500">✦</span> Eligible for GUDBRO Genesis Pass NFT
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-500">✦</span> Earn $GUD tokens from referrals
              </li>
              <li className="flex items-center gap-2">
                <span className="text-purple-500">✦</span> Pay with crypto at partner venues
              </li>
            </ul>
          </div>

          <button
            onClick={handleDisconnect}
            disabled={loading === 'disconnect'}
            className="mt-4 w-full py-3 px-4 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 font-medium rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors disabled:opacity-50"
          >
            {loading === 'disconnect' ? 'Disconnecting...' : 'Disconnect Wallet'}
          </button>
        </div>
      ) : (
        // Not connected state
        <div className="p-6 space-y-4">
          {walletProviders.map((provider) => (
            <div
              key={provider.id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setShowDetails(showDetails === provider.id ? null : provider.id)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${provider.color} flex items-center justify-center`}>
                    {provider.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">{provider.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {provider.wallets.join(', ')}
                    </p>
                  </div>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${showDetails === provider.id ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showDetails === provider.id && (
                <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-800">
                  <ul className="mt-3 text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {provider.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="text-green-500">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleConnect(provider.id as 'solana' | 'ethereum')}
                    disabled={loading === provider.id}
                    className={`mt-4 w-full py-3 px-4 bg-gradient-to-r ${provider.color} text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50`}
                  >
                    {loading === provider.id ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Connecting...
                      </span>
                    ) : (
                      `Connect ${provider.name} Wallet`
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Info box */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                <p className="font-medium">Why connect a wallet?</p>
                <p className="mt-1 opacity-80">
                  Get early access to GUDBRO Genesis Pass NFT, earn $GUD tokens from referrals,
                  and pay with crypto at partner restaurants.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
