'use client';

import React, { useState, useEffect } from 'react';
import { useSwipeToDismiss } from '../hooks/useSwipeToDismiss';
import { useTranslation } from '@/lib/use-translation';

interface CallStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string, quickOption?: string) => void;
}

export function CallStaffModal({
  isOpen,
  onClose,
  onConfirm
}: CallStaffModalProps) {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<'staff' | 'bill' | null>(null);
  const [customReason, setCustomReason] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const swipe = useSwipeToDismiss({ isOpen, onClose });

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedOption(null);
      setCustomReason('');
      setPaymentMethod(null);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    if (isLoading) return;

    setIsLoading(true);

    let finalMessage = '';

    if (selectedOption === 'staff') {
      finalMessage = customReason || t.callStaff.defaultReason;
    } else if (selectedOption === 'bill') {
      finalMessage = `${t.callStaff.billRequest}${paymentMethod ? ` - ${t.callStaff.payment}: ${paymentMethod}` : ''}`;
    }

    try {
      // Simulate API call (1 second delay)
      await new Promise(resolve => setTimeout(resolve, 1000));

      onConfirm(finalMessage, selectedOption || undefined);

      // Show success message
      alert(`${t.callStaff.successMessage}\n\n${finalMessage}\n\n${t.callStaff.successDetail}`);

      onClose();
    } catch (error) {
      console.error('Error sending request:', error);
      alert(t.callStaff.errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-[80]"
        style={swipe.getBackdropStyle()}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[90] bg-theme-bg-elevated rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden select-none"
        style={swipe.getModalStyle()}
        onTouchStart={swipe.handleTouchStart}
        onTouchMove={swipe.handleTouchMove}
        onTouchEnd={swipe.handleTouchEnd}
        onMouseDown={swipe.handleMouseDown}
        onMouseMove={swipe.handleMouseMove}
        onMouseUp={swipe.handleMouseUp}
        onMouseLeave={swipe.handleMouseLeave}
      >
        {/* Handle Bar */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 bg-theme-bg-tertiary rounded-full" />
        </div>

        {/* Header */}
        <div className="px-6 pt-2 pb-4 border-b border-theme-bg-tertiary">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-theme-text-primary">{t.callStaff.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-theme-bg-tertiary rounded-full transition-colors"
              aria-label={t.callStaff.close}
            >
              <svg className="w-6 h-6 text-theme-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-200px)]">
          {/* Main Options */}
          <div className="space-y-4">
            {/* Option 1: Chiama Personale */}
            <div
              onClick={() => setSelectedOption('staff')}
              className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-200 ${
                selectedOption === 'staff'
                  ? 'bg-theme-brand-secondary border-theme-brand-primary shadow-md'
                  : 'bg-theme-bg-secondary border-theme-bg-tertiary hover:border-theme-brand-accent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">🙋</div>
                <h3 className="text-lg font-bold text-theme-text-primary">{t.callStaff.callStaff}</h3>
              </div>

              {/* Custom Reason - shown only when selected */}
              {selectedOption === 'staff' && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-theme-text-primary mb-2">
                    {t.callStaff.reasonLabel}
                  </label>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder={t.callStaff.reasonPlaceholder}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-theme-bg-tertiary rounded-xl focus:border-theme-brand-primary focus:outline-none transition-colors text-theme-text-primary placeholder-theme-text-tertiary resize-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </div>

            {/* Option 2: Richiedi Conto */}
            <div
              onClick={() => setSelectedOption('bill')}
              className={`border-2 rounded-2xl p-5 cursor-pointer transition-all duration-200 ${
                selectedOption === 'bill'
                  ? 'bg-theme-brand-secondary border-theme-brand-primary shadow-md'
                  : 'bg-theme-bg-secondary border-theme-bg-tertiary hover:border-theme-brand-accent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">💳</div>
                <h3 className="text-lg font-bold text-theme-text-primary">{t.callStaff.requestBill}</h3>
              </div>

              {/* Payment Method - shown only when selected */}
              {selectedOption === 'bill' && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-theme-text-primary mb-2">
                    {t.callStaff.paymentMethodLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setPaymentMethod(paymentMethod === t.callStaff.cash ? null : t.callStaff.cash)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${
                        paymentMethod === t.callStaff.cash
                          ? 'bg-theme-brand-primary border-theme-brand-primary text-white shadow-md'
                          : 'bg-theme-bg-secondary border-theme-bg-tertiary text-theme-text-primary hover:border-theme-brand-accent'
                      }`}
                    >
                      💵 {t.callStaff.cash}
                    </button>
                    <button
                      onClick={() => setPaymentMethod(paymentMethod === t.callStaff.card ? null : t.callStaff.card)}
                      className={`px-4 py-3 rounded-xl border-2 transition-all duration-200 font-medium ${
                        paymentMethod === t.callStaff.card
                          ? 'bg-theme-brand-primary border-theme-brand-primary text-white shadow-md'
                          : 'bg-theme-bg-secondary border-theme-bg-tertiary text-theme-text-primary hover:border-theme-brand-accent'
                      }`}
                    >
                      💳 {t.callStaff.card}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer - Confirm Button */}
        <div className="sticky bottom-0 bg-theme-bg-elevated border-t border-theme-bg-tertiary p-6">
          <button
            onClick={handleConfirm}
            disabled={!selectedOption || isLoading}
            className={`w-full py-4 px-6 rounded-xl font-bold text-lg shadow-lg transition-all duration-200 active:scale-98 flex items-center justify-center gap-3 ${
              selectedOption && !isLoading
                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                : 'bg-theme-bg-tertiary text-theme-text-tertiary cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>{t.callStaff.sending}</span>
              </>
            ) : (
              t.callStaff.sendRequest
            )}
          </button>
        </div>
      </div>

    </>
  );
}
