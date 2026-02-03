'use client';

import { useState } from 'react';
import type { PromotionFormData, PromotionType, TriggerAction } from './types';
import { PROMOTION_TYPE_CONFIG, TRIGGER_CONFIG } from './types';

interface PromotionFormModalProps {
  onClose: () => void;
  onSave: (data: PromotionFormData) => void;
}

export function PromotionFormModal({ onClose, onSave }: PromotionFormModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PromotionFormData>({
    title: '',
    description: '',
    type: 'discount_percent',
    status: 'draft',
    reward: {},
    triggerAction: 'none',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    externalQREnabled: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const updateReward = (key: string, value: number | string | undefined) => {
    setFormData({
      ...formData,
      reward: { ...formData.reward, [key]: value },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="m-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white">
        <form onSubmit={handleSubmit}>
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Nuova Promozione</h2>
                <p className="text-sm text-gray-500">Step {step} di 3</p>
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
            {/* Progress bar */}
            <div className="mt-4 flex gap-2">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-purple-600' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6 p-6">
            {step === 1 && (
              <>
                {/* Promo Type Selection */}
                <div>
                  <label className="mb-3 block text-sm font-medium text-gray-700">
                    Tipo di Promozione
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(PROMOTION_TYPE_CONFIG).map(([type, config]) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: type as PromotionType })}
                        className={`group rounded-lg border-2 p-3 text-left transition-colors ${
                          formData.type === type
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <span className="mb-1 block text-2xl">{config.icon}</span>
                        <span className="text-sm font-medium text-gray-900">{config.label}</span>
                        <span className="mt-1 block text-[11px] leading-tight text-gray-500 group-hover:text-gray-600">
                          {config.description}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Titolo *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                    placeholder="Es: Sconto 20% sul primo ordine"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Descrizione
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500"
                    placeholder="Descrivi la promozione..."
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Reward Details based on type */}
                <div className="rounded-xl bg-purple-50 p-4">
                  <h4 className="mb-4 font-medium text-gray-900">Dettagli Premio</h4>

                  {formData.type === 'discount_percent' && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Sconto %
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={formData.reward.discountPercent || ''}
                        onChange={(e) => updateReward('discountPercent', Number(e.target.value))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        placeholder="Es: 20"
                      />
                    </div>
                  )}

                  {formData.type === 'discount_fixed' && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Sconto Fisso (&euro;)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.reward.discountFixed || ''}
                        onChange={(e) => updateReward('discountFixed', Number(e.target.value))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        placeholder="Es: 5"
                      />
                    </div>
                  )}

                  {formData.type === 'free_item' && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Prodotto Omaggio
                      </label>
                      <input
                        type="text"
                        value={formData.reward.freeItemName || ''}
                        onChange={(e) => updateReward('freeItemName', e.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        placeholder="Es: Caff&egrave;, Dessert"
                      />
                    </div>
                  )}

                  {formData.type === 'loyalty_bonus' && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Punti Bonus
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={formData.reward.bonusPoints || ''}
                        onChange={(e) => updateReward('bonusPoints', Number(e.target.value))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        placeholder="Es: 100"
                      />
                    </div>
                  )}

                  {(formData.type === 'scratch_card' || formData.type === 'spin_wheel') && (
                    <p className="text-sm text-gray-600">
                      I premi della{' '}
                      {formData.type === 'scratch_card' ? 'carta gratta e vinci' : 'ruota'} verranno
                      configurati dopo la creazione.
                    </p>
                  )}

                  {formData.type === 'first_visit' && (
                    <div>
                      <label className="mb-1 block text-sm font-medium text-gray-700">
                        Sconto Prima Visita %
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="100"
                        value={formData.reward.discountPercent || ''}
                        onChange={(e) => updateReward('discountPercent', Number(e.target.value))}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2"
                        placeholder="Es: 15"
                      />
                    </div>
                  )}
                </div>

                {/* Trigger Action */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Azione Richiesta per Attivare
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(TRIGGER_CONFIG).map(([action, config]) => (
                      <button
                        key={action}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, triggerAction: action as TriggerAction })
                        }
                        className={`rounded-lg border-2 p-3 text-left transition-colors ${
                          formData.triggerAction === action
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <span className="mr-2 text-lg">{config.icon}</span>
                        <span className="text-sm font-medium text-gray-900">{config.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Data Inizio *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Data Fine *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2"
                    />
                  </div>
                </div>

                {/* External QR */}
                <div className="rounded-xl bg-blue-50 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">QR Marketing Esterno</h4>
                      <p className="text-sm text-gray-600">
                        Abilita il sistema a 2 step con QR piazzati fuori dal locale
                      </p>
                    </div>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={formData.externalQREnabled}
                        onChange={(e) =>
                          setFormData({ ...formData, externalQREnabled: e.target.checked })
                        }
                        className="peer sr-only"
                      />
                      <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-purple-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300"></div>
                    </label>
                  </div>
                </div>

                {/* Summary */}
                <div className="rounded-xl bg-gray-50 p-4">
                  <h4 className="mb-3 font-medium text-gray-900">Riepilogo</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tipo:</span>
                      <span className="font-medium">
                        {PROMOTION_TYPE_CONFIG[formData.type].label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Titolo:</span>
                      <span className="font-medium">{formData.title || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Trigger:</span>
                      <span className="font-medium">
                        {TRIGGER_CONFIG[formData.triggerAction].label}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Periodo:</span>
                      <span className="font-medium">
                        {formData.startDate} &rarr; {formData.endDate}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="flex justify-between border-t border-gray-200 p-6">
            <button
              type="button"
              onClick={() => (step > 1 ? setStep(step - 1) : onClose())}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              {step > 1 ? 'Indietro' : 'Annulla'}
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && !formData.title}
                className="rounded-lg bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
              >
                Avanti
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
              >
                Crea Promozione
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
