'use client';

import React, { useState, useEffect } from 'react';
import { cartStore, CartItem } from '../lib/cart-store';
import { currencyPreferencesStore, formatConvertedPrice } from '../lib/currency';
import { tableContextStore } from '../lib/table-context-store';
import { orderHistoryStore } from '../lib/order-history-store';
import { coffeeshopConfig } from '../config/coffeeshop.config';
import { TipSelector } from './TipSelector';
import { OrderSummary, calculateOrderTotals } from './OrderSummary';
import { SplitBillModal } from './SplitBillModal';
import type { PaymentSettings, TipState } from '../lib/cart-store';

// Types for split bill functionality
interface OrderSession {
  id: string;
  sessionId: string;
  customerName?: string;
  itemIds: string[];
  subtotal: number;
  taxAmount: number;
  tipAmount: number;
  serviceChargeAmount: number;
  total: number;
  paymentStatus: 'unpaid' | 'paid' | 'partial';
  paidAt?: string;
  paymentMethod?: string;
}

interface ServerStaff {
  id: string;
  displayName: string;
  photoUrl?: string;
  jobTitle?: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout?: () => void;
  paymentSettings?: PaymentSettings;
  // Split bill props
  enableSplitBill?: boolean;
  sessions?: OrderSession[];
  serverStaff?: ServerStaff;
  onPayFull?: () => void | Promise<void>;
  onPaySession?: (sessionId: string, amount: number) => void | Promise<void>;
  onSplitEqual?: (numPeople: number, amountPerPerson: number) => void | Promise<void>;
}

export function CartSidebar({
  isOpen,
  onClose,
  onCheckout,
  paymentSettings,
  enableSplitBill = false,
  sessions = [],
  serverStaff,
  onPayFull,
  onPaySession,
  onSplitEqual,
}: CartSidebarProps) {
  // Check if cart is enabled
  if (!coffeeshopConfig.features.enableCart) {
    return null;
  }
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currencyPrefs, setCurrencyPrefs] = useState(() => currencyPreferencesStore.get());
  const [tableContext, setTableContext] = useState(() => tableContextStore.get());
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [tipState, setTipState] = useState<TipState>({ amount: 0, percentage: 0 });
  const [showSplitBillModal, setShowSplitBillModal] = useState(false);

  // Get current session ID for split bill
  const currentSessionId = cartStore.getSessionId();

  // Load cart items and tip
  useEffect(() => {
    if (isOpen) {
      setCartItems(cartStore.get().items);
      setTipState(cartStore.getTip());
    }
  }, [isOpen]);

  // Handle tip change
  const handleTipChange = (amount: number, percentage: number) => {
    setTipState({ amount, percentage });
    cartStore.setTip(amount, percentage);
  };

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      setCartItems(cartStore.get().items);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('cart-updated', handleCartUpdate);
      return () => window.removeEventListener('cart-updated', handleCartUpdate);
    }
  }, []);

  // Listen for currency preferences changes
  useEffect(() => {
    const handleCurrencyUpdate = () => {
      setCurrencyPrefs(currencyPreferencesStore.get());
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('currency-preferences-updated', handleCurrencyUpdate);
      return () => window.removeEventListener('currency-preferences-updated', handleCurrencyUpdate);
    }
  }, []);

  // Listen for table context updates
  useEffect(() => {
    const handleTableContextUpdate = (event: CustomEvent) => {
      setTableContext(event.detail);
    };

    if (typeof window !== 'undefined') {
      setTableContext(tableContextStore.get()); // Initial load
      window.addEventListener('table-context-updated', handleTableContextUpdate as EventListener);
      return () =>
        window.removeEventListener(
          'table-context-updated',
          handleTableContextUpdate as EventListener
        );
    }
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const sidebar = document.getElementById('cart-sidebar');
      if (sidebar && !sidebar.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const formatPrice = (price: number) => {
    if (currencyPrefs.enabled && currencyPrefs.selectedCurrency !== 'VND') {
      return formatConvertedPrice(price, currencyPrefs.selectedCurrency);
    }

    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleIncrement = (itemId: string) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (item) {
      cartStore.updateQuantity(itemId, item.quantity + 1);
    }
  };

  const handleDecrement = (itemId: string) => {
    const item = cartItems.find((i) => i.id === itemId);
    if (item) {
      if (item.quantity > 1) {
        cartStore.updateQuantity(itemId, item.quantity - 1);
      } else {
        // Confirm before removing
        if (confirm('Rimuovere questo prodotto dal carrello?')) {
          cartStore.remove(itemId);
        }
      }
    }
  };

  const handleRemove = (itemId: string) => {
    if (confirm('Rimuovere questo prodotto dal carrello?')) {
      cartStore.remove(itemId);
    }
  };

  const handleClearCart = () => {
    if (confirm('Svuotare completamente il carrello?')) {
      cartStore.clear();
      setTipState({ amount: 0, percentage: 0 });
    }
  };

  const handleConsumptionTypeToggle = () => {
    const newType = tableContext.consumption_type === 'dine-in' ? 'takeaway' : 'dine-in';
    tableContextStore.setConsumptionType(newType);
  };

  const handleCheckoutClick = () => {
    try {
      // Get complete order data including table context
      const orderData = cartStore.getOrderData();

      // Save order to history BEFORE clearing cart
      orderHistoryStore.addOrder(orderData);

      // Clear cart and tip
      cartStore.clear();
      cartStore.clearTip();

      // Update local state immediately
      setCartItems([]);
      setTipState({ amount: 0, percentage: 0 });

      // Close sidebar
      onClose();

      // Show success toast
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);

      // Call parent callback if provided
      onCheckout?.();
    } catch (error) {
      console.error('Failed to submit order:', error);
      alert("Errore durante l'invio dell'ordine. Riprova.");
    }
  };

  const cartTotal = cartStore.getTotal();
  const cartCount = cartStore.count();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[60] bg-black bg-opacity-50 transition-opacity" />

      {/* Sidebar */}
      <div
        id="cart-sidebar"
        className="bg-theme-bg-elevated fixed right-0 top-0 z-[70] flex h-full w-96 max-w-[90vw] transform flex-col shadow-2xl transition-transform duration-300 ease-in-out"
      >
        {/* Header */}
        <div className="bg-theme-bg-secondary border-theme-bg-tertiary flex-shrink-0 border-b p-4">
          <div className="mb-2 flex items-center justify-between">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h2 className="text-theme-text-primary text-xl font-bold">Il tuo Carrello</h2>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-theme-bg-tertiary/50 rounded-full p-2 transition-colors"
              aria-label="Close"
            >
              <svg
                className="text-theme-text-secondary h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Cart Count */}
          <p className="text-theme-text-secondary text-sm">
            {cartCount} {cartCount === 1 ? 'prodotto' : 'prodotti'}
          </p>
        </div>

        {/* Table Context Info (if QR scanned) */}
        {tableContext.table_number && (
          <div className="border-theme-bg-tertiary border-b px-4 pb-2 pt-4">
            <div className="bg-theme-bg-secondary border-theme-bg-tertiary rounded-xl border-2 p-4">
              {/* Table Info */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="bg-theme-brand-primary rounded-lg p-2 text-white">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-theme-text-primary font-bold">
                      Tavolo {tableContext.table_number}
                    </div>
                    {tableContext.customer_name && (
                      <div className="text-theme-text-secondary text-sm">
                        {tableContext.customer_name}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Server Staff Info */}
              {serverStaff && (
                <div className="bg-theme-bg-elevated border-theme-bg-tertiary mb-3 flex items-center gap-3 rounded-lg border p-3">
                  {serverStaff.photoUrl ? (
                    <img
                      src={serverStaff.photoUrl}
                      alt={serverStaff.displayName}
                      className="border-theme-brand-primary h-10 w-10 rounded-full border-2 object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 font-bold text-white">
                      {serverStaff.displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-theme-text-secondary text-xs">Servito da</p>
                    <p className="text-theme-text-primary font-semibold">
                      {serverStaff.displayName}
                    </p>
                    {serverStaff.jobTitle && (
                      <p className="text-theme-text-tertiary text-xs">{serverStaff.jobTitle}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Consumption Type Toggle */}
              <button
                onClick={handleConsumptionTypeToggle}
                className="bg-theme-bg-elevated hover:bg-theme-bg-secondary border-theme-bg-tertiary flex w-full items-center justify-between rounded-lg border px-4 py-3 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {tableContext.consumption_type === 'dine-in' ? '🏠' : '📦'}
                  </span>
                  <div className="text-left">
                    <div className="text-theme-text-primary font-semibold">
                      {tableContext.consumption_type === 'dine-in' ? 'Al Tavolo' : 'Da Portare Via'}
                    </div>
                    <div className="text-theme-text-secondary text-xs">Clicca per cambiare</div>
                  </div>
                </div>
                <svg
                  className="text-theme-text-tertiary h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
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
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <svg
                className="text-theme-text-tertiary mb-4 h-24 w-24"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <h3 className="text-theme-text-primary mb-2 text-lg font-semibold">Carrello Vuoto</h3>
              <p className="text-theme-text-secondary mb-4 text-sm">
                Aggiungi prodotti dal menu per iniziare
              </p>
              <button
                onClick={onClose}
                className="bg-theme-brand-primary hover:bg-theme-brand-primary-hover rounded-lg px-6 py-2 font-semibold text-white transition-colors"
              >
                Vai al Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                const itemTotal =
                  (item.dish.price + item.extras.reduce((sum, e) => sum + e.price, 0)) *
                  item.quantity;

                return (
                  <div
                    key={item.id}
                    className="bg-theme-bg-secondary border-theme-bg-tertiary rounded-lg border p-3"
                  >
                    {/* Item Content */}
                    <div className="flex items-start gap-3">
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-theme-text-primary mb-1 line-clamp-2 text-sm font-semibold">
                          {item.dish.name}
                        </h3>

                        {/* Extras */}
                        {item.extras.length > 0 && (
                          <div className="mb-2">
                            {item.extras.map((extra, idx) => (
                              <p key={idx} className="text-theme-text-secondary text-xs">
                                + {extra.name}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Bottom Row: Quantity, Edit, Delete, Price */}
                        <div className="flex items-center gap-3">
                          {/* Quantity Badge */}
                          <div className="bg-theme-text-primary text-theme-bg-primary rounded-full px-3 py-1 text-sm font-bold">
                            {item.quantity}
                          </div>

                          {/* Edit Button */}
                          <button
                            onClick={() => {
                              // TODO: Reopen customization modal for this item
                              alert('Funzionalità di modifica in arrivo');
                            }}
                            className="hover:bg-theme-bg-tertiary rounded-full p-1.5 transition-colors"
                            title="Modifica"
                          >
                            <svg
                              className="text-theme-text-secondary h-5 w-5"
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
                            onClick={() => handleRemove(item.id)}
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
                              {formatPrice(itemTotal)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Clear Cart Button */}
              {cartItems.length > 0 && (
                <button
                  onClick={handleClearCart}
                  className="w-full rounded-lg py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
                >
                  Svuota Carrello
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer - Checkout */}
        {cartItems.length > 0 && (
          <div className="bg-theme-bg-elevated border-theme-bg-tertiary flex-shrink-0 space-y-4 border-t-2 p-4">
            {/* Tip Selector (if enabled) */}
            {paymentSettings?.tips?.enabled && (
              <TipSelector
                subtotal={cartTotal}
                taxAmount={
                  paymentSettings.tax?.enabled && paymentSettings.tax.displayMode === 'exclusive'
                    ? cartTotal * (paymentSettings.tax.percentage / 100)
                    : 0
                }
                tipPresets={paymentSettings.tips.presets || [10, 15, 20]}
                allowCustom={paymentSettings.tips.allowCustom ?? true}
                calculationBase={paymentSettings.tips.calculationBase || 'pre_tax'}
                onTipChange={handleTipChange}
              />
            )}

            {/* Order Summary */}
            {paymentSettings?.tax?.enabled ||
            paymentSettings?.serviceCharge?.enabled ||
            tipState.amount > 0 ? (
              <OrderSummary
                subtotal={cartTotal}
                taxEnabled={paymentSettings?.tax?.enabled}
                taxPercentage={paymentSettings?.tax?.percentage}
                taxLabel={paymentSettings?.tax?.label}
                taxDisplayMode={paymentSettings?.tax?.displayMode}
                serviceChargeEnabled={paymentSettings?.serviceCharge?.enabled}
                serviceChargePercentage={paymentSettings?.serviceCharge?.percentage}
                serviceChargeLabel={paymentSettings?.serviceCharge?.label}
                serviceChargeCalculationBase={paymentSettings?.serviceCharge?.calculationBase}
                tipAmount={tipState.amount}
                tipPercentage={tipState.percentage}
              />
            ) : (
              /* Simple Total */
              <div className="flex items-center justify-between">
                <span className="text-theme-text-primary text-lg font-semibold">Totale</span>
                <span className="text-2xl font-bold text-amber-700">{formatPrice(cartTotal)}</span>
              </div>
            )}

            {/* Split Bill Button (if enabled and table context) */}
            {enableSplitBill && tableContext.table_number && (
              <button
                onClick={() => setShowSplitBillModal(true)}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 py-3 font-semibold text-white transition-all hover:from-indigo-600 hover:to-purple-700"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Dividi il Conto
              </button>
            )}

            {/* Checkout Button */}
            <button
              onClick={handleCheckoutClick}
              className="from-theme-brand-primary to-theme-brand-primary hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover w-full transform rounded-xl bg-gradient-to-r py-4 text-lg font-bold text-white shadow-lg transition-all active:scale-95"
            >
              Procedi all'Ordine
            </button>
          </div>
        )}
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed left-1/2 top-24 z-[10001] -translate-x-1/2 transform">
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

      {/* Split Bill Modal */}
      {enableSplitBill && (
        <SplitBillModal
          isOpen={showSplitBillModal}
          onClose={() => setShowSplitBillModal(false)}
          orderTotal={(() => {
            const totals = paymentSettings
              ? calculateOrderTotals({
                  subtotal: cartTotal,
                  taxEnabled: paymentSettings.tax?.enabled,
                  taxPercentage: paymentSettings.tax?.percentage,
                  taxDisplayMode: paymentSettings.tax?.displayMode,
                  serviceChargeEnabled: paymentSettings.serviceCharge?.enabled,
                  serviceChargePercentage: paymentSettings.serviceCharge?.percentage,
                  serviceChargeCalculationBase: paymentSettings.serviceCharge?.calculationBase,
                  tipAmount: tipState.amount,
                })
              : { subtotal: cartTotal, total: cartTotal + tipState.amount };
            return totals.total;
          })()}
          orderItems={cartItems.map((item) => ({
            id: item.id,
            name: item.dish.name,
            price: item.dish.price + item.extras.reduce((sum, e) => sum + e.price, 0),
            quantity: item.quantity,
            extras: item.extras.map((e) => ({ name: e.name, price: e.price })),
            sessionId: item.sessionId,
          }))}
          sessions={sessions}
          currentSessionId={currentSessionId}
          taxAmount={
            paymentSettings?.tax?.enabled && paymentSettings.tax.displayMode === 'exclusive'
              ? cartTotal * (paymentSettings.tax.percentage / 100)
              : 0
          }
          serviceChargeAmount={
            paymentSettings?.serviceCharge?.enabled
              ? cartTotal * (paymentSettings.serviceCharge.percentage / 100)
              : 0
          }
          tipAmount={tipState.amount}
          onPayFull={
            onPayFull ||
            (async () => {
              handleCheckoutClick();
            })
          }
          onPaySession={
            onPaySession ||
            (async () => {
              handleCheckoutClick();
            })
          }
          onSplitEqual={
            onSplitEqual ||
            (async () => {
              handleCheckoutClick();
            })
          }
        />
      )}
    </>
  );
}
