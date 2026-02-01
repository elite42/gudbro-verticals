'use client';

import { useState, useCallback, useMemo } from 'react';
import { Wine, CheckCircle } from '@phosphor-icons/react';
import type { ServiceCategoryWithItems } from '@/types/stay';
import { createMinibarOrder } from '@/lib/stay-api';
import MinibarItemRow from './MinibarItemRow';

interface MinibarSectionProps {
  categories: ServiceCategoryWithItems[];
  bookingCode: string;
  token: string;
  onOrderCreated: () => void;
}

/**
 * Minibar self-service section for the guest dashboard.
 *
 * Filters categories with automationLevel === 'self_service',
 * lets guests mark consumed items via honor system, and submits
 * a minibar order when they report consumption.
 *
 * Returns null if no self_service categories exist.
 */
export default function MinibarSection({
  categories,
  bookingCode,
  token,
  onOrderCreated,
}: MinibarSectionProps) {
  const [consumptions, setConsumptions] = useState<Map<string, number>>(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filter to self_service categories only
  const minibarCategories = useMemo(
    () => categories.filter((c) => c.automationLevel === 'self_service'),
    [categories]
  );

  // Flatten all items from self_service categories
  const minibarItems = useMemo(
    () => minibarCategories.flatMap((c) => c.items.filter((item) => item.inStock)),
    [minibarCategories]
  );

  // Handle quantity change for an item
  const handleConsume = useCallback((itemId: string, quantity: number) => {
    setConsumptions((prev) => {
      const next = new Map(prev);
      if (quantity <= 0) {
        next.delete(itemId);
      } else {
        next.set(itemId, Math.min(quantity, 10));
      }
      return next;
    });
    setError(null);
  }, []);

  // Compute total from consumed items
  const { totalAmount, totalItems, currency } = useMemo(() => {
    let amount = 0;
    let count = 0;
    let cur = 'USD';

    for (const [itemId, qty] of Array.from(consumptions)) {
      const item = minibarItems.find((i) => i.id === itemId);
      if (item) {
        if (!item.includedInRate) {
          amount += item.price * qty;
        }
        count += qty;
        cur = item.currency;
      }
    }

    return { totalAmount: amount, totalItems: count, currency: cur };
  }, [consumptions, minibarItems]);

  // Submit consumption report
  const handleSubmit = useCallback(async () => {
    if (consumptions.size === 0) return;

    setIsSubmitting(true);
    setError(null);

    const items = Array.from(consumptions.entries()).map(([serviceItemId, quantity]) => ({
      serviceItemId,
      quantity,
    }));

    const result = await createMinibarOrder(bookingCode, token, items);

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    // Show success state briefly, then reset
    setShowSuccess(true);
    setConsumptions(new Map());
    onOrderCreated();

    setTimeout(() => {
      setShowSuccess(false);
    }, 2500);
  }, [consumptions, bookingCode, token, onOrderCreated]);

  // Don't render if no self_service categories
  if (minibarCategories.length === 0) return null;

  // Don't render if no in-stock items
  if (minibarItems.length === 0) return null;

  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(totalAmount);

  return (
    <section className="rounded-2xl bg-stone-50 p-4">
      {/* Header */}
      <div className="mb-3 flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E07A5F]/10">
          <Wine size={20} weight="duotone" className="text-[#E07A5F]" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-stone-800">Minibar</h3>
          <p className="text-[11px] text-stone-500">
            Mark items you&apos;ve consumed. We&apos;ll add them to your room charge.
          </p>
        </div>
      </div>

      {/* Success state */}
      {showSuccess && (
        <div className="mb-3 flex items-center gap-2 rounded-xl bg-emerald-50 px-3 py-2.5">
          <CheckCircle size={20} weight="fill" className="text-emerald-600" />
          <span className="text-xs font-medium text-emerald-700">
            Consumption reported successfully
          </span>
        </div>
      )}

      {/* Items list */}
      <div className="space-y-1.5">
        {minibarItems.map((item) => (
          <MinibarItemRow
            key={item.id}
            item={{
              id: item.id,
              name: item.name,
              price: item.price,
              currency: item.currency,
              image: item.image,
              includedInRate: item.includedInRate,
            }}
            consumed={consumptions.get(item.id) || 0}
            onConsume={(qty) => handleConsume(item.id, qty)}
          />
        ))}
      </div>

      {/* Trust message */}
      <p className="mt-2.5 text-center text-[10px] text-stone-400">
        Items are billed on the honor system
      </p>

      {/* Error message */}
      {error && (
        <div className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</div>
      )}

      {/* Footer with total and submit button */}
      {totalItems > 0 && (
        <div className="mt-3 space-y-2">
          <div className="flex items-center justify-between rounded-xl bg-[#3D8B87]/5 px-3 py-2">
            <span className="text-xs text-stone-600">
              {totalItems} {totalItems === 1 ? 'item' : 'items'}
            </span>
            <span className="text-sm font-semibold text-stone-800">{formattedTotal}</span>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#3D8B87] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#357571] active:bg-[#2d6562] disabled:opacity-50"
          >
            {isSubmitting ? 'Reporting...' : 'Report Consumption'}
          </button>
        </div>
      )}
    </section>
  );
}
