'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { InfoTooltip } from '@/components/ui/info-tooltip';

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
  {
    id: 1,
    merchant: 'Caffè Milano',
    subject: 'QR code not scanning',
    priority: 'high',
    status: 'open',
    created: '2h ago',
  },
  {
    id: 2,
    merchant: 'Tapas Barcelona',
    subject: 'Translation issue',
    priority: 'medium',
    status: 'in_progress',
    created: '5h ago',
  },
  {
    id: 3,
    merchant: 'Le Petit Bistro',
    subject: 'Billing question',
    priority: 'low',
    status: 'open',
    created: '1d ago',
  },
];

export default function PlatformPage() {
  const { user, hasPermission } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('overview');

  // Check if user has platform access
  if (!hasPermission('platform:read')) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-10 w-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V8a3 3 0 00-3-3H6a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3v-3"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">Access Denied</h2>
        <p className="max-w-md text-center text-gray-500">
          This section is only available to GudBro platform administrators.
        </p>
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-4 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-orange-500">
              <span className="text-xl">👑</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900">Platform Admin</h1>
                <InfoTooltip contentKey="pages.platform" kbPageId="platform" />
              </div>
              <p className="text-gray-500">GudBro ecosystem management</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
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
              className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
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
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="mb-1 text-sm text-gray-500">Total Merchants</p>
              <p className="text-3xl font-bold text-gray-900">{PLATFORM_STATS.totalMerchants}</p>
              <p className="mt-1 text-sm text-green-600">
                +{PLATFORM_STATS.newMerchantsThisMonth} this month
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="mb-1 text-sm text-gray-500">Monthly Recurring Revenue</p>
              <p className="text-3xl font-bold text-gray-900">
                €{PLATFORM_STATS.mrr.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-green-600">+12% vs last month</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="mb-1 text-sm text-gray-500">Annual Recurring Revenue</p>
              <p className="text-3xl font-bold text-gray-900">
                €{PLATFORM_STATS.arr.toLocaleString()}
              </p>
              <p className="mt-1 text-sm text-gray-500">Projected</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="mb-1 text-sm text-gray-500">Countries</p>
              <p className="text-3xl font-bold text-gray-900">{PLATFORM_STATS.countries}</p>
              <p className="mt-1 text-sm text-blue-600">Active markets</p>
            </div>
          </div>

          {/* Revenue Streams + Recent Merchants */}
          <div className="grid grid-cols-2 gap-6">
            {/* Revenue Streams */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Revenue Streams</h3>
              <div className="space-y-4">
                {REVENUE_STREAMS.map((stream) => (
                  <div key={stream.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{stream.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-900">
                          €{stream.amount.toLocaleString()}
                        </span>
                        <span className="text-xs text-green-600">{stream.trend}</span>
                      </div>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500"
                        style={{ width: `${stream.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Merchants */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-gray-900">Recent Merchants</h3>
              <div className="space-y-3">
                {RECENT_MERCHANTS.map((merchant) => (
                  <div
                    key={merchant.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-bold">
                        {merchant.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{merchant.name}</p>
                        <p className="text-xs text-gray-500">{merchant.country}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded px-2 py-0.5 text-xs font-medium ${
                          merchant.plan === 'pro'
                            ? 'bg-purple-100 text-purple-700'
                            : merchant.plan === 'starter'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                        }`}
                      >
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
            <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <span className="text-2xl">📱</span>
                </div>
                <div>
                  <p className="text-sm text-blue-600">Total Menu Views</p>
                  <p className="text-2xl font-bold text-blue-900">
                    {PLATFORM_STATS.totalMenuViews.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-green-100 bg-gradient-to-br from-green-50 to-emerald-50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <span className="text-2xl">🛒</span>
                </div>
                <div>
                  <p className="text-sm text-green-600">Total Orders</p>
                  <p className="text-2xl font-bold text-green-900">
                    {PLATFORM_STATS.totalOrders.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                  <span className="text-2xl">💳</span>
                </div>
                <div>
                  <p className="text-sm text-orange-600">Avg Revenue / Merchant</p>
                  <p className="text-2xl font-bold text-orange-900">
                    €{PLATFORM_STATS.avgRevenuePerMerchant}
                  </p>
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
              className="max-w-md flex-1 rounded-lg border border-gray-200 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-red-500"
            />
            <select className="rounded-lg border border-gray-200 px-4 py-2">
              <option>All Plans</option>
              <option>Pro</option>
              <option>Starter</option>
              <option>Free</option>
            </select>
            <select className="rounded-lg border border-gray-200 px-4 py-2">
              <option>All Countries</option>
              {COUNTRIES_DATA.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
            <select className="rounded-lg border border-gray-200 px-4 py-2">
              <option>All Status</option>
              <option>Active</option>
              <option>Trialing</option>
              <option>Churned</option>
            </select>
          </div>

          {/* Merchants Table */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Merchant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    MRR
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {RECENT_MERCHANTS.map((merchant) => (
                  <tr key={merchant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 font-bold text-gray-600">
                          {merchant.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{merchant.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          merchant.plan === 'pro'
                            ? 'bg-purple-100 text-purple-700'
                            : merchant.plan === 'starter'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {merchant.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{merchant.country}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded px-2 py-1 text-xs font-medium ${
                          merchant.status === 'active'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {merchant.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {merchant.mrr > 0 ? `€${merchant.mrr}` : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sm font-medium text-red-600 hover:text-red-800">
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
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="mb-1 text-sm text-gray-500">Total Revenue (All Time)</p>
              <p className="text-3xl font-bold text-gray-900">
                €{PLATFORM_STATS.totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="mb-1 text-sm text-gray-500">MRR</p>
              <p className="text-3xl font-bold text-green-600">
                €{PLATFORM_STATS.mrr.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="mb-1 text-sm text-gray-500">ARR</p>
              <p className="text-3xl font-bold text-blue-600">
                €{PLATFORM_STATS.arr.toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="mb-1 text-sm text-gray-500">Churn Rate</p>
              <p className="text-3xl font-bold text-orange-600">{PLATFORM_STATS.churnRate}%</p>
            </div>
          </div>

          {/* Revenue by Stream */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-6 text-lg font-semibold text-gray-900">
              Revenue by Stream (This Month)
            </h3>
            <div className="grid grid-cols-4 gap-6">
              {REVENUE_STREAMS.map((stream) => (
                <div key={stream.id} className="text-center">
                  <div className="mx-auto mb-3 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-red-50 to-orange-50">
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
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Country
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Merchants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Market Share
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
                    Actions
                  </th>
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
                    <td className="px-6 py-4 font-medium text-gray-900">
                      €{country.revenue.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-gray-100">
                          <div
                            className="h-2 rounded-full bg-red-500"
                            style={{
                              width: `${(country.merchants / PLATFORM_STATS.totalMerchants) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-500">
                          {((country.merchants / PLATFORM_STATS.totalMerchants) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sm font-medium text-red-600 hover:text-red-800">
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
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="mb-1 text-sm text-gray-500">Open Tickets</p>
              <p className="text-3xl font-bold text-red-600">12</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="mb-1 text-sm text-gray-500">In Progress</p>
              <p className="text-3xl font-bold text-yellow-600">5</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="mb-1 text-sm text-gray-500">Resolved Today</p>
              <p className="text-3xl font-bold text-green-600">8</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="mb-1 text-sm text-gray-500">Avg Response Time</p>
              <p className="text-3xl font-bold text-blue-600">2.4h</p>
            </div>
          </div>

          {/* Recent Tickets */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-6 py-4">
              <h3 className="font-semibold text-gray-900">Recent Tickets</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {SUPPORT_TICKETS.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`h-3 w-3 rounded-full ${
                        ticket.priority === 'high'
                          ? 'bg-red-500'
                          : ticket.priority === 'medium'
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                      }`}
                    />
                    <div>
                      <p className="font-medium text-gray-900">{ticket.subject}</p>
                      <p className="text-sm text-gray-500">
                        {ticket.merchant} • {ticket.created}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded px-2 py-1 text-xs font-medium ${
                        ticket.status === 'open'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {ticket.status.replace('_', ' ')}
                    </span>
                    <button className="text-sm font-medium text-red-600 hover:text-red-800">
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
