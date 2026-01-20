'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/lib/contexts/AuthContext';
import { useRouter } from 'next/navigation';

type AlertLevel = 'INFO' | 'WARNING' | 'CRITICAL';
type TabId = 'overview' | 'alerts' | 'team';

interface AlertData {
  id: string;
  name: string;
  category: string;
  level: AlertLevel;
  value: number;
  unit: string;
  message: string;
  action?: string;
  thresholds: { warning: number; critical: number };
}

interface HealthResponse {
  status: string;
  timestamp: string;
  alerts?: {
    total: number;
    triggered: number;
    critical: number;
    warning: number;
    details?: AlertData[];
  };
  services?: {
    redis: { status: string; latencyMs: number };
    database: { status: string; latencyMs: number };
  };
  infrastructure?: {
    edgeCache: boolean;
    coalescingStats: {
      pendingRequests: number;
      coalescedRequests: number;
    };
  };
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  hasAlertsAccess: boolean;
}

// Mock team data - in production this would come from the API
const MOCK_TEAM: TeamMember[] = [
  {
    id: '1',
    name: 'Gianfranco Dagostino',
    email: 'gianfranco@gudbro.com',
    role: 'business_owner',
    hasAlertsAccess: true,
  },
  {
    id: '2',
    name: 'Maria Rossi',
    email: 'maria@example.com',
    role: 'manager',
    hasAlertsAccess: false,
  },
  { id: '3', name: 'Luca Verdi', email: 'luca@example.com', role: 'staff', hasAlertsAccess: false },
];

export default function SystemAlertsPage() {
  const t = useTranslations('systemAlertsPage');
  const { hasPermission } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(MOCK_TEAM);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  // Check permission
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
        <h2 className="mb-2 text-xl font-bold text-gray-900">{t('accessDenied')}</h2>
        <p className="max-w-md text-center text-gray-500">{t('accessDeniedMessage')}</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="mt-4 rounded-lg bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
        >
          {t('backToDashboard')}
        </button>
      </div>
    );
  }

  const fetchHealthData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/health?detailed=true');
      const data = await res.json();
      setHealthData(data);
      setLastRefresh(new Date());
    } catch (error) {
      console.error('Failed to fetch health data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthData();
    // Auto-refresh every 2 minutes
    const interval = setInterval(fetchHealthData, 120000);
    return () => clearInterval(interval);
  }, []);

  const toggleTeamMemberAccess = (memberId: string) => {
    setTeamMembers((prev) =>
      prev.map((m) => (m.id === memberId ? { ...m, hasAlertsAccess: !m.hasAlertsAccess } : m))
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'bg-green-100 text-green-700';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700';
      case 'critical':
      case 'unhealthy':
        return 'bg-red-100 text-red-700';
      case 'degraded':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelColor = (level: AlertLevel) => {
    switch (level) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'WARNING':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'INFO':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getLevelIcon = (level: AlertLevel) => {
    switch (level) {
      case 'CRITICAL':
        return '🚨';
      case 'WARNING':
        return '⚠️';
      case 'INFO':
        return 'ℹ️';
      default:
        return '•';
    }
  };

  const tabs: { id: TabId; labelKey: string; icon: string }[] = [
    { id: 'overview', labelKey: 'tabs.overview', icon: '📊' },
    { id: 'alerts', labelKey: 'tabs.alerts', icon: '🔔' },
    { id: 'team', labelKey: 'tabs.team', icon: '👥' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-orange-500">
              <span className="text-xl">🔔</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
              <p className="text-gray-500">{t('subtitle')}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {lastRefresh && (
            <span className="text-sm text-gray-500">
              {t('lastUpdate')}: {lastRefresh.toLocaleTimeString()}
            </span>
          )}
          <button
            onClick={fetchHealthData}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              '↻'
            )}
            {t('refresh')}
          </button>
        </div>
      </div>

      {/* Status Banner */}
      {healthData && (
        <div
          className={`rounded-xl border p-4 ${
            healthData.status === 'critical' || healthData.status === 'unhealthy'
              ? 'border-red-200 bg-red-50'
              : healthData.status === 'warning'
                ? 'border-yellow-200 bg-yellow-50'
                : 'border-green-200 bg-green-50'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">
                {healthData.status === 'critical' || healthData.status === 'unhealthy'
                  ? '🚨'
                  : healthData.status === 'warning'
                    ? '⚠️'
                    : '✅'}
              </span>
              <div>
                <p className="font-semibold text-gray-900">
                  Stato Sistema:{' '}
                  <span
                    className={`rounded px-2 py-0.5 text-sm ${getStatusColor(healthData.status)}`}
                  >
                    {healthData.status.toUpperCase()}
                  </span>
                </p>
                <p className="text-sm text-gray-600">
                  {healthData.alerts?.triggered || 0} alert attivi su{' '}
                  {healthData.alerts?.total || 0} monitorati
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {healthData.alerts?.critical ? (
                <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                  {healthData.alerts.critical} Critici
                </span>
              ) : null}
              {healthData.alerts?.warning ? (
                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                  {healthData.alerts.warning} Warning
                </span>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {t(tab.labelKey)}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && healthData && (
        <div className="space-y-6">
          {/* Services Status */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Database</h3>
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    healthData.services?.database.status === 'up'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {healthData.services?.database.status?.toUpperCase()}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {healthData.services?.database.latencyMs}ms
              </p>
              <p className="text-sm text-gray-500">Latenza</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Redis Cache</h3>
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    healthData.services?.redis.status === 'up'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {healthData.services?.redis.status?.toUpperCase()}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {healthData.services?.redis.latencyMs}ms
              </p>
              <p className="text-sm text-gray-500">Latenza</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Edge Cache</h3>
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${
                    healthData.infrastructure?.edgeCache
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {healthData.infrastructure?.edgeCache ? 'ATTIVO' : 'DISATTIVO'}
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {healthData.infrastructure?.coalescingStats?.coalescedRequests || 0}
              </p>
              <p className="text-sm text-gray-500">Richieste coalizzate</p>
            </div>
          </div>

          {/* Triggered Alerts Summary */}
          {healthData.alerts?.details && (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="font-semibold text-gray-900">Alert Attivi</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {healthData.alerts.details
                  .filter((a) => a.level !== 'INFO')
                  .map((alert) => (
                    <div key={alert.id} className="flex items-center justify-between px-6 py-4">
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{getLevelIcon(alert.level)}</span>
                        <div>
                          <p className="font-medium text-gray-900">{alert.name}</p>
                          <p className="text-sm text-gray-500">{alert.message}</p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${getLevelColor(alert.level)}`}
                      >
                        {alert.level}
                      </span>
                    </div>
                  ))}
                {!healthData.alerts.details.filter((a) => a.level !== 'INFO').length && (
                  <div className="px-6 py-8 text-center text-gray-500">
                    <span className="mb-2 block text-4xl">✅</span>
                    Nessun alert attivo. Tutti i sistemi funzionano correttamente.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'alerts' && healthData?.alerts?.details && (
        <div className="space-y-4">
          {healthData.alerts.details.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-xl border bg-white p-6 ${
                alert.level === 'CRITICAL'
                  ? 'border-red-200'
                  : alert.level === 'WARNING'
                    ? 'border-yellow-200'
                    : 'border-gray-200'
              }`}
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getLevelIcon(alert.level)}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{alert.name}</h3>
                    <span className="text-xs uppercase text-gray-500">{alert.category}</span>
                  </div>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-sm font-medium ${getLevelColor(alert.level)}`}
                >
                  {alert.level}
                </span>
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-3">
                  <p className="text-sm text-gray-500">Valore Attuale</p>
                  <p className="text-xl font-bold text-gray-900">
                    {typeof alert.value === 'number' ? alert.value.toFixed(1) : alert.value}{' '}
                    {alert.unit}
                  </p>
                </div>
                <div className="rounded-lg bg-yellow-50 p-3">
                  <p className="text-sm text-yellow-700">Soglia Warning</p>
                  <p className="text-xl font-bold text-yellow-900">
                    {alert.thresholds.warning} {alert.unit}
                  </p>
                </div>
                <div className="rounded-lg bg-red-50 p-3">
                  <p className="text-sm text-red-700">Soglia Critical</p>
                  <p className="text-xl font-bold text-red-900">
                    {alert.thresholds.critical} {alert.unit}
                  </p>
                </div>
              </div>

              <p className="mb-4 text-gray-600">{alert.message}</p>

              {alert.action && alert.level !== 'INFO' && (
                <div
                  className={`rounded-lg p-4 ${
                    alert.level === 'CRITICAL' ? 'bg-red-50' : 'bg-yellow-50'
                  }`}
                >
                  <p className="mb-2 font-medium text-gray-900">Azioni Consigliate:</p>
                  <div className="whitespace-pre-wrap text-sm text-gray-700">{alert.action}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-2 font-semibold text-gray-900">Gestione Visibilità Alert</h3>
            <p className="mb-6 text-sm text-gray-500">
              Seleziona quali membri del team possono visualizzare gli alert di sistema. Solo tu e
              le persone autorizzate potranno accedere a questa sezione.
            </p>

            <div className="divide-y divide-gray-200">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-lg font-bold text-gray-600">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                    <span
                      className={`rounded px-2 py-0.5 text-xs font-medium ${
                        member.role === 'business_owner'
                          ? 'bg-purple-100 text-purple-700'
                          : member.role === 'manager'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {member.role.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {member.role === 'business_owner' ? (
                      <span className="text-sm text-gray-500">Sempre autorizzato</span>
                    ) : (
                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={member.hasAlertsAccess}
                          onChange={() => toggleTeamMemberAccess(member.id)}
                          className="peer sr-only"
                        />
                        <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                      </label>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
            <div className="flex items-start gap-3">
              <span className="text-xl">💡</span>
              <div>
                <h4 className="mb-1 font-medium text-blue-900">Come funziona</h4>
                <ul className="space-y-1 text-sm text-blue-700">
                  <li>• Solo il Business Owner ha sempre accesso agli alert di sistema</li>
                  <li>• Puoi autorizzare manager e staff a visualizzare gli alert</li>
                  <li>• Gli alert critici vengono notificati via Slack/Email se configurato</li>
                  <li>• I check vengono eseguiti automaticamente ogni 5 minuti</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
