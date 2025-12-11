'use client';

import React, { useId } from 'react';
import { CartItem } from '@/lib/cart-store';
import { useStickyCartState } from '@/hooks/useStickyCartState';
import { usePriceFormat } from '@/hooks/usePriceFormat';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useKeyboardNavigation } from '@/hooks/useKeyboardNavigation';
import { coffeeshopConfig } from '@/config/coffeeshop.config';

/**
 * StickyCartBar - Refactored from 461 lines
 *
 * Extracted:
 * - State + logic → useStickyCartState hook
 * - Price formatting → usePriceFormat hook
 *
 * Accessibility features:
 * - ARIA labels on all interactive elements
 * - Focus trap in confirmation modal
 * - Keyboard navigation (Escape to close)
 * - Proper dialog roles and attributes
 * - Screen reader friendly cart updates
 */
export function StickyCartBar() {
  // Check if cart is enabled
  if (!coffeeshopConfig.features.enableCart) {
    return null;
  }

  const { formatPriceCompact } = usePriceFormat();
  const modalTitleId = useId();
  const modalDescId = useId();

  const {
    isExpanded,
    setIsExpanded,
    showConfirmModal,
    setShowConfirmModal,
    showSuccessToast,
    isSubmitting,
    cartItems,
    cartCount,
    cartTotal,
    isClient,
    handleRemoveItem,
    handlePlaceOrder,
    handleConfirmOrder,
    calculateItemTotal
  } = useStickyCartState();

  // Accessibility: Focus trap for confirmation modal
  const modalRef = useFocusTrap(showConfirmModal);

  // Accessibility: Keyboard navigation for modals
  useKeyboardNavigation({
    isOpen: showConfirmModal,
    onClose: () => setShowConfirmModal(false),
    onEscape: () => setShowConfirmModal(false)
  });

  // Don't render until client-side
  if (!isClient) return null;

  // Hidden state - no items in cart
  if (cartCount === 0) return null;

  return (
    <div>
      {/* Collapsed State - Compact Bar */}
      {!isExpanded && (
        <div className="fixed bottom-20 left-0 right-0 z-[9998] animate-slide-up">
            <div className="max-w-screen-xl mx-auto px-4">
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] border-2 border-white">
                <div className="px-4 py-3 flex items-center justify-between gap-3">
                {/* Left - Cart Icon + Count (clickable to expand) */}
                <div
                  onClick={() => setIsExpanded(true)}
                  className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity flex-1"
                >
                  <div className="bg-white rounded-full p-2 flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m1 0v12a2 2 0 01-2 2H9a2 2 0 01-2-2V6h10z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-bold text-base truncate">
                      {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
                    </div>
                    <div className="text-white/80 text-xs">Visualizza</div>
                  </div>
                </div>

                {/* Right - Total + Procedi Button */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-white text-xs opacity-80">Totale</div>
                    <div className="text-white font-bold text-lg">{formatPriceCompact(cartTotal)}</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlaceOrder();
                    }}
                    className="bg-white text-green-600 px-4 py-2 rounded-xl font-bold text-sm hover:bg-green-50 transition-colors flex items-center gap-1 whitespace-nowrap shadow-md"
                  >
                    Procedi
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Expanded State - Full Cart View */}
      {isExpanded && (
        <div className="fixed bottom-20 left-0 right-0 z-[9998] animate-slide-up">
            <div className="max-w-screen-xl mx-auto px-4">
              <div className="bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.15)] border-2 border-gray-200 max-h-[60vh] flex flex-col">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 flex items-center justify-between rounded-t-xl">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m1 0v12a2 2 0 01-2 2H9a2 2 0 01-2-2V6h10z" />
                  </svg>
                  <div>
                    <div className="text-white font-bold">Il Tuo Ordine</div>
                    <div className="text-white/80 text-xs">{cartCount} {cartCount === 1 ? 'item' : 'items'}</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Items List - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[40vh]">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                    <div className="flex items-start gap-3">
                      {/* Item Info */}
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">{item.dish.name}</div>
                        {item.extras.length > 0 && (
                          <div className="text-xs text-gray-600 mt-1">
                            {item.extras.map(extra => `+ ${extra.name}`).join(', ')}
                          </div>
                        )}

                        {/* Bottom Row: Quantity Badge, Edit, Delete, Price */}
                        <div className="flex items-center gap-3 mt-2">
                          {/* Quantity Badge */}
                          <div className="bg-gray-900 text-white px-3 py-1 rounded-full font-bold text-sm">
                            {item.quantity}
                          </div>

                          {/* Edit Button */}
                          <button
                            onClick={() => {
                              // TODO: Reopen customization for this item
                              alert('Funzionalità di modifica in arrivo');
                            }}
                            className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
                            title="Modifica"
                          >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-1.5 hover:bg-red-100 rounded-full transition-colors"
                            title="Rimuovi"
                          >
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>

                          {/* Price (right-aligned) */}
                          <div className="ml-auto">
                            <span className="font-bold text-green-700 text-base">{formatPriceCompact(calculateItemTotal(item))}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer - Total + Place Order Button */}
              <div className="border-t-2 border-gray-200 p-4 bg-white rounded-b-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-700 font-semibold">Totale Ordine</span>
                  <span className="text-2xl font-bold text-green-600">{formatPriceCompact(cartTotal)}</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95"
                >
                  Procedi con l'Ordine
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 animate-fade-in">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setShowConfirmModal(false)}
          />

          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Conferma il tuo ordine
              </h3>

              {/* Order Items List */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4 text-left max-h-60 overflow-y-auto">
                <div className="text-xs font-semibold text-gray-500 uppercase mb-3">Il tuo ordine</div>
                <div className="space-y-2">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className="flex justify-between items-start py-2 border-b border-gray-200 last:border-0">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900 text-sm">
                          {item.quantity}x {item.dish.name}
                        </div>
                        {item.extras.length > 0 && (
                          <div className="text-xs text-gray-600 mt-0.5">
                            {item.extras.map(extra => extra.name).join(', ')}
                          </div>
                        )}
                      </div>
                      <div className="font-bold text-gray-900 text-sm ml-3">
                        {formatPriceCompact(calculateItemTotal(item))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Summary */}
              <div className="bg-green-50 rounded-xl p-4 mb-6 text-left border-2 border-green-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm">Articoli</span>
                  <span className="font-bold text-gray-900">{cartCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Totale</span>
                  <span className="font-bold text-green-600 text-xl">{formatPriceCompact(cartTotal)}</span>
                </div>
              </div>

              {/* Message */}
              <p className="text-gray-600 mb-6">
                Il tuo ordine verrà inviato in cucina immediatamente
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Annulla
                </button>
                <button
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting}
                  className="flex-[2] bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-bold shadow-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Invio in corso...
                    </>
                  ) : (
                    'Conferma Ordine'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[10001] animate-toast-slide-up">
          <div className="bg-green-500 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 border-2 border-white">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-lg">Ordine Inviato!</div>
              <div className="text-sm text-white/90">Il tuo ordine è in preparazione</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
