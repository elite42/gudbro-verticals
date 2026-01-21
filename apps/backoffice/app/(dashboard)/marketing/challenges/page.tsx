'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useTenant } from '@/lib/contexts/TenantContext';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { ImageUpload } from '@/components/ui/image-upload';
import {
  FoodChallenge,
  ChallengeAttempt,
  ChallengeFormData,
  AttemptFormData,
  ChallengeDifficulty,
  WinRewardType,
  getChallenges,
  getChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  toggleChallengeActive,
  getAttempts,
  createAttempt,
  deleteAttempt,
  getWallOfFame,
  getChallengeStats,
  formatTime,
  getDifficultyColor,
  getDifficultyLabel,
  DIFFICULTY_OPTIONS,
  WIN_REWARD_OPTIONS,
  DAYS_OPTIONS,
  WallOfFameEntry,
} from '@/lib/challenges-service';

// ============================================
// CHALLENGE FORM MODAL
// ============================================

interface ChallengeFormModalProps {
  challenge: FoodChallenge | null;
  merchantId: string;
  onClose: () => void;
  onSave: (data: ChallengeFormData) => Promise<void>;
}

type FormStep = 'basics' | 'reward' | 'record' | 'availability';

function ChallengeFormModal({ challenge, merchantId, onClose, onSave }: ChallengeFormModalProps) {
  const [step, setStep] = useState<FormStep>('basics');
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<ChallengeFormData>({
    name: challenge?.name || '',
    description: challenge?.description || '',
    image_url: challenge?.image_url || '',
    items: challenge?.items || [{ name: '', quantity: '' }],
    time_limit_minutes: challenge?.time_limit_minutes || 30,
    price_if_lose: challenge?.price_if_lose || 25,
    rules: challenge?.rules || ['Niente pause bagno', 'Niente aiuto esterno'],
    difficulty: challenge?.difficulty || 'medium',
    win_reward_type: challenge?.win_reward_type || 'free',
    win_cash_prize: challenge?.win_cash_prize || undefined,
    win_prize_name: challenge?.win_prize_name || '',
    win_prize_description: challenge?.win_prize_description || '',
    record_bonus_enabled: challenge?.record_bonus_enabled || false,
    record_bonus_cash: challenge?.record_bonus_cash || undefined,
    record_bonus_prize: challenge?.record_bonus_prize || '',
    record_bonus_description: challenge?.record_bonus_description || '',
    is_team_challenge: challenge?.is_team_challenge || false,
    team_size: challenge?.team_size || undefined,
    requires_booking: challenge?.requires_booking || false,
    available_days: challenge?.available_days || undefined,
    available_time_start: challenge?.available_time_start || '',
    available_time_end: challenge?.available_time_end || '',
    is_active: challenge?.is_active ?? true,
  });

  const steps: { id: FormStep; label: string; icon: string }[] = [
    { id: 'basics', label: 'Dettagli', icon: '🍔' },
    { id: 'reward', label: 'Premio', icon: '🏆' },
    { id: 'record', label: 'Record', icon: '⚡' },
    { id: 'availability', label: 'Quando', icon: '📅' },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  const goNext = () => {
    const idx = currentStepIndex;
    if (idx < steps.length - 1) setStep(steps[idx + 1].id);
  };

  const goPrev = () => {
    const idx = currentStepIndex;
    if (idx > 0) setStep(steps[idx - 1].id);
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', quantity: '' }],
    });
  };

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index),
    });
  };

  const updateItem = (index: number, field: 'name' | 'quantity' | 'description', value: string) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const addRule = () => {
    setFormData({ ...formData, rules: [...formData.rules, ''] });
  };

  const removeRule = (index: number) => {
    setFormData({
      ...formData,
      rules: formData.rules.filter((_, i) => i !== index),
    });
  };

  const updateRule = (index: number, value: string) => {
    const newRules = [...formData.rules];
    newRules[index] = value;
    setFormData({ ...formData, rules: newRules });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="m-4 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white">
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {challenge ? 'Modifica Sfida' : 'Nuova Sfida Alimentare'}
              </h2>
              <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Step indicator */}
            <div className="flex items-center justify-between">
              {steps.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStep(s.id)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    step === s.id
                      ? 'bg-orange-600 text-white'
                      : idx < currentStepIndex
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  <span>{s.icon}</span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6 p-6">
            {/* Step 1: Basics */}
            {step === 'basics' && (
              <>
                {/* Name & Description */}
                <div className="grid gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Nome Sfida *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                      placeholder="Es: The Mega Burger Challenge"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Descrizione
                    </label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={2}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                      placeholder="Descrivi la sfida..."
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Immagine Sfida
                    </label>
                    <ImageUpload
                      value={formData.image_url || ''}
                      onChange={(url) => setFormData({ ...formData, image_url: url })}
                      folder="challenges"
                      entityId={challenge?.id || 'new'}
                      maxSizeMB={5}
                      aspectRatio="landscape"
                      previewSize="md"
                      helpText="Immagine che rappresenta la sfida (es: il piatto da completare)"
                    />
                  </div>
                </div>

                {/* Items */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Cosa deve mangiare/bere *
                  </label>
                  <div className="space-y-2">
                    {formData.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateItem(idx, 'name', e.target.value)}
                          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500"
                          placeholder="Nome (es: Mega Burger)"
                        />
                        <input
                          type="text"
                          value={item.quantity}
                          onChange={(e) => updateItem(idx, 'quantity', e.target.value)}
                          className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500"
                          placeholder="Quantita"
                        />
                        {formData.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(idx)}
                            className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addItem}
                      className="text-sm text-orange-600 hover:text-orange-700"
                    >
                      + Aggiungi altro
                    </button>
                  </div>
                </div>

                {/* Time & Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Tempo Limite (minuti) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.time_limit_minutes}
                      onChange={(e) =>
                        setFormData({ ...formData, time_limit_minutes: Number(e.target.value) })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-500"
                      min={1}
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Prezzo se Perdi (EUR) *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.price_if_lose}
                      onChange={(e) =>
                        setFormData({ ...formData, price_if_lose: Number(e.target.value) })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-500"
                      min={0}
                      step={0.01}
                    />
                  </div>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Difficolta</label>
                  <div className="flex gap-2">
                    {DIFFICULTY_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, difficulty: opt.value })}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                          formData.difficulty === opt.value
                            ? getDifficultyColor(opt.value)
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rules */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">Regole</label>
                  <div className="space-y-2">
                    {formData.rules.map((rule, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={rule}
                          onChange={(e) => updateRule(idx, e.target.value)}
                          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-orange-500"
                          placeholder="Es: Niente pause bagno"
                        />
                        <button
                          type="button"
                          onClick={() => removeRule(idx)}
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addRule}
                      className="text-sm text-orange-600 hover:text-orange-700"
                    >
                      + Aggiungi regola
                    </button>
                  </div>
                </div>

                {/* Team Challenge */}
                <div className="rounded-xl border border-purple-200 bg-purple-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">Sfida di Squadra</h4>
                      <p className="text-sm text-gray-600">
                        Permetti a piu persone di competere insieme
                      </p>
                    </div>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.is_team_challenge}
                        onChange={(e) =>
                          setFormData({ ...formData, is_team_challenge: e.target.checked })
                        }
                        className="h-5 w-5 rounded text-purple-600 focus:ring-purple-500"
                      />
                    </label>
                  </div>
                  {formData.is_team_challenge && (
                    <div className="mt-4">
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Numero partecipanti
                      </label>
                      <input
                        type="number"
                        value={formData.team_size || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            team_size: e.target.value ? Number(e.target.value) : undefined,
                          })
                        }
                        className="w-32 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                        min={2}
                        placeholder="Es: 2"
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Step 2: Reward */}
            {step === 'reward' && (
              <>
                <div className="rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
                  <h3 className="mb-4 text-lg font-bold text-gray-900">Premio per chi Vince</h3>

                  {/* Reward Type */}
                  <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Tipo di Premio
                    </label>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {WIN_REWARD_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, win_reward_type: opt.value })}
                          className={`rounded-lg border-2 p-4 text-left transition-colors ${
                            formData.win_reward_type === opt.value
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <p className="font-medium text-gray-900">{opt.label}</p>
                          <p className="text-sm text-gray-500">{opt.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cash Prize (if applicable) */}
                  {formData.win_reward_type === 'free_plus_cash' && (
                    <div className="mb-4">
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Premio in Denaro (EUR)
                      </label>
                      <input
                        type="number"
                        value={formData.win_cash_prize || ''}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            win_cash_prize: e.target.value ? Number(e.target.value) : undefined,
                          })
                        }
                        className="w-40 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                        placeholder="50"
                        min={0}
                      />
                    </div>
                  )}

                  {/* Prize Details (if applicable) */}
                  {formData.win_reward_type === 'free_plus_prize' && (
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Nome Premio
                        </label>
                        <input
                          type="text"
                          value={formData.win_prize_name || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, win_prize_name: e.target.value })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                          placeholder="Es: T-Shirt Wall of Fame"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Descrizione Premio
                        </label>
                        <input
                          type="text"
                          value={formData.win_prize_description || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, win_prize_description: e.target.value })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                          placeholder="Es: T-shirt esclusiva + foto nel Wall of Fame"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Step 3: Record Bonus */}
            {step === 'record' && (
              <>
                <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Bonus Record Breaker</h3>
                      <p className="text-sm text-gray-600">Premio extra per chi batte il record</p>
                    </div>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.record_bonus_enabled}
                        onChange={(e) =>
                          setFormData({ ...formData, record_bonus_enabled: e.target.checked })
                        }
                        className="h-5 w-5 rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Attiva</span>
                    </label>
                  </div>

                  {formData.record_bonus_enabled && (
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Bonus Cash (EUR)
                        </label>
                        <input
                          type="number"
                          value={formData.record_bonus_cash || ''}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              record_bonus_cash: e.target.value
                                ? Number(e.target.value)
                                : undefined,
                            })
                          }
                          className="w-40 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500"
                          placeholder="100"
                          min={0}
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Premio Aggiuntivo
                        </label>
                        <input
                          type="text"
                          value={formData.record_bonus_prize || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, record_bonus_prize: e.target.value })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500"
                          placeholder="Es: 10% sconto lifetime"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          Descrizione
                        </label>
                        <input
                          type="text"
                          value={formData.record_bonus_description || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, record_bonus_description: e.target.value })
                          }
                          className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500"
                          placeholder="Es: Batti il record e vinci ancora di piu!"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Current Record Info (if editing) */}
                {challenge?.record_time_minutes && (
                  <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
                    <h4 className="mb-2 font-bold text-gray-900">Record Attuale</h4>
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-2xl font-bold text-yellow-700">
                          {formatTime(challenge.record_time_minutes)}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">di {challenge.record_holder_name}</p>
                        <p className="text-xs text-gray-500">{challenge.record_date}</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Step 4: Availability */}
            {step === 'availability' && (
              <>
                {/* Requires Booking */}
                <div className="flex items-center gap-4">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.requires_booking}
                      onChange={(e) =>
                        setFormData({ ...formData, requires_booking: e.target.checked })
                      }
                      className="h-5 w-5 rounded text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Richiede prenotazione</span>
                  </label>
                </div>

                {/* Available Days */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Giorni Disponibili
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS_OPTIONS.map((day) => (
                      <button
                        key={day.value}
                        type="button"
                        onClick={() => {
                          const current = formData.available_days || [];
                          const newDays = current.includes(day.value)
                            ? current.filter((d) => d !== day.value)
                            : [...current, day.value];
                          setFormData({
                            ...formData,
                            available_days: newDays.length > 0 ? newDays : undefined,
                          });
                        }}
                        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                          formData.available_days?.includes(day.value)
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Lascia vuoto per tutti i giorni</p>
                </div>

                {/* Time Window */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Dalle</label>
                    <input
                      type="time"
                      value={formData.available_time_start || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, available_time_start: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Alle</label>
                    <input
                      type="time"
                      value={formData.available_time_end || ''}
                      onChange={(e) =>
                        setFormData({ ...formData, available_time_end: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Active Toggle */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-gray-900">Sfida Attiva</h4>
                      <p className="text-sm text-gray-600">
                        Disattiva per nascondere temporaneamente
                      </p>
                    </div>
                    <label className="flex cursor-pointer items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="h-5 w-5 rounded text-green-600 focus:ring-green-500"
                      />
                    </label>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer with navigation */}
          <div className="flex items-center justify-between border-t border-gray-200 p-6">
            <div>
              {currentStepIndex > 0 && (
                <button
                  type="button"
                  onClick={goPrev}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Indietro
                </button>
              )}
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
              >
                Annulla
              </button>
              {currentStepIndex < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
                >
                  Avanti
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                >
                  {saving ? 'Salvataggio...' : challenge ? 'Salva Modifiche' : 'Crea Sfida'}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================
// ATTEMPT MODAL
// ============================================

interface AttemptModalProps {
  challenge: FoodChallenge;
  onClose: () => void;
  onSave: (data: AttemptFormData) => Promise<void>;
}

function AttemptModal({ challenge, onClose, onSave }: AttemptModalProps) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<AttemptFormData>({
    participant_name: '',
    succeeded: false,
    completion_time_minutes: undefined,
    attempt_date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="m-4 w-full max-w-md rounded-2xl bg-white">
        <form onSubmit={handleSubmit}>
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Registra Tentativo</h2>
              <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="space-y-4 p-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Nome Partecipante *
              </label>
              <input
                type="text"
                required
                value={formData.participant_name}
                onChange={(e) => setFormData({ ...formData, participant_name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-500"
                placeholder="Es: Marco Rossi"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Data</label>
              <input
                type="date"
                value={formData.attempt_date}
                onChange={(e) => setFormData({ ...formData, attempt_date: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <label className="mb-4 flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={formData.succeeded}
                  onChange={(e) => setFormData({ ...formData, succeeded: e.target.checked })}
                  className="h-6 w-6 rounded text-green-600 focus:ring-green-500"
                />
                <span className="text-lg font-bold text-gray-900">Ha Completato la Sfida!</span>
              </label>

              {formData.succeeded && (
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Tempo di Completamento (minuti)
                  </label>
                  <input
                    type="number"
                    value={formData.completion_time_minutes || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        completion_time_minutes: e.target.value
                          ? Number(e.target.value)
                          : undefined,
                      })
                    }
                    className="w-32 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500"
                    placeholder="Es: 23.5"
                    step={0.1}
                    min={0}
                    max={challenge.time_limit_minutes}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Max: {challenge.time_limit_minutes} min
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-200 p-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Annulla
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 disabled:opacity-50"
            >
              {saving ? 'Salvataggio...' : 'Registra'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================
// WALL OF FAME MODAL
// ============================================

interface WallOfFameModalProps {
  challenge: FoodChallenge;
  onClose: () => void;
}

function WallOfFameModal({ challenge, onClose }: WallOfFameModalProps) {
  const [entries, setEntries] = useState<WallOfFameEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getWallOfFame(challenge.id, 20);
        setEntries(data);
      } catch (error) {
        console.error('Error loading wall of fame:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [challenge.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="m-4 max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Wall of Fame</h2>
              <p className="text-sm text-gray-500">{challenge.name}</p>
            </div>
            <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-orange-600"></div>
            </div>
          ) : entries.length === 0 ? (
            <div className="py-12 text-center">
              <span className="mb-4 block text-5xl">🏆</span>
              <p className="text-lg font-medium text-gray-900">Nessuno ha ancora vinto!</p>
              <p className="text-sm text-gray-500">Sarai tu il primo?</p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-4 rounded-xl p-4 ${
                    entry.is_current_record
                      ? 'border-2 border-yellow-400 bg-yellow-50'
                      : 'border border-gray-200 bg-gray-50'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${
                      entry.rank === 1
                        ? 'bg-yellow-400 text-yellow-900'
                        : entry.rank === 2
                          ? 'bg-gray-300 text-gray-700'
                          : entry.rank === 3
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {entry.rank}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-900">{entry.participant_name}</p>
                      {entry.is_current_record && (
                        <span className="rounded bg-yellow-400 px-1.5 py-0.5 text-[10px] font-bold text-yellow-900">
                          RECORD
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{entry.attempt_date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-orange-600">
                      {formatTime(entry.completion_time_minutes)}
                    </p>
                    <p className="text-xs text-gray-500">minuti</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function ChallengesPage() {
  const t = useTranslations('challenges');
  const { organization } = useTenant();
  const [challenges, setChallenges] = useState<FoodChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<FoodChallenge | null>(null);
  const [attemptChallenge, setAttemptChallenge] = useState<FoodChallenge | null>(null);
  const [wallOfFameChallenge, setWallOfFameChallenge] = useState<FoodChallenge | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  // Use organization ID as merchant ID (they map 1:1 in our schema)
  const merchantId = organization?.id || 'demo-merchant-id';

  const loadChallenges = useCallback(async () => {
    if (!merchantId) return;
    setLoading(true);
    try {
      const data = await getChallenges(merchantId);
      setChallenges(data);
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      setLoading(false);
    }
  }, [merchantId]);

  useEffect(() => {
    loadChallenges();
  }, [loadChallenges]);

  const filteredChallenges =
    filter === 'all'
      ? challenges
      : filter === 'active'
        ? challenges.filter((c) => c.is_active)
        : challenges.filter((c) => !c.is_active);

  const stats = {
    total: challenges.length,
    active: challenges.filter((c) => c.is_active).length,
    totalAttempts: challenges.reduce((sum, c) => sum + c.total_attempts, 0),
    totalWins: challenges.reduce((sum, c) => sum + c.total_wins, 0),
  };

  const handleSaveChallenge = async (data: ChallengeFormData) => {
    if (selectedChallenge) {
      await updateChallenge(selectedChallenge.id, data);
    } else {
      await createChallenge(merchantId, data);
    }
    await loadChallenges();
    setShowCreateModal(false);
    setSelectedChallenge(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm(t('actions.confirmDelete'))) {
      await deleteChallenge(id);
      await loadChallenges();
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    await toggleChallengeActive(id, isActive);
    await loadChallenges();
  };

  const handleSaveAttempt = async (data: AttemptFormData) => {
    if (!attemptChallenge) return;
    await createAttempt(attemptChallenge.id, merchantId, data);
    await loadChallenges();
    setAttemptChallenge(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-orange-600"></div>
          <p className="text-sm text-gray-500">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <InfoTooltip contentKey="pages.challenges" kbPageId="food-challenges" />
          </div>
          <p className="mt-1 text-sm text-gray-500">{t('description')}</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('newChallenge')}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{t('stats.total')}</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{t('stats.active')}</p>
          <p className="text-2xl font-bold text-green-600">{stats.active}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{t('stats.attempts')}</p>
          <p className="text-2xl font-bold text-orange-600">{stats.totalAttempts}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-sm text-gray-500">{t('stats.winners')}</p>
          <p className="text-2xl font-bold text-purple-600">{stats.totalWins}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {[
          { id: 'all', label: t('filters.all') },
          { id: 'active', label: t('filters.active') },
          { id: 'inactive', label: t('filters.inactive') },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as typeof filter)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              filter === f.id
                ? 'bg-orange-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Challenges Grid */}
      {filteredChallenges.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <span className="mb-4 block text-5xl">🍔</span>
          <h3 className="mb-2 text-lg font-medium text-gray-900">{t('empty.title')}</h3>
          <p className="mb-4 text-gray-500">{t('empty.description')}</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
          >
            {t('empty.action')}
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`overflow-hidden rounded-xl border bg-white ${
                challenge.is_active ? 'border-gray-200' : 'border-gray-300 opacity-60'
              }`}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">{challenge.name}</h3>
                    <p className="text-sm text-orange-100">
                      {challenge.time_limit_minutes} min | {challenge.price_if_lose} EUR se perdi
                    </p>
                  </div>
                  <span
                    className={`rounded px-2 py-1 text-xs font-bold ${getDifficultyColor(challenge.difficulty)}`}
                  >
                    {getDifficultyLabel(challenge.difficulty)}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                {/* Items */}
                <div className="mb-4">
                  <p className="mb-1 text-xs font-medium uppercase text-gray-500">
                    {t('card.toFinish')}
                  </p>
                  <ul className="space-y-1">
                    {challenge.items.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="text-orange-500">•</span>
                        {item.quantity} {item.name}
                      </li>
                    ))}
                    {challenge.items.length > 3 && (
                      <li className="text-sm text-gray-500">
                        {t('card.moreItems', { count: challenge.items.length - 3 })}
                      </li>
                    )}
                  </ul>
                </div>

                {/* Stats */}
                <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg bg-gray-50 p-3">
                  <div>
                    <p className="text-xs text-gray-500">{t('card.attempts')}</p>
                    <p className="text-lg font-bold text-gray-900">{challenge.total_attempts}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t('card.winners')}</p>
                    <p className="text-lg font-bold text-green-600">{challenge.total_wins}</p>
                  </div>
                </div>

                {/* Record */}
                {challenge.record_time_minutes ? (
                  <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                    <p className="text-xs font-medium text-yellow-800">{t('card.record')}</p>
                    <p className="text-lg font-bold text-yellow-900">
                      {formatTime(challenge.record_time_minutes)}
                    </p>
                    <p className="text-xs text-yellow-700">
                      {t('card.recordBy', { name: challenge.record_holder_name ?? '' })}
                    </p>
                  </div>
                ) : (
                  <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
                    <p className="text-center text-sm font-medium text-gray-600">
                      {t('card.noWinnerYet')}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setAttemptChallenge(challenge)}
                    className="flex-1 rounded-lg bg-orange-600 px-3 py-2 text-sm font-medium text-white hover:bg-orange-700"
                  >
                    {t('card.addAttempt')}
                  </button>
                  <button
                    onClick={() => setWallOfFameChallenge(challenge)}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    {t('card.wallOfFame')}
                  </button>
                  <button
                    onClick={() => setSelectedChallenge(challenge)}
                    className="rounded-lg border border-gray-300 p-2 text-gray-500 hover:bg-gray-50"
                    title="Modifica"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleToggleActive(challenge.id, !challenge.is_active)}
                    className={`rounded-lg border p-2 ${
                      challenge.is_active
                        ? 'border-gray-300 text-gray-500 hover:bg-gray-50'
                        : 'border-green-300 text-green-600 hover:bg-green-50'
                    }`}
                    title={challenge.is_active ? 'Disattiva' : 'Attiva'}
                  >
                    {challenge.is_active ? (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(challenge.id)}
                    className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
                    title="Elimina"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      <div className="rounded-xl border border-orange-100 bg-gradient-to-r from-orange-50 to-red-50 p-6">
        <h3 className="mb-3 font-bold text-gray-900">Suggerimenti per sfide di successo</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-start gap-3">
            <span className="text-2xl">📸</span>
            <div>
              <p className="font-medium text-gray-900">Scatta foto</p>
              <p className="text-sm text-gray-600">Le foto dei vincitori aumentano la viralita</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎬</span>
            <div>
              <p className="font-medium text-gray-900">Fai video</p>
              <p className="text-sm text-gray-600">
                I video dei tentativi funzionano benissimo sui social
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <p className="font-medium text-gray-900">Aggiorna il Wall of Fame</p>
              <p className="text-sm text-gray-600">Mostra i campioni per ispirare nuovi sfidanti</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {(showCreateModal || selectedChallenge) && (
        <ChallengeFormModal
          challenge={selectedChallenge}
          merchantId={merchantId}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedChallenge(null);
          }}
          onSave={handleSaveChallenge}
        />
      )}

      {attemptChallenge && (
        <AttemptModal
          challenge={attemptChallenge}
          onClose={() => setAttemptChallenge(null)}
          onSave={handleSaveAttempt}
        />
      )}

      {wallOfFameChallenge && (
        <WallOfFameModal
          challenge={wallOfFameChallenge}
          onClose={() => setWallOfFameChallenge(null)}
        />
      )}
    </div>
  );
}
