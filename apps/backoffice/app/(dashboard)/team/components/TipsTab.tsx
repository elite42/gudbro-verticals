'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { EmptyState } from '@/components/ui/empty-state';
import type {
  TipDistributionSettings,
  TipPoolMember,
  TipPoolPeriod,
  StaffProfile,
  DistributionPreview,
} from './types';

interface TipsTabProps {
  settings: TipDistributionSettings | null;
  members: TipPoolMember[];
  periods: TipPoolPeriod[];
  staffProfiles: StaffProfile[];
  isLoading: boolean;
  isSaving: boolean;
  distributionPreview: DistributionPreview[] | null;
  onSaveSettings: (settings: Partial<TipDistributionSettings>) => void;
  onUpdateMember: (memberId: string, data: Partial<TipPoolMember>) => void;
  onSyncMembers: () => void;
  onClosePeriod: (periodId: string) => void;
  onPreviewDistribution: (periodId: string) => void;
  onDistribute: (periodId: string) => void;
  onCreatePeriod: () => void;
  onClearPreview: () => void;
}

function TipsTab({
  settings,
  members,
  periods,
  staffProfiles,
  isLoading,
  isSaving,
  distributionPreview,
  onSaveSettings,
  onUpdateMember,
  onSyncMembers,
  onClosePeriod,
  onPreviewDistribution,
  onDistribute,
  onCreatePeriod,
  onClearPreview,
}: TipsTabProps) {
  const [localSettings, setLocalSettings] = useState<Partial<TipDistributionSettings>>(
    settings || {
      distributionMode: 'individual',
      poolType: 'equal',
      rolePercentages: { waiter: 60, kitchen: 25, manager: 15 },
      distributionPeriod: 'weekly',
      distributionDay: 1,
      includeServiceCharge: true,
      requireMinimumHours: false,
      minimumHoursPerPeriod: 20,
    }
  );
  const [activeSection, setActiveSection] = useState<'config' | 'members' | 'periods'>('config');

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleSave = () => {
    onSaveSettings(localSettings);
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Tabs */}
      <div className="flex gap-2 border-b border-gray-200 pb-2">
        {[
          { id: 'config', label: 'Configurazione', icon: '⚙️' },
          { id: 'members', label: 'Membri Pool', icon: '👥' },
          { id: 'periods', label: 'Periodi', icon: '📅' },
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id as typeof activeSection)}
            className={`flex items-center gap-2 rounded-t-lg px-4 py-2 text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
            }`}
          >
            <span>{section.icon}</span>
            {section.label}
          </button>
        ))}
      </div>

      {/* Configuration Section */}
      {activeSection === 'config' && (
        <div className="space-y-6">
          {/* Distribution Mode */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">💰 Modalità Distribuzione</h3>
              <p className="mt-1 text-sm text-gray-500">
                Come vengono distribuite le mance al team
              </p>
            </div>
            <div className="space-y-4 p-4">
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    value: 'individual',
                    label: 'Individuale',
                    desc: '100% al cameriere che serve',
                    icon: '👤',
                  },
                  {
                    value: 'pool',
                    label: 'Pool Condiviso',
                    desc: 'Condiviso tra tutto lo staff',
                    icon: '👥',
                  },
                  {
                    value: 'none',
                    label: 'Non Distribuite',
                    desc: "Le mance vanno all'azienda",
                    icon: '🏢',
                  },
                ].map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() =>
                      setLocalSettings({
                        ...localSettings,
                        distributionMode: mode.value as 'individual' | 'pool' | 'none',
                      })
                    }
                    className={`flex flex-col items-center rounded-xl border-2 p-4 transition-all ${
                      localSettings.distributionMode === mode.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="mb-2 text-2xl">{mode.icon}</span>
                    <span className="font-medium text-gray-900">{mode.label}</span>
                    <span className="mt-1 text-center text-xs text-gray-500">{mode.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pool Configuration (if pool mode) */}
          {localSettings.distributionMode === 'pool' && (
            <div className="rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900">📊 Configurazione Pool</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Come dividere le mance tra i membri del pool
                </p>
              </div>
              <div className="space-y-4 p-4">
                {/* Pool Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo di divisione
                  </label>
                  <select
                    value={localSettings.poolType}
                    onChange={(e) =>
                      setLocalSettings({
                        ...localSettings,
                        poolType: e.target.value as 'equal' | 'by_role' | 'custom',
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                  >
                    <option value="equal">Equo - Tutti ricevono la stessa quota</option>
                    <option value="by_role">Per Ruolo - Percentuali basate sul ruolo</option>
                    <option value="custom">Custom - Percentuali individuali</option>
                  </select>
                </div>

                {/* Role Percentages (if by_role) */}
                {localSettings.poolType === 'by_role' && (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Percentuali per Ruolo
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(localSettings.rolePercentages || {}).map(([role, pct]) => (
                        <div key={role} className="flex items-center gap-2">
                          <span className="w-20 text-sm capitalize text-gray-600">{role}</span>
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={pct}
                            onChange={(e) =>
                              setLocalSettings({
                                ...localSettings,
                                rolePercentages: {
                                  ...localSettings.rolePercentages,
                                  [role]: parseInt(e.target.value) || 0,
                                },
                              })
                            }
                            className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-sm"
                          />
                          <span className="text-sm text-gray-500">%</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Totale:{' '}
                      {Object.values(localSettings.rolePercentages || {}).reduce(
                        (a, b) => a + b,
                        0
                      )}
                      %
                    </p>
                  </div>
                )}

                {/* Include Service Charge */}
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">Includi Coperto nel Pool</p>
                    <p className="text-xs text-gray-500">
                      Il coperto viene aggiunto alle mance da distribuire
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={localSettings.includeServiceCharge}
                    onClick={() =>
                      setLocalSettings({
                        ...localSettings,
                        includeServiceCharge: !localSettings.includeServiceCharge,
                      })
                    }
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
                      localSettings.includeServiceCharge ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                        localSettings.includeServiceCharge ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Distribution Period */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900">📅 Periodo Distribuzione</h3>
              <p className="mt-1 text-sm text-gray-500">Quando vengono distribuite le mance</p>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Periodo</label>
                <select
                  value={localSettings.distributionPeriod}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      distributionPeriod: e.target.value as
                        | 'weekly'
                        | 'biweekly'
                        | 'monthly'
                        | 'custom',
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                  <option value="weekly">Settimanale</option>
                  <option value="biweekly">Bisettimanale</option>
                  <option value="monthly">Mensile</option>
                  <option value="custom">Personalizzato</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Giorno{' '}
                  {localSettings.distributionPeriod === 'monthly' ? 'del mese' : 'della settimana'}
                </label>
                <select
                  value={localSettings.distributionDay}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      distributionDay: parseInt(e.target.value),
                    })
                  }
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                >
                  {localSettings.distributionPeriod === 'monthly' ? (
                    Array.from({ length: 28 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="1">Lunedì</option>
                      <option value="2">Martedì</option>
                      <option value="3">Mercoledì</option>
                      <option value="4">Giovedì</option>
                      <option value="5">Venerdì</option>
                      <option value="6">Sabato</option>
                      <option value="7">Domenica</option>
                    </>
                  )}
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? 'Salvataggio...' : 'Salva Impostazioni'}
            </button>
          </div>
        </div>
      )}

      {/* Members Section */}
      {activeSection === 'members' && (
        <div className="space-y-4">
          {/* Actions */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{members.length} membri nel pool</p>
            <button
              onClick={onSyncMembers}
              disabled={isSaving}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              🔄 Sincronizza da Staff
            </button>
          </div>

          {members.length === 0 ? (
            <EmptyState
              icon={<span className="text-5xl">👥</span>}
              title="Nessun membro nel pool"
              description="Sincronizza i membri dello staff per aggiungerli al pool delle mance."
              action={{ label: 'Sincronizza Staff', onClick: onSyncMembers }}
              variant="default"
              size="default"
            />
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className={`rounded-xl border p-4 transition-all ${
                    member.isIncluded
                      ? 'border-gray-200 bg-white'
                      : 'border-gray-100 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {member.staffPhoto ? (
                        <img
                          src={member.staffPhoto}
                          alt={member.staffName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                          {member.staffName.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{member.staffName}</p>
                        <p className="text-xs text-gray-500">{member.tipRole || member.jobTitle}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => onUpdateMember(member.id, { isIncluded: !member.isIncluded })}
                      className={`rounded-lg px-2 py-1 text-xs font-medium ${
                        member.isIncluded
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {member.isIncluded ? '✓ Incluso' : 'Escluso'}
                    </button>
                  </div>

                  {/* Custom Percentage (if custom mode) */}
                  {settings?.poolType === 'custom' && member.isIncluded && (
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm text-gray-600">Percentuale:</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={member.customPercentage || 0}
                        onChange={(e) =>
                          onUpdateMember(member.id, {
                            customPercentage: parseFloat(e.target.value) || 0,
                          })
                        }
                        className="w-20 rounded-lg border border-gray-300 px-2 py-1 text-sm"
                      />
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  )}

                  {/* Exclusion Reason */}
                  {!member.isIncluded && member.exclusionReason && (
                    <p className="mt-2 text-xs text-gray-400">Motivo: {member.exclusionReason}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Periods Section */}
      {activeSection === 'periods' && (
        <div className="space-y-4">
          {/* Actions */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">{periods.length} periodi</p>
            <button
              onClick={onCreatePeriod}
              disabled={isSaving}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              + Nuovo Periodo
            </button>
          </div>

          {periods.length === 0 ? (
            <EmptyState
              icon={<span className="text-5xl">📅</span>}
              title="Nessun periodo"
              description="Crea un nuovo periodo per iniziare a tracciare le mance."
              action={{ label: 'Crea Periodo', onClick: onCreatePeriod }}
              variant="default"
              size="default"
            />
          ) : (
            <div className="space-y-3">
              {periods.map((period) => (
                <div key={period.id} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            period.status === 'open'
                              ? 'bg-green-100 text-green-700'
                              : period.status === 'closed'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {period.status === 'open'
                            ? '🟢 Aperto'
                            : period.status === 'closed'
                              ? '🟡 Chiuso'
                              : '✅ Distribuito'}
                        </span>
                        <span className="font-medium text-gray-900">
                          {new Date(period.periodStart).toLocaleDateString('it-IT')} -{' '}
                          {new Date(period.periodEnd).toLocaleDateString('it-IT')}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                        <span>💰 Mance: €{period.totalTips.toFixed(2)}</span>
                        <span>🍽️ Coperto: €{period.totalServiceCharges.toFixed(2)}</span>
                        {period.status === 'distributed' && (
                          <span>✅ Distribuito: €{period.totalDistributed.toFixed(2)}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {period.status === 'open' && (
                        <button
                          onClick={() => onClosePeriod(period.id)}
                          disabled={isSaving}
                          className="rounded-lg border border-yellow-300 bg-yellow-50 px-3 py-1.5 text-sm font-medium text-yellow-700 hover:bg-yellow-100 disabled:opacity-50"
                        >
                          Chiudi Periodo
                        </button>
                      )}
                      {period.status === 'closed' && (
                        <>
                          <button
                            onClick={() => onPreviewDistribution(period.id)}
                            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                          >
                            Anteprima
                          </button>
                          <button
                            onClick={() => onDistribute(period.id)}
                            disabled={isSaving}
                            className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                          >
                            Distribuisci
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Distribution Preview Modal */}
          {distributionPreview && (
            <Dialog open={true} onOpenChange={() => onClearPreview()}>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>📊 Anteprima Distribuzione</DialogTitle>
                  <DialogDescription>Ecco come verranno distribuite le mance</DialogDescription>
                </DialogHeader>
                <div className="max-h-80 space-y-2 overflow-y-auto py-4">
                  {distributionPreview.map((alloc, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                    >
                      <div className="flex items-center gap-3">
                        {alloc.staffPhoto ? (
                          <img
                            src={alloc.staffPhoto}
                            alt={alloc.staffName}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                            {alloc.staffName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{alloc.staffName}</p>
                          <p className="text-xs text-gray-500">
                            {alloc.tipRole} • {alloc.percentageShare.toFixed(1)}%
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-green-600">
                        €{alloc.allocationAmount.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <DialogFooter>
                  <button
                    onClick={() => onClearPreview()}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Chiudi
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      )}
    </div>
  );
}

export { TipsTab };
