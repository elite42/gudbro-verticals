'use client';

/**
 * WalletDashboard Component
 *
 * Displays customer wallet information for backoffice staff:
 * - Balance and bonus balance
 * - Bonus tiers configuration
 * - Transaction history
 * - Top-up actions (cash/stripe)
 */

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface WalletBalance {
  balance_cents: number;
  bonus_balance_cents: number;
  total_cents: number;
  currency: string;
  formatted: {
    balance: string;
    bonus: string;
    total: string;
  };
}

interface WalletTransaction {
  id: string;
  transaction_type: string;
  amount_cents: number;
  bonus_amount_cents: number;
  balance_after_cents: number;
  description: string | null;
  created_at: string;
  amount_formatted?: string;
  bonus_formatted?: string;
  balance_formatted?: string;
}

interface BonusTier {
  id: string;
  min_amount_cents: number;
  bonus_percent: number;
  tier_name: string | null;
  min_amount_formatted?: string;
}

interface WalletDashboardProps {
  accountId: string;
  merchantId: string;
  walletId?: string;
  onTopUpComplete?: () => void;
}

export function WalletDashboard({
  accountId,
  merchantId,
  walletId: initialWalletId,
  onTopUpComplete,
}: WalletDashboardProps) {
  const [walletId, setWalletId] = useState<string | null>(initialWalletId || null);
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [tiers, setTiers] = useState<BonusTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Top-up state
  const [topUpAmount, setTopUpAmount] = useState<string>('');
  const [topUpLoading, setTopUpLoading] = useState(false);
  const [topUpNotes, setTopUpNotes] = useState<string>('');
  const [bonusPreview, setBonusPreview] = useState<{
    bonus_cents: number;
    bonus_percent: number;
    total_cents: number;
    total_formatted: string;
  } | null>(null);

  // Fetch wallet balance
  const fetchBalance = useCallback(async () => {
    try {
      const res = await fetch(`/api/wallet?accountId=${accountId}&merchantId=${merchantId}`);
      if (!res.ok) throw new Error('Failed to fetch balance');
      const data = await res.json();
      setBalance({
        balance_cents: data.balance_cents,
        bonus_balance_cents: data.bonus_balance_cents,
        total_cents: data.total_cents,
        currency: data.currency,
        formatted: data.formatted,
      });
      if (data.wallet_id) {
        setWalletId(data.wallet_id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    }
  }, [accountId, merchantId]);

  // Fetch transactions
  const fetchTransactions = useCallback(async () => {
    if (!walletId) return;
    try {
      const res = await fetch(`/api/wallet?action=transactions&walletId=${walletId}&limit=20`);
      if (!res.ok) throw new Error('Failed to fetch transactions');
      const data = await res.json();
      setTransactions(data.transactions || []);
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    }
  }, [walletId]);

  // Fetch bonus tiers
  const fetchTiers = useCallback(async () => {
    try {
      const res = await fetch(`/api/wallet?action=tiers&merchantId=${merchantId}`);
      if (!res.ok) throw new Error('Failed to fetch tiers');
      const data = await res.json();
      setTiers(data.tiers || []);
    } catch (err) {
      console.error('Failed to fetch tiers:', err);
    }
  }, [merchantId]);

  // Fetch bonus preview for amount
  const fetchBonusPreview = useCallback(
    async (amountCents: number) => {
      if (amountCents <= 0) {
        setBonusPreview(null);
        return;
      }
      try {
        const res = await fetch(
          `/api/wallet?action=preview&merchantId=${merchantId}&amount=${amountCents}`
        );
        if (!res.ok) throw new Error('Failed to preview');
        const data = await res.json();
        setBonusPreview({
          bonus_cents: data.bonus_cents,
          bonus_percent: data.bonus_percent,
          total_cents: data.total_cents,
          total_formatted: data.total_formatted,
        });
      } catch {
        setBonusPreview(null);
      }
    },
    [merchantId]
  );

  // Handle amount change with debounced preview
  useEffect(() => {
    const amountCents = Math.round(parseFloat(topUpAmount || '0') * 100);
    const timer = setTimeout(() => {
      fetchBonusPreview(amountCents);
    }, 300);
    return () => clearTimeout(timer);
  }, [topUpAmount, fetchBonusPreview]);

  // Process cash top-up
  const handleCashTopUp = async () => {
    if (!walletId || !topUpAmount) return;
    const amountCents = Math.round(parseFloat(topUpAmount) * 100);
    if (amountCents <= 0) return;

    setTopUpLoading(true);
    try {
      const res = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'cash-topup',
          walletId,
          amountCents,
          processedBy: accountId, // In real use, this should be staff account ID
          notes: topUpNotes || undefined,
          accountId,
          merchantId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Top-up failed');
      }

      // Refresh data
      await fetchBalance();
      await fetchTransactions();

      // Reset form
      setTopUpAmount('');
      setTopUpNotes('');
      setBonusPreview(null);

      onTopUpComplete?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Top-up failed');
    } finally {
      setTopUpLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    setLoading(true);
    Promise.all([fetchBalance(), fetchTiers()]).finally(() => setLoading(false));
  }, [fetchBalance, fetchTiers]);

  // Fetch transactions when walletId is available
  useEffect(() => {
    if (walletId) {
      fetchTransactions();
    }
  }, [walletId, fetchTransactions]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-muted-foreground animate-pulse">Loading wallet...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-red-800">{error}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => {
            setError(null);
            fetchBalance();
          }}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <Card>
        <CardHeader>
          <CardTitle>Wallet Balance</CardTitle>
          <CardDescription>Customer prepaid wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-4">
              <div className="text-sm text-blue-600">Main Balance</div>
              <div className="text-2xl font-bold text-blue-900">
                {balance?.formatted.balance || '$0.00'}
              </div>
            </div>
            <div className="rounded-lg bg-green-50 p-4">
              <div className="text-sm text-green-600">Bonus Balance</div>
              <div className="text-2xl font-bold text-green-900">
                {balance?.formatted.bonus || '$0.00'}
              </div>
            </div>
            <div className="rounded-lg bg-purple-50 p-4">
              <div className="text-sm text-purple-600">Total Available</div>
              <div className="text-2xl font-bold text-purple-900">
                {balance?.formatted.total || '$0.00'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bonus Tiers */}
      {tiers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Bonus Tiers</CardTitle>
            <CardDescription>Top-up bonuses based on amount</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 md:grid-cols-3">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div>
                    <div className="font-medium">
                      {tier.tier_name || `${tier.min_amount_formatted}+`}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      Min: {tier.min_amount_formatted}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-green-600">+{tier.bonus_percent}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cash Top-Up Form */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Top-Up</CardTitle>
          <CardDescription>Process a cash top-up for this customer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="topup-amount">Amount ({balance?.currency || 'USD'})</Label>
              <Input
                id="topup-amount"
                type="number"
                min="1"
                step="0.01"
                placeholder="50.00"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                disabled={topUpLoading}
              />
              {bonusPreview && bonusPreview.bonus_cents > 0 && (
                <div className="text-sm text-green-600">
                  +{bonusPreview.bonus_percent}% bonus = {bonusPreview.total_formatted} total
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="topup-notes">Notes (optional)</Label>
              <Input
                id="topup-notes"
                type="text"
                placeholder="Payment reference or notes"
                value={topUpNotes}
                onChange={(e) => setTopUpNotes(e.target.value)}
                disabled={topUpLoading}
              />
            </div>
          </div>
          <Button
            className="mt-4"
            onClick={handleCashTopUp}
            disabled={!topUpAmount || topUpLoading || !walletId}
          >
            {topUpLoading ? 'Processing...' : 'Process Cash Top-Up'}
          </Button>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Recent wallet transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-muted-foreground py-8 text-center">No transactions yet</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Bonus</TableHead>
                  <TableHead>Balance After</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(tx.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          tx.transaction_type.includes('top_up')
                            ? 'bg-green-100 text-green-800'
                            : tx.transaction_type === 'payment'
                              ? 'bg-blue-100 text-blue-800'
                              : tx.transaction_type === 'refund'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {tx.transaction_type.replace(/_/g, ' ')}
                      </span>
                    </TableCell>
                    <TableCell className={tx.amount_cents >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {tx.amount_formatted ||
                        `${tx.amount_cents >= 0 ? '+' : ''}${(tx.amount_cents / 100).toFixed(2)}`}
                    </TableCell>
                    <TableCell className="text-green-600">
                      {tx.bonus_amount_cents > 0
                        ? tx.bonus_formatted || `+${(tx.bonus_amount_cents / 100).toFixed(2)}`
                        : '-'}
                    </TableCell>
                    <TableCell>
                      {tx.balance_formatted || (tx.balance_after_cents / 100).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px] truncate text-sm">
                      {tx.description || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default WalletDashboard;
