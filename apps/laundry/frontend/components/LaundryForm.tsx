'use client';

import { useState, useEffect, useCallback } from 'react';

// ── Types ──────────────────────────────────────────────────────────────────────
interface LaundryItem {
  id: string;
  garmentType: string;
  quantity: number;
  service: string;
  notes: string;
  express: boolean;
}

interface LaundryFormProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Constants ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'gudbro-laundry-bag';
const WHATSAPP_NUMBER = '84935123456';

const GARMENT_TYPES = [
  { key: 'shirt', label: 'Shirt', icon: '\u{1F455}' },
  { key: 'pants', label: 'Pants', icon: '\u{1F456}' },
  { key: 'dress', label: 'Dress', icon: '\u{1F457}' },
  { key: 'tshirt', label: 'T-shirt', icon: '\u{1F3BD}' },
  { key: 'jacket', label: 'Jacket', icon: '\u{1F9E5}' },
  { key: 'suit', label: 'Suit', icon: '\u{1F454}' },
  { key: 'underwear', label: 'Underwear', icon: '\u{1FA72}' },
  { key: 'socks', label: 'Socks', icon: '\u{1F9E6}' },
  { key: 'towel', label: 'Towel', icon: '\u{1F6C1}' },
  { key: 'bedsheet', label: 'Bedsheet', icon: '\u{1F6CF}\uFE0F' },
  { key: 'shoes', label: 'Shoes', icon: '\u{1F45F}' },
  { key: 'other', label: 'Other', icon: '\u{1F4E6}' },
];

const SERVICES = [
  { key: 'wash_fold', label: 'Wash & Fold', price: '25k/kg' },
  { key: 'wash_iron', label: 'Wash & Iron', price: '35k/kg' },
  { key: 'dry_clean', label: 'Dry Clean', price: 'from 50k/item' },
  { key: 'iron_only', label: 'Iron Only', price: '10k/item' },
];

const SERVICE_PRICE_MAP: Record<string, number> = {
  wash_fold: 25000,
  wash_iron: 35000,
  dry_clean: 50000,
  iron_only: 10000,
};

// ── Helpers ────────────────────────────────────────────────────────────────────
function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function loadFromStorage(): LaundryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveToStorage(items: LaundryItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    // Dispatch event so BottomNav badge updates
    window.dispatchEvent(new Event('laundry-bag-updated'));
  } catch {
    // silently fail
  }
}

function formatPrice(amount: number): string {
  return amount.toLocaleString('vi-VN') + '\u20AB';
}

function buildMessageText(items: LaundryItem[], expressGlobal: boolean): string {
  const garmentMap = Object.fromEntries(GARMENT_TYPES.map((g) => [g.key, g.label]));
  const serviceMap = Object.fromEntries(SERVICES.map((s) => [s.key, s.label]));

  let msg = '\u{1F9FA} Fresh & Clean Laundry - Order\n\n';
  msg += '\u{1F4CB} Items:\n';

  const notesArr: string[] = [];
  let totalEstimate = 0;

  items.forEach((item) => {
    const garment = garmentMap[item.garmentType] || item.garmentType;
    const service = serviceMap[item.service] || item.service;
    msg += `\u2022 ${item.quantity}x ${garment} \u2014 ${service}\n`;

    if (item.notes.trim()) {
      notesArr.push(`${garment}: ${item.notes.trim()}`);
    }

    totalEstimate += (SERVICE_PRICE_MAP[item.service] || 25000) * item.quantity;
  });

  if (notesArr.length > 0) {
    msg += `\n\u{1F4DD} Notes: ${notesArr.join('; ')}\n`;
  }

  msg += `\n\u26A1 Express: ${expressGlobal ? 'Yes' : 'No'}\n`;

  if (expressGlobal) {
    totalEstimate = Math.round(totalEstimate * 1.5);
  }

  msg += `\n\u{1F4B0} Estimated: ~${formatPrice(totalEstimate)}\n`;
  msg += `\n\u{1F4CD} 56 An Thuong 4, Da Nang`;

  return msg;
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function LaundryForm({ isOpen, onClose }: LaundryFormProps) {
  // Saved items
  const [items, setItems] = useState<LaundryItem[]>([]);
  const [expressGlobal, setExpressGlobal] = useState(false);

  // New item form state
  const [selectedGarment, setSelectedGarment] = useState('shirt');
  const [quantity, setQuantity] = useState(1);
  const [selectedService, setSelectedService] = useState('wash_iron');
  const [itemNotes, setItemNotes] = useState('');
  const [showNotes, setShowNotes] = useState(false);

  // UI
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = loadFromStorage();
    if (loaded.length > 0) {
      setItems(loaded);
    }
  }, []);

  // Auto-save on every change
  const persist = useCallback(
    (newItems: LaundryItem[]) => {
      setItems(newItems);
      saveToStorage(newItems);
    },
    []
  );

  // ── Item operations ────────────────────────────────────────────────────────
  const addItem = () => {
    const newItem: LaundryItem = {
      id: generateId(),
      garmentType: selectedGarment,
      quantity,
      service: selectedService,
      notes: itemNotes.trim(),
      express: expressGlobal,
    };
    persist([...items, newItem]);
    // Reset form
    setQuantity(1);
    setItemNotes('');
    setShowNotes(false);
  };

  const removeItem = (id: string) => {
    persist(items.filter((i) => i.id !== id));
  };

  // ── Calculations ───────────────────────────────────────────────────────────
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const estimatedPrice = items.reduce(
    (acc, i) => acc + (SERVICE_PRICE_MAP[i.service] || 25000) * i.quantity,
    0
  );
  const finalPrice = expressGlobal ? Math.round(estimatedPrice * 1.5) : estimatedPrice;

  // ── Actions ────────────────────────────────────────────────────────────────
  const handleSave = () => {
    saveToStorage(items);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = buildMessageText(items, expressGlobal);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleZalo = () => {
    const text = buildMessageText(items, expressGlobal);
    const url = `https://zalo.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  if (!isOpen) return null;

  const garmentMap = Object.fromEntries(GARMENT_TYPES.map((g) => [g.key, g]));
  const serviceMap = Object.fromEntries(SERVICES.map((s) => [s.key, s]));

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="pb-safe animate-slide-up absolute bottom-0 left-0 right-0 rounded-t-3xl bg-white"
        style={{ maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}
      >
        {/* Drag handle */}
        <div className="mx-auto mt-3 mb-2 h-1 w-12 rounded-full bg-[var(--cloud-dark)]" />

        {/* ── Header ────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-6 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{'\u{1F9FA}'}</span>
            <h2 className="font-display text-lg font-semibold text-[var(--charcoal)]">
              My Laundry Bag
            </h2>
            {totalItems > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--blue)] px-1.5 text-[11px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--cloud)] text-[var(--charcoal-muted)] transition-colors hover:bg-[var(--cloud-dark)]"
            aria-label="Close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6" style={{ overscrollBehavior: 'contain' }}>

          {/* ── Add Item Section ─────────────────────────────────────────── */}
          <div className="mb-4 rounded-2xl bg-[var(--cloud)] p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--charcoal-muted)]">
              Add Item
            </p>

            {/* Garment type pills */}
            <div className="mb-3 flex flex-wrap gap-2">
              {GARMENT_TYPES.map((g) => (
                <button
                  key={g.key}
                  onClick={() => setSelectedGarment(g.key)}
                  className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-all"
                  style={{
                    background:
                      selectedGarment === g.key ? 'var(--blue)' : 'white',
                    color:
                      selectedGarment === g.key ? 'white' : 'var(--charcoal)',
                    boxShadow:
                      selectedGarment === g.key
                        ? '0 2px 8px rgba(74,144,217,0.3)'
                        : '0 1px 3px rgba(0,0,0,0.08)',
                  }}
                >
                  <span className="text-base">{g.icon}</span>
                  {g.label}
                </button>
              ))}
            </div>

            {/* Service pills */}
            <div className="mb-3 flex flex-wrap gap-2">
              {SERVICES.map((s) => (
                <button
                  key={s.key}
                  onClick={() => setSelectedService(s.key)}
                  className="rounded-full px-3 py-1.5 text-sm font-medium transition-all"
                  style={{
                    background:
                      selectedService === s.key ? 'var(--teal)' : 'white',
                    color:
                      selectedService === s.key ? 'white' : 'var(--charcoal)',
                    boxShadow:
                      selectedService === s.key
                        ? '0 2px 8px rgba(56,178,172,0.3)'
                        : '0 1px 3px rgba(0,0,0,0.08)',
                  }}
                >
                  {s.label}
                  <span className="ml-1 opacity-70 text-xs">({s.price})</span>
                </button>
              ))}
            </div>

            {/* Quantity stepper */}
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xs font-medium text-[var(--charcoal-muted)]">Qty</span>
              <div className="flex items-center rounded-xl bg-white shadow-sm">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-l-xl text-lg font-bold text-[var(--charcoal-muted)] transition-colors hover:bg-[var(--cloud)]"
                >
                  &minus;
                </button>
                <span className="flex h-9 w-8 items-center justify-center text-sm font-bold text-[var(--charcoal)]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-r-xl text-lg font-bold text-[var(--blue)] transition-colors hover:bg-[var(--blue-light)]"
                >
                  +
                </button>
              </div>
            </div>

            {/* Notes toggle + input */}
            <div className="mb-3">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="flex items-center gap-1 text-xs font-medium text-[var(--charcoal-muted)] transition-colors hover:text-[var(--blue)]"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                {showNotes ? 'Hide notes' : 'Add notes'}
              </button>
              {showNotes && (
                <input
                  type="text"
                  value={itemNotes}
                  onChange={(e) => setItemNotes(e.target.value)}
                  placeholder="e.g. stain on collar"
                  className="mt-2 h-9 w-full rounded-xl bg-white px-3 text-sm text-[var(--charcoal)] shadow-sm outline-none placeholder:text-[var(--charcoal-muted)]/50"
                />
              )}
            </div>

            {/* Add button */}
            <button
              onClick={addItem}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white transition-all active:scale-[0.98]"
              style={{ background: 'var(--blue)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add to Bag
            </button>
          </div>

          {/* ── Items List ───────────────────────────────────────────────── */}
          {items.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--charcoal-muted)]">
                Items ({totalItems})
              </p>
              <div className="space-y-2">
                {items.map((item) => {
                  const garment = garmentMap[item.garmentType];
                  const service = serviceMap[item.service];
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 rounded-xl bg-[var(--cloud)] p-3"
                    >
                      <span className="text-lg">{garment?.icon || '\u{1F4E6}'}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-semibold text-[var(--charcoal)]">
                            {item.quantity}x {garment?.label || item.garmentType}
                          </span>
                          <span className="text-xs text-[var(--charcoal-muted)]">
                            &mdash; {service?.label || item.service}
                          </span>
                        </div>
                        {item.notes && (
                          <p className="mt-0.5 truncate text-xs text-[var(--charcoal-muted)]">
                            {item.notes}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-medium text-[var(--charcoal-muted)]">
                        {formatPrice((SERVICE_PRICE_MAP[item.service] || 25000) * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[var(--charcoal-muted)] transition-colors hover:bg-red-50 hover:text-red-500"
                        aria-label="Remove item"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Express Toggle ───────────────────────────────────────────── */}
          <div className="mb-4 flex items-center justify-between rounded-xl bg-[var(--cloud)] p-3">
            <div className="flex items-center gap-2">
              <span className="text-base">{'\u26A1'}</span>
              <div>
                <p className="text-sm font-semibold text-[var(--charcoal)]">Express Service</p>
                <p className="text-xs text-[var(--charcoal-muted)]">+50% surcharge, same-day</p>
              </div>
            </div>
            <button
              onClick={() => setExpressGlobal(!expressGlobal)}
              className="relative h-7 w-12 rounded-full transition-colors"
              style={{ background: expressGlobal ? 'var(--express)' : 'var(--cloud-dark)' }}
              role="switch"
              aria-checked={expressGlobal}
            >
              <span
                className="absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform"
                style={{ left: expressGlobal ? '22px' : '2px' }}
              />
            </button>
          </div>

          {/* ── Summary ──────────────────────────────────────────────────── */}
          {items.length > 0 && (
            <div className="mb-4 rounded-xl bg-[var(--blue-light)] p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--charcoal-muted)]">
                  {totalItems} item{totalItems !== 1 ? 's' : ''}
                </span>
                <div className="text-right">
                  <p className="text-lg font-bold text-[var(--charcoal)]">
                    ~{formatPrice(finalPrice)}
                  </p>
                  {expressGlobal && (
                    <p className="text-xs text-[var(--express)]">Includes express +50%</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Action Buttons ───────────────────────────────────────────── */}
          <div className="mb-6 space-y-2">
            <button
              onClick={handleSave}
              disabled={items.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl border-2 py-3 text-sm font-semibold transition-all disabled:opacity-40"
              style={{ borderColor: 'var(--blue)', color: 'var(--blue)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Save for Later
            </button>

            <button
              onClick={handleWhatsApp}
              disabled={items.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-40"
              style={{ background: '#25D366' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Send on WhatsApp
            </button>

            <button
              onClick={handleZalo}
              disabled={items.length === 0}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-all active:scale-[0.98] disabled:opacity-40"
              style={{ background: '#0068FF' }}
            >
              <span className="text-base font-bold">Z</span>
              Send on Zalo
            </button>
          </div>
        </div>

        {/* ── Toast ──────────────────────────────────────────────────────── */}
        {showSavedToast && (
          <div className="absolute left-1/2 top-16 -translate-x-1/2 rounded-full bg-[var(--success)] px-4 py-2 text-sm font-medium text-white shadow-lg">
            Saved!
          </div>
        )}
      </div>
    </div>
  );
}
