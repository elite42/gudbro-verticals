'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface ExchangeRateData {
  id: string;
  base_currency: string;
  rates: Record<string, number>;
  source: string;
  fetched_at: string;
  currency_count: number;
}

// Currency display info
const CURRENCY_INFO: Record<string, { symbol: string; name: string; flag: string }> = {
  USD: { symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  EUR: { symbol: '€', name: 'Euro', flag: '🇪🇺' },
  GBP: { symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  JPY: { symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  CNY: { symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' },
  KRW: { symbol: '₩', name: 'South Korean Won', flag: '🇰🇷' },
  VND: { symbol: '₫', name: 'Vietnamese Dong', flag: '🇻🇳' },
  THB: { symbol: '฿', name: 'Thai Baht', flag: '🇹🇭' },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
  CHF: { symbol: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  HKD: { symbol: 'HK$', name: 'Hong Kong Dollar', flag: '🇭🇰' },
  NZD: { symbol: 'NZ$', name: 'New Zealand Dollar', flag: '🇳🇿' },
  SEK: { symbol: 'kr', name: 'Swedish Krona', flag: '🇸🇪' },
  NOK: { symbol: 'kr', name: 'Norwegian Krone', flag: '🇳🇴' },
  DKK: { symbol: 'kr', name: 'Danish Krone', flag: '🇩🇰' },
  MXN: { symbol: 'MX$', name: 'Mexican Peso', flag: '🇲🇽' },
  BRL: { symbol: 'R$', name: 'Brazilian Real', flag: '🇧🇷' },
  INR: { symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
  RUB: { symbol: '₽', name: 'Russian Ruble', flag: '🇷🇺' },
  ZAR: { symbol: 'R', name: 'South African Rand', flag: '🇿🇦' },
  TRY: { symbol: '₺', name: 'Turkish Lira', flag: '🇹🇷' },
  PLN: { symbol: 'zł', name: 'Polish Zloty', flag: '🇵🇱' },
  CZK: { symbol: 'Kč', name: 'Czech Koruna', flag: '🇨🇿' },
  HUF: { symbol: 'Ft', name: 'Hungarian Forint', flag: '🇭🇺' },
  ILS: { symbol: '₪', name: 'Israeli Shekel', flag: '🇮🇱' },
  AED: { symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪' },
  SAR: { symbol: '﷼', name: 'Saudi Riyal', flag: '🇸🇦' },
  MYR: { symbol: 'RM', name: 'Malaysian Ringgit', flag: '🇲🇾' },
  IDR: { symbol: 'Rp', name: 'Indonesian Rupiah', flag: '🇮🇩' },
  PHP: { symbol: '₱', name: 'Philippine Peso', flag: '🇵🇭' },
  TWD: { symbol: 'NT$', name: 'Taiwan Dollar', flag: '🇹🇼' },
};

export default function CurrencySettingsPage() {
  const [data, setData] = useState<ExchangeRateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [merchantCurrency, setMerchantCurrency] = useState('VND');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);

      // Fetch exchange rates
      const { data: ratesData, error: ratesError } = await supabase
        .from('exchange_rates')
        .select('*')
        .order('fetched_at', { ascending: false })
        .limit(1)
        .single();

      if (ratesError) {
        console.error('Error fetching rates:', ratesError);
      } else {
        setData(ratesData);
      }

      // Fetch merchant currency (default)
      const { data: merchantData } = await supabase
        .from('merchants')
        .select('currency_code')
        .eq('id', '770e8400-e29b-41d4-a716-446655440001')
        .single();

      if (merchantData?.currency_code) {
        setMerchantCurrency(merchantData.currency_code);
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  }

  // Refresh rates from API
  async function handleRefreshRates() {
    setRefreshing(true);
    try {
      // Call an API route to refresh rates
      const response = await fetch('/api/exchange-rates/refresh', {
        method: 'POST',
      });

      if (response.ok) {
        await fetchData();
      } else {
        alert('Failed to refresh rates. Check API configuration.');
      }
    } catch (err) {
      console.error('Error refreshing rates:', err);
      alert('Failed to refresh rates');
    } finally {
      setRefreshing(false);
    }
  }

  // Get filtered rates
  const getFilteredRates = () => {
    if (!data?.rates) return [];

    const entries = Object.entries(data.rates);
    if (!searchQuery) return entries;

    const query = searchQuery.toLowerCase();
    return entries.filter(([code]) => {
      const info = CURRENCY_INFO[code];
      return (
        code.toLowerCase().includes(query) ||
        info?.name.toLowerCase().includes(query)
      );
    });
  };

  // Format rate for display
  const formatRate = (rate: number, code: string) => {
    if (rate >= 1000) {
      return rate.toLocaleString('en-US', { maximumFractionDigits: 2 });
    } else if (rate >= 1) {
      return rate.toFixed(4);
    } else {
      return rate.toFixed(6);
    }
  };

  // Calculate conversion example
  const getConversionExample = (targetRate: number) => {
    // Base is USD, show 1 USD = X target
    if (targetRate >= 1000) {
      return `1 USD = ${targetRate.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
    } else if (targetRate >= 1) {
      return `1 USD = ${targetRate.toFixed(2)}`;
    } else {
      return `1 USD = ${targetRate.toFixed(4)}`;
    }
  };

  // Get time ago string
  const getTimeAgo = (date: string) => {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    }
  };

  // Check if rates are stale (> 24 hours old)
  const isStale = () => {
    if (!data?.fetched_at) return true;
    const now = new Date();
    const then = new Date(data.fetched_at);
    const diffMs = now.getTime() - then.getTime();
    return diffMs > 24 * 60 * 60 * 1000;
  };

  const filteredRates = getFilteredRates();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading exchange rates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
            <Link href="/settings" className="hover:text-blue-600">Settings</Link>
            <span>/</span>
            <span className="text-gray-900">Currency & Exchange Rates</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Currency Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            View exchange rates used for tourist price conversion
          </p>
        </div>
        <button
          onClick={handleRefreshRates}
          disabled={refreshing}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            refreshing
              ? 'bg-blue-400 text-white cursor-wait'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {refreshing ? 'Refreshing...' : 'Refresh Rates'}
        </button>
      </div>

      {/* Status Card */}
      <div className={`rounded-xl border p-4 ${
        isStale()
          ? 'bg-yellow-50 border-yellow-200'
          : 'bg-green-50 border-green-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{isStale() ? '⚠️' : '✅'}</span>
            <div>
              <h3 className="font-medium text-gray-900">
                {isStale() ? 'Rates May Be Outdated' : 'Rates Up to Date'}
              </h3>
              <p className="text-sm text-gray-600">
                Last updated: {data?.fetched_at ? getTimeAgo(data.fetched_at) : 'Never'}
                {data?.source && ` via ${data.source}`}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Base Currency</p>
            <p className="text-lg font-bold text-gray-900">
              {CURRENCY_INFO[data?.base_currency || 'USD']?.flag} {data?.base_currency || 'USD'}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Total Currencies</p>
          <p className="text-2xl font-bold text-gray-900">{data?.currency_count || Object.keys(data?.rates || {}).length}</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-600">Your Base Currency</p>
          <p className="text-2xl font-bold text-blue-700">
            {CURRENCY_INFO[merchantCurrency]?.flag} {merchantCurrency}
          </p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-600">Update Frequency</p>
          <p className="text-2xl font-bold text-purple-700">Daily</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Search currencies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Exchange Rates Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Currency</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Name</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Rate (vs USD)</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">Conversion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredRates.map(([code, rate]) => {
                const info = CURRENCY_INFO[code] || { symbol: code, name: code, flag: '🏳️' };
                const isBase = code === data?.base_currency;
                const isMerchant = code === merchantCurrency;

                return (
                  <tr
                    key={code}
                    className={`hover:bg-gray-50 ${isMerchant ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{info.flag}</span>
                        <span className="font-medium text-gray-900">{code}</span>
                        <span className="text-gray-500">{info.symbol}</span>
                        {isBase && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                            Base
                          </span>
                        )}
                        {isMerchant && (
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded text-xs">
                            Your Currency
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{info.name}</td>
                    <td className="px-4 py-3 text-right font-mono text-gray-900">
                      {formatRate(rate, code)}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-gray-500">
                      {getConversionExample(rate)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredRates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No currencies found</p>
          </div>
        )}
      </div>

      {/* How it Works */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-4">
        <h3 className="font-medium text-blue-900">How Currency Conversion Works</h3>
        <ul className="mt-2 text-sm text-blue-800 space-y-1">
          <li><strong>Your Base Currency:</strong> Prices are stored in {merchantCurrency} (your locale&apos;s currency)</li>
          <li><strong>Tourist View:</strong> Visitors can toggle to see prices in their preferred currency</li>
          <li><strong>Conversion:</strong> Rates are fetched daily from exchangerate-api.com</li>
          <li><strong>Display:</strong> Converted prices show as &quot;$12.50 (~ 300k)&quot; for reference only</li>
          <li><strong>Payment:</strong> Actual payment is always in your base currency ({merchantCurrency})</li>
        </ul>
      </div>

      {/* API Info */}
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-4">
        <h3 className="font-medium text-gray-900">API Information</h3>
        <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Provider</p>
            <p className="text-gray-900">exchangerate-api.com</p>
          </div>
          <div>
            <p className="text-gray-500">Update Schedule</p>
            <p className="text-gray-900">Daily at 00:05 UTC</p>
          </div>
          <div>
            <p className="text-gray-500">Base Currency</p>
            <p className="text-gray-900">{data?.base_currency || 'USD'} (used for rate calculation)</p>
          </div>
          <div>
            <p className="text-gray-500">Coverage</p>
            <p className="text-gray-900">{data?.currency_count || '33'}+ currencies</p>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="pt-4 border-t border-gray-200">
        <Link
          href="/settings"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
        >
          <span>←</span>
          <span>Back to Settings</span>
        </Link>
      </div>
    </div>
  );
}
