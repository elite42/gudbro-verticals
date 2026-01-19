'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/contexts/TenantContext';

interface GiftCard {
  id: string;
  code: string;
  amount_cents: number;
  amount_formatted: string;
  currency: string;
  status: 'pending' | 'active' | 'redeemed' | 'expired' | 'cancelled';
  recipient_name: string | null;
  recipient_email: string | null;
  delivery_method: 'email' | 'sms' | 'print';
  expires_at: string;
  created_at: string;
}

interface GiftCardStats {
  total_sold: number;
  total_sold_formatted: string;
  total_redeemed: number;
  total_redeemed_formatted: string;
  total_active: number;
  total_active_formatted: string;
  total_expired: number;
  total_expired_formatted: string;
}

interface GiftCardSettings {
  is_enabled: boolean;
  allow_custom_amounts: boolean;
  min_amount_cents: number;
  max_amount_cents: number;
  default_expiry_months: number;
}

type TabId = 'list' | 'create' | 'settings';

export default function GiftCardsPage() {
  const { brand } = useTenant();
  const merchantId = brand?.id;
  const [activeTab, setActiveTab] = useState<TabId>('list');
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [stats, setStats] = useState<GiftCardStats | null>(null);
  const [settings, setSettings] = useState<GiftCardSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');

  // Create form state
  const [createForm, setCreateForm] = useState({
    amount: '',
    recipient_name: '',
    recipient_email: '',
    recipient_message: '',
    delivery_method: 'email' as 'email' | 'sms' | 'print',
  });
  const [creating, setCreating] = useState(false);

  const fetchGiftCards = useCallback(async () => {
    if (!merchantId) return;
    try {
      const params = new URLSearchParams({ merchantId });
      if (statusFilter) params.append('status', statusFilter);
      const res = await fetch(`/api/gift-cards?${params}`);
      if (res.ok) {
        const data = await res.json();
        setGiftCards(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching gift cards:', err);
    }
  }, [merchantId, statusFilter]);

  const fetchStats = useCallback(async () => {
    if (!merchantId) return;
    try {
      const res = await fetch(`/api/gift-cards?action=stats&merchantId=${merchantId}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, [merchantId]);

  const fetchSettings = useCallback(async () => {
    if (!merchantId) return;
    try {
      const res = await fetch(`/api/gift-cards?action=settings&merchantId=${merchantId}`);
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  }, [merchantId]);

  useEffect(() => {
    if (merchantId) {
      setLoading(true);
      Promise.all([fetchGiftCards(), fetchStats(), fetchSettings()]).finally(() =>
        setLoading(false)
      );
    }
  }, [merchantId, fetchGiftCards, fetchStats, fetchSettings]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchantId) return;

    setCreating(true);
    try {
      const res = await fetch('/api/gift-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          merchantId,
          amount_cents: Math.round(parseFloat(createForm.amount) * 100),
          recipient_name: createForm.recipient_name || undefined,
          recipient_email: createForm.recipient_email || undefined,
          recipient_message: createForm.recipient_message || undefined,
          delivery_method: createForm.delivery_method,
        }),
      });

      if (res.ok) {
        setCreateForm({
          amount: '',
          recipient_name: '',
          recipient_email: '',
          recipient_message: '',
          delivery_method: 'email',
        });
        fetchGiftCards();
        fetchStats();
        setActiveTab('list');
      }
    } catch (err) {
      console.error('Error creating gift card:', err);
    } finally {
      setCreating(false);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      const res = await fetch(`/api/gift-cards/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'cancel' }),
      });
      if (res.ok) {
        fetchGiftCards();
        fetchStats();
      }
    } catch (err) {
      console.error('Error cancelling gift card:', err);
    }
  };

  const updateSettings = async (updates: Partial<GiftCardSettings>) => {
    if (!merchantId) return;
    try {
      const res = await fetch('/api/gift-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update-settings',
          merchantId,
          settings: updates,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
      }
    } catch (err) {
      console.error('Error updating settings:', err);
    }
  };

  const getStatusColor = (status: GiftCard['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'redeemed':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const tabs = [
    { id: 'list' as TabId, label: 'Gift Cards', icon: '🎁' },
    { id: 'create' as TabId, label: 'Create New', icon: '➕' },
    { id: 'settings' as TabId, label: 'Settings', icon: '⚙️' },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

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
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Gift Cards</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Sell prepaid gift cards that customers can redeem to their wallet
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex cursor-pointer items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Enabled</span>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={settings?.is_enabled || false}
                    onChange={(e) => updateSettings({ is_enabled: e.target.checked })}
                    className="sr-only"
                  />
                  <div
                    className={`h-6 w-11 rounded-full transition-colors ${settings?.is_enabled ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <div
                      className={`h-5 w-5 transform rounded-full bg-white shadow transition-transform ${settings?.is_enabled ? 'translate-x-5' : 'translate-x-0.5'} mt-0.5`}
                    />
                  </div>
                </div>
              </label>
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
        {/* Stats */}
        {activeTab === 'list' && stats && (
          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Sold</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total_sold}
              </p>
              <p className="mt-1 text-sm text-green-500">{stats.total_sold_formatted}</p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
              <p className="mt-1 text-2xl font-bold text-green-600">{stats.total_active}</p>
              <p className="mt-1 text-sm text-gray-500">{stats.total_active_formatted}</p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Redeemed</p>
              <p className="mt-1 text-2xl font-bold text-blue-600">{stats.total_redeemed}</p>
              <p className="mt-1 text-sm text-gray-500">{stats.total_redeemed_formatted}</p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Expired</p>
              <p className="mt-1 text-2xl font-bold text-gray-600">{stats.total_expired}</p>
              <p className="mt-1 text-sm text-gray-500">{stats.total_expired_formatted}</p>
            </div>
          </div>
        )}

        {/* List Tab */}
        {activeTab === 'list' && (
          <div className="rounded-xl bg-white shadow-sm dark:bg-gray-800">
            <div className="flex items-center gap-4 border-b border-gray-200 p-4 dark:border-gray-700">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="redeemed">Redeemed</option>
                <option value="expired">Expired</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Code
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Recipient
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Expires
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {giftCards.map((gc) => (
                    <tr key={gc.id}>
                      <td className="px-4 py-3 font-mono text-sm text-gray-900 dark:text-white">
                        {gc.code}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                        {gc.amount_formatted}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {gc.recipient_name || gc.recipient_email || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded px-2 py-1 text-xs font-medium ${getStatusColor(gc.status)}`}
                        >
                          {gc.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(gc.expires_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        {(gc.status === 'pending' || gc.status === 'active') && (
                          <button
                            onClick={() => handleCancel(gc.id)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {giftCards.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        No gift cards found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Create Tab */}
        {activeTab === 'create' && (
          <div className="max-w-lg">
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Create Gift Card
              </h3>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Amount (EUR)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min={(settings?.min_amount_cents || 1000) / 100}
                    max={(settings?.max_amount_cents || 50000) / 100}
                    value={createForm.amount}
                    onChange={(e) => setCreateForm({ ...createForm, amount: e.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="50.00"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    value={createForm.recipient_name}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, recipient_name: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Recipient Email
                  </label>
                  <input
                    type="email"
                    value={createForm.recipient_email}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, recipient_email: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Personal Message
                  </label>
                  <textarea
                    value={createForm.recipient_message}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, recipient_message: e.target.value })
                    }
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="Enjoy your gift!"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Delivery Method
                  </label>
                  <select
                    value={createForm.delivery_method}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        delivery_method: e.target.value as 'email' | 'sms' | 'print',
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="email">Email</option>
                    <option value="sms">SMS</option>
                    <option value="print">Print</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={creating}
                  className="w-full rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Create Gift Card'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && settings && (
          <div className="max-w-lg space-y-6">
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Gift Card Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Allow Custom Amounts
                  </span>
                  <input
                    type="checkbox"
                    checked={settings.allow_custom_amounts}
                    onChange={(e) => updateSettings({ allow_custom_amounts: e.target.checked })}
                    className="h-4 w-4"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                    Minimum Amount (EUR)
                  </label>
                  <input
                    type="number"
                    value={settings.min_amount_cents / 100}
                    onChange={(e) =>
                      updateSettings({
                        min_amount_cents: Math.round(parseFloat(e.target.value) * 100),
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                    Maximum Amount (EUR)
                  </label>
                  <input
                    type="number"
                    value={settings.max_amount_cents / 100}
                    onChange={(e) =>
                      updateSettings({
                        max_amount_cents: Math.round(parseFloat(e.target.value) * 100),
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-gray-700 dark:text-gray-300">
                    Default Expiry (months)
                  </label>
                  <input
                    type="number"
                    value={settings.default_expiry_months}
                    onChange={(e) =>
                      updateSettings({ default_expiry_months: parseInt(e.target.value) })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
