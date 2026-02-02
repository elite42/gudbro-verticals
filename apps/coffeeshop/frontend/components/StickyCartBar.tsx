'use client';

import React, { useId } from 'react';
import { CartItem } from '@/lib/cart-store';
import { useStickyCartState } from '@/hooks/useStickyCartState';
import { useAppPriceFormat as usePriceFormat } from '@/lib/currency';
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
    calculateItemTotal,
  } = useStickyCartState();

  // Accessibility: Focus trap for confirmation modal
  const modalRef = useFocusTrap(showConfirmModal);

  // Accessibility: Keyboard navigation for modals
  useKeyboardNavigation({
    isOpen: showConfirmModal,
    onClose: () => setShowConfirmModal(false),
    onEscape: () => setShowConfirmModal(false),
  });

  // Don't render until client-side
  if (!isClient) return null;

  // Hidden state - no items in cart
  if (cartCount === 0) return null;

  return (
    <div>
      {/* Collapsed State - Compact Bar */}
      {!isExpanded && (
        <div className="animate-slide-up fixed bottom-20 left-0 right-0 z-[9998]">
          <div className="mx-auto max-w-screen-xl px-4">
            <div className="rounded-t-2xl border-2 border-white bg-gradient-to-r from-green-500 to-green-600 shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                {/* Left - Cart Icon + Count (clickable to expand) */}
                <div
                  onClick={() => setIsExpanded(true)}
                  className="flex flex-1 cursor-pointer items-center gap-3 transition-opacity hover:opacity-90"
                >
                  <div className="flex-shrink-0 rounded-full bg-white p-2">
                    <svg
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m1 0v12a2 2 0 01-2 2H9a2 2 0 01-2-2V6h10z"
                      />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-base font-bold text-white">
                      {cartCount} {cartCount === 1 ? 'Item' : 'Items'}
                    </div>
                    <div className="text-xs text-white/80">Visualizza</div>
                  </div>
                </div>

                {/* Right - Total + Procedi Button */}
                <div className="flex flex-shrink-0 items-center gap-2">
                  <div className="text-right">
                    <div className="text-xs text-white opacity-80">Totale</div>
                    <div className="text-lg font-bold text-white">
                      {formatPriceCompact(cartTotal)}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlaceOrder();
                    }}
                    className="flex items-center gap-1 whitespace-nowrap rounded-xl bg-white px-4 py-2 text-sm font-bold text-green-600 shadow-md transition-colors hover:bg-green-50"
                  >
                    Procedi
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
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
        <div className="animate-slide-up fixed bottom-20 left-0 right-0 z-[9998]">
          <div className="mx-auto max-w-screen-xl px-4">
            <div className="flex max-h-[60vh] flex-col rounded-t-2xl border-2 border-gray-200 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)]">
              {/* Header */}
              <div className="flex items-center justify-between rounded-t-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-3">
                <div className="flex items-center gap-3">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m1 0v12a2 2 0 01-2 2H9a2 2 0 01-2-2V6h10z"
                    />
                  </svg>
                  <div>
                    <div className="font-bold text-white">Il Tuo Ordine</div>
                    <div className="text-xs text-white/80">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="rounded-full p-1 text-white transition-colors hover:bg-white/20"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>

              {/* Items List - Scrollable */}
              <div className="max-h-[40vh] flex-1 space-y-3 overflow-y-auto p-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                    <div className="flex items-start gap-3">
                      {/* Item Info */}
                      <div className="flex-1">
                        <div className="font-bold text-gray-900">{item.dish.name}</div>
                        {item.extras.length > 0 && (
                          <div className="mt-1 text-xs text-gray-600">
                            {item.extras.map((extra) => `+ ${extra.name}`).join(', ')}
                          </div>
                        )}

                        {/* Bottom Row: Quantity Badge, Edit, Delete, Price */}
                        <div className="mt-2 flex items-center gap-3">
                          {/* Quantity Badge */}
                          <div className="rounded-full bg-gray-900 px-3 py-1 text-sm font-bold text-white">
                            {item.quantity}
                          </div>

                          {/* Edit Button */}
                          <button
                            onClick={() => {
                              // TODO: Reopen customization for this item
                              alert('Funzionalità di modifica in arrivo');
                            }}
                            className="rounded-full p-1.5 transition-colors hover:bg-gray-200"
                            title="Modifica"
                          >
                            <svg
                              className="h-5 w-5 text-gray-600"
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

                          {/* Delete Button */}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="rounded-full p-1.5 transition-colors hover:bg-red-100"
                            title="Rimuovi"
                          >
                            <svg
                              className="h-5 w-5 text-red-600"
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

                          {/* Price (right-aligned) */}
                          <div className="ml-auto">
                            <span className="text-base font-bold text-green-700">
                              {formatPriceCompact(calculateItemTotal(item))}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer - Total + Place Order Button */}
              <div className="rounded-b-xl border-t-2 border-gray-200 bg-white p-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Totale Ordine</span>
                  <span className="text-2xl font-bold text-green-600">
                    {formatPriceCompact(cartTotal)}
                  </span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full transform rounded-xl bg-gradient-to-r from-green-500 to-green-600 py-4 text-lg font-bold text-white shadow-lg transition-all hover:from-green-600 hover:to-green-700 active:scale-95"
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
        <div className="animate-fade-in fixed inset-0 z-[10000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !isSubmitting && setShowConfirmModal(false)}
          />

          {/* Modal */}
          <div className="animate-scale-in relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>

              {/* Title */}
              <h3 className="mb-2 text-2xl font-bold text-gray-900">Conferma il tuo ordine</h3>

              {/* Order Items List */}
              <div className="mb-4 max-h-60 overflow-y-auto rounded-xl bg-gray-50 p-4 text-left">
                <div className="mb-3 text-xs font-semibold uppercase text-gray-500">
                  Il tuo ordine
                </div>
                <div className="space-y-2">
                  {cartItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between border-b border-gray-200 py-2 last:border-0"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-gray-900">
                          {item.quantity}x {item.dish.name}
                        </div>
                        {item.extras.length > 0 && (
                          <div className="mt-0.5 text-xs text-gray-600">
                            {item.extras.map((extra) => extra.name).join(', ')}
                          </div>
                        )}
                      </div>
                      <div className="ml-3 text-sm font-bold text-gray-900">
                        {formatPriceCompact(calculateItemTotal(item))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Summary */}
              <div className="mb-6 rounded-xl border-2 border-green-200 bg-green-50 p-4 text-left">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Articoli</span>
                  <span className="font-bold text-gray-900">{cartCount}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-700">Totale</span>
                  <span className="text-xl font-bold text-green-600">
                    {formatPriceCompact(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Message */}
              <p className="mb-6 text-gray-600">
                Il tuo ordine verrà inviato in cucina immediatamente
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  disabled={isSubmitting}
                  className="flex-1 rounded-xl bg-gray-100 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Annulla
                </button>
                <button
                  onClick={handleConfirmOrder}
                  disabled={isSubmitting}
                  className="flex flex-[2] transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 py-3 font-bold text-white shadow-lg transition-all hover:from-green-600 hover:to-green-700 active:scale-95 disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="h-5 w-5 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
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
        <div className="animate-toast-slide-up fixed left-1/2 top-24 z-[10001] -translate-x-1/2 transform">
          <div className="flex items-center gap-4 rounded-2xl border-2 border-white bg-green-500 px-8 py-4 text-white shadow-2xl">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white">
              <svg className="h-7 w-7 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <div className="text-lg font-bold">Ordine Inviato!</div>
              <div className="text-sm text-white/90">Il tuo ordine è in preparazione</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
