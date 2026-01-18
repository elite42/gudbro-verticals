'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';

interface AuditLogEntry {
  id: string;
  user_email: string | null;
  user_role: string | null;
  action: string;
  resource_type: string | null;
  resource_id: string | null;
  changes: Record<string, { old?: unknown; new?: unknown }> | null;
  ip_address: string | null;
  created_at: string;
}

const ACTION_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  'auth.login': { label: 'Accesso', icon: '🔓', color: 'bg-green-100 text-green-700' },
  'auth.logout': { label: 'Disconnessione', icon: '🔒', color: 'bg-gray-100 text-gray-700' },
  'auth.login_failed': { label: 'Accesso fallito', icon: '⚠️', color: 'bg-red-100 text-red-700' },
  'auth.password_change': {
    label: 'Password cambiata',
    icon: '🔑',
    color: 'bg-yellow-100 text-yellow-700',
  },
  'menu.item_create': { label: 'Piatto creato', icon: '➕', color: 'bg-blue-100 text-blue-700' },
  'menu.item_update': {
    label: 'Piatto modificato',
    icon: '✏️',
    color: 'bg-blue-100 text-blue-700',
  },
  'menu.item_delete': { label: 'Piatto eliminato', icon: '🗑️', color: 'bg-red-100 text-red-700' },
  'menu.category_create': {
    label: 'Categoria creata',
    icon: '📁',
    color: 'bg-blue-100 text-blue-700',
  },
  'menu.category_update': {
    label: 'Categoria modificata',
    icon: '📝',
    color: 'bg-blue-100 text-blue-700',
  },
  'menu.category_delete': {
    label: 'Categoria eliminata',
    icon: '🗑️',
    color: 'bg-red-100 text-red-700',
  },
  'order.status_change': {
    label: 'Stato ordine',
    icon: '📦',
    color: 'bg-purple-100 text-purple-700',
  },
  'order.cancel': { label: 'Ordine annullato', icon: '❌', color: 'bg-red-100 text-red-700' },
  'order.refund': { label: 'Rimborso', icon: '💸', color: 'bg-orange-100 text-orange-700' },
  'settings.update': { label: 'Impostazioni', icon: '⚙️', color: 'bg-gray-100 text-gray-700' },
  'settings.payment_update': {
    label: 'Pagamenti',
    icon: '💳',
    color: 'bg-green-100 text-green-700',
  },
  'settings.hours_update': { label: 'Orari', icon: '🕐', color: 'bg-blue-100 text-blue-700' },
  'team.member_invite': { label: 'Invito membro', icon: '👤', color: 'bg-blue-100 text-blue-700' },
  'team.member_remove': { label: 'Membro rimosso', icon: '👤', color: 'bg-red-100 text-red-700' },
  'team.role_change': {
    label: 'Ruolo modificato',
    icon: '👑',
    color: 'bg-yellow-100 text-yellow-700',
  },
  'qr.create': { label: 'QR creato', icon: '📱', color: 'bg-blue-100 text-blue-700' },
  'qr.update': { label: 'QR modificato', icon: '📱', color: 'bg-blue-100 text-blue-700' },
  'qr.delete': { label: 'QR eliminato', icon: '📱', color: 'bg-red-100 text-red-700' },
  'ai.suggestion_accept': {
    label: 'Suggerimento AI accettato',
    icon: '🤖',
    color: 'bg-green-100 text-green-700',
  },
  'ai.suggestion_reject': {
    label: 'Suggerimento AI rifiutato',
    icon: '🤖',
    color: 'bg-gray-100 text-gray-700',
  },
  'ai.task_delegate': {
    label: 'Task delegata',
    icon: '🤖',
    color: 'bg-purple-100 text-purple-700',
  },
  'system.export_data': { label: 'Export dati', icon: '📤', color: 'bg-blue-100 text-blue-700' },
  'system.bulk_update': {
    label: 'Aggiornamento massivo',
    icon: '🔄',
    color: 'bg-orange-100 text-orange-700',
  },
  'system.config_change': {
    label: 'Config sistema',
    icon: '⚙️',
    color: 'bg-yellow-100 text-yellow-700',
  },
};

export default function AuditLogPage() {
  const { hasPermission } = useAuth();
  const router = useRouter();
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');

  // Check permission (reuse system:alerts permission for now)
  if (!hasPermission('system:alerts')) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-10 w-10 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m0 0v2m0-2h2m-2 0H9m3-4V8a3 3 0 00-3-3H6a3 3 0 00-3 3v12a3 3 0 003 3h12a3 3 0 003-3v-3"
            />
          </svg>
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">Accesso Negato</h2>
        <p className="max-w-md text-center text-gray-500">
          Questa sezione è disponibile solo per utenti autorizzati.
        </p>
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-4 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          Torna alla Dashboard
        </button>
      </div>
    );
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/audit-logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data.logs || []);
      }
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredLogs =
    filter === 'all' ? logs : logs.filter((log) => log.action.startsWith(filter));

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getActionInfo = (action: string) => {
    return (
      ACTION_LABELS[action] || { label: action, icon: '•', color: 'bg-gray-100 text-gray-700' }
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-slate-600 to-slate-800">
              <span className="text-xl">📋</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
              <p className="text-gray-500">Cronologia delle azioni nel sistema</p>
            </div>
          </div>
        </div>
        <button
          onClick={fetchLogs}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Caricamento...' : '↻ Aggiorna'}
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {[
          { value: 'all', label: 'Tutti' },
          { value: 'auth', label: 'Autenticazione' },
          { value: 'menu', label: 'Menu' },
          { value: 'order', label: 'Ordini' },
          { value: 'team', label: 'Team' },
          { value: 'settings', label: 'Impostazioni' },
          { value: 'qr', label: 'QR Code' },
          { value: 'ai', label: 'AI' },
        ].map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === f.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Logs List */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {loading ? (
          <div className="p-8 text-center text-gray-500">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            Caricamento log...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <span className="mb-2 block text-4xl">📋</span>
            Nessun log trovato
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredLogs.map((log) => {
              const actionInfo = getActionInfo(log.action);
              return (
                <div key={log.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl">{actionInfo.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`rounded px-2 py-0.5 text-xs font-medium ${actionInfo.color}`}
                          >
                            {actionInfo.label}
                          </span>
                          {log.user_role && (
                            <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                              {log.user_role}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-gray-900">{log.user_email || 'Sistema'}</p>
                        {log.resource_type && (
                          <p className="mt-1 text-xs text-gray-500">
                            {log.resource_type}: {log.resource_id?.slice(0, 8)}...
                          </p>
                        )}
                        {log.changes && Object.keys(log.changes).length > 0 && (
                          <div className="mt-2 rounded bg-gray-50 p-2 text-xs">
                            {Object.entries(log.changes).map(([field, change]) => (
                              <div key={field} className="text-gray-600">
                                <span className="font-medium">{field}:</span>{' '}
                                <span className="text-red-600">{String(change.old || '-')}</span>
                                {' → '}
                                <span className="text-green-600">{String(change.new || '-')}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{formatDate(log.created_at)}</p>
                      {log.ip_address && (
                        <p className="mt-1 text-xs text-gray-400">{log.ip_address}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
        <div className="flex items-start gap-3">
          <span className="text-xl">ℹ️</span>
          <div>
            <h4 className="mb-1 font-medium text-blue-900">Informazioni</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              <li>• I log vengono conservati per 90 giorni</li>
              <li>• Tutte le azioni sensibili vengono registrate automaticamente</li>
              <li>• I log non possono essere modificati o eliminati</li>
              <li>• Usa i filtri per trovare azioni specifiche</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
