'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { selectionsStore, SelectionItem } from '../lib/selections-store';
import { cartStore } from '../lib/cart-store';
import { submitOrder, SubmittedOrder } from '../lib/order-service';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { DishItem } from './DishCard';
import { useAppPriceFormat as usePriceFormat } from '../lib/currency';

interface SelectionsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onEditProduct?: (dish: DishItem) => void; // Callback to open ProductBottomSheet
}

export function SelectionsSidebar({ isOpen, onClose, onEditProduct }: SelectionsSidebarProps) {
  const router = useRouter();
  const { formatPrice } = usePriceFormat();
  const [selections, setSelections] = useState<SelectionItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(null);
  const [customerNotes, setCustomerNotes] = useState('');

  // Check if ordering is enabled based on tier
  const isOrderingEnabled = coffeeshopConfig.features.enableCart;

  useEffect(() => {
    if (isOpen) {
      loadSelections();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleSelectionsUpdate = () => {
      loadSelections();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('selections-updated', handleSelectionsUpdate);
      return () => {
        window.removeEventListener('selections-updated', handleSelectionsUpdate);
      };
    }
  }, []);

  const loadSelections = () => {
    setSelections(selectionsStore.getItems());
  };

  const handleRemoveSelection = (dishId: string) => {
    selectionsStore.remove(dishId);
  };

  const handleIncrement = (selection: SelectionItem) => {
    selectionsStore.increment(selection.dish);
  };

  const handleDecrement = (dishId: string) => {
    selectionsStore.decrement(dishId);
  };

  const handleClearAll = () => {
    if (confirm('Vuoi cancellare tutte le selezioni?')) {
      selectionsStore.clear();
    }
  };

  // Calculate total
  const calculateTotal = () => {
    return selections.reduce((total, item) => {
      const extrasTotal = item.extras?.reduce((sum, e) => sum + e.price, 0) || 0;
      return total + (item.dish.price + extrasTotal) * item.quantity;
    }, 0);
  };

  // Handle place order
  const handlePlaceOrder = async () => {
    if (isSubmitting || selections.length === 0) return;

    setIsSubmitting(true);
    try {
      // Convert selections to CartItem format expected by order-service
      const sessionId = cartStore.getSessionId();
      const items = selections.map((s) => ({
        id: s.id,
        dish: s.dish,
        quantity: s.quantity,
        extras: s.extras || [],
        addedAt: s.addedAt || Date.now(),
        sessionId,
      }));

      const result = await submitOrder({
        items,
        total: calculateTotal(),
        table_context: {
          table_number: null,
          customer_name: null,
          consumption_type: 'dine-in' as const,
          service_type: 'counter-pickup' as const,
        },
        customer_notes: customerNotes || undefined,
      });

      if (result.success) {
        setSubmittedOrder(result.order);
        selectionsStore.clear();
        setCustomerNotes('');
      } else {
        const errorMsg = result.error.userMessage.it;
        alert(errorMsg);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert("Errore nell'invio dell'ordine. Riprova.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset submitted order when closing
  const handleClose = () => {
    if (submittedOrder) {
      setSubmittedOrder(null);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[9998] bg-black/50 transition-opacity"
        onClick={handleClose}
      />

      {/* Bottom Sheet */}
      <div
        className="bg-theme-bg-elevated fixed bottom-0 left-0 right-0 z-[9999] flex max-h-[85vh] transform flex-col overflow-hidden rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out"
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
      >
        {/* Drag Handle */}
        <div className="flex cursor-pointer justify-center pb-2 pt-3" onClick={handleClose}>
          <div className="bg-theme-bg-tertiary h-1.5 w-12 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="bg-theme-bg-elevated border-theme-bg-tertiary border-b px-4 pb-4">
          <div className="flex items-center gap-2">
            <svg
              className="text-theme-brand-primary h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <h2 className="text-theme-text-primary text-xl font-bold">
              My Selections ({selectionsStore.getCount()})
            </h2>
          </div>
          <p className="text-theme-brand-primary mt-2 text-sm">
            This is your digital notepad. Show this list to the waiter when ordering.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Selections List - COMPACT DESIGN */}
          {selections.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center text-gray-400">
              <svg className="mb-4 h-20 w-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-lg font-semibold">No selections yet</p>
              <p className="text-sm">Browse the menu and select dishes</p>
            </div>
          ) : (
            <div className="p-4">
              {/* Compact List */}
              <div className="space-y-2">
                {selections.map((selection) => {
                  const extrasText =
                    selection.extras && selection.extras.length > 0
                      ? selection.extras.map((e) => e.name).join(', ')
                      : null;

                  return (
                    <div
                      key={selection.id}
                      className="bg-theme-bg-secondary border-theme-bg-tertiary hover:border-theme-brand-primary rounded-lg border px-3 py-2.5 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {/* Name + Extras */}
                        <div className="min-w-0 flex-1">
                          <div className="text-theme-text-primary truncate text-sm font-semibold">
                            {selection.dish.name}
                          </div>
                          {extrasText && (
                            <div className="text-theme-text-secondary truncate text-xs">
                              {extrasText}
                            </div>
                          )}
                        </div>

                        {/* Quantity Badge */}
                        <div className="flex-shrink-0">
                          <span className="bg-theme-brand-primary inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                            {selection.quantity}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="min-w-[50px] flex-shrink-0 text-right">
                          <span className="text-theme-brand-primary text-sm font-bold">
                            {formatPrice(selection.dish.price * selection.quantity)}
                          </span>
                        </div>

                        {/* Edit Icon */}
                        {onEditProduct && (
                          <button
                            onClick={() => onEditProduct(selection.dish)}
                            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-100"
                            aria-label="Edit"
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                        )}

                        {/* Delete Icon */}
                        <button
                          onClick={() => handleRemoveSelection(selection.id)}
                          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg text-red-600 transition-colors hover:bg-red-100"
                          aria-label="Remove"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
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
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Order Success State */}
        {submittedOrder && (
          <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 text-7xl">✅</div>
            <h3 className="text-theme-text-primary mb-2 text-2xl font-bold">Ordine Inviato!</h3>
            <div className="bg-theme-bg-secondary mb-4 rounded-2xl p-4">
              <p className="text-theme-text-secondary text-sm">Il tuo numero ordine</p>
              <p className="text-theme-brand-primary text-4xl font-bold">
                {submittedOrder.order_code}
              </p>
            </div>
            <p className="text-theme-text-secondary mb-6">
              Il tuo ordine è stato inviato in cucina.
              <br />
              Ti avviseremo quando sarà pronto!
            </p>
            <button
              onClick={() => {
                router.push('/orders');
                handleClose();
              }}
              className="bg-theme-brand-primary mb-3 w-full rounded-full px-6 py-3 font-bold text-white"
            >
              Traccia Ordine
            </button>
            <button
              onClick={handleClose}
              className="bg-theme-bg-secondary text-theme-text-primary w-full rounded-full px-6 py-3 font-bold"
            >
              Torna al Menu
            </button>
          </div>
        )}

        {/* Footer Actions */}
        {selections.length > 0 && !submittedOrder && (
          <div className="bg-theme-bg-elevated border-theme-bg-tertiary space-y-3 border-t p-4">
            {/* Total */}
            <div className="mb-2 flex items-center justify-between px-2">
              <span className="text-theme-text-secondary font-medium">Totale</span>
              <span className="text-theme-brand-primary text-2xl font-bold">
                {formatPrice(calculateTotal())}
              </span>
            </div>

            {/* Customer Notes (only if ordering enabled) */}
            {isOrderingEnabled && (
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="Note speciali (allergie, richieste...)"
                className="bg-theme-bg-secondary text-theme-text-primary placeholder-theme-text-tertiary w-full resize-none rounded-lg px-4 py-2 text-sm"
                rows={2}
              />
            )}

            {/* Place Order Button (only if ordering enabled) */}
            {isOrderingEnabled && (
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-6 py-4 font-bold text-white transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    Invia Ordine
                  </>
                )}
              </button>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleClearAll}
                className="bg-theme-bg-secondary text-theme-text-secondary hover:bg-theme-bg-tertiary flex-1 rounded-full px-4 py-3 text-sm font-medium transition-colors"
              >
                Svuota
              </button>
              <button
                onClick={handleClose}
                className="bg-theme-brand-primary flex-1 rounded-full px-4 py-3 text-sm font-medium text-white transition-all hover:opacity-90"
              >
                Continua
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
