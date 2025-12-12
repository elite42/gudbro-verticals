'use client';

import React, { useState, useEffect } from 'react';
import { cartStore, CartItem } from '../lib/cart-store';
import { currencyPreferencesStore } from '../lib/currency-preferences';
import { formatConvertedPrice } from '../lib/currency-converter';
import { tableContextStore } from '../lib/table-context-store';
import { orderHistoryStore } from '../lib/order-history-store';
import { coffeeshopConfig } from '../config/coffeeshop.config';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout?: () => void;
}

export function CartSidebar({
  isOpen,
  onClose,
  onCheckout
}: CartSidebarProps) {
  // Check if cart is enabled
  if (!coffeeshopConfig.features.enableCart) {
    return null;
  }
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currencyPrefs, setCurrencyPrefs] = useState(() => currencyPreferencesStore.get());
  const [tableContext, setTableContext] = useState(() => tableContextStore.get());
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Load cart items
  useEffect(() => {
    if (isOpen) {
      setCartItems(cartStore.get().items);
    }
  }, [isOpen]);

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
      return () => window.removeEventListener('table-context-updated', handleTableContextUpdate as EventListener);
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
      currency: 'VND'
    }).format(price);
  };

  const handleIncrement = (itemId: string) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
      cartStore.updateQuantity(itemId, item.quantity + 1);
    }
  };

  const handleDecrement = (itemId: string) => {
    const item = cartItems.find(i => i.id === itemId);
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

      // Clear cart
      cartStore.clear();

      // Update local state immediately
      setCartItems([]);

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
      alert('Errore durante l\'invio dell\'ordine. Riprova.');
    }
  };

  const cartTotal = cartStore.getTotal();
  const cartCount = cartStore.count();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] transition-opacity" />

      {/* Sidebar */}
      <div
        id="cart-sidebar"
        className="fixed top-0 right-0 h-full w-96 max-w-[90vw] bg-theme-bg-elevated shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out flex flex-col"
      >
        {/* Header */}
        <div className="bg-theme-bg-secondary border-b border-theme-bg-tertiary p-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-theme-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h2 className="text-xl font-bold text-theme-text-primary">Il tuo Carrello</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-theme-bg-tertiary/50 rounded-full transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Count */}
          <p className="text-sm text-theme-text-secondary">
            {cartCount} {cartCount === 1 ? 'prodotto' : 'prodotti'}
          </p>
        </div>

        {/* Table Context Info (if QR scanned) */}
        {tableContext.table_number && (
          <div className="px-4 pt-4 pb-2 border-b border-theme-bg-tertiary">
            <div className="bg-theme-bg-secondary rounded-xl p-4 border-2 border-theme-bg-tertiary">
              {/* Table Info */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-theme-brand-primary text-white p-2 rounded-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-bold text-theme-text-primary">Tavolo {tableContext.table_number}</div>
                    {tableContext.customer_name && (
                      <div className="text-sm text-theme-text-secondary">{tableContext.customer_name}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Consumption Type Toggle */}
              <button
                onClick={handleConsumptionTypeToggle}
                className="w-full flex items-center justify-between bg-theme-bg-elevated rounded-lg px-4 py-3 hover:bg-theme-bg-secondary transition-colors border border-theme-bg-tertiary"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">
                    {tableContext.consumption_type === 'dine-in' ? '🏠' : '📦'}
                  </span>
                  <div className="text-left">
                    <div className="font-semibold text-theme-text-primary">
                      {tableContext.consumption_type === 'dine-in' ? 'Al Tavolo' : 'Da Portare Via'}
                    </div>
                    <div className="text-xs text-theme-text-secondary">
                      Clicca per cambiare
                    </div>
                  </div>
                </div>
                <svg className="w-5 h-5 text-theme-text-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <svg className="w-24 h-24 text-theme-text-tertiary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-theme-text-primary mb-2">Carrello Vuoto</h3>
              <p className="text-sm text-theme-text-secondary mb-4">Aggiungi prodotti dal menu per iniziare</p>
              <button
                onClick={onClose}
                className="bg-theme-brand-primary text-white px-6 py-2 rounded-lg hover:bg-theme-brand-primary-hover transition-colors font-semibold"
              >
                Vai al Menu
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                const itemTotal = (item.dish.price + item.extras.reduce((sum, e) => sum + e.price, 0)) * item.quantity;

                return (
                  <div key={item.id} className="bg-theme-bg-secondary rounded-lg p-3 border border-theme-bg-tertiary">
                    {/* Item Content */}
                    <div className="flex items-start gap-3">
                      <img
                        src={item.dish.image}
                        alt={item.dish.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-theme-text-primary text-sm line-clamp-2 mb-1">{item.dish.name}</h3>

                        {/* Extras */}
                        {item.extras.length > 0 && (
                          <div className="mb-2">
                            {item.extras.map((extra, idx) => (
                              <p key={idx} className="text-xs text-theme-text-secondary">
                                + {extra.name}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Bottom Row: Quantity, Edit, Delete, Price */}
                        <div className="flex items-center gap-3">
                          {/* Quantity Badge */}
                          <div className="bg-theme-text-primary text-theme-bg-primary px-3 py-1 rounded-full font-bold text-sm">
                            {item.quantity}
                          </div>

                          {/* Edit Button */}
                          <button
                            onClick={() => {
                              // TODO: Reopen customization modal for this item
                              alert('Funzionalità di modifica in arrivo');
                            }}
                            className="p-1.5 hover:bg-theme-bg-tertiary rounded-full transition-colors"
                            title="Modifica"
                          >
                            <svg className="w-5 h-5 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="p-1.5 hover:bg-red-100 rounded-full transition-colors"
                            title="Rimuovi"
                          >
                            <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>

                          {/* Price (right-aligned) */}
                          <div className="ml-auto">
                            <span className="font-bold text-green-700 text-base">{formatPrice(itemTotal)}</span>
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
                  className="w-full text-red-600 hover:bg-red-50 py-2 rounded-lg transition-colors font-semibold text-sm"
                >
                  Svuota Carrello
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer - Checkout */}
        {cartItems.length > 0 && (
          <div className="bg-theme-bg-elevated border-t-2 border-theme-bg-tertiary p-4 flex-shrink-0">
            {/* Total */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-lg font-semibold text-theme-text-primary">Totale</span>
              <span className="text-2xl font-bold text-amber-700">{formatPrice(cartTotal)}</span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckoutClick}
              className="w-full bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary hover:from-theme-brand-primary-hover hover:to-theme-brand-primary-hover text-white py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform active:scale-95"
            >
              Procedi all'Ordine
            </button>
          </div>
        )}
      </div>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[10001]">
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
    </>
  );
}
