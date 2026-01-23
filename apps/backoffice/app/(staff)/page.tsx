'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/contexts/AuthContext';
import TakeoverConfirmModal from './components/TakeoverConfirmModal';

interface Assignment {
  id: string;
  type: 'table' | 'section' | 'location';
  sectionName?: string;
  tableNumber?: string;
  tableName?: string;
  method: string;
}

interface PendingRequest {
  id: string;
  tableNumber: string;
  type: string;
  typeName: string;
  icon?: string;
  note?: string;
  status: string;
  priority: string;
  createdAt: string;
}

interface StaffData {
  staff: {
    id: string;
    name: string;
  };
  assignments: Assignment[];
  pendingRequests: PendingRequest[];
}

interface TakeoverPrompt {
  requestId: string;
  tableNumber: string;
  assignedToName: string;
}

export default function StaffDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState<StaffData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [takeoverPrompt, setTakeoverPrompt] = useState<TakeoverPrompt | null>(null);

  // Load staff data
  const loadData = useCallback(async () => {
    try {
      const res = await fetch('/api/staff/self-assign');
      const result = await res.json();
      if (result.success) {
        setData(result);
      } else {
        setError(result.error || 'Errore nel caricamento');
      }
    } catch (err) {
      setError('Errore di connessione');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // Poll every 30 seconds for new requests
    const interval = setInterval(loadData, 30000);
    return () => clearInterval(interval);
  }, [loadData]);

  // Handle request action
  const handleRequestAction = async (
    requestId: string,
    action: 'acknowledge' | 'complete',
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
        loadData();
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  // Handle takeover decision
  const handleTakeoverDecision = async (takeover: boolean) => {
    if (!takeoverPrompt) return;
    await handleRequestAction(takeoverPrompt.requestId, 'acknowledge', takeover);
  };

  // Format time ago
  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Ora';
    if (diffMins < 60) return `${diffMins} min fa`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h fa`;
  };

  // Get priority color
  const getPriorityColor = (priority: string, createdAt: string) => {
    const diffMins = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);

    if (priority === 'urgent' || diffMins > 5) return 'border-red-500 bg-red-500/10';
    if (priority === 'high' || diffMins > 3) return 'border-amber-500 bg-amber-500/10';
    return 'border-green-500 bg-green-500/10';
  };

  // Get status indicator
  const getStatusIndicator = (createdAt: string) => {
    const diffMins = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);
    if (diffMins > 5) return { color: 'bg-red-500', label: 'Urgente' };
    if (diffMins > 3) return { color: 'bg-amber-500', label: 'In attesa' };
    return { color: 'bg-green-500', label: 'Nuovo' };
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-center">
          <p className="text-red-400">{error}</p>
          <button
            onClick={loadData}
            className="mt-3 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  const pendingCount = data?.pendingRequests.length || 0;
  const assignmentsCount = data?.assignments.length || 0;

  return (
    <div className="space-y-4 p-4">
      {/* Welcome & Status */}
      <div className="rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-200">Buon lavoro!</p>
            <h1 className="text-xl font-bold">{user?.name || 'Staff'}</h1>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{pendingCount}</p>
            <p className="text-sm text-blue-200">
              {pendingCount === 1 ? 'richiesta' : 'richieste'}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            <div>
              <p className="text-lg font-bold">{assignmentsCount}</p>
              <p className="text-xs text-gray-400">Tavoli assegnati</p>
            </div>
          </div>
        </div>
        <Link
          href="/staff/scan"
          className="rounded-xl border border-gray-700 bg-gray-800 p-3 transition-colors hover:border-blue-500"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">📷</span>
            <div>
              <p className="text-sm font-medium">Scan QR</p>
              <p className="text-xs text-gray-400">Assegna tavolo</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Current Assignments */}
      {assignmentsCount > 0 && (
        <div>
          <h2 className="mb-2 text-sm font-medium text-gray-400">I tuoi tavoli oggi</h2>
          <div className="flex flex-wrap gap-2">
            {data?.assignments.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-3 py-2"
              >
                {a.type === 'section' ? (
                  <>
                    <span>🏠</span>
                    <span className="text-sm">{a.sectionName}</span>
                  </>
                ) : a.type === 'table' ? (
                  <>
                    <span>🪑</span>
                    <span className="text-sm">T{a.tableNumber}</span>
                  </>
                ) : (
                  <>
                    <span>📍</span>
                    <span className="text-sm">Tutto</span>
                  </>
                )}
                {a.method === 'self_assign' && (
                  <span className="rounded bg-green-500/20 px-1.5 py-0.5 text-xs text-green-400">
                    Auto
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pending Requests */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-medium">Richieste in arrivo</h2>
          <button
            onClick={loadData}
            className="rounded-lg bg-gray-800 px-3 py-1 text-xs text-gray-400 hover:bg-gray-700"
          >
            🔄 Aggiorna
          </button>
        </div>

        {pendingCount === 0 ? (
          <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-8 text-center">
            <span className="text-4xl">✨</span>
            <p className="mt-3 text-gray-400">Nessuna richiesta in attesa</p>
            <p className="mt-1 text-sm text-gray-500">Rilassati, sei in pari!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {data?.pendingRequests.map((req) => {
              const status = getStatusIndicator(req.createdAt);
              return (
                <div
                  key={req.id}
                  className={`rounded-xl border-l-4 bg-gray-800 p-4 ${getPriorityColor(req.priority, req.createdAt)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">
                        {req.type === 'call_waiter'
                          ? '🙋'
                          : req.type === 'request_bill'
                            ? '💳'
                            : '📢'}
                      </span>
                      <div>
                        <p className="font-medium">Tavolo {req.tableNumber}</p>
                        <p className="text-sm text-gray-400">
                          {req.type === 'call_waiter'
                            ? 'Chiama cameriere'
                            : req.type === 'request_bill'
                              ? 'Richiesta conto'
                              : req.typeName}
                        </p>
                        {req.note && <p className="mt-1 text-sm text-gray-300">"{req.note}"</p>}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1.5">
                        <div className={`h-2 w-2 rounded-full ${status.color}`} />
                        <span className="text-xs text-gray-400">
                          {formatTimeAgo(req.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex gap-2">
                    {req.status === 'pending' ? (
                      <button
                        onClick={() => handleRequestAction(req.id, 'acknowledge')}
                        disabled={actionLoading === req.id}
                        className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        {actionLoading === req.id ? '...' : '👋 Preso in carico'}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRequestAction(req.id, 'complete')}
                        disabled={actionLoading === req.id}
                        className="flex-1 rounded-lg bg-green-600 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                      >
                        {actionLoading === req.id ? '...' : '✓ Completato'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

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
