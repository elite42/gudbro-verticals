'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus, Trash, Pencil, Check, X, Info, CaretDown, CaretUp } from '@phosphor-icons/react';
import { Loader2 } from 'lucide-react';

// ============================================================================
// Types
// ============================================================================

export interface MerchantCharge {
  id: string;
  merchant_id: string;
  charge_type: 'tax' | 'fee' | 'tip_preset';
  name: string;
  description?: string;
  amount_type: 'percentage' | 'fixed' | 'per_person';
  percentage?: number;
  fixed_amount?: number;
  display_mode: 'inclusive' | 'exclusive';
  show_breakdown: boolean;
  show_in_menu: boolean;
  calculation_base: 'subtotal' | 'after_taxes' | 'after_fees';
  applies_to: 'all' | 'food' | 'beverage' | 'alcohol' | 'dine_in' | 'takeaway';
  min_order_amount?: number;
  max_charge_amount?: number;
  sort_order: number;
  is_enabled: boolean;
  is_default: boolean;
  legal_reference?: string;
}

interface ChargesManagerProps {
  merchantId: string;
  onChargesChange?: (charges: MerchantCharge[]) => void;
}

type ChargeFormData = Omit<MerchantCharge, 'id' | 'merchant_id'>;

const DEFAULT_CHARGE: ChargeFormData = {
  charge_type: 'tax',
  name: '',
  description: '',
  amount_type: 'percentage',
  percentage: 0,
  fixed_amount: undefined,
  display_mode: 'exclusive',
  show_breakdown: true,
  show_in_menu: false,
  calculation_base: 'subtotal',
  applies_to: 'all',
  sort_order: 0,
  is_enabled: true,
  is_default: false,
};

// ============================================================================
// Charge Type Config
// ============================================================================

const CHARGE_TYPES = {
  tax: {
    label: 'Tassa',
    description: 'Imposte governative (IVA, VAT, GST, Sales Tax)',
    color: 'blue',
    examples: ['IVA 22%', 'VAT 20%', 'GST 10%', 'Sales Tax 8%'],
    allowedAmountTypes: ['percentage'] as const,
  },
  fee: {
    label: 'Addebito',
    description: 'Costi obbligatori (Coperto, Service Charge)',
    color: 'purple',
    examples: ['Coperto €2/persona', 'Service Charge 10%', 'Cover €3'],
    allowedAmountTypes: ['percentage', 'fixed', 'per_person'] as const,
  },
  tip_preset: {
    label: 'Mancia Suggerita',
    description: 'Percentuali mancia preimpostate (opzionali)',
    color: 'amber',
    examples: ['10%', '15%', '20%'],
    allowedAmountTypes: ['percentage'] as const,
  },
};

const AMOUNT_TYPE_OPTIONS = [
  { value: 'percentage', label: 'Percentuale', description: 'Es: 10% del subtotale', symbol: '%' },
  { value: 'fixed', label: 'Importo Fisso', description: 'Es: €2.00 per ordine', symbol: '€' },
  { value: 'per_person', label: 'Per Persona', description: 'Es: €2.50 × N persone', symbol: '€/pers' },
];

const APPLIES_TO_OPTIONS = [
  { value: 'all', label: 'Tutto', description: 'Applicato a tutti gli ordini' },
  { value: 'food', label: 'Solo Cibo', description: 'Solo prodotti alimentari' },
  { value: 'beverage', label: 'Solo Bevande', description: 'Solo bevande' },
  { value: 'alcohol', label: 'Solo Alcolici', description: 'Solo bevande alcoliche' },
  { value: 'dine_in', label: 'Solo Al Tavolo', description: 'Solo consumazione in loco' },
  { value: 'takeaway', label: 'Solo Asporto', description: 'Solo ordini da asporto' },
];

const CALCULATION_BASE_OPTIONS = [
  { value: 'subtotal', label: 'Subtotale', description: 'Calcolato sul totale prodotti' },
  { value: 'after_taxes', label: 'Dopo Tasse', description: 'Calcolato dopo le tasse' },
  { value: 'after_fees', label: 'Dopo Tasse e Fee', description: 'Calcolato dopo tasse e altri addebiti' },
];

// ============================================================================
// Component
// ============================================================================

export function ChargesManager({ merchantId, onChargesChange }: ChargesManagerProps) {
  const [charges, setCharges] = useState<MerchantCharge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ChargeFormData>(DEFAULT_CHARGE);

  // Add new state
  const [isAdding, setIsAdding] = useState(false);
  const [newCharge, setNewCharge] = useState<ChargeFormData>(DEFAULT_CHARGE);

  // Expanded sections
  const [expandedType, setExpandedType] = useState<string | null>('tax');

  // Load charges
  const loadCharges = useCallback(async () => {
    try {
      const response = await fetch(`/api/settings/charges?merchantId=${merchantId}`);
      const data = await response.json();

      if (data.charges) {
        setCharges(data.charges);
        onChargesChange?.(data.charges);
      }
    } catch (err) {
      console.error('Error loading charges:', err);
      setError('Errore nel caricamento degli addebiti');
    } finally {
      setIsLoading(false);
    }
  }, [merchantId, onChargesChange]);

  useEffect(() => {
    if (merchantId) {
      loadCharges();
    }
  }, [merchantId, loadCharges]);

  // Save charge (create or update)
  const saveCharge = async (charge: ChargeFormData, id?: string) => {
    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/settings/charges', {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId,
          ...(id ? { id } : {}),
          ...charge,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Errore nel salvataggio');
      }

      await loadCharges();
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);

      // Reset forms
      setIsAdding(false);
      setEditingId(null);
      setNewCharge(DEFAULT_CHARGE);
    } catch (err) {
      console.error('Error saving charge:', err);
      setError(err instanceof Error ? err.message : 'Errore nel salvataggio');
    } finally {
      setIsSaving(false);
    }
  };

  // Delete charge
  const deleteCharge = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questo addebito?')) return;

    setIsSaving(true);
    setError(null);

    try {
      const response = await fetch('/api/settings/charges', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantId, id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Errore nella cancellazione');
      }

      await loadCharges();
    } catch (err) {
      console.error('Error deleting charge:', err);
      setError(err instanceof Error ? err.message : 'Errore nella cancellazione');
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle charge enabled
  const toggleEnabled = async (charge: MerchantCharge) => {
    await saveCharge({ ...charge, is_enabled: !charge.is_enabled }, charge.id);
  };

  // Group charges by type
  const chargesByType = {
    tax: charges.filter((c) => c.charge_type === 'tax'),
    fee: charges.filter((c) => c.charge_type === 'fee'),
    tip_preset: charges.filter((c) => c.charge_type === 'tip_preset'),
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
            <h4 className="font-medium text-blue-900">Sistema Addebiti Configurabile</h4>
            <p className="mt-1 text-sm text-blue-700">
              Configura tasse, addebiti obbligatori e mance suggerite. Supporta strutture fiscali
              internazionali (IVA, VAT, GST, Sales Tax) e addebiti personalizzati.
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
            <p className="text-green-800">Salvato con successo</p>
          </div>
        </div>
      )}

      {/* Charges by Type */}
      {(['tax', 'fee', 'tip_preset'] as const).map((type) => {
        const config = CHARGE_TYPES[type];
        const typeCharges = chargesByType[type];
        const isExpanded = expandedType === type;

        return (
          <div
            key={type}
            className="overflow-hidden rounded-xl border border-gray-200 bg-white"
          >
            {/* Section Header */}
            <button
              onClick={() => setExpandedType(isExpanded ? null : type)}
              className="flex w-full items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-4 text-left"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-${config.color}-100`}
                >
                  <span className={`text-lg font-bold text-${config.color}-600`}>
                    {type === 'tax' ? '%' : type === 'fee' ? '€' : '♥'}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {config.label}
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      ({typeCharges.filter((c) => c.is_enabled).length} attivi)
                    </span>
                  </h3>
                  <p className="text-sm text-gray-500">{config.description}</p>
                </div>
              </div>
              {isExpanded ? (
                <CaretUp className="h-5 w-5 text-gray-400" weight="bold" />
              ) : (
                <CaretDown className="h-5 w-5 text-gray-400" weight="bold" />
              )}
            </button>

            {/* Section Content */}
            {isExpanded && (
              <div className="p-5">
                {/* Existing Charges */}
                {typeCharges.length > 0 ? (
                  <div className="space-y-3">
                    {typeCharges.map((charge) => (
                      <div
                        key={charge.id}
                        className={`rounded-lg border p-4 transition-colors ${
                          charge.is_enabled
                            ? 'border-gray-200 bg-white'
                            : 'border-gray-100 bg-gray-50 opacity-60'
                        }`}
                      >
                        {editingId === charge.id ? (
                          // Edit Mode
                          <ChargeForm
                            form={editForm}
                            setForm={setEditForm}
                            type={type}
                            onSave={() => saveCharge(editForm, charge.id)}
                            onCancel={() => {
                              setEditingId(null);
                              setEditForm(DEFAULT_CHARGE);
                            }}
                            isSaving={isSaving}
                          />
                        ) : (
                          // View Mode
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {/* Toggle */}
                              <label className="relative inline-flex cursor-pointer items-center">
                                <input
                                  type="checkbox"
                                  checked={charge.is_enabled}
                                  onChange={() => toggleEnabled(charge)}
                                  className="peer sr-only"
                                  disabled={isSaving}
                                />
                                <div className={`peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-${config.color}-500 peer-checked:after:translate-x-full peer-checked:after:border-white`}></div>
                              </label>

                              {/* Info */}
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-gray-900">{charge.name}</span>
                                  <span
                                    className={`rounded-full bg-${config.color}-100 px-2 py-0.5 text-xs font-medium text-${config.color}-700`}
                                  >
                                    {charge.amount_type === 'percentage' || !charge.amount_type
                                      ? `${charge.percentage}%`
                                      : charge.amount_type === 'per_person'
                                        ? `€${charge.fixed_amount}/pers`
                                        : `€${charge.fixed_amount}`}
                                  </span>
                                  {charge.display_mode === 'inclusive' && (
                                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                                      incluso
                                    </span>
                                  )}
                                  {charge.is_default && (
                                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                                      default
                                    </span>
                                  )}
                                </div>
                                {charge.description && (
                                  <p className="text-sm text-gray-500">{charge.description}</p>
                                )}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setEditingId(charge.id);
                                  setEditForm({
                                    charge_type: charge.charge_type,
                                    name: charge.name,
                                    description: charge.description || '',
                                    amount_type: charge.amount_type || 'percentage',
                                    percentage: charge.percentage,
                                    fixed_amount: charge.fixed_amount,
                                    display_mode: charge.display_mode,
                                    show_breakdown: charge.show_breakdown,
                                    show_in_menu: charge.show_in_menu,
                                    calculation_base: charge.calculation_base,
                                    applies_to: charge.applies_to,
                                    min_order_amount: charge.min_order_amount,
                                    max_charge_amount: charge.max_charge_amount,
                                    sort_order: charge.sort_order,
                                    is_enabled: charge.is_enabled,
                                    is_default: charge.is_default,
                                    legal_reference: charge.legal_reference,
                                  });
                                }}
                                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                              >
                                <Pencil className="h-4 w-4" weight="duotone" />
                              </button>
                              <button
                                onClick={() => deleteCharge(charge.id)}
                                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash className="h-4 w-4" weight="duotone" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="py-4 text-center text-gray-500">
                    Nessun addebito di tipo &quot;{config.label}&quot; configurato
                  </p>
                )}

                {/* Add New Button / Form */}
                {isAdding && newCharge.charge_type === type ? (
                  <div className="mt-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
                    <ChargeForm
                      form={newCharge}
                      setForm={setNewCharge}
                      type={type}
                      onSave={() => saveCharge(newCharge)}
                      onCancel={() => {
                        setIsAdding(false);
                        setNewCharge(DEFAULT_CHARGE);
                      }}
                      isSaving={isSaving}
                      isNew
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsAdding(true);
                      setNewCharge({ ...DEFAULT_CHARGE, charge_type: type });
                    }}
                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:border-${config.color}-400 hover:text-${config.color}-600`}
                  >
                    <Plus className="h-4 w-4" weight="bold" />
                    Aggiungi {config.label}
                  </button>
                )}

                {/* Examples */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs text-gray-400">Esempi:</span>
                  {config.examples.map((ex) => (
                    <span key={ex} className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600">
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Preview */}
      {charges.filter((c) => c.is_enabled).length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h3 className="mb-4 font-semibold text-gray-900">Anteprima Scontrino (€25.00)</h3>
          <ReceiptPreview charges={charges.filter((c) => c.is_enabled)} subtotal={25} />
        </div>
      )}
    </div>
  );
}

// ============================================================================
// Charge Form Sub-Component
// ============================================================================

interface ChargeFormProps {
  form: ChargeFormData;
  setForm: (form: ChargeFormData) => void;
  type: 'tax' | 'fee' | 'tip_preset';
  onSave: () => void;
  onCancel: () => void;
  isSaving: boolean;
  isNew?: boolean;
}

function ChargeForm({ form, setForm, type, onSave, onCancel, isSaving, isNew }: ChargeFormProps) {
  const config = CHARGE_TYPES[type];

  const allowedAmountTypes = config.allowedAmountTypes || ['percentage'];
  const showAmountTypeSelector = allowedAmountTypes.length > 1;

  return (
    <div className="space-y-4">
      {/* Basic Info */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Nome *</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={config.examples[0]}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Amount Type + Value */}
        <div>
          {showAmountTypeSelector ? (
            <>
              <label className="mb-1 block text-sm font-medium text-gray-700">Tipo Importo</label>
              <select
                value={form.amount_type || 'percentage'}
                onChange={(e) =>
                  setForm({
                    ...form,
                    amount_type: e.target.value as 'percentage' | 'fixed' | 'per_person',
                    percentage: e.target.value === 'percentage' ? (form.percentage || 0) : undefined,
                    fixed_amount: e.target.value !== 'percentage' ? (form.fixed_amount || 0) : undefined,
                  })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                {AMOUNT_TYPE_OPTIONS.filter((opt) =>
                  (allowedAmountTypes as readonly string[]).includes(opt.value)
                ).map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </>
          ) : (
            <label className="mb-1 block text-sm font-medium text-gray-700">Percentuale *</label>
          )}
        </div>
      </div>

      {/* Amount Value Input */}
      <div>
        {(form.amount_type === 'percentage' || !form.amount_type) ? (
          <div>
            {showAmountTypeSelector && (
              <label className="mb-1 block text-sm font-medium text-gray-700">Percentuale *</label>
            )}
            <div className="relative">
              <input
                type="number"
                min={0}
                max={100}
                step={0.01}
                value={form.percentage || 0}
                onChange={(e) => setForm({ ...form, percentage: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-8 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
            </div>
          </div>
        ) : (
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              {form.amount_type === 'per_person' ? 'Importo per Persona *' : 'Importo Fisso *'}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
              <input
                type="number"
                min={0}
                step={0.01}
                value={form.fixed_amount || 0}
                onChange={(e) => setForm({ ...form, fixed_amount: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-lg border border-gray-300 py-2 pl-8 pr-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {form.amount_type === 'per_person' && (
              <p className="mt-1 text-xs text-gray-500">
                Questo importo verrà moltiplicato per il numero di persone al tavolo
              </p>
            )}
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">Descrizione</label>
        <input
          type="text"
          value={form.description || ''}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Descrizione opzionale per lo scontrino"
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Display Mode (only for tax) */}
      {type === 'tax' && (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Modalità Visualizzazione</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setForm({ ...form, display_mode: 'inclusive' })}
              className={`flex-1 rounded-lg border-2 px-4 py-2 text-left transition-colors ${
                form.display_mode === 'inclusive'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900">Incluso</div>
              <div className="text-xs text-gray-500">I prezzi includono già la tassa</div>
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, display_mode: 'exclusive' })}
              className={`flex-1 rounded-lg border-2 px-4 py-2 text-left transition-colors ${
                form.display_mode === 'exclusive'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900">Escluso</div>
              <div className="text-xs text-gray-500">Tassa aggiunta al checkout</div>
            </button>
          </div>
        </div>
      )}

      {/* Calculation Base (only for fee) */}
      {type === 'fee' && (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Base di Calcolo</label>
          <select
            value={form.calculation_base}
            onChange={(e) =>
              setForm({ ...form, calculation_base: e.target.value as ChargeFormData['calculation_base'] })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            {CALCULATION_BASE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} - {opt.description}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Applies To */}
      {type !== 'tip_preset' && (
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">Si Applica A</label>
          <select
            value={form.applies_to}
            onChange={(e) =>
              setForm({ ...form, applies_to: e.target.value as ChargeFormData['applies_to'] })
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          >
            {APPLIES_TO_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label} - {opt.description}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Default (only for tip_preset) */}
      {type === 'tip_preset' && (
        <div className="flex items-center justify-between">
          <div>
            <span className="font-medium text-gray-900">Preselezionato</span>
            <p className="text-sm text-gray-500">Questa mancia sarà selezionata di default</p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={form.is_default}
              onChange={(e) => setForm({ ...form, is_default: e.target.checked })}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-amber-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>
      )}

      {/* Toggles */}
      <div className="flex gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.show_breakdown}
            onChange={(e) => setForm({ ...form, show_breakdown: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Mostra nello scontrino</span>
        </label>
        {type === 'tax' && (
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.show_in_menu}
              onChange={(e) => setForm({ ...form, show_in_menu: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Mostra nel menu (+X%)</span>
          </label>
        )}
      </div>

      {/* Actions */}
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
          disabled={
            isSaving ||
            !form.name ||
            (form.amount_type === 'percentage' && (form.percentage === undefined || form.percentage < 0)) ||
            (form.amount_type !== 'percentage' && (form.fixed_amount === undefined || form.fixed_amount < 0))
          }
          className={`flex items-center gap-1 rounded-lg bg-${config.color}-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-${config.color}-700 disabled:opacity-50`}
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          {isNew ? 'Aggiungi' : 'Salva'}
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Receipt Preview Sub-Component
// ============================================================================

interface ReceiptPreviewProps {
  charges: MerchantCharge[];
  subtotal: number;
  personCount?: number;
}

function ReceiptPreview({ charges, subtotal, personCount = 2 }: ReceiptPreviewProps) {
  // Calculate totals
  let total = subtotal;
  let taxesTotal = 0;
  let feesTotal = 0;

  const breakdown: Array<{ name: string; amount: number; included?: boolean; type: string; detail?: string }> = [];

  // Process taxes first
  charges
    .filter((c) => c.charge_type === 'tax')
    .sort((a, b) => a.sort_order - b.sort_order)
    .forEach((charge) => {
      const pct = charge.percentage || 0;
      if (charge.display_mode === 'inclusive') {
        const included = subtotal - subtotal / (1 + pct / 100);
        breakdown.push({ name: charge.name, amount: included, included: true, type: 'tax' });
      } else {
        const amount = (subtotal * pct) / 100;
        taxesTotal += amount;
        breakdown.push({ name: `${charge.name} (${pct}%)`, amount, type: 'tax' });
      }
    });

  total += taxesTotal;

  // Process fees
  charges
    .filter((c) => c.charge_type === 'fee')
    .sort((a, b) => a.sort_order - b.sort_order)
    .forEach((charge) => {
      let amount = 0;
      let detail = '';

      const amountType = charge.amount_type || 'percentage';

      if (amountType === 'fixed') {
        amount = charge.fixed_amount || 0;
        detail = `€${amount.toFixed(2)}`;
      } else if (amountType === 'per_person') {
        const perPerson = charge.fixed_amount || 0;
        amount = perPerson * personCount;
        detail = `€${perPerson.toFixed(2)} × ${personCount}`;
      } else {
        // percentage
        let base = subtotal;
        if (charge.calculation_base === 'after_taxes') {
          base = subtotal + taxesTotal;
        } else if (charge.calculation_base === 'after_fees') {
          base = subtotal + taxesTotal + feesTotal;
        }
        const pct = charge.percentage || 0;
        amount = (base * pct) / 100;
        detail = `${pct}%`;
      }

      feesTotal += amount;
      breakdown.push({
        name: `${charge.name} (${detail})`,
        amount,
        type: 'fee',
      });
    });

  total += feesTotal;

  // Get default tip if any
  const defaultTip = charges.find((c) => c.charge_type === 'tip_preset' && c.is_default);
  let tipAmount = 0;
  if (defaultTip) {
    const pct = defaultTip.percentage || 0;
    tipAmount = ((subtotal + taxesTotal) * pct) / 100;
    breakdown.push({ name: `Mancia (${pct}%)`, amount: tipAmount, type: 'tip' });
    total += tipAmount;
  }

  return (
    <div className="rounded-lg bg-gray-50 p-4 font-mono text-sm">
      <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
        <span>Anteprima per {personCount} persone</span>
      </div>

      <div className="flex justify-between py-1">
        <span className="text-gray-600">Subtotale</span>
        <span className="text-gray-900">€{subtotal.toFixed(2)}</span>
      </div>

      {breakdown.map((item, idx) => (
        <div
          key={idx}
          className={`flex justify-between py-1 ${item.included ? 'text-xs text-gray-400' : ''}`}
        >
          <span className={item.included ? '' : 'text-gray-600'}>
            {item.included ? `di cui ${item.name}` : item.name}
          </span>
          <span className={item.included ? '' : item.type === 'tip' ? 'text-amber-600' : 'text-gray-900'}>
            €{item.amount.toFixed(2)}
          </span>
        </div>
      ))}

      <div className="mt-2 border-t border-gray-300 pt-2">
        <div className="flex justify-between font-bold">
          <span className="text-gray-900">Totale</span>
          <span className="text-green-700">€{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
