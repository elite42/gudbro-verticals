'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';

type TabId = 'overview' | 'merchants' | 'revenue' | 'countries' | 'support';

// Mock data for platform stats
const PLATFORM_STATS = {
  totalMerchants: 247,
  activeMerchants: 198,
  totalRevenue: 45780,
  mrr: 12450,
  arr: 149400,
  avgRevenuePerMerchant: 62.87,
  churnRate: 2.3,
  newMerchantsThisMonth: 18,
  countries: 12,
  totalOrders: 89432,
  totalMenuViews: 1245678,
};

const REVENUE_STREAMS = [
  { id: 'subscriptions', name: 'Subscriptions', amount: 8500, percentage: 68, trend: '+12%' },
  { id: 'transactions', name: 'Transaction Fees', amount: 2340, percentage: 19, trend: '+8%' },
  { id: 'premium', name: 'Premium Features', amount: 1200, percentage: 10, trend: '+25%' },
  { id: 'api', name: 'API Access', amount: 410, percentage: 3, trend: '+45%' },
];

const COUNTRIES_DATA = [
  { code: 'IT', name: 'Italy', merchants: 142, revenue: 28500, flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', merchants: 38, revenue: 6800, flag: '🇪🇸' },
  { code: 'FR', name: 'France', merchants: 24, revenue: 4200, flag: '🇫🇷' },
  { code: 'DE', name: 'Germany', merchants: 18, revenue: 3100, flag: '🇩🇪' },
  { code: 'UK', name: 'United Kingdom', merchants: 12, revenue: 1800, flag: '🇬🇧' },
  { code: 'US', name: 'United States', merchants: 8, revenue: 980, flag: '🇺🇸' },
  { code: 'PT', name: 'Portugal', merchants: 5, revenue: 400, flag: '🇵🇹' },
];

const RECENT_MERCHANTS = [
  { id: 1, name: 'Caffè Milano', plan: 'pro', country: 'IT', status: 'active', mrr: 89 },
  { id: 2, name: 'Tapas Barcelona', plan: 'starter', country: 'ES', status: 'active', mrr: 29 },
  { id: 3, name: 'Le Petit Bistro', plan: 'pro', country: 'FR', status: 'active', mrr: 89 },
  { id: 4, name: 'Berlin Brunch', plan: 'free', country: 'DE', status: 'trialing', mrr: 0 },
  { id: 5, name: 'London Eats', plan: 'starter', country: 'UK', status: 'active', mrr: 29 },
];

const SUPPORT_TICKETS = [
  { id: 1, merchant: 'Caffè Milano', subject: 'QR code not scanning', priority: 'high', status: 'open', created: '2h ago' },
  { id: 2, merchant: 'Tapas Barcelona', subject: 'Translation issue', priority: 'medium', status: 'in_progress', created: '5h ago' },
  { id: 3, merchant: 'Le Petit Bistro', subject: 'Billing question', priority: 'low', status: 'open', created: '1d ago' },
];

export default function PlatformPage() {
  const { user, hasPermission } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  // Check if user has platform access
  if (!hasPermission('platform:read')) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V8a3 3 0 00-3-3H6a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3v-3" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-500 text-center max-w-md">
          This section is only available to GudBro platform administrators.
        </p>
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'merchants', label: 'Merchants', icon: '🏪' },
    { id: 'revenue', label: 'Revenue', icon: '💰' },
    { id: 'countries', label: 'Countries', icon: '🌍' },
    { id: 'support', label: 'Support', icon: '🎫' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <span className="text-xl">👑</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Platform Admin</h1>
              <p className="text-gray-500">GudBro ecosystem management</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
            Admin Access
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Total Merchants</p>
              <p className="text-3xl font-bold text-gray-900">{PLATFORM_STATS.totalMerchants}</p>
              <p className="text-sm text-green-600 mt-1">+{PLATFORM_STATS.newMerchantsThisMonth} this month</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Monthly Recurring Revenue</p>
              <p className="text-3xl font-bold text-gray-900">€{PLATFORM_STATS.mrr.toLocaleString()}</p>
              <p className="text-sm text-green-600 mt-1">+12% vs last month</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Annual Recurring Revenue</p>
              <p className="text-3xl font-bold text-gray-900">€{PLATFORM_STATS.arr.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">Projected</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Countries</p>
              <p className="text-3xl font-bold text-gray-900">{PLATFORM_STATS.countries}</p>
              <p className="text-sm text-blue-600 mt-1">Active markets</p>
            </div>
          </div>

          {/* Revenue Streams + Recent Merchants */}
          <div className="grid grid-cols-2 gap-6">
            {/* Revenue Streams */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Streams</h3>
              <div className="space-y-4">
                {REVENUE_STREAMS.map((stream) => (
                  <div key={stream.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{stream.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">€{stream.amount.toLocaleString()}</span>
                        <span className="text-xs text-green-600">{stream.trend}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                        style={{ width: `${stream.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Merchants */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Merchants</h3>
              <div className="space-y-3">
                {RECENT_MERCHANTS.map((merchant) => (
                  <div key={merchant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold">
                        {merchant.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{merchant.name}</p>
                        <p className="text-xs text-gray-500">{merchant.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        merchant.plan === 'pro' ? 'bg-purple-100 text-purple-700' :
                        merchant.plan === 'starter' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {merchant.plan}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        {merchant.mrr > 0 ? `€${merchant.mrr}/mo` : 'Free'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Total Menu Views</p>
                  <p className="text-2xl font-bold text-blue-900">{PLATFORM_STATS.totalMenuViews.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🛒</span>
                </div>
                <div>
                  <p className="text-sm text-green-600">Total Orders</p>
                  <p className="text-2xl font-bold text-green-900">{PLATFORM_STATS.totalOrders.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💳</span>
                </div>
                <div>
                  <p className="text-sm text-orange-600">Avg Revenue / Merchant</p>
                  <p className="text-2xl font-bold text-orange-900">€{PLATFORM_STATS.avgRevenuePerMerchant}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'merchants' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <input
              type="search"
              placeholder="Search merchants..."
              className="flex-1 max-w-md px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <select className="px-4 py-2 border border-gray-200 rounded-lg">
              <option>All Plans</option>
              <option>Pro</option>
              <option>Starter</option>
              <option>Free</option>
            </select>
            <select className="px-4 py-2 border border-gray-200 rounded-lg">
              <option>All Countries</option>
              {COUNTRIES_DATA.map((c) => (
                <option key={c.code} value={c.code}>{c.flag} {c.name}</option>
              ))}
            </select>
            <select className="px-4 py-2 border border-gray-200 rounded-lg">
              <option>All Status</option>
              <option>Active</option>
              <option>Trialing</option>
              <option>Churned</option>
            </select>
          </div>

          {/* Merchants Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Merchant</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Plan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">MRR</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {RECENT_MERCHANTS.map((merchant) => (
                  <tr key={merchant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                          {merchant.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{merchant.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        merchant.plan === 'pro' ? 'bg-purple-100 text-purple-700' :
                        merchant.plan === 'starter' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {merchant.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{merchant.country}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        merchant.status === 'active' ? 'bg-green-100 text-green-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {merchant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {merchant.mrr > 0 ? `€${merchant.mrr}` : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'revenue' && (
        <div className="space-y-6">
          {/* Revenue Summary */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Total Revenue (All Time)</p>
              <p className="text-3xl font-bold text-gray-900">€{PLATFORM_STATS.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">MRR</p>
              <p className="text-3xl font-bold text-green-600">€{PLATFORM_STATS.mrr.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">ARR</p>
              <p className="text-3xl font-bold text-blue-600">€{PLATFORM_STATS.arr.toLocaleString()}</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Churn Rate</p>
              <p className="text-3xl font-bold text-orange-600">{PLATFORM_STATS.churnRate}%</p>
            </div>
          </div>

          {/* Revenue by Stream */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Revenue by Stream (This Month)</h3>
            <div className="grid grid-cols-4 gap-6">
              {REVENUE_STREAMS.map((stream) => (
                <div key={stream.id} className="text-center">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-red-50 to-orange-50 rounded-full flex items-center justify-center mb-3">
                    <span className="text-2xl font-bold text-red-600">{stream.percentage}%</span>
                  </div>
                  <p className="font-medium text-gray-900">{stream.name}</p>
                  <p className="text-sm text-gray-500">€{stream.amount.toLocaleString()}</p>
                  <p className="text-xs text-green-600">{stream.trend}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'countries' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Country</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Merchants</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Market Share</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {COUNTRIES_DATA.map((country) => (
                  <tr key={country.code} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{country.flag}</span>
                        <span className="font-medium text-gray-900">{country.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{country.merchants}</td>
                    <td className="px-6 py-4 font-medium text-gray-900">€{country.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-100 rounded-full h-2">
                          <div
                            className="bg-red-500 h-2 rounded-full"
                            style={{ width: `${(country.merchants / PLATFORM_STATS.totalMerchants) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">
                          {((country.merchants / PLATFORM_STATS.totalMerchants) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'support' && (
        <div className="space-y-6">
          {/* Support Stats */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Open Tickets</p>
              <p className="text-3xl font-bold text-red-600">12</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">In Progress</p>
              <p className="text-3xl font-bold text-yellow-600">5</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Resolved Today</p>
              <p className="text-3xl font-bold text-green-600">8</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Avg Response Time</p>
              <p className="text-3xl font-bold text-blue-600">2.4h</p>
            </div>
          </div>

          {/* Recent Tickets */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Recent Tickets</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {SUPPORT_TICKETS.map((ticket) => (
                <div key={ticket.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <span className={`w-3 h-3 rounded-full ${
                      ticket.priority === 'high' ? 'bg-red-500' :
                      ticket.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-900">{ticket.subject}</p>
                      <p className="text-sm text-gray-500">{ticket.merchant} • {ticket.created}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      ticket.status === 'open' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
