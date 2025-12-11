'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { selectionsStore, SelectionItem } from '../lib/selections-store';
import { cartStore } from '../lib/cart-store';
import { submitOrder, SubmittedOrder } from '../lib/order-service';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { DishItem } from './DishCard';
import { usePriceFormat } from '../hooks/usePriceFormat';

interface SelectionsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onEditProduct?: (dish: DishItem) => void; // Callback to open ProductBottomSheet
}

export function SelectionsSidebar({
  isOpen,
  onClose,
  onEditProduct
}: SelectionsSidebarProps) {
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
      const items = selections.map(s => ({
        id: s.id,
        dish: s.dish,
        quantity: s.quantity,
        extras: s.extras || [],
        addedAt: s.addedAt || Date.now(),
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
      alert('Errore nell\'invio dell\'ordine. Riprova.');
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
        className="fixed inset-0 bg-black/50 z-[9998] transition-opacity"
        onClick={handleClose}
      />

      {/* Bottom Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-theme-bg-elevated rounded-t-3xl shadow-2xl z-[9999] transform transition-transform duration-300 ease-out max-h-[85vh] overflow-hidden flex flex-col"
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2 cursor-pointer" onClick={handleClose}>
          <div className="w-12 h-1.5 bg-theme-bg-tertiary rounded-full"></div>
        </div>

        {/* Header */}
        <div className="bg-theme-bg-elevated px-4 pb-4 border-b border-theme-bg-tertiary">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-theme-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <h2 className="text-xl font-bold text-theme-text-primary">
              My Selections ({selectionsStore.getCount()})
            </h2>
          </div>
          <p className="text-sm text-theme-brand-primary mt-2">
            This is your digital notepad. Show this list to the waiter when ordering.
          </p>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Selections List - COMPACT DESIGN */}
          {selections.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <svg className="w-20 h-20 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-lg font-semibold">No selections yet</p>
              <p className="text-sm">Browse the menu and select dishes</p>
            </div>
          ) : (
            <div className="p-4">
              {/* Compact List */}
              <div className="space-y-2">
                {selections.map((selection) => {
                  const extrasText = selection.extras && selection.extras.length > 0
                    ? selection.extras.map(e => e.name).join(', ')
                    : null;

                  return (
                    <div
                      key={selection.id}
                      className="bg-theme-bg-secondary border border-theme-bg-tertiary rounded-lg px-3 py-2.5 hover:border-theme-brand-primary transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        {/* Name + Extras */}
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-theme-text-primary text-sm truncate">
                            {selection.dish.name}
                          </div>
                          {extrasText && (
                            <div className="text-xs text-theme-text-secondary truncate">
                              {extrasText}
                            </div>
                          )}
                        </div>

                        {/* Quantity Badge */}
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center justify-center bg-theme-brand-primary text-white text-xs font-bold rounded-full w-6 h-6">
                            {selection.quantity}
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex-shrink-0 min-w-[50px] text-right">
                          <span className="text-theme-brand-primary font-bold text-sm">
                            {formatPrice(selection.dish.price * selection.quantity)}
                          </span>
                        </div>

                        {/* Edit Icon */}
                        {onEditProduct && (
                          <button
                            onClick={() => onEditProduct(selection.dish)}
                            className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-blue-100 text-blue-600 transition-colors"
                            aria-label="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                        )}

                        {/* Delete Icon */}
                        <button
                          onClick={() => handleRemoveSelection(selection.id)}
                          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                          aria-label="Remove"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-7xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-theme-text-primary mb-2">
              Ordine Inviato!
            </h3>
            <div className="bg-theme-bg-secondary rounded-2xl p-4 mb-4">
              <p className="text-theme-text-secondary text-sm">Il tuo numero ordine</p>
              <p className="text-4xl font-bold text-theme-brand-primary">{submittedOrder.order_code}</p>
            </div>
            <p className="text-theme-text-secondary mb-6">
              Il tuo ordine è stato inviato in cucina.<br />
              Ti avviseremo quando sarà pronto!
            </p>
            <button
              onClick={() => {
                router.push('/orders');
                handleClose();
              }}
              className="w-full bg-theme-brand-primary text-white px-6 py-3 rounded-full font-bold mb-3"
            >
              Traccia Ordine
            </button>
            <button
              onClick={handleClose}
              className="w-full bg-theme-bg-secondary text-theme-text-primary px-6 py-3 rounded-full font-bold"
            >
              Torna al Menu
            </button>
          </div>
        )}

        {/* Footer Actions */}
        {selections.length > 0 && !submittedOrder && (
          <div className="bg-theme-bg-elevated border-t border-theme-bg-tertiary p-4 space-y-3">
            {/* Total */}
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-theme-text-secondary font-medium">Totale</span>
              <span className="text-2xl font-bold text-theme-brand-primary">
                {formatPrice(calculateTotal())}
              </span>
            </div>

            {/* Customer Notes (only if ordering enabled) */}
            {isOrderingEnabled && (
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="Note speciali (allergie, richieste...)"
                className="w-full px-4 py-2 bg-theme-bg-secondary rounded-lg text-theme-text-primary placeholder-theme-text-tertiary text-sm resize-none"
                rows={2}
              />
            )}

            {/* Place Order Button (only if ordering enabled) */}
            {isOrderingEnabled && (
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full bg-green-600 text-white px-6 py-4 rounded-full font-bold hover:bg-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Invia Ordine
                  </>
                )}
              </button>
            )}

            <div className="flex gap-2">
              <button
                onClick={handleClearAll}
                className="flex-1 bg-theme-bg-secondary text-theme-text-secondary px-4 py-3 rounded-full font-medium hover:bg-theme-bg-tertiary transition-colors text-sm"
              >
                Svuota
              </button>
              <button
                onClick={handleClose}
                className="flex-1 bg-theme-brand-primary text-white px-4 py-3 rounded-full font-medium hover:opacity-90 transition-all text-sm"
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
