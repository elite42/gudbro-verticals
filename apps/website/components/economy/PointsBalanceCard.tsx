'use client';

import { useState, useEffect } from 'react';

interface PointsBalanceCardProps {
  authToken?: string;
  showDepositButton?: boolean;
  onDeposit?: () => void;
}

interface BalanceData {
  pointsBalance: number;
  expiring3Months: number;
  expiring6Months: number;
  nextExpiryDate: string | null;
  nextExpiryAmount: number;
}

export function PointsBalanceCard({
  authToken,
  showDepositButton = true,
  onDeposit,
}: PointsBalanceCardProps) {
  const [data, setData] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authToken) {
      fetchData();
    }
  }, [authToken]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/economy/expiry', {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!response.ok) throw new Error('Failed to fetch');

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
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="h-12 bg-gray-200 rounded w-1/2 mb-6" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <p className="text-red-500">{error}</p>
        <button onClick={fetchData} className="text-green-500 hover:underline mt-2">
          Retry
        </button>
      </div>
    );
  }

  const pointValue = (data?.pointsBalance || 0) * 0.01;
  const hasExpiringPoints = (data?.expiring3Months || 0) > 0;

  return (
    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium opacity-90">Your Points</h2>
        <div className="bg-white/20 rounded-full px-3 py-1 text-sm">
          1 pt = 0.01 EUR
        </div>
      </div>

      {/* Balance */}
      <div className="mb-6">
        <div className="text-4xl font-bold mb-1">
          {data?.pointsBalance?.toLocaleString() || 0}
          <span className="text-xl font-normal opacity-75 ml-2">pts</span>
        </div>
        <div className="text-lg opacity-90">
          = EUR {pointValue.toFixed(2)}
        </div>
      </div>

      {/* Expiry Warning */}
      {hasExpiringPoints && (
        <div className="bg-yellow-500/20 rounded-xl p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">&#9888;</div>
            <div>
              <p className="font-medium">Points expiring soon</p>
              <p className="text-sm opacity-90">
                {data?.expiring3Months?.toLocaleString()} points expire in the next 3 months
              </p>
              {data?.nextExpiryDate && (
                <p className="text-xs opacity-75 mt-1">
                  Next: {data.nextExpiryAmount?.toLocaleString()} pts on{' '}
                  {new Date(data.nextExpiryDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Expiry Breakdown */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-sm opacity-75">Expiring in 6 months</p>
          <p className="text-xl font-bold">
            {data?.expiring6Months?.toLocaleString() || 0}
          </p>
        </div>
        <div className="bg-white/10 rounded-xl p-3">
          <p className="text-sm opacity-75">Next expiry</p>
          <p className="text-xl font-bold">
            {data?.nextExpiryDate
              ? new Date(data.nextExpiryDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              : 'None'}
          </p>
        </div>
      </div>

      {/* Deposit Button */}
      {showDepositButton && (
        <button
          onClick={onDeposit}
          className="w-full bg-white text-green-600 font-semibold py-3 px-4 rounded-xl hover:bg-green-50 transition-colors"
        >
          + Add Points
        </button>
      )}
    </div>
  );
}
