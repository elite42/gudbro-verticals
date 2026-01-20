'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTenant } from '@/lib/contexts/TenantContext';

interface PromoCode {
  id: string;
  code: string;
  discount_type: 'percentage' | 'fixed_amount' | 'free_item';
  discount_value: number;
  discount_formatted: string;
  max_discount_cents: number | null;
  min_order_cents: number;
  max_uses_total: number | null;
  max_uses_per_customer: number;
  current_uses: number;
  uses_remaining: number | string;
  first_order_only: boolean;
  status: 'draft' | 'active' | 'paused' | 'expired' | 'depleted';
  valid_from: string;
  valid_until: string | null;
  campaign_name: string | null;
  created_at: string;
}

type TabId = 'list' | 'create';

export default function PromoCodesPage() {
  const t = useTranslations('promoCodes');
  const tCommon = useTranslations('common');
  const { brand } = useTenant();
  const merchantId = brand?.id;
  const [activeTab, setActiveTab] = useState<TabId>('list');
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');

  // Create form state
  const [createForm, setCreateForm] = useState({
    code: '',
    discount_type: 'percentage' as 'percentage' | 'fixed_amount' | 'free_item',
    discount_value: '',
    max_discount_cents: '',
    min_order_cents: '',
    max_uses_total: '',
    max_uses_per_customer: '1',
    first_order_only: false,
    valid_until: '',
    campaign_name: '',
    status: 'active' as 'draft' | 'active',
  });
  const [creating, setCreating] = useState(false);

  const fetchPromoCodes = useCallback(async () => {
    if (!merchantId) return;
    try {
      const params = new URLSearchParams({ merchantId });
      if (statusFilter) params.append('status', statusFilter);
      const res = await fetch(`/api/promo-codes?${params}`);
      if (res.ok) {
        const data = await res.json();
        setPromoCodes(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching promo codes:', err);
    } finally {
      setLoading(false);
    }
  }, [merchantId, statusFilter]);

  useEffect(() => {
    if (merchantId) {
      fetchPromoCodes();
    }
  }, [merchantId, fetchPromoCodes]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchantId) return;

    setCreating(true);
    try {
      const res = await fetch('/api/promo-codes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId,
          code: createForm.code,
          discount_type: createForm.discount_type,
          discount_value:
            createForm.discount_type === 'fixed_amount'
              ? Math.round(parseFloat(createForm.discount_value) * 100)
              : parseInt(createForm.discount_value),
          max_discount_cents: createForm.max_discount_cents
            ? Math.round(parseFloat(createForm.max_discount_cents) * 100)
            : undefined,
          min_order_cents: createForm.min_order_cents
            ? Math.round(parseFloat(createForm.min_order_cents) * 100)
            : undefined,
          max_uses_total: createForm.max_uses_total
            ? parseInt(createForm.max_uses_total)
            : undefined,
          max_uses_per_customer: parseInt(createForm.max_uses_per_customer),
          first_order_only: createForm.first_order_only,
          valid_until: createForm.valid_until || undefined,
          campaign_name: createForm.campaign_name || undefined,
          status: createForm.status,
        }),
      });

      if (res.ok) {
        setCreateForm({
          code: '',
          discount_type: 'percentage',
          discount_value: '',
          max_discount_cents: '',
          min_order_cents: '',
          max_uses_total: '',
          max_uses_per_customer: '1',
          first_order_only: false,
          valid_until: '',
          campaign_name: '',
          status: 'active',
        });
        fetchPromoCodes();
        setActiveTab('list');
      }
    } catch (err) {
      console.error('Error creating promo code:', err);
    } finally {
      setCreating(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/promo-codes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchPromoCodes();
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this promo code?')) return;
    try {
      const res = await fetch(`/api/promo-codes/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPromoCodes();
      }
    } catch (err) {
      console.error('Error deleting promo code:', err);
    }
  };

  const getStatusColor = (status: PromoCode['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      case 'depleted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const tabs = [
    { id: 'list' as TabId, label: t('tabs.list'), icon: '🏷️' },
    { id: 'create' as TabId, label: t('tabs.create'), icon: '➕' },
  ];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-500">{tCommon('loading')}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="px-6 py-4">
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
        {/* List Tab */}
        {activeTab === 'list' && (
          <div className="rounded-xl bg-white shadow-sm dark:bg-gray-800">
            <div className="flex items-center gap-4 border-b border-gray-200 p-4 dark:border-gray-700">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="">{t('status.all')}</option>
                <option value="active">{t('status.active')}</option>
                <option value="paused">{t('status.paused')}</option>
                <option value="draft">{t('status.draft')}</option>
                <option value="expired">{t('status.expired')}</option>
                <option value="depleted">{t('status.depleted')}</option>
              </select>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      {t('table.code')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      {t('table.discount')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      {t('table.uses')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      {t('table.status')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      {t('table.validUntil')}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      {t('table.actions')}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {promoCodes.map((pc) => (
                    <tr key={pc.id}>
                      <td className="px-4 py-3">
                        <span className="font-mono font-medium text-gray-900 dark:text-white">
                          {pc.code}
                        </span>
                        {pc.campaign_name && (
                          <p className="text-xs text-gray-500">{pc.campaign_name}</p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white">
                        {pc.discount_formatted}
                        {pc.min_order_cents > 0 && (
                          <p className="text-xs text-gray-500">
                            {t('table.minOrder')}: €{(pc.min_order_cents / 100).toFixed(2)}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {pc.current_uses} / {pc.max_uses_total ?? '∞'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded px-2 py-1 text-xs font-medium ${getStatusColor(pc.status)}`}
                        >
                          {pc.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {pc.valid_until
                          ? new Date(pc.valid_until).toLocaleDateString()
                          : t('noExpiry')}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {pc.status === 'active' && (
                            <button
                              onClick={() => handleStatusChange(pc.id, 'paused')}
                              className="text-sm text-yellow-600 hover:text-yellow-800"
                            >
                              {t('actions.pause')}
                            </button>
                          )}
                          {pc.status === 'paused' && (
                            <button
                              onClick={() => handleStatusChange(pc.id, 'active')}
                              className="text-sm text-green-600 hover:text-green-800"
                            >
                              {t('actions.activate')}
                            </button>
                          )}
                          {pc.status === 'draft' && (
                            <button
                              onClick={() => handleStatusChange(pc.id, 'active')}
                              className="text-sm text-green-600 hover:text-green-800"
                            >
                              {t('actions.activate')}
                            </button>
                          )}
                          {pc.current_uses === 0 && (
                            <button
                              onClick={() => handleDelete(pc.id)}
                              className="text-sm text-red-600 hover:text-red-800"
                            >
                              {t('actions.delete')}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {promoCodes.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        {t('empty')}
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
                {t('create.title')}
              </h3>
              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('create.code')}
                  </label>
                  <input
                    type="text"
                    value={createForm.code}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, code: e.target.value.toUpperCase() })
                    }
                    required
                    pattern="[A-Z0-9]{3,20}"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 uppercase text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder={t('create.codePlaceholder')}
                  />
                  <p className="mt-1 text-xs text-gray-500">{t('create.codeHint')}</p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('create.discountType')}
                  </label>
                  <select
                    value={createForm.discount_type}
                    onChange={(e) =>
                      setCreateForm({
                        ...createForm,
                        discount_type: e.target.value as
                          | 'percentage'
                          | 'fixed_amount'
                          | 'free_item',
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="percentage">{t('create.percentageOff')}</option>
                    <option value="fixed_amount">{t('create.fixedAmountOff')}</option>
                    <option value="free_item">{t('create.freeItem')}</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {createForm.discount_type === 'percentage'
                      ? t('create.discountPercentage')
                      : createForm.discount_type === 'fixed_amount'
                        ? t('create.discountAmount')
                        : t('create.freeItemId')}
                  </label>
                  <input
                    type={createForm.discount_type === 'free_item' ? 'text' : 'number'}
                    value={createForm.discount_value}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, discount_value: e.target.value })
                    }
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder={createForm.discount_type === 'percentage' ? '10' : '5.00'}
                  />
                </div>
                {createForm.discount_type === 'percentage' && (
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('create.maxDiscount')}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={createForm.max_discount_cents}
                      onChange={(e) =>
                        setCreateForm({ ...createForm, max_discount_cents: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      placeholder="20.00"
                    />
                  </div>
                )}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('create.minOrder')}
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={createForm.min_order_cents}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, min_order_cents: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="25.00"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('create.totalUsesLimit')}
                    </label>
                    <input
                      type="number"
                      value={createForm.max_uses_total}
                      onChange={(e) =>
                        setCreateForm({ ...createForm, max_uses_total: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      placeholder={t('create.unlimited')}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {t('create.usesPerCustomer')}
                    </label>
                    <input
                      type="number"
                      value={createForm.max_uses_per_customer}
                      onChange={(e) =>
                        setCreateForm({ ...createForm, max_uses_per_customer: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('create.validUntil')}
                  </label>
                  <input
                    type="date"
                    value={createForm.valid_until}
                    onChange={(e) => setCreateForm({ ...createForm, valid_until: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('create.campaignName')}
                  </label>
                  <input
                    type="text"
                    value={createForm.campaign_name}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, campaign_name: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder={t('create.campaignPlaceholder')}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="first_order_only"
                    checked={createForm.first_order_only}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, first_order_only: e.target.checked })
                    }
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor="first_order_only"
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    {t('create.firstOrderOnly')}
                  </label>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('create.status')}
                  </label>
                  <select
                    value={createForm.status}
                    onChange={(e) =>
                      setCreateForm({ ...createForm, status: e.target.value as 'draft' | 'active' })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="active">{t('create.activeImmediately')}</option>
                    <option value="draft">{t('create.draftSaveForLater')}</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={creating}
                  className="w-full rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
                >
                  {creating ? t('create.creating') : t('create.submit')}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
