'use client';

/**
 * Requests Page
 *
 * Shows list of customer requests with real-time updates.
 * Allows acknowledging and completing requests.
 */

import { useEffect, useState, useCallback } from 'react';
import { MagnifyingGlass, ArrowClockwise, Funnel } from '@phosphor-icons/react';
import { RequestList } from '@/components/requests/RequestList';
import {
  useRequestsStore,
  selectPendingCount,
  type CustomerRequest,
} from '@/lib/stores/requests-store';
import {
  acknowledgeRequest,
  completeRequest,
  fetchRequests,
} from '@/lib/services/requests-service';
import { useAuth } from '@/components/providers/AuthProvider';

type FilterStatus = 'all' | 'pending' | 'acknowledged';

export default function RequestsPage() {
  const { user } = useAuth();
  const { requests, setRequests, setLoading, setError, isLoading, error } = useRequestsStore();
  const pendingCount = useRequestsStore(selectPendingCount);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch requests on mount
  const loadRequests = useCallback(async () => {
    if (!user?.locationId) return;

    setLoading(true);
    const result = await fetchRequests(user.locationId);

    if (result.success && result.data) {
      setRequests(result.data);
    } else {
      setError(result.error || 'Errore nel caricamento');
    }
    setLoading(false);
  }, [user?.locationId, setRequests, setLoading, setError]);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  // Refresh handler
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadRequests();
    setIsRefreshing(false);
  };

  // Handle acknowledge request
  const handleAcknowledge = async (id: string) => {
    const result = await acknowledgeRequest(id);
    if (result.success) {
      useRequestsStore.getState().acknowledgeRequest(id, user?.id || '');
    } else {
      setError(result.error || 'Errore');
    }
  };

  // Handle complete request
  const handleComplete = async (id: string) => {
    const result = await completeRequest(id);
    if (result.success) {
      useRequestsStore.getState().completeRequest(id, user?.id || '');
    } else {
      setError(result.error || 'Errore');
    }
  };

  // Handle request press (show details)
  const handlePress = (request: CustomerRequest) => {
    // TODO: Show request details modal
  };

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !r.tableNumber.toLowerCase().includes(query) &&
        !r.message?.toLowerCase().includes(query)
      ) {
        return false;
      }
    }

    // Status filter
    if (filterStatus === 'pending' && r.status !== 'pending') return false;
    if (
      filterStatus === 'acknowledged' &&
      r.status !== 'acknowledged' &&
      r.status !== 'in_progress'
    )
      return false;

    // Exclude completed and cancelled
    if (r.status === 'completed' || r.status === 'cancelled') return false;

    return true;
  });

  return (
    <div className="space-y-4 p-4">
      {/* Search and filter bar */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <MagnifyingGlass
            size={20}
            weight="bold"
            className="text-theme-text-tertiary absolute left-4 top-1/2 -translate-y-1/2"
          />
          <input
            type="search"
            placeholder="Cerca per tavolo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-theme-bg-primary border-theme-border-medium text-theme-text-primary placeholder:text-theme-text-tertiary focus:border-theme-brand-primary focus:ring-theme-brand-secondary w-full rounded-xl border py-3 pl-12 pr-4 transition-colors focus:ring-2"
          />
        </div>

        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="btn-ghost p-3"
          aria-label="Aggiorna"
        >
          <ArrowClockwise size={20} weight="bold" className={isRefreshing ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilterStatus('all')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            filterStatus === 'all'
              ? 'bg-theme-brand-primary text-white'
              : 'bg-theme-bg-secondary text-theme-text-secondary hover:bg-theme-bg-tertiary'
          }`}
        >
          Tutte
        </button>
        <button
          onClick={() => setFilterStatus('pending')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            filterStatus === 'pending'
              ? 'bg-red-500 text-white'
              : 'bg-theme-bg-secondary text-theme-text-secondary hover:bg-theme-bg-tertiary'
          }`}
        >
          In attesa {pendingCount > 0 && `(${pendingCount})`}
        </button>
        <button
          onClick={() => setFilterStatus('acknowledged')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            filterStatus === 'acknowledged'
              ? 'bg-blue-500 text-white'
              : 'bg-theme-bg-secondary text-theme-text-secondary hover:bg-theme-bg-tertiary'
          }`}
        >
          In gestione
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {/* Loading state */}
      {isLoading && !isRefreshing ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card animate-pulse p-4">
              <div className="flex gap-3">
                <div className="bg-theme-bg-tertiary h-12 w-12 rounded-xl" />
                <div className="flex-1 space-y-2">
                  <div className="bg-theme-bg-tertiary h-5 w-1/3 rounded" />
                  <div className="bg-theme-bg-tertiary h-4 w-1/2 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <RequestList
          requests={filteredRequests}
          onAcknowledge={handleAcknowledge}
          onComplete={handleComplete}
          onPress={handlePress}
          emptyMessage="Le richieste dei clienti appariranno qui in tempo reale"
        />
      )}
    </div>
  );
}
