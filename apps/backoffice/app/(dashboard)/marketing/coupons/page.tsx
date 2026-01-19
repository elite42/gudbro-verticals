'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/contexts/TenantContext';

interface CouponTemplate {
  id: string;
  name: string;
  description: string | null;
  code_prefix: string;
  discount_type: 'percentage' | 'fixed_amount' | 'free_item';
  discount_value: number;
  discount_formatted: string;
  distribution_type:
    | 'manual'
    | 'auto_birthday'
    | 'auto_inactivity'
    | 'auto_first_order'
    | 'auto_loyalty_tier';
  validity_days: number;
  is_stackable: boolean;
  is_active: boolean;
  min_order_cents: number;
  created_at: string;
}

interface Coupon {
  id: string;
  code: string;
  template_id: string | null;
  account_id: string;
  discount_type: 'percentage' | 'fixed_amount' | 'free_item';
  discount_value: number;
  discount_formatted: string;
  status: 'active' | 'used' | 'expired' | 'revoked';
  valid_until: string;
  redeemed_at: string | null;
  issue_reason: string | null;
  created_at: string;
}

interface CouponStats {
  total_issued: number;
  total_used: number;
  total_active: number;
  total_expired: number;
  total_revoked: number;
  total_discount_cents: number;
  usage_rate: number;
}

type TabId = 'templates' | 'coupons' | 'issue' | 'create-template';

export default function CouponsPage() {
  const { brand } = useTenant();
  const merchantId = brand?.id;
  const [activeTab, setActiveTab] = useState<TabId>('templates');
  const [templates, setTemplates] = useState<CouponTemplate[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [stats, setStats] = useState<CouponStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [templateFilter, setTemplateFilter] = useState<string>('');

  // Template create form
  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    code_prefix: 'CPN',
    discount_type: 'percentage' as 'percentage' | 'fixed_amount' | 'free_item',
    discount_value: '',
    max_discount_cents: '',
    min_order_cents: '',
    distribution_type: 'manual' as CouponTemplate['distribution_type'],
    validity_days: '30',
    is_stackable: false,
  });
  const [creatingTemplate, setCreatingTemplate] = useState(false);

  // Issue form
  const [issueForm, setIssueForm] = useState({
    template_id: '',
    account_ids: '',
    issue_reason: 'manual',
  });
  const [issuing, setIssuing] = useState(false);

  const fetchTemplates = useCallback(async () => {
    if (!merchantId) return;
    try {
      const params = new URLSearchParams({ merchantId });
      const res = await fetch(`/api/coupons/templates?${params}`);
      if (res.ok) {
        const data = await res.json();
        setTemplates(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching templates:', err);
    }
  }, [merchantId]);

  const fetchCoupons = useCallback(async () => {
    if (!merchantId) return;
    try {
      const params = new URLSearchParams({ merchantId });
      if (statusFilter) params.append('status', statusFilter);
      if (templateFilter) params.append('template_id', templateFilter);
      const res = await fetch(`/api/coupons?${params}`);
      if (res.ok) {
        const data = await res.json();
        setCoupons(data.data || []);
      }
    } catch (err) {
      console.error('Error fetching coupons:', err);
    }
  }, [merchantId, statusFilter, templateFilter]);

  const fetchStats = useCallback(async () => {
    if (!merchantId) return;
    try {
      const res = await fetch(`/api/coupons?action=stats&merchantId=${merchantId}`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, [merchantId]);

  useEffect(() => {
    if (merchantId) {
      setLoading(true);
      Promise.all([fetchTemplates(), fetchCoupons(), fetchStats()]).finally(() =>
        setLoading(false)
      );
    }
  }, [merchantId, fetchTemplates, fetchCoupons, fetchStats]);

  const handleCreateTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchantId) return;

    setCreatingTemplate(true);
    try {
      const res = await fetch('/api/coupons/templates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId,
          name: templateForm.name,
          description: templateForm.description || undefined,
          code_prefix: templateForm.code_prefix,
          discount_type: templateForm.discount_type,
          discount_value:
            templateForm.discount_type === 'fixed_amount'
              ? Math.round(parseFloat(templateForm.discount_value) * 100)
              : parseInt(templateForm.discount_value),
          max_discount_cents: templateForm.max_discount_cents
            ? Math.round(parseFloat(templateForm.max_discount_cents) * 100)
            : undefined,
          min_order_cents: templateForm.min_order_cents
            ? Math.round(parseFloat(templateForm.min_order_cents) * 100)
            : undefined,
          distribution_type: templateForm.distribution_type,
          validity_days: parseInt(templateForm.validity_days),
          is_stackable: templateForm.is_stackable,
        }),
      });

      if (res.ok) {
        setTemplateForm({
          name: '',
          description: '',
          code_prefix: 'CPN',
          discount_type: 'percentage',
          discount_value: '',
          max_discount_cents: '',
          min_order_cents: '',
          distribution_type: 'manual',
          validity_days: '30',
          is_stackable: false,
        });
        fetchTemplates();
        setActiveTab('templates');
      }
    } catch (err) {
      console.error('Error creating template:', err);
    } finally {
      setCreatingTemplate(false);
    }
  };

  const handleIssueCoupons = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!merchantId || !issueForm.template_id) return;

    setIssuing(true);
    try {
      const accountIds = issueForm.account_ids
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean);

      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'bulk-issue',
          merchantId,
          template_id: issueForm.template_id,
          account_ids: accountIds,
          issue_reason: issueForm.issue_reason,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        alert(`Issued ${result.issued} coupons (${result.failed} failed)`);
        setIssueForm({
          template_id: '',
          account_ids: '',
          issue_reason: 'manual',
        });
        fetchCoupons();
        fetchStats();
        setActiveTab('coupons');
      }
    } catch (err) {
      console.error('Error issuing coupons:', err);
    } finally {
      setIssuing(false);
    }
  };

  const handleToggleTemplate = async (id: string, isActive: boolean) => {
    try {
      const res = await fetch('/api/coupons/templates', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, merchantId, is_active: !isActive }),
      });
      if (res.ok) {
        fetchTemplates();
      }
    } catch (err) {
      console.error('Error toggling template:', err);
    }
  };

  const handleRevokeCoupon = async (id: string) => {
    if (!confirm('Revoke this coupon?')) return;
    try {
      const res = await fetch('/api/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'revoke', couponId: id }),
      });
      if (res.ok) {
        fetchCoupons();
        fetchStats();
      }
    } catch (err) {
      console.error('Error revoking coupon:', err);
    }
  };

  const getStatusColor = (status: Coupon['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'used':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      case 'revoked':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDistributionLabel = (type: CouponTemplate['distribution_type']) => {
    switch (type) {
      case 'manual':
        return 'Manual';
      case 'auto_birthday':
        return 'Birthday';
      case 'auto_inactivity':
        return 'Re-engagement';
      case 'auto_first_order':
        return 'First Order';
      case 'auto_loyalty_tier':
        return 'Loyalty Tier';
      default:
        return type;
    }
  };

  const tabs = [
    { id: 'templates' as TabId, label: 'Templates', icon: '📋' },
    { id: 'coupons' as TabId, label: 'Issued Coupons', icon: '🎟️' },
    { id: 'issue' as TabId, label: 'Issue Coupons', icon: '📤' },
    { id: 'create-template' as TabId, label: 'Create Template', icon: '➕' },
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
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Coupons</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Personalized coupons for specific customers
              </p>
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
        {(activeTab === 'templates' || activeTab === 'coupons') && stats && (
          <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Issued</p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total_issued}
              </p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
              <p className="mt-1 text-2xl font-bold text-green-600">{stats.total_active}</p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Used</p>
              <p className="mt-1 text-2xl font-bold text-blue-600">{stats.total_used}</p>
            </div>
            <div className="rounded-xl bg-white p-5 shadow-sm dark:bg-gray-800">
              <p className="text-sm text-gray-500 dark:text-gray-400">Usage Rate</p>
              <p className="mt-1 text-2xl font-bold text-purple-600">{stats.usage_rate}%</p>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="rounded-xl bg-white shadow-sm dark:bg-gray-800">
            <div className="border-b border-gray-200 p-4 dark:border-gray-700">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Coupon Templates
              </h3>
              <p className="text-sm text-gray-500">
                Templates define the discount structure. Issue coupons to customers from templates.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Discount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Distribution
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Validity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {templates.map((t) => (
                    <tr key={t.id}>
                      <td className="px-4 py-3">
                        <span className="font-medium text-gray-900 dark:text-white">{t.name}</span>
                        {t.description && <p className="text-xs text-gray-500">{t.description}</p>}
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white">
                        {t.discount_formatted}
                        {t.min_order_cents > 0 && (
                          <p className="text-xs text-gray-500">
                            Min. order: €{(t.min_order_cents / 100).toFixed(2)}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded px-2 py-1 text-xs font-medium ${
                            t.distribution_type === 'manual'
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-purple-100 text-purple-800'
                          }`}
                        >
                          {getDistributionLabel(t.distribution_type)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">{t.validity_days} days</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded px-2 py-1 text-xs font-medium ${
                            t.is_active
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {t.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleToggleTemplate(t.id, t.is_active)}
                          className={`text-sm ${
                            t.is_active
                              ? 'text-yellow-600 hover:text-yellow-800'
                              : 'text-green-600 hover:text-green-800'
                          }`}
                        >
                          {t.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {templates.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        No templates found. Create one to start issuing coupons.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Coupons Tab */}
        {activeTab === 'coupons' && (
          <div className="rounded-xl bg-white shadow-sm dark:bg-gray-800">
            <div className="flex items-center gap-4 border-b border-gray-200 p-4 dark:border-gray-700">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="used">Used</option>
                <option value="expired">Expired</option>
                <option value="revoked">Revoked</option>
              </select>
              <select
                value={templateFilter}
                onChange={(e) => setTemplateFilter(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="">All Templates</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
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
                      Discount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Reason
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Valid Until
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {coupons.map((c) => (
                    <tr key={c.id}>
                      <td className="px-4 py-3 font-mono text-sm text-gray-900 dark:text-white">
                        {c.code}
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white">
                        {c.discount_formatted}
                      </td>
                      <td className="px-4 py-3 text-sm capitalize text-gray-500">
                        {c.issue_reason?.replace(/_/g, ' ') || 'manual'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded px-2 py-1 text-xs font-medium ${getStatusColor(c.status)}`}
                        >
                          {c.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(c.valid_until).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        {c.status === 'active' && (
                          <button
                            onClick={() => handleRevokeCoupon(c.id)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Revoke
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {coupons.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                        No coupons found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Issue Tab */}
        {activeTab === 'issue' && (
          <div className="max-w-lg">
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Issue Coupons
              </h3>
              <p className="mb-4 text-sm text-gray-500">
                Issue coupons from a template to one or more customers.
              </p>
              <form onSubmit={handleIssueCoupons} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Template
                  </label>
                  <select
                    value={issueForm.template_id}
                    onChange={(e) => setIssueForm({ ...issueForm, template_id: e.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="">Select a template</option>
                    {templates
                      .filter((t) => t.is_active)
                      .map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.discount_formatted})
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Customer Account IDs
                  </label>
                  <textarea
                    value={issueForm.account_ids}
                    onChange={(e) => setIssueForm({ ...issueForm, account_ids: e.target.value })}
                    required
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="Enter account IDs separated by commas"
                  />
                  <p className="mt-1 text-xs text-gray-500">Separate multiple IDs with commas</p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Issue Reason
                  </label>
                  <select
                    value={issueForm.issue_reason}
                    onChange={(e) => setIssueForm({ ...issueForm, issue_reason: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="manual">Manual</option>
                    <option value="promotion">Promotion</option>
                    <option value="apology">Customer Apology</option>
                    <option value="loyalty_reward">Loyalty Reward</option>
                    <option value="referral">Referral</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={issuing || !issueForm.template_id}
                  className="w-full rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
                >
                  {issuing ? 'Issuing...' : 'Issue Coupons'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Create Template Tab */}
        {activeTab === 'create-template' && (
          <div className="max-w-lg">
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Create Coupon Template
              </h3>
              <form onSubmit={handleCreateTemplate} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={templateForm.name}
                    onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="Birthday 20% Off"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description (optional)
                  </label>
                  <input
                    type="text"
                    value={templateForm.description}
                    onChange={(e) =>
                      setTemplateForm({ ...templateForm, description: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="Special discount for customer birthdays"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Code Prefix
                  </label>
                  <input
                    type="text"
                    value={templateForm.code_prefix}
                    onChange={(e) =>
                      setTemplateForm({
                        ...templateForm,
                        code_prefix: e.target.value.toUpperCase(),
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 uppercase text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="CPN"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Generated codes will start with this prefix (e.g., CPN-A2B4C6D8)
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Discount Type
                  </label>
                  <select
                    value={templateForm.discount_type}
                    onChange={(e) =>
                      setTemplateForm({
                        ...templateForm,
                        discount_type: e.target.value as
                          | 'percentage'
                          | 'fixed_amount'
                          | 'free_item',
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="percentage">Percentage Off</option>
                    <option value="fixed_amount">Fixed Amount Off</option>
                    <option value="free_item">Free Item</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {templateForm.discount_type === 'percentage'
                      ? 'Discount Percentage'
                      : templateForm.discount_type === 'fixed_amount'
                        ? 'Discount Amount (EUR)'
                        : 'Free Item ID'}
                  </label>
                  <input
                    type={templateForm.discount_type === 'free_item' ? 'text' : 'number'}
                    value={templateForm.discount_value}
                    onChange={(e) =>
                      setTemplateForm({ ...templateForm, discount_value: e.target.value })
                    }
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder={templateForm.discount_type === 'percentage' ? '20' : '5.00'}
                  />
                </div>
                {templateForm.discount_type === 'percentage' && (
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Max Discount (EUR, optional)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={templateForm.max_discount_cents}
                      onChange={(e) =>
                        setTemplateForm({ ...templateForm, max_discount_cents: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                      placeholder="10.00"
                    />
                  </div>
                )}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Minimum Order (EUR, optional)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={templateForm.min_order_cents}
                    onChange={(e) =>
                      setTemplateForm({ ...templateForm, min_order_cents: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="15.00"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Distribution Type
                  </label>
                  <select
                    value={templateForm.distribution_type}
                    onChange={(e) =>
                      setTemplateForm({
                        ...templateForm,
                        distribution_type: e.target.value as CouponTemplate['distribution_type'],
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  >
                    <option value="manual">Manual (Issue manually)</option>
                    <option value="auto_birthday">Auto - Birthday</option>
                    <option value="auto_inactivity">
                      Auto - Re-engagement (Inactive customers)
                    </option>
                    <option value="auto_first_order">Auto - First Order Reward</option>
                    <option value="auto_loyalty_tier">Auto - Loyalty Tier Upgrade</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Validity (days)
                  </label>
                  <input
                    type="number"
                    value={templateForm.validity_days}
                    onChange={(e) =>
                      setTemplateForm({ ...templateForm, validity_days: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    How many days the coupon is valid after issuance
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="is_stackable"
                    checked={templateForm.is_stackable}
                    onChange={(e) =>
                      setTemplateForm({ ...templateForm, is_stackable: e.target.checked })
                    }
                    className="h-4 w-4"
                  />
                  <label
                    htmlFor="is_stackable"
                    className="text-sm text-gray-700 dark:text-gray-300"
                  >
                    Stackable with other discounts
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={creatingTemplate}
                  className="w-full rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:opacity-50"
                >
                  {creatingTemplate ? 'Creating...' : 'Create Template'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
