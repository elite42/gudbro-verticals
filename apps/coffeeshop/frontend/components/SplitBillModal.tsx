'use client';

import React, { useState, useEffect } from 'react';

// ============================================================================
// Types
// ============================================================================

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

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  extras?: { name: string; price: number }[];
  sessionId?: string;
}

interface SplitBillModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  orderItems: OrderItem[];
  sessions: OrderSession[];
  currentSessionId: string;
  taxAmount: number;
  serviceChargeAmount: number;
  tipAmount: number;
  onPayFull: () => void;
  onPaySession: (sessionId: string, amount: number) => void;
  onSplitEqual: (numPeople: number, amountPerPerson: number) => void;
}

// ============================================================================
// Component
// ============================================================================

export function SplitBillModal({
  isOpen,
  onClose,
  orderTotal,
  orderItems,
  sessions,
  currentSessionId,
  taxAmount,
  serviceChargeAmount,
  tipAmount,
  onPayFull,
  onPaySession,
  onSplitEqual,
}: SplitBillModalProps) {
  const [activeTab, setActiveTab] = useState<'full' | 'mine' | 'split'>('full');
  const [numPeople, setNumPeople] = useState(2);
  const [isProcessing, setIsProcessing] = useState(false);

  // Reset tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab('full');
      setNumPeople(2);
    }
  }, [isOpen]);

  // Format currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  // Calculate current session total
  const currentSession = sessions.find((s) => s.sessionId === currentSessionId);
  const myTotal = currentSession?.total || 0;

  // Get items for current session
  const myItems = orderItems.filter((item) => item.sessionId === currentSessionId);

  // Calculate split amount
  const splitAmount = orderTotal / numPeople;

  // Handle pay full
  const handlePayFull = async () => {
    setIsProcessing(true);
    try {
      await onPayFull();
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle pay my share
  const handlePayMine = async () => {
    if (!currentSession) return;
    setIsProcessing(true);
    try {
      await onPaySession(currentSessionId, myTotal);
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  // Handle split equal
  const handleSplitEqual = async () => {
    setIsProcessing(true);
    try {
      await onSplitEqual(numPeople, splitAmount);
      onClose();
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-x-4 top-1/2 z-[101] max-h-[85vh] max-w-md -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl sm:left-1/2 sm:right-auto sm:-translate-x-1/2">
        {/* Header */}
        <div className="border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Dividi il Conto</h2>
            <button
              onClick={onClose}
              className="rounded-full p-1 text-white/80 hover:bg-white/20 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <p className="mt-1 text-sm text-white/80">
            Totale ordine: <span className="font-bold">{formatPrice(orderTotal)}</span>
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {[
            { id: 'full', label: 'Paga Tutto', icon: '💳' },
            { id: 'mine', label: 'Paga il Tuo', icon: '👤' },
            { id: 'split', label: 'Dividi', icon: '➗' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-h-[50vh] overflow-y-auto p-6">
          {/* Pay Full Tab */}
          {activeTab === 'full' && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-5xl">💳</span>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">Paga l'intero conto</h3>
                <p className="mt-1 text-sm text-gray-500">Paga il totale per tutto il tavolo</p>
              </div>

              {/* Order Summary */}
              <div className="rounded-xl bg-gray-50 p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotale</span>
                    <span className="text-gray-900">
                      {formatPrice(orderTotal - taxAmount - serviceChargeAmount - tipAmount)}
                    </span>
                  </div>
                  {taxAmount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">IVA</span>
                      <span className="text-gray-900">{formatPrice(taxAmount)}</span>
                    </div>
                  )}
                  {serviceChargeAmount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Coperto</span>
                      <span className="text-gray-900">{formatPrice(serviceChargeAmount)}</span>
                    </div>
                  )}
                  {tipAmount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Mancia</span>
                      <span className="text-gray-900">{formatPrice(tipAmount)}</span>
                    </div>
                  )}
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Totale</span>
                      <span className="text-xl font-bold text-green-600">
                        {formatPrice(orderTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handlePayFull}
                disabled={isProcessing}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-bold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
              >
                {isProcessing ? 'Elaborazione...' : `Paga ${formatPrice(orderTotal)}`}
              </button>
            </div>
          )}

          {/* Pay Mine Tab */}
          {activeTab === 'mine' && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-5xl">👤</span>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">Paga solo il tuo</h3>
                <p className="mt-1 text-sm text-gray-500">Paga solo i prodotti che hai ordinato</p>
              </div>

              {myItems.length === 0 ? (
                <div className="rounded-xl bg-yellow-50 p-4 text-center">
                  <span className="text-2xl">🛒</span>
                  <p className="mt-2 text-sm text-yellow-700">
                    Non hai ancora ordinato nessun prodotto. Gli ordini vengono tracciati per
                    dispositivo.
                  </p>
                </div>
              ) : (
                <>
                  {/* My Items */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">I tuoi prodotti:</p>
                    {myItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                      >
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                            {item.quantity}
                          </span>
                          <span className="text-sm text-gray-900">{item.name}</span>
                        </div>
                        <span className="font-medium text-gray-900">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* My Total */}
                  <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
                    <div className="flex justify-between">
                      <span className="font-semibold text-blue-900">Il tuo totale</span>
                      <span className="text-xl font-bold text-blue-600">
                        {formatPrice(myTotal)}
                      </span>
                    </div>
                  </div>

                  {/* Pay Button */}
                  <button
                    onClick={handlePayMine}
                    disabled={isProcessing || myTotal === 0}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-bold text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
                  >
                    {isProcessing ? 'Elaborazione...' : `Paga ${formatPrice(myTotal)}`}
                  </button>
                </>
              )}

              {/* Other Sessions Info */}
              {sessions.length > 1 && (
                <div className="mt-4 rounded-xl bg-gray-100 p-3">
                  <p className="text-xs text-gray-600">
                    💡 Altri {sessions.length - 1}{' '}
                    {sessions.length - 1 === 1 ? 'persona' : 'persone'} al tavolo. Ognuno può pagare
                    la propria parte dal proprio dispositivo.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Split Equal Tab */}
          {activeTab === 'split' && (
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-5xl">➗</span>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">Dividi in parti uguali</h3>
                <p className="mt-1 text-sm text-gray-500">Dividi il conto equamente tra tutti</p>
              </div>

              {/* Number of People */}
              <div className="rounded-xl bg-gray-50 p-4">
                <p className="mb-3 text-sm font-medium text-gray-700">Numero di persone:</p>
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setNumPeople(Math.max(2, numPeople - 1))}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-bold text-gray-700 shadow-md transition-all hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-16 text-center text-3xl font-bold text-gray-900">
                    {numPeople}
                  </span>
                  <button
                    onClick={() => setNumPeople(Math.min(20, numPeople + 1))}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-bold text-gray-700 shadow-md transition-all hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Split Calculation */}
              <div className="space-y-2">
                <div className="flex justify-between rounded-lg bg-gray-50 p-3 text-sm">
                  <span className="text-gray-600">Totale conto</span>
                  <span className="font-medium text-gray-900">{formatPrice(orderTotal)}</span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-50 p-3 text-sm">
                  <span className="text-gray-600">Diviso per {numPeople}</span>
                  <span className="font-medium text-gray-900">÷ {numPeople}</span>
                </div>
                <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4">
                  <div className="flex justify-between">
                    <span className="font-semibold text-green-900">Ciascuno paga</span>
                    <span className="text-xl font-bold text-green-600">
                      {formatPrice(splitAmount)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button
                onClick={handleSplitEqual}
                disabled={isProcessing}
                className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 py-4 text-lg font-bold text-white shadow-lg transition-all hover:from-green-700 hover:to-emerald-700 disabled:opacity-50"
              >
                {isProcessing
                  ? 'Elaborazione...'
                  : `Paga la tua parte: ${formatPrice(splitAmount)}`}
              </button>

              {/* Info */}
              <p className="text-center text-xs text-gray-500">
                Ogni persona può scansionare il QR e pagare la propria quota
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ============================================================================
// Export
// ============================================================================

export default SplitBillModal;
