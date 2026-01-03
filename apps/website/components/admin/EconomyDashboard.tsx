'use client';

import { useState, useEffect } from 'react';

interface EconomyDashboardProps {
  authToken: string;
}

interface DashboardData {
  total_float_eur: number;
  float_last_30_days_eur: number;
  total_outstanding_points: number;
  total_points_ever_issued: number;
  total_points_redeemed: number;
  total_expired_points: number;
  total_breakage_eur: number;
  outstanding_liability_eur: number;
  expiring_soon_liability_eur: number;
  total_revenue_shared_eur: number;
  pending_revenue_share_eur: number;
  accounts_with_points: number;
  deposits_last_30_days: number;
  recentDeposits: Array<{
    id: string;
    amount_eur: number;
    points_credited: number;
    payment_method: string;
    created_at: string;
  }>;
  breakageRecords: Array<{
    id: string;
    period_start: string;
    period_end: string;
    points_expired: number;
    breakage_eur: number;
    status: string;
  }>;
}

export function EconomyDashboard({ authToken }: EconomyDashboardProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, [authToken]);

  const fetchDashboard = async () => {
    try {
      const response = await fetch('/api/admin/economy/dashboard', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Admin access required');
        }
        throw new Error('Failed to fetch');
      }

      const result = await response.json();
      setData(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-200 rounded-xl" />
          <div className="h-64 bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchDashboard}
          className="text-green-500 hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat('en-EU').format(value);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Points Economy Dashboard</h1>
        <button
          onClick={fetchDashboard}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Refresh
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Float */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-75">Total Float</span>
            <span className="text-2xl">&#128176;</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(data.total_float_eur)}</p>
          <p className="text-sm opacity-75 mt-1">
            +{formatCurrency(data.float_last_30_days_eur)} last 30 days
          </p>
        </div>

        {/* Outstanding Points */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-75">Outstanding Points</span>
            <span className="text-2xl">&#128178;</span>
          </div>
          <p className="text-2xl font-bold">{formatNumber(data.total_outstanding_points)}</p>
          <p className="text-sm opacity-75 mt-1">
            Liability: {formatCurrency(data.outstanding_liability_eur)}
          </p>
        </div>

        {/* Breakage Revenue */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-75">Breakage Revenue</span>
            <span className="text-2xl">&#128200;</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(data.total_breakage_eur)}</p>
          <p className="text-sm opacity-75 mt-1">
            {formatNumber(data.total_expired_points)} points expired
          </p>
        </div>

        {/* Revenue Shared */}
        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm opacity-75">Revenue Shared</span>
            <span className="text-2xl">&#129309;</span>
          </div>
          <p className="text-2xl font-bold">{formatCurrency(data.total_revenue_shared_eur)}</p>
          <p className="text-sm opacity-75 mt-1">
            {formatCurrency(data.pending_revenue_share_eur)} pending
          </p>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Total Points Issued</p>
          <p className="text-xl font-bold text-gray-900">
            {formatNumber(data.total_points_ever_issued)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Points Redeemed</p>
          <p className="text-xl font-bold text-gray-900">
            {formatNumber(data.total_points_redeemed)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Accounts with Points</p>
          <p className="text-xl font-bold text-gray-900">
            {formatNumber(data.accounts_with_points)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <p className="text-sm text-gray-500">Expiring Soon</p>
          <p className="text-xl font-bold text-orange-600">
            {formatCurrency(data.expiring_soon_liability_eur)}
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Deposits */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Recent Deposits</h3>
          {data.recentDeposits?.length > 0 ? (
            <div className="space-y-3">
              {data.recentDeposits.slice(0, 5).map((deposit) => (
                <div
                  key={deposit.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      +{formatNumber(deposit.points_credited)} pts
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(deposit.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="font-medium text-green-600">
                    {formatCurrency(deposit.amount_eur)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent deposits</p>
          )}
        </div>

        {/* Breakage Records */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Breakage Records</h3>
          {data.breakageRecords?.length > 0 ? (
            <div className="space-y-3">
              {data.breakageRecords.slice(0, 5).map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {new Date(record.period_start).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatNumber(record.points_expired)} pts expired
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-purple-600">
                      {formatCurrency(record.breakage_eur)}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        record.status === 'distributed'
                          ? 'bg-green-100 text-green-700'
                          : record.status === 'finalized'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {record.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No breakage records</p>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">&#8505;</span>
          <div>
            <p className="font-medium text-blue-900">Points Economy Model</p>
            <p className="text-sm text-blue-700 mt-1">
              Customer deposits create float that can be invested in treasury bonds (~4% annual return).
              Points expire after 24 months, creating breakage revenue. Partner merchants share in both
              float returns and breakage based on their tier (Standard: 20%/10%, Premium: 30%/15%, Founding: 40%/20%).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
