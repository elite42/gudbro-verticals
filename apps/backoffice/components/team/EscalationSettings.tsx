'use client';

import { useState, useEffect, useCallback } from 'react';

interface EscalationSettingsData {
  notify_assigned_staff: boolean;
  notify_dashboard: boolean;
  reminder_enabled: boolean;
  reminder_after_seconds: number;
  escalation_enabled: boolean;
  escalation_after_seconds: number;
  escalation_notify_push: boolean;
  escalation_notify_sms: boolean;
  escalation_notify_email: boolean;
  auto_reassign_enabled: boolean;
  auto_reassign_after_seconds: number;
  critical_alert_enabled: boolean;
  critical_alert_after_seconds: number;
  critical_alert_sound: boolean;
  active_preset: string;
}

interface Analytics {
  totalRequests: number;
  avgResponseTime: number;
  within2minPercent: number;
  within5minPercent: number;
}

interface EscalationSettingsProps {
  merchantId: string;
}

const PRESET_INFO = {
  minimal: {
    name: 'Minimal',
    icon: '😌',
    description: 'Nessun promemoria o escalation. Ci fidiamo del team.',
  },
  soft: {
    name: 'Soft',
    icon: '🔔',
    description: 'Solo promemoria dopo 3 minuti.',
  },
  standard: {
    name: 'Standard',
    icon: '⚡',
    description: 'Promemoria + notifica manager se non gestita.',
  },
  strict: {
    name: 'Strict',
    icon: '🚨',
    description: 'Tempi stretti, riassegnazione automatica, alert critici.',
  },
  custom: {
    name: 'Personalizzato',
    icon: '⚙️',
    description: 'Configurazione personalizzata.',
  },
};

export function EscalationSettings({ merchantId }: EscalationSettingsProps) {
  const [settings, setSettings] = useState<EscalationSettingsData | null>(null);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Load settings
  const loadSettings = useCallback(async () => {
    if (!merchantId) return;

    setIsLoading(true);
    try {
      const res = await fetch(`/api/settings/escalation?merchantId=${merchantId}`);
      const data = await res.json();
      if (data.success) {
        setSettings(data.settings);
        setAnalytics(data.analytics);
      }
    } catch (err) {
      setError('Errore nel caricamento');
    } finally {
      setIsLoading(false);
    }
  }, [merchantId]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Apply preset
  const applyPreset = async (preset: string) => {
    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/settings/escalation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantId, preset }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
        loadSettings();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Errore nel salvataggio');
    } finally {
      setIsSaving(false);
    }
  };

  // Save custom settings
  const saveSettings = async () => {
    if (!settings) return;

    setIsSaving(true);
    setError(null);
    try {
      const res = await fetch('/api/settings/escalation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantId, settings }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
        loadSettings();
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Errore nel salvataggio');
    } finally {
      setIsSaving(false);
    }
  };

  // Update a single setting
  const updateSetting = (key: keyof EscalationSettingsData, value: any) => {
    if (!settings) return;
    setSettings({ ...settings, [key]: value, active_preset: 'custom' });
  };

  // Format seconds to readable time
  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds} sec`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return secs > 0 ? `${mins} min ${secs} sec` : `${mins} min`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="py-8 text-center text-gray-500">Impossibile caricare le impostazioni</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            🔔 Gestione Richieste & Escalation
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Configura come gestire le richieste dei clienti non evase
          </p>
        </div>
        {saveSuccess && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            ✓ Salvato
          </span>
        )}
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Analytics Card */}
      {analytics && analytics.totalRequests > 0 && (
        <div className="rounded-xl border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
          <h4 className="mb-3 text-sm font-medium text-gray-700">📊 Ultimi 7 giorni</h4>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalRequests}</p>
              <p className="text-xs text-gray-500">Richieste</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {formatTime(analytics.avgResponseTime)}
              </p>
              <p className="text-xs text-gray-500">Tempo medio</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{analytics.within2minPercent}%</p>
              <p className="text-xs text-gray-500">Entro 2 min</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{analytics.within5minPercent}%</p>
              <p className="text-xs text-gray-500">Entro 5 min</p>
            </div>
          </div>
        </div>
      )}

      {/* Preset Selection */}
      <div>
        <h4 className="mb-3 text-sm font-medium text-gray-700">Scegli un preset</h4>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(PRESET_INFO)
            .filter(([key]) => key !== 'custom')
            .map(([key, info]) => (
              <button
                key={key}
                onClick={() => applyPreset(key)}
                disabled={isSaving}
                className={`rounded-xl border-2 p-4 text-left transition-all ${
                  settings.active_preset === key
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{info.icon}</span>
                  <span className="font-medium text-gray-900">{info.name}</span>
                </div>
                <p className="mt-2 text-xs text-gray-500">{info.description}</p>
              </button>
            ))}
        </div>
      </div>

      {/* Custom Configuration */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex w-full items-center justify-between p-4"
        >
          <div className="flex items-center gap-2">
            <span className="text-lg">⚙️</span>
            <span className="font-medium text-gray-900">Configurazione Avanzata</span>
            {settings.active_preset === 'custom' && (
              <span className="rounded-full bg-purple-100 px-2 py-0.5 text-xs text-purple-700">
                Attivo
              </span>
            )}
          </div>
          <svg
            className={`h-5 w-5 text-gray-400 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showAdvanced && (
          <div className="space-y-4 border-t border-gray-200 p-4">
            {/* Reminder */}
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">🔄 Promemoria Automatico</p>
                  <p className="text-sm text-gray-500">
                    Reinvia notifica al cameriere se non risponde
                  </p>
                </div>
                <button
                  onClick={() => updateSetting('reminder_enabled', !settings.reminder_enabled)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    settings.reminder_enabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      settings.reminder_enabled ? 'left-5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
              {settings.reminder_enabled && (
                <div className="mt-3 flex items-center gap-3">
                  <label className="text-sm text-gray-600">Dopo:</label>
                  <select
                    value={settings.reminder_after_seconds}
                    onChange={(e) =>
                      updateSetting('reminder_after_seconds', parseInt(e.target.value))
                    }
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                  >
                    <option value={60}>1 minuto</option>
                    <option value={120}>2 minuti</option>
                    <option value={180}>3 minuti</option>
                    <option value={300}>5 minuti</option>
                  </select>
                </div>
              )}
            </div>

            {/* Escalation */}
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">📢 Notifica Manager</p>
                  <p className="text-sm text-gray-500">
                    Avvisa il manager se la richiesta non viene gestita
                  </p>
                </div>
                <button
                  onClick={() => updateSetting('escalation_enabled', !settings.escalation_enabled)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    settings.escalation_enabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      settings.escalation_enabled ? 'left-5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
              {settings.escalation_enabled && (
                <div className="mt-3 space-y-3">
                  <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-600">Dopo:</label>
                    <select
                      value={settings.escalation_after_seconds}
                      onChange={(e) =>
                        updateSetting('escalation_after_seconds', parseInt(e.target.value))
                      }
                      className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                    >
                      <option value={180}>3 minuti</option>
                      <option value={300}>5 minuti</option>
                      <option value={420}>7 minuti</option>
                      <option value={600}>10 minuti</option>
                    </select>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <label className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5">
                      <input
                        type="checkbox"
                        checked={settings.escalation_notify_push}
                        onChange={(e) => updateSetting('escalation_notify_push', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm">Push</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5">
                      <input
                        type="checkbox"
                        checked={settings.escalation_notify_sms}
                        onChange={(e) => updateSetting('escalation_notify_sms', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm">SMS</span>
                    </label>
                    <label className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5">
                      <input
                        type="checkbox"
                        checked={settings.escalation_notify_email}
                        onChange={(e) => updateSetting('escalation_notify_email', e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600"
                      />
                      <span className="text-sm">Email</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Auto-Reassign */}
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">🔀 Riassegnazione Automatica</p>
                  <p className="text-sm text-gray-500">Assegna a un altro cameriere disponibile</p>
                </div>
                <button
                  onClick={() =>
                    updateSetting('auto_reassign_enabled', !settings.auto_reassign_enabled)
                  }
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    settings.auto_reassign_enabled ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      settings.auto_reassign_enabled ? 'left-5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
              {settings.auto_reassign_enabled && (
                <div className="mt-3 flex items-center gap-3">
                  <label className="text-sm text-gray-600">Dopo:</label>
                  <select
                    value={settings.auto_reassign_after_seconds}
                    onChange={(e) =>
                      updateSetting('auto_reassign_after_seconds', parseInt(e.target.value))
                    }
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                  >
                    <option value={180}>3 minuti</option>
                    <option value={300}>5 minuti</option>
                    <option value={420}>7 minuti</option>
                    <option value={600}>10 minuti</option>
                  </select>
                </div>
              )}
            </div>

            {/* Critical Alert */}
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">🚨 Alert Critico</p>
                  <p className="text-sm text-gray-500">Suono di emergenza su tutti i dispositivi</p>
                </div>
                <button
                  onClick={() =>
                    updateSetting('critical_alert_enabled', !settings.critical_alert_enabled)
                  }
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    settings.critical_alert_enabled ? 'bg-amber-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                      settings.critical_alert_enabled ? 'left-5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>
              {settings.critical_alert_enabled && (
                <div className="mt-3 flex items-center gap-3">
                  <label className="text-sm text-gray-600">Dopo:</label>
                  <select
                    value={settings.critical_alert_after_seconds}
                    onChange={(e) =>
                      updateSetting('critical_alert_after_seconds', parseInt(e.target.value))
                    }
                    className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
                  >
                    <option value={300}>5 minuti</option>
                    <option value={600}>10 minuti</option>
                    <option value={900}>15 minuti</option>
                  </select>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-2">
              <button
                onClick={saveSettings}
                disabled={isSaving}
                className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isSaving ? 'Salvataggio...' : 'Salva Configurazione'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="rounded-lg bg-gray-50 p-4">
        <h4 className="mb-2 text-sm font-medium text-gray-700">💡 Come funziona</h4>
        <ul className="space-y-1 text-sm text-gray-600">
          <li>• Le notifiche base (cameriere + dashboard) sono sempre attive</li>
          <li>• Ogni opzione aggiuntiva è indipendente e opzionale</li>
          <li>• Puoi configurare tempi diversi per ogni tipo di richiesta</li>
          <li>• Le statistiche ti aiutano a capire le performance del team</li>
        </ul>
      </div>
    </div>
  );
}
