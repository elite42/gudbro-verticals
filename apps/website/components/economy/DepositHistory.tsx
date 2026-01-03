'use client';

import { useState, useEffect } from 'react';

interface DepositHistoryProps {
  authToken: string;
  limit?: number;
}

interface Deposit {
  id: string;
  amount_eur: number;
  points_credited: number;
  payment_method: string;
  status: string;
  created_at: string;
}

export function DepositHistory({ authToken, limit = 10 }: DepositHistoryProps) {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDeposits();
  }, [authToken, limit]);

  const fetchDeposits = async () => {
    try {
      const response = await fetch(`/api/economy/deposits?limit=${limit}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      setDeposits(data.deposits || []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      credit_card: 'Credit Card',
      debit_card: 'Debit Card',
      paypal: 'PayPal',
      apple_pay: 'Apple Pay',
      google_pay: 'Google Pay',
      bank_transfer: 'Bank Transfer',
      gift_card: 'Gift Card',
      promotional: 'Promotional',
    };
    return labels[method] || method;
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
    };
    return styles[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <p className="text-red-500">{error}</p>
        <button onClick={fetchDeposits} className="text-green-500 hover:underline mt-2">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Deposit History</h2>

      {deposits.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No deposits yet</p>
          <p className="text-sm mt-1">Add points to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {deposits.map((deposit) => (
            <div
              key={deposit.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  +
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    +{deposit.points_credited.toLocaleString()} points
                  </p>
                  <p className="text-sm text-gray-500">
                    {getPaymentMethodLabel(deposit.payment_method)} &bull;{' '}
                    {new Date(deposit.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-medium text-gray-900">
                  EUR {parseFloat(String(deposit.amount_eur)).toFixed(2)}
                </p>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                    deposit.status
                  )}`}
                >
                  {deposit.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
