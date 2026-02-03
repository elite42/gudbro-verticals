'use client';

import { useState } from 'react';
import { AttemptFormData } from '@/lib/challenges-service';
import { AttemptModalProps } from './types';

export function AttemptModal({ challenge, onClose, onSave }: AttemptModalProps) {
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
