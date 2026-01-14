'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTenant } from '@/lib/contexts/TenantContext';

export const dynamic = 'force-dynamic';

interface Voucher {
  id: string;
  conventionId: string;
  voucherCode: string;
  userName: string | null;
  userEmail: string | null;
  badgeNumber: string | null;
  validFrom: string;
  validUntil: string | null;
  maxUses: number;
  timesUsed: number;
  isActive: boolean;
  lastUsedAt: string | null;
  totalSavings: number;
}

interface Convention {
  id: string;
  conventionName: string;
  partnerName: string;
  benefitType: string;
  benefitValue: number | null;
}

export default function VouchersPage() {
  const { location, isLoading: tenantLoading } = useTenant();
  const searchParams = useSearchParams();
  const conventionIdParam = searchParams.get('convention');

  const [conventions, setConventions] = useState<Convention[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedConvention, setSelectedConvention] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [bulkCount, setBulkCount] = useState(10);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [deactivating, setDeactivating] = useState<string | null>(null);

  // Filter
  const [showInactive, setShowInactive] = useState(false);

  // Fetch conventions
  useEffect(() => {
    async function fetchConventions() {
      if (!location?.id) return;

      try {
        const res = await fetch(
          `/api/ai/conventions?action=list-conventions&merchantId=${location.id}&isActive=true`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setConventions(data.conventions || []);
            // Auto-select if URL param
            if (
              conventionIdParam &&
              data.conventions?.some((c: Convention) => c.id === conventionIdParam)
            ) {
              setSelectedConvention(conventionIdParam);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching conventions:', error);
      }
    }

    if (!tenantLoading) {
      fetchConventions();
    }
  }, [location?.id, tenantLoading, conventionIdParam]);

  // Fetch vouchers when convention selected
  useEffect(() => {
    async function fetchVouchers() {
      if (!selectedConvention) {
        setVouchers([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `/api/ai/conventions?action=list-vouchers&conventionId=${selectedConvention}`
        );
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setVouchers(data.vouchers || []);
          }
        }
      } catch (error) {
        console.error('Error fetching vouchers:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVouchers();
  }, [selectedConvention]);

  const filteredVouchers = useMemo(() => {
    return vouchers.filter((v) => {
      if (!showInactive && !v.isActive) return false;
      return true;
    });
  }, [vouchers, showInactive]);

  const handleGenerateSingle = async () => {
    if (!selectedConvention || !location?.id) return;

    setGenerating(true);
    try {
      const res = await fetch('/api/ai/conventions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: location.id,
          action: 'create-voucher',
          conventionId: selectedConvention,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.voucher) {
          setVouchers((prev) => [data.voucher, ...prev]);
        }
      }
    } catch (error) {
      console.error('Error generating voucher:', error);
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerateBulk = async () => {
    if (!selectedConvention || !location?.id || bulkCount < 1) return;

    setGenerating(true);
    try {
      const res = await fetch('/api/ai/conventions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: location.id,
          action: 'create-bulk-vouchers',
          conventionId: selectedConvention,
          count: Math.min(bulkCount, 100),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.vouchers) {
          setVouchers((prev) => [...data.vouchers, ...prev]);
        }
      }
    } catch (error) {
      console.error('Error generating vouchers:', error);
    } finally {
      setGenerating(false);
      setShowBulkModal(false);
    }
  };

  const handleDeactivate = async (voucherId: string) => {
    setDeactivating(voucherId);
    try {
      const res = await fetch('/api/ai/conventions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'deactivate-voucher',
          voucherId,
          reason: 'Manual deactivation',
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setVouchers((prev) =>
            prev.map((v) => (v.id === voucherId ? { ...v, isActive: false } : v))
          );
        }
      }
    } catch (error) {
      console.error('Error deactivating voucher:', error);
    } finally {
      setDeactivating(null);
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const isLoading = loading || tenantLoading;
  const selectedConventionData = conventions.find((c) => c.id === selectedConvention);

  const activeVouchers = vouchers.filter((v) => v.isActive).length;
  const totalUsed = vouchers.reduce((sum, v) => sum + v.timesUsed, 0);
  const totalSavings = vouchers.reduce((sum, v) => sum + v.totalSavings, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/partnerships" className="hover:text-gray-700">
              Partnerships
            </Link>
            <span>/</span>
            <Link href="/partnerships/conventions" className="hover:text-gray-700">
              Conventions
            </Link>
            <span>/</span>
            <span>Vouchers</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Vouchers</h1>
          <p className="mt-1 text-gray-600">
            Generate and manage voucher codes for convention partners.
          </p>
        </div>
        {selectedConvention && (
          <div className="flex gap-2">
            <button
              onClick={handleGenerateSingle}
              disabled={generating}
              className="flex items-center gap-2 rounded-lg border border-purple-600 px-4 py-2 text-sm font-medium text-purple-600 hover:bg-purple-50 disabled:opacity-50"
            >
              {generating ? 'Generating...' : 'Generate 1'}
            </button>
            <button
              onClick={() => setShowBulkModal(true)}
              disabled={generating}
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Bulk Generate
            </button>
          </div>
        )}
      </div>

      {/* Convention Selector */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <label className="block text-sm font-medium text-gray-700">Select Convention</label>
        <select
          value={selectedConvention}
          onChange={(e) => setSelectedConvention(e.target.value)}
          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <option value="">Choose a convention...</option>
          {conventions.map((conv) => (
            <option key={conv.id} value={conv.id}>
              {conv.conventionName} ({conv.partnerName})
            </option>
          ))}
        </select>
        {selectedConventionData && (
          <div className="mt-2 text-sm text-gray-500">
            Benefit: {selectedConventionData.benefitType.replace('_', ' ')}
            {selectedConventionData.benefitValue && ` (${selectedConventionData.benefitValue})`}
          </div>
        )}
      </div>

      {/* Stats */}
      {selectedConvention && !isLoading && (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="text-sm font-medium text-gray-500">Active Vouchers</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{activeVouchers}</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="text-sm font-medium text-gray-500">Total Uses</div>
            <div className="mt-1 text-2xl font-bold text-gray-900">{totalUsed}</div>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="text-sm font-medium text-gray-500">Total Savings</div>
            <div className="mt-1 text-2xl font-bold text-green-600">
              €{totalSavings.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      {selectedConvention && (
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={showInactive}
              onChange={(e) => setShowInactive(e.target.checked)}
              className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            Show deactivated
          </label>
          {filteredVouchers.length > 0 && (
            <span className="ml-auto text-sm text-gray-500">
              {filteredVouchers.length} voucher{filteredVouchers.length !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      )}

      {/* Loading State */}
      {isLoading && selectedConvention && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-lg border border-gray-200 bg-white p-4">
              <div className="h-6 w-1/3 rounded bg-gray-200" />
              <div className="mt-2 h-4 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      )}

      {/* Vouchers List */}
      {!isLoading && selectedConvention && filteredVouchers.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Usage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredVouchers.map((voucher) => (
                <tr key={voucher.id} className={voucher.isActive ? '' : 'bg-gray-50 text-gray-400'}>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">
                        {voucher.voucherCode}
                      </code>
                      <button
                        onClick={() => copyToClipboard(voucher.voucherCode)}
                        className="text-gray-400 hover:text-gray-600"
                        title="Copy code"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {voucher.userName || voucher.userEmail || voucher.badgeNumber || (
                      <span className="text-gray-400">Anonymous</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className="font-medium">{voucher.timesUsed}</span>
                    <span className="text-gray-400"> / {voucher.maxUses}</span>
                    {voucher.totalSavings > 0 && (
                      <span className="ml-2 text-green-600">
                        (€{voucher.totalSavings.toFixed(2)} saved)
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        voucher.isActive
                          ? voucher.timesUsed >= voucher.maxUses
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {!voucher.isActive
                        ? 'Deactivated'
                        : voucher.timesUsed >= voucher.maxUses
                          ? 'Exhausted'
                          : 'Active'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                    {voucher.isActive && (
                      <button
                        onClick={() => handleDeactivate(voucher.id)}
                        disabled={deactivating === voucher.id}
                        className="text-red-600 hover:text-red-700 disabled:opacity-50"
                      >
                        {deactivating === voucher.id ? '...' : 'Deactivate'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Empty States */}
      {!selectedConvention && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Select a Convention</h3>
          <p className="mt-2 text-sm text-gray-500">
            Choose a convention from the dropdown above to view and manage its vouchers.
          </p>
        </div>
      )}

      {selectedConvention && !isLoading && filteredVouchers.length === 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {vouchers.length === 0 ? 'No vouchers yet' : 'No active vouchers'}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            {vouchers.length === 0
              ? 'Generate vouchers to share with convention partners.'
              : 'Enable "Show deactivated" to see all vouchers.'}
          </p>
          {vouchers.length === 0 && (
            <button
              onClick={handleGenerateSingle}
              disabled={generating}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
            >
              {generating ? 'Generating...' : 'Generate First Voucher'}
            </button>
          )}
        </div>
      )}

      {/* Bulk Generate Modal */}
      {showBulkModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => !generating && setShowBulkModal(false)}
        >
          <div
            className="mx-4 w-full max-w-md rounded-xl bg-white p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold text-gray-900">Bulk Generate Vouchers</h2>
            <p className="mt-2 text-sm text-gray-500">
              Generate multiple vouchers at once for distribution.
            </p>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Number of Vouchers</label>
              <input
                type="number"
                min="1"
                max="100"
                value={bulkCount}
                onChange={(e) =>
                  setBulkCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))
                }
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <p className="mt-1 text-xs text-gray-500">Maximum 100 vouchers per batch</p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowBulkModal(false)}
                disabled={generating}
                className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateBulk}
                disabled={generating}
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
              >
                {generating ? 'Generating...' : `Generate ${bulkCount} Vouchers`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
