'use client';

import { useState, useEffect } from 'react';

interface MerchantEconomyDashboardProps {
  authToken: string;
}

interface DashboardData {
  merchant: {
    id: string;
    business_name: string;
    partner_tier: string;
  };
  dashboard: {
    partnerTier: string;
    totalPointsEarned: number;
    totalPointsRedeemed: number;
    totalRevenueEarnedEur: number;
    pendingRevenueEur: number;
    lastPayoutDate: string | null;
    lastPayoutAmount: number;
    nextPayoutEstimate: number;
  };
  revenueShares: Array<{
    id: string;
    periodMonth: string;
    pointsEarned: number;
    pointsRedeemed: number;
    floatReturnShare: number;
    breakageShare: number;
    totalRevenue: number;
    status: string;
    paidAt: string | null;
  }>;
  tierBenefits: {
    floatShare: number;
    breakageShare: number;
    description: string;
  };
}

export function MerchantEconomyDashboard({ authToken }: MerchantEconomyDashboardProps) {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, [authToken]);

  const fetchDashboard = async () => {
    try {
      const response = await fetch('/api/merchant/economy', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!response.ok) {
        if (response.status === 403) {
          throw new Error('Merchant access required');
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
        <div className="h-32 bg-gray-200 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl" />
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-xl" />
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

  const getTierColor = (tier: string) => {
    const colors: Record<string, string> = {
      standard: 'from-gray-500 to-gray-600',
      premium: 'from-blue-500 to-blue-600',
      founding: 'from-amber-500 to-amber-600',
    };
    return colors[tier] || colors.standard;
  };

  const getTierBadge = (tier: string) => {
    const badges: Record<string, string> = {
      standard: 'Standard Partner',
      premium: 'Premium Partner',
      founding: 'Founding Partner',
    };
    return badges[tier] || 'Partner';
  };

  return (
    <div className="space-y-6">
      {/* Header with Tier */}
      <div
        className={`bg-gradient-to-r ${getTierColor(
          data.dashboard.partnerTier
        )} rounded-2xl p-6 text-white`}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm opacity-75 mb-1">GudBro Partner Program</div>
            <h1 className="text-2xl font-bold">
              {getTierBadge(data.dashboard.partnerTier)}
            </h1>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">
              {formatCurrency(data.dashboard.totalRevenueEarnedEur)}
            </div>
            <div className="text-sm opacity-75">Total Earned</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
          <div>
            <div className="text-sm opacity-75">Float Return Share</div>
            <div className="text-xl font-bold">
              {(data.tierBenefits.floatShare * 100).toFixed(0)}%
            </div>
          </div>
          <div>
            <div className="text-sm opacity-75">Breakage Share</div>
            <div className="text-xl font-bold">
              {(data.tierBenefits.breakageShare * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Pending Revenue</span>
            <span className="text-xl">&#128176;</span>
          </div>
          <p className="text-2xl font-bold text-green-600">
            {formatCurrency(data.dashboard.pendingRevenueEur)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Next payout: {formatCurrency(data.dashboard.nextPayoutEstimate)}
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Points Earned</span>
            <span className="text-xl">&#128200;</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatNumber(data.dashboard.totalPointsEarned)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            At your restaurant
          </p>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500">Points Redeemed</span>
            <span className="text-xl">&#127873;</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {formatNumber(data.dashboard.totalPointsRedeemed)}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            By customers
          </p>
        </div>
      </div>

      {/* Last Payout */}
      {data.dashboard.lastPayoutDate && (
        <div className="bg-green-50 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-green-700">Last Payout</p>
            <p className="font-medium text-green-900">
              {new Date(data.dashboard.lastPayoutDate).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(data.dashboard.lastPayoutAmount)}
            </p>
          </div>
        </div>
      )}

      {/* Revenue History */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Revenue History</h3>

        {data.revenueShares.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Period</th>
                  <th className="pb-3 font-medium text-right">Points</th>
                  <th className="pb-3 font-medium text-right">Float Return</th>
                  <th className="pb-3 font-medium text-right">Breakage</th>
                  <th className="pb-3 font-medium text-right">Total</th>
                  <th className="pb-3 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.revenueShares.map((share) => (
                  <tr key={share.id} className="border-b border-gray-100">
                    <td className="py-3">
                      {new Date(share.periodMonth).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3 text-right text-gray-600">
                      {formatNumber(share.pointsEarned + share.pointsRedeemed)}
                    </td>
                    <td className="py-3 text-right text-gray-600">
                      {formatCurrency(share.floatReturnShare)}
                    </td>
                    <td className="py-3 text-right text-gray-600">
                      {formatCurrency(share.breakageShare)}
                    </td>
                    <td className="py-3 text-right font-medium">
                      {formatCurrency(share.totalRevenue)}
                    </td>
                    <td className="py-3 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          share.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : share.status === 'approved'
                            ? 'bg-blue-100 text-blue-700'
                            : share.status === 'held'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {share.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No revenue history yet</p>
            <p className="text-sm mt-1">
              Revenue is calculated monthly based on points activity at your restaurant
            </p>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">&#128161;</span>
          <div>
            <p className="font-medium text-blue-900">How Partner Revenue Works</p>
            <p className="text-sm text-blue-700 mt-1">
              As a {getTierBadge(data.dashboard.partnerTier).toLowerCase()}, you earn a{' '}
              {(data.tierBenefits.floatShare * 100).toFixed(0)}% share of float investment returns
              and a {(data.tierBenefits.breakageShare * 100).toFixed(0)}% share of expired points
              (breakage) proportional to customer activity at your restaurant.
              Payouts are processed monthly with a minimum of EUR 50.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
