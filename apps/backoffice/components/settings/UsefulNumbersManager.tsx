'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Trash,
  Pencil,
  Check,
  X,
  Info,
  Phone,
  Warning,
  CaretDown,
  CaretUp,
  FirstAid,
  Taxi,
  Hospital,
  Buildings,
  MapPin,
} from '@phosphor-icons/react';
import { Loader2 } from 'lucide-react';

// ============================================================================
// Types
// ============================================================================

interface EmergencyNumber {
  id: string;
  country_code: string;
  service_type: 'general' | 'police' | 'ambulance' | 'fire';
  phone_number: string;
}

interface CityNumber {
  id: string;
  country_code: string;
  city_name: string;
  label: string;
  phone_number: string;
  category: string;
  sort_order: number;
  is_active: boolean;
}

interface MerchantNumber {
  id: string;
  merchant_id: string;
  label: string;
  phone_number: string;
  category: string;
  sort_order: number;
  is_active: boolean;
}

interface UsefulNumbersManagerProps {
  merchantId: string;
  countryCode: string;
  cityName?: string;
}

type NewNumberForm = {
  label: string;
  phone_number: string;
  category: string;
};

const DEFAULT_FORM: NewNumberForm = {
  label: '',
  phone_number: '',
  category: 'other',
};

// ============================================================================
// Category Config
// ============================================================================

const CATEGORIES = [
  { value: 'taxi', label: 'Taxi', icon: Taxi },
  { value: 'pharmacy', label: 'Farmacia', icon: FirstAid },
  { value: 'hospital', label: 'Ospedale', icon: Hospital },
  { value: 'medical_guard', label: 'Guardia Medica', icon: FirstAid },
  { value: 'police_local', label: 'Polizia Locale', icon: Buildings },
  { value: 'tourist_info', label: 'Info Turismo', icon: MapPin },
  { value: 'other', label: 'Altro', icon: Phone },
];

const EMERGENCY_LABELS: Record<string, string> = {
  general: 'Emergenza Generale',
  police: 'Polizia',
  ambulance: 'Ambulanza',
  fire: 'Vigili del Fuoco',
};

const REPORT_TYPES = [
  { value: 'wrong_number', label: 'Numero errato' },
  { value: 'outdated', label: 'Non più attivo' },
  { value: 'closed', label: 'Servizio chiuso' },
  { value: 'other', label: 'Altro' },
];

// ============================================================================
// Component
// ============================================================================

export function UsefulNumbersManager({
  merchantId,
  countryCode,
  cityName,
}: UsefulNumbersManagerProps) {
  const [emergencyNumbers, setEmergencyNumbers] = useState<EmergencyNumber[]>([]);
  const [cityNumbers, setCityNumbers] = useState<CityNumber[]>([]);
  const [merchantNumbers, setMerchantNumbers] = useState<MerchantNumber[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<NewNumberForm>(DEFAULT_FORM);

  // Add new state
  const [isAdding, setIsAdding] = useState(false);
  const [newNumber, setNewNumber] = useState<NewNumberForm>(DEFAULT_FORM);

  // Expanded sections
  const [expandedSections, setExpandedSections] = useState<string[]>(['emergency', 'merchant']);

  // Report modal state
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<{
    type: 'city' | 'emergency';
    id: string;
    label: string;
  } | null>(null);
  const [reportForm, setReportForm] = useState({
    reportType: 'wrong_number',
    description: '',
    suggestedFix: '',
  });

  // Load data
  const loadData = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        merchantId,
        countryCode,
        ...(cityName && { cityName }),
      });

      const response = await fetch(`/api/settings/useful-numbers?${params}`);
      const data = await response.json();

      if (data.emergencyNumbers) setEmergencyNumbers(data.emergencyNumbers);
      if (data.cityNumbers) setCityNumbers(data.cityNumbers);
      if (data.merchantNumbers) setMerchantNumbers(data.merchantNumbers);
    } catch (err) {
      console.error('Error loading useful numbers:', err);
      setError('Errore nel caricamento dei numeri utili');
    } finally {
      setIsLoading(false);
    }
  }, [merchantId, countryCode, cityName]);

  useEffect(() => {
    if (merchantId) {
      loadData();
    }
  }, [merchantId, loadData]);

  // Toggle section
  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  // Save merchant number (create or update)
  const saveMerchantNumber = async (form: NewNumberForm, id?: string) => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/settings/useful-numbers', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId,
          ...(id ? { id } : {}),
          ...form,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Errore nel salvataggio');
      }

      await loadData();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);

      // Reset forms
      setIsAdding(false);
      setEditingId(null);
      setNewNumber(DEFAULT_FORM);
    } catch (err) {
      console.error('Error saving number:', err);
      setError(err instanceof Error ? err.message : 'Errore nel salvataggio');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete merchant number
  const deleteMerchantNumber = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo numero?')) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/settings/useful-numbers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantId, id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Errore nella cancellazione');
      }

      await loadData();
    } catch (err) {
      console.error('Error deleting number:', err);
      setError(err instanceof Error ? err.message : 'Errore nella cancellazione');
    } finally {
      setIsSaving(false);
    }
  };

  // Submit report
  const submitReport = async () => {
    if (!reportTarget) return;

    setIsSaving(true);

    try {
      const response = await fetch('/api/useful-numbers/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId,
          reportedBy: merchantId, // In a real app, this would be the user's account ID
          referenceType: reportTarget.type,
          referenceId: reportTarget.id,
          reportType: reportForm.reportType,
          description: reportForm.description,
          suggestedFix: reportForm.suggestedFix,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Errore nella segnalazione');
      }

      setReportModalOpen(false);
      setReportTarget(null);
      setReportForm({ reportType: 'wrong_number', description: '', suggestedFix: '' });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    } catch (err) {
      console.error('Error submitting report:', err);
      setError(err instanceof Error ? err.message : 'Errore nella segnalazione');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" weight="duotone" />
          <div>
            <h4 className="font-medium text-blue-900">Numeri Utili</h4>
            <p className="mt-1 text-sm text-blue-700">
              Numeri di emergenza e servizi utili per i tuoi clienti. I numeri di emergenza e della
              città sono gestiti da GUDBRO. Puoi aggiungere numeri specifici della tua zona.
            </p>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Success Banner */}
      {saveSuccess && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-600" weight="bold" />
            <p className="text-green-800">Operazione completata</p>
          </div>
        </div>
      )}

      {/* Emergency Numbers Section */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <button
          onClick={() => toggleSection('emergency')}
          className="flex w-full items-center justify-between border-b border-gray-100 bg-red-50 px-5 py-4 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
              <Phone className="h-5 w-5 text-red-600" weight="duotone" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                Numeri di Emergenza
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({emergencyNumbers.length})
                </span>
              </h3>
              <p className="text-sm text-gray-500">Numeri nazionali - Solo lettura</p>
            </div>
          </div>
          {expandedSections.includes('emergency') ? (
            <CaretUp className="h-5 w-5 text-gray-400" weight="bold" />
          ) : (
            <CaretDown className="h-5 w-5 text-gray-400" weight="bold" />
          )}
        </button>

        {expandedSections.includes('emergency') && (
          <div className="p-5">
            {emergencyNumbers.length > 0 ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {emergencyNumbers.map((num) => (
                  <div
                    key={num.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        {EMERGENCY_LABELS[num.service_type] || num.service_type}
                      </p>
                      <p className="text-lg font-bold text-red-600">{num.phone_number}</p>
                    </div>
                    <button
                      onClick={() => {
                        setReportTarget({
                          type: 'emergency',
                          id: num.id,
                          label: EMERGENCY_LABELS[num.service_type] || num.service_type,
                        });
                        setReportModalOpen(true);
                      }}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-orange-50 hover:text-orange-600"
                      title="Segnala errore"
                    >
                      <Warning className="h-4 w-4" weight="duotone" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-4 text-center text-gray-500">
                Nessun numero di emergenza configurato per questo paese
              </p>
            )}
          </div>
        )}
      </div>

      {/* City Numbers Section */}
      {cityName && (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <button
            onClick={() => toggleSection('city')}
            className="flex w-full items-center justify-between border-b border-gray-100 bg-purple-50 px-5 py-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                <Buildings className="h-5 w-5 text-purple-600" weight="duotone" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Servizi {cityName}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({cityNumbers.length})
                  </span>
                </h3>
                <p className="text-sm text-gray-500">Servizi della città - Solo lettura</p>
              </div>
            </div>
            {expandedSections.includes('city') ? (
              <CaretUp className="h-5 w-5 text-gray-400" weight="bold" />
            ) : (
              <CaretDown className="h-5 w-5 text-gray-400" weight="bold" />
            )}
          </button>

          {expandedSections.includes('city') && (
            <div className="p-5">
              {cityNumbers.length > 0 ? (
                <div className="space-y-3">
                  {cityNumbers.map((num) => {
                    const catConfig = CATEGORIES.find((c) => c.value === num.category);
                    const Icon = catConfig?.icon || Phone;

                    return (
                      <div
                        key={num.id}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                            <Icon className="h-5 w-5 text-purple-600" weight="duotone" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{num.label}</p>
                            <p className="text-sm text-gray-500">
                              {catConfig?.label || num.category}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:${num.phone_number}`}
                            className="font-mono font-medium text-purple-600 hover:underline"
                          >
                            {num.phone_number}
                          </a>
                          <button
                            onClick={() => {
                              setReportTarget({ type: 'city', id: num.id, label: num.label });
                              setReportModalOpen(true);
                            }}
                            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-orange-50 hover:text-orange-600"
                            title="Segnala errore"
                          >
                            <Warning className="h-4 w-4" weight="duotone" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="py-4 text-center text-gray-500">
                  Nessun servizio configurato per {cityName}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Merchant Numbers Section */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <button
          onClick={() => toggleSection('merchant')}
          className="flex w-full items-center justify-between border-b border-gray-100 bg-green-50 px-5 py-4 text-left"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <MapPin className="h-5 w-5 text-green-600" weight="duotone" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">
                I Tuoi Numeri Utili
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({merchantNumbers.length})
                </span>
              </h3>
              <p className="text-sm text-gray-500">Numeri specifici della tua zona</p>
            </div>
          </div>
          {expandedSections.includes('merchant') ? (
            <CaretUp className="h-5 w-5 text-gray-400" weight="bold" />
          ) : (
            <CaretDown className="h-5 w-5 text-gray-400" weight="bold" />
          )}
        </button>

        {expandedSections.includes('merchant') && (
          <div className="p-5">
            {merchantNumbers.length > 0 ? (
              <div className="space-y-3">
                {merchantNumbers.map((num) => {
                  const catConfig = CATEGORIES.find((c) => c.value === num.category);
                  const Icon = catConfig?.icon || Phone;

                  return (
                    <div
                      key={num.id}
                      className={`rounded-lg border p-4 transition-colors ${
                        num.is_active
                          ? 'border-gray-200 bg-white'
                          : 'border-gray-100 bg-gray-50 opacity-60'
                      }`}
                    >
                      {editingId === num.id ? (
                        <NumberForm
                          form={editForm}
                          setForm={setEditForm}
                          onSave={() => saveMerchantNumber(editForm, num.id)}
                          onCancel={() => {
                            setEditingId(null);
                            setEditForm(DEFAULT_FORM);
                          }}
                          isSaving={isSaving}
                        />
                      ) : (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                              <Icon className="h-5 w-5 text-green-600" weight="duotone" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{num.label}</p>
                              <p className="text-sm text-gray-500">
                                {catConfig?.label || num.category}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={`tel:${num.phone_number}`}
                              className="font-mono font-medium text-green-600 hover:underline"
                            >
                              {num.phone_number}
                            </a>
                            <button
                              onClick={() => {
                                setEditingId(num.id);
                                setEditForm({
                                  label: num.label,
                                  phone_number: num.phone_number,
                                  category: num.category,
                                });
                              }}
                              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            >
                              <Pencil className="h-4 w-4" weight="duotone" />
                            </button>
                            <button
                              onClick={() => deleteMerchantNumber(num.id)}
                              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                            >
                              <Trash className="h-4 w-4" weight="duotone" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="py-4 text-center text-gray-500">Nessun numero aggiunto</p>
            )}

            {/* Add New Form */}
            {isAdding ? (
              <div className="mt-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
                <NumberForm
                  form={newNumber}
                  setForm={setNewNumber}
                  onSave={() => saveMerchantNumber(newNumber)}
                  onCancel={() => {
                    setIsAdding(false);
                    setNewNumber(DEFAULT_FORM);
                  }}
                  isSaving={isSaving}
                  isNew
                />
              </div>
            ) : (
              <button
                onClick={() => setIsAdding(true)}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:border-green-400 hover:text-green-600"
              >
                <Plus className="h-4 w-4" weight="bold" />
                Aggiungi Numero
              </button>
            )}
          </div>
        )}
      </div>

      {/* Report Modal */}
      {reportModalOpen && reportTarget && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setReportModalOpen(false)}
          />
          <div className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-md -translate-y-1/2 rounded-xl bg-white p-6 shadow-2xl">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
              Segnala Errore: {reportTarget.label}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Tipo di problema *
                </label>
                <select
                  value={reportForm.reportType}
                  onChange={(e) => setReportForm({ ...reportForm, reportType: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  {REPORT_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Descrizione</label>
                <textarea
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                  placeholder="Descrivi il problema..."
                  rows={3}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Suggerimento correzione
                </label>
                <input
                  type="text"
                  value={reportForm.suggestedFix}
                  onChange={(e) => setReportForm({ ...reportForm, suggestedFix: e.target.value })}
                  placeholder="Es: Il numero corretto è +39 06 1234567"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setReportModalOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Annulla
              </button>
              <button
                onClick={submitReport}
                disabled={isSaving}
                className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white hover:bg-orange-700 disabled:opacity-50"
              >
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                Invia Segnalazione
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================================
// Number Form Sub-Component
// ============================================================================

interface NumberFormProps {
  form: NewNumberForm;
  setForm: (form: NewNumberForm) => void;
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  isNew?: boolean;
}

function NumberForm({ form, setForm, onSave, onCancel, isSaving, isNew }: NumberFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Nome *</label>
          <input
            type="text"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            placeholder="Es: Taxi locale"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Numero *</label>
          <input
            type="tel"
            value={form.phone_number}
            onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
            placeholder="Es: +39 06 1234567"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Categoria</label>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSaving}
          className="flex items-center gap-1 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          <X className="h-4 w-4" />
          Annulla
        </button>
        <button
          type="button"
          onClick={onSave}
          disabled={isSaving || !form.label || !form.phone_number}
          className="flex items-center gap-1 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 disabled:opacity-50"
        >
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
          {isNew ? 'Aggiungi' : 'Salva'}
        </button>
      </div>
    </div>
  );
}
