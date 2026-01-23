'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import TakeoverConfirmModal from '../components/TakeoverConfirmModal';

interface Request {
  id: string;
  tableNumber: string;
  tableName?: string;
  type: string;
  typeName: string;
  icon: string;
  note?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: string;
  createdAt: string;
  acknowledgedAt?: string;
  completedAt?: string;
  assignedTo?: string;
  assignedToName?: string;
}

type FilterStatus = 'all' | 'pending' | 'in_progress' | 'completed';

interface TakeoverPrompt {
  requestId: string;
  tableNumber: string;
  assignedToName: string;
}

export default function StaffRequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterStatus>('pending');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showOnlyMine, setShowOnlyMine] = useState(false);
  const [takeoverPrompt, setTakeoverPrompt] = useState<TakeoverPrompt | null>(null);

  // Load requests
  const loadRequests = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filter !== 'all') {
        params.set('status', filter);
      }
      if (showOnlyMine) {
        params.set('onlyMine', 'true');
      }

      const res = await fetch(`/api/staff/self-assign?${params.toString()}`);
      const result = await res.json();

      if (result.success) {
        // Combine pending requests and historical ones
        const allRequests = [
          ...(result.pendingRequests || []),
          ...(result.completedRequests || []),
        ];
        setRequests(allRequests);
        setError(null);
      } else {
        setError(result.error || 'Errore nel caricamento');
      }
    } catch (err) {
      setError('Errore di connessione');
    } finally {
      setIsLoading(false);
    }
  }, [filter, showOnlyMine]);

  useEffect(() => {
    loadRequests();
    const interval = setInterval(loadRequests, 15000); // Poll every 15 seconds
    return () => clearInterval(interval);
  }, [loadRequests]);

  // Handle request action
  const handleAction = async (
    requestId: string,
    action: 'acknowledge' | 'complete' | 'cancel',
    takeoverTable?: boolean
  ) => {
    setActionLoading(requestId);
    try {
      const res = await fetch('/api/requests/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId, action, takeoverTable }),
      });
      const result = await res.json();

      if (result.needsConfirmation) {
        // Show takeover confirmation modal
        setTakeoverPrompt({
          requestId,
          tableNumber: result.tableNumber,
          assignedToName: result.assignedTo.name,
        });
        setActionLoading(null);
        return;
      }

      if (result.success) {
        setTakeoverPrompt(null);
        loadRequests();
      }
    } catch (err) {
      console.error('Action error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Handle takeover decision
  const handleTakeoverDecision = async (takeover: boolean) => {
    if (!takeoverPrompt) return;
    await handleAction(takeoverPrompt.requestId, 'acknowledge', takeover);
  };

  // Format time
  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  };

  // Get time elapsed
  const getTimeElapsed = (dateStr: string) => {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Adesso';
    if (diffMins < 60) return `${diffMins}m`;
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m`;
  };

  // Get status styling
  const getStatusStyle = (status: string, createdAt: string) => {
    if (status === 'completed') {
      return { bg: 'bg-gray-700', border: 'border-gray-600', text: 'text-gray-400' };
    }
    if (status === 'cancelled') {
      return { bg: 'bg-gray-800', border: 'border-gray-700', text: 'text-gray-500' };
    }

    const diffMins = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);

    if (diffMins > 5) {
      return { bg: 'bg-red-500/10', border: 'border-red-500', text: 'text-red-400' };
    }
    if (diffMins > 3) {
      return { bg: 'bg-amber-500/10', border: 'border-amber-500', text: 'text-amber-400' };
    }
    return { bg: 'bg-green-500/10', border: 'border-green-500', text: 'text-green-400' };
  };

  // Get icon for request type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'call_waiter':
        return '🙋';
      case 'request_bill':
        return '💳';
      case 'assistance':
        return '❓';
      default:
        return '📢';
    }
  };

  // Get label for request type
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'call_waiter':
        return 'Chiama Cameriere';
      case 'request_bill':
        return 'Richiesta Conto';
      case 'assistance':
        return 'Assistenza';
      default:
        return type;
    }
  };

  const filterOptions: { value: FilterStatus; label: string; count?: number }[] = [
    { value: 'pending', label: 'In Attesa' },
    { value: 'in_progress', label: 'In Corso' },
    { value: 'completed', label: 'Completate' },
    { value: 'all', label: 'Tutte' },
  ];

  const filteredRequests = requests.filter((r) => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const pendingCount = requests.filter((r) => r.status === 'pending').length;
  const inProgressCount = requests.filter((r) => r.status === 'in_progress').length;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-amber-500/20 to-amber-600/20 p-4">
          <p className="text-3xl font-bold text-amber-400">{pendingCount}</p>
          <p className="text-sm text-amber-300/70">In Attesa</p>
        </div>
        <div className="rounded-xl border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-4">
          <p className="text-3xl font-bold text-blue-400">{inProgressCount}</p>
          <p className="text-sm text-blue-300/70">In Corso</p>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                filter === opt.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-400">
          <input
            type="checkbox"
            checked={showOnlyMine}
            onChange={(e) => setShowOnlyMine(e.target.checked)}
            className="rounded border-gray-600 bg-gray-800"
          />
          Solo i miei tavoli
        </label>
      </div>

      {/* Error State */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center">
          <p className="text-red-400">{error}</p>
          <button onClick={loadRequests} className="mt-2 text-sm text-red-300 underline">
            Riprova
          </button>
        </div>
      )}

      {/* Request List */}
      {filteredRequests.length === 0 ? (
        <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-8 text-center">
          <span className="text-4xl">
            {filter === 'pending' ? '✨' : filter === 'completed' ? '📋' : '🔍'}
          </span>
          <p className="mt-3 text-gray-400">
            {filter === 'pending'
              ? 'Nessuna richiesta in attesa'
              : filter === 'completed'
                ? 'Nessuna richiesta completata'
                : 'Nessuna richiesta trovata'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredRequests.map((req) => {
            const style = getStatusStyle(req.status, req.createdAt);
            const isCompleted = req.status === 'completed' || req.status === 'cancelled';

            return (
              <div
                key={req.id}
                className={`rounded-xl border-l-4 ${style.border} ${style.bg} bg-gray-800 p-4`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getTypeIcon(req.type)}</span>
                    <div>
                      <p className="font-medium">Tavolo {req.tableNumber}</p>
                      <p className="text-sm text-gray-400">{getTypeLabel(req.type)}</p>
                      {req.note && <p className="mt-1 text-sm text-gray-300">"{req.note}"</p>}
                      {req.assignedToName && req.assignedToName !== user?.name && (
                        <p className="mt-1 text-xs text-blue-400">
                          Assegnato a: {req.assignedToName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-gray-500">{formatTime(req.createdAt)}</p>
                    {!isCompleted && (
                      <p className={`text-sm font-medium ${style.text}`}>
                        {getTimeElapsed(req.createdAt)}
                      </p>
                    )}
                    {req.status === 'completed' && (
                      <span className="text-xs text-green-400">✓ Completato</span>
                    )}
                    {req.status === 'cancelled' && (
                      <span className="text-xs text-gray-500">Annullato</span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                {!isCompleted && (
                  <div className="mt-3 flex gap-2">
                    {req.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleAction(req.id, 'acknowledge')}
                          disabled={actionLoading === req.id}
                          className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                        >
                          {actionLoading === req.id ? '...' : '👋 Prendo io'}
                        </button>
                        <button
                          onClick={() => handleAction(req.id, 'cancel')}
                          disabled={actionLoading === req.id}
                          className="rounded-lg bg-gray-700 px-3 py-2 text-sm text-gray-300 hover:bg-gray-600 disabled:opacity-50"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleAction(req.id, 'complete')}
                        disabled={actionLoading === req.id}
                        className="flex-1 rounded-lg bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                      >
                        {actionLoading === req.id ? '...' : '✓ Completato'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Refresh Button */}
      <button
        onClick={loadRequests}
        className="w-full rounded-xl border border-gray-700 bg-gray-800 py-3 text-sm text-gray-400 hover:bg-gray-700"
      >
        🔄 Aggiorna lista
      </button>

      {/* Takeover Confirmation Modal */}
      <TakeoverConfirmModal
        isOpen={!!takeoverPrompt}
        tableNumber={takeoverPrompt?.tableNumber || ''}
        assignedToName={takeoverPrompt?.assignedToName || ''}
        onThisRequestOnly={() => handleTakeoverDecision(false)}
        onTakeoverTable={() => handleTakeoverDecision(true)}
        onCancel={() => setTakeoverPrompt(null)}
        isLoading={!!actionLoading}
      />
    </div>
  );
}
