'use client';

import { useState, useEffect } from 'react';
import { EscalationSettings } from '@/components/team/EscalationSettings';
import type { TeamSettings } from './types';

// ============================================
// Setting Toggle
// ============================================
function SettingToggle({
  label,
  description,
  enabled,
  onToggle,
  disabled,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={enabled}
        disabled={disabled}
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

// ============================================
// Settings Tab
// ============================================
interface SettingsTabProps {
  settings: TeamSettings | null;
  onSave: (settings: Partial<TeamSettings>) => void;
  isSaving: boolean;
  onShowTooltip: () => void;
  merchantId?: string;
}

function SettingsTab({ settings, onSave, isSaving, onShowTooltip, merchantId }: SettingsTabProps) {
  const [localSettings, setLocalSettings] = useState<TeamSettings | null>(settings);

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  if (!localSettings) return null;

  const handleToggle = (key: keyof TeamSettings) => {
    setLocalSettings((prev) => {
      if (!prev) return prev;
      const newSettings = { ...prev, [key]: !prev[key] };
      onSave({ [key]: newSettings[key] });
      return newSettings;
    });
  };

  return (
    <div className="space-y-6">
      {/* Team Visibility */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">👥 Visibilità Team</h3>
            <button onClick={onShowTooltip} className="text-sm text-blue-600 hover:text-blue-700">
              Perché attivarlo? →
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Controlla se i clienti possono vedere il tuo team sul menu digitale
          </p>
        </div>
        <div className="space-y-4 p-4">
          <SettingToggle
            label="Mostra team sul menu"
            description="I clienti vedranno le schede del team con foto e nome"
            enabled={localSettings.showTeamOnMenu}
            onToggle={() => handleToggle('showTeamOnMenu')}
            disabled={isSaving}
          />

          {localSettings.showTeamOnMenu && (
            <div className="ml-10">
              <label className="block text-sm font-medium text-gray-700">
                Stile visualizzazione
              </label>
              <select
                value={localSettings.teamDisplayStyle}
                onChange={(e) => {
                  const value = e.target.value as 'cards' | 'list' | 'minimal';
                  setLocalSettings((prev) => prev && { ...prev, teamDisplayStyle: value });
                  onSave({ teamDisplayStyle: value });
                }}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="cards">Cards (con foto)</option>
                <option value="list">Lista compatta</option>
                <option value="minimal">Minimo (solo nome)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Review Settings */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900">⭐ Impostazioni Review</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configura come i clienti possono lasciare feedback sullo staff
          </p>
        </div>
        <div className="space-y-4 p-4">
          <SettingToggle
            label="Permetti review staff"
            description="I clienti possono valutare singoli membri del team"
            enabled={localSettings.allowStaffReviews}
            onToggle={() => handleToggle('allowStaffReviews')}
            disabled={isSaving}
          />

          {localSettings.allowStaffReviews && (
            <>
              <SettingToggle
                label="Richiedi ordine verificato"
                description="Solo chi ha ordinato può lasciare una review"
                enabled={localSettings.reviewRequiresOrder}
                onToggle={() => handleToggle('reviewRequiresOrder')}
                disabled={isSaving}
              />

              <SettingToggle
                label="Permetti review anonime"
                description="I clienti possono lasciare feedback senza identificarsi (no punti)"
                enabled={localSettings.allowAnonymousReviews}
                onToggle={() => handleToggle('allowAnonymousReviews')}
                disabled={isSaving}
              />
            </>
          )}
        </div>
      </div>

      {/* Recognition Settings */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900">🏆 Riconoscimenti</h3>
          <p className="mt-1 text-sm text-gray-500">
            Configura il sistema di premi e riconoscimenti per lo staff
          </p>
        </div>
        <div className="space-y-4 p-4">
          <SettingToggle
            label="Riconoscimenti settimanali"
            description="L'AI suggerisce automaticamente i migliori della settimana"
            enabled={localSettings.enableWeeklyRecognition}
            onToggle={() => handleToggle('enableWeeklyRecognition')}
            disabled={isSaving}
          />

          {localSettings.enableWeeklyRecognition && (
            <div className="ml-10">
              <label className="block text-sm font-medium text-gray-700">
                Tipo di premio predefinito
              </label>
              <select
                value={localSettings.recognitionRewardType}
                onChange={(e) => {
                  const value = e.target.value;
                  setLocalSettings((prev) => prev && { ...prev, recognitionRewardType: value });
                  onSave({ recognitionRewardType: value });
                }}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="badge">Badge digitale</option>
                <option value="bonus">Bonus economico</option>
                <option value="time_off">Ore extra di riposo</option>
                <option value="meal">Pasto omaggio</option>
                <option value="custom">Personalizzato</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Loyalty Points Info */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💎</span>
          <div>
            <h4 className="font-semibold text-blue-900">Sistema Punti Fedeltà</h4>
            <p className="mt-1 text-sm text-blue-700">
              I clienti guadagnano punti quando lasciano review identificate:
            </p>
            <ul className="mt-2 space-y-1 text-sm text-blue-600">
              <li>
                • <strong>10 punti</strong> - Review base
              </li>
              <li>
                • <strong>+5 punti</strong> - Con ordine verificato
              </li>
              <li>
                • <strong>+5 punti</strong> - Con commento dettagliato
              </li>
            </ul>
            <p className="mt-2 text-xs text-blue-500">
              Le review anonime non danno punti ma sono comunque registrate.
            </p>
          </div>
        </div>
      </div>

      {/* Escalation Settings */}
      {merchantId && (
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <EscalationSettings merchantId={merchantId} />
        </div>
      )}
    </div>
  );
}

export { SettingsTab };
