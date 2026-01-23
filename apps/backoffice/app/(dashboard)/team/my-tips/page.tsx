'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useTenant } from '@/lib/contexts/TenantContext';
import { EmptyState } from '@/components/ui/empty-state';
import { InfoTooltip } from '@/components/ui/info-tooltip';

// Types
interface StaffProfile {
  id: string;
  displayName: string;
  photoUrl?: string;
  jobTitle: string;
}

interface TipAllocation {
  id: string;
  amount: number;
  source: 'individual_order' | 'pool_share' | 'adjustment';
  isPaid: boolean;
  paidAt?: string;
  paymentMethod?: string;
  createdAt: string;
}

interface TipSummary {
  totalEarned: number;
  totalPaid: number;
  pendingPayment: number;
  currentPeriodEarnings: number;
  currentPeriod: {
    id: string;
    periodStart: string;
    periodEnd: string;
    status: 'open' | 'closed' | 'distributed';
  } | null;
}

export default function MyTipsPage() {
  const t = useTranslations('teamPage');
  const { location, brand } = useTenant();
  const merchantId = location?.id || brand?.id;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<TipSummary | null>(null);
  const [allocations, setAllocations] = useState<TipAllocation[]>([]);
  const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all');
  const [staffProfile, setStaffProfile] = useState<StaffProfile | null>(null);

  // Load tips data
  const loadData = useCallback(async () => {
    if (!merchantId) return;

    setIsLoading(true);
    setError(null);

    try {
      // First, get current user's staff profile
      const profileRes = await fetch(
        `/api/staff?locationId=${merchantId}&type=current-user-profile`
      );
      const profileData = await profileRes.json();

      if (!profileData.success || !profileData.profile) {
        setStaffProfile(null);
        setIsLoading(false);
        return;
      }

      const profile = profileData.profile;
      setStaffProfile({
        id: profile.id,
        displayName: profile.displayName,
        photoUrl: profile.photoUrl,
        jobTitle: profile.jobTitle,
      });

      // Now load tips for this staff
      const res = await fetch(
        `/api/tips?merchantId=${merchantId}&type=my-tips&staffId=${profile.id}`
      );
      const data = await res.json();

      if (data.success) {
        setSummary(data.summary);
        setAllocations(data.allocations || []);
      } else {
        setError(data.error || 'Errore nel caricamento');
      }
    } catch (err) {
      console.error('Error loading tips:', err);
      setError('Errore nel caricamento dei dati');
    } finally {
      setIsLoading(false);
    }
  }, [merchantId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Filter allocations
  const filteredAllocations = allocations.filter((a) => {
    if (filter === 'paid') return a.isPaid;
    if (filter === 'pending') return !a.isPaid;
    return true;
  });

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  // Format date
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Get source label
  const getSourceLabel = (source: string) => {
    switch (source) {
      case 'individual_order':
        return { label: 'Ordine Diretto', icon: '🧾', color: 'text-blue-600 bg-blue-100' };
      case 'pool_share':
        return { label: 'Pool Condiviso', icon: '👥', color: 'text-purple-600 bg-purple-100' };
      case 'adjustment':
        return { label: 'Correzione', icon: '📝', color: 'text-orange-600 bg-orange-100' };
      default:
        return { label: source, icon: '💰', color: 'text-gray-600 bg-gray-100' };
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  // No staff profile
  if (!staffProfile) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Le Mie Mance</h1>
          <p className="mt-1 text-sm text-gray-500">Visualizza le mance guadagnate</p>
        </div>
        <EmptyState
          icon={<span className="text-5xl">👤</span>}
          title="Profilo non trovato"
          description="Non sei associato a un profilo staff. Contatta il manager per essere aggiunto al sistema."
          variant="default"
          size="default"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Le Mie Mance</h1>
            <InfoTooltip contentKey="tips.myTips" kbPageId="tips" />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {staffProfile?.displayName} • Visualizza le mance guadagnate
          </p>
        </div>
        <button
          onClick={loadData}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          🔄 Aggiorna
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          ❌ {error}
        </div>
      )}

      {/* Summary Cards */}
      {summary && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Total Earned */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-3">
              <span className="text-2xl">💰</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">Totale Guadagnato</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {formatCurrency(summary.totalEarned)}
              </p>
            </div>
          </div>

          {/* Current Period */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3">
              <span className="text-2xl">📅</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">Periodo Corrente</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {formatCurrency(summary.currentPeriodEarnings)}
              </p>
              {summary.currentPeriod && (
                <p className="mt-1 text-xs text-gray-400">
                  {formatDate(summary.currentPeriod.periodStart)} -{' '}
                  {formatDate(summary.currentPeriod.periodEnd)}
                </p>
              )}
            </div>
          </div>

          {/* Pending Payment */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3">
              <span className="text-2xl">⏳</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">In Attesa di Pagamento</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {formatCurrency(summary.pendingPayment)}
              </p>
            </div>
          </div>

          {/* Already Paid */}
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3">
              <span className="text-2xl">✅</span>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-500">Già Pagato</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {formatCurrency(summary.totalPaid)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Allocations List */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900">📋 Storico Mance</h3>
          <div className="flex gap-2">
            {(['all', 'pending', 'paid'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f === 'all' ? 'Tutti' : f === 'pending' ? 'In Attesa' : 'Pagati'}
              </button>
            ))}
          </div>
        </div>

        {filteredAllocations.length === 0 ? (
          <div className="p-8 text-center">
            <span className="text-4xl">💸</span>
            <p className="mt-2 text-gray-500">Nessuna mancia trovata</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredAllocations.map((allocation) => {
              const sourceInfo = getSourceLabel(allocation.source);
              return (
                <div
                  key={allocation.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-2 ${sourceInfo.color}`}>
                      <span>{sourceInfo.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{sourceInfo.label}</p>
                      <p className="text-sm text-gray-500">{formatDate(allocation.createdAt)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(allocation.amount)}
                    </p>
                    <div className="flex items-center gap-1">
                      {allocation.isPaid ? (
                        <span className="flex items-center gap-1 text-xs text-green-600">
                          <span>✓</span> Pagato
                          {allocation.paymentMethod && (
                            <span className="text-gray-400">• {allocation.paymentMethod}</span>
                          )}
                        </span>
                      ) : (
                        <span className="text-xs text-yellow-600">⏳ In attesa</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Info Card */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h4 className="font-semibold text-blue-900">Come funzionano le mance?</h4>
            <ul className="mt-2 space-y-1 text-sm text-blue-700">
              <li>
                • <strong>Ordine Diretto:</strong> Mance ricevute da ordini che hai servito tu
              </li>
              <li>
                • <strong>Pool Condiviso:</strong> La tua quota dalla distribuzione del pool
              </li>
              <li>
                • <strong>Correzione:</strong> Aggiustamenti manuali dal manager
              </li>
            </ul>
            <p className="mt-2 text-xs text-blue-600">
              Le mance in attesa verranno pagate secondo il periodo stabilito dal manager.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
