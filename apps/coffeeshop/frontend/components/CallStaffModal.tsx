'use client';

import React, { useState, useEffect } from 'react';
import { useSwipeToDismiss } from '../hooks/useSwipeToDismiss';
import { useTranslation } from '@/lib/use-translation';
import { submitHotAction, getDefaultLocationId, HOT_ACTION_CODES } from '@/lib/hot-actions-service';

interface CallStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string, quickOption?: string) => void;
  tableNumber?: string;
}

export function CallStaffModal({ isOpen, onClose, onConfirm, tableNumber }: CallStaffModalProps) {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = useState<'staff' | 'bill' | null>(null);
  const [customReason, setCustomReason] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState<'idle' | 'success' | 'cooldown' | 'error'>(
    'idle'
  );

  const swipe = useSwipeToDismiss({ isOpen, onClose });

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedOption(null);
      setCustomReason('');
      setPaymentMethod(null);
      setIsLoading(false);
      setRequestStatus('idle');
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setRequestStatus('idle');

    let finalMessage = '';
    let actionCode = '';

    if (selectedOption === 'staff') {
      finalMessage = customReason || t.callStaff.defaultReason;
      actionCode = HOT_ACTION_CODES.CALL_WAITER;
    } else if (selectedOption === 'bill') {
      finalMessage = `${t.callStaff.billRequest}${paymentMethod ? ` - ${t.callStaff.payment}: ${paymentMethod}` : ''}`;
      actionCode = HOT_ACTION_CODES.REQUEST_BILL;
    }

    try {
      // Get location ID
      const locationId = await getDefaultLocationId();

      if (locationId) {
        // Submit to backend
        const result = await submitHotAction({
          locationId,
          actionCode,
          tableNumber,
          note: finalMessage,
        });

        if (!result.success) {
          if (result.error === 'cooldown') {
            setRequestStatus('cooldown');
            setIsLoading(false);
            return;
          }
          throw new Error(result.error || 'Unknown error');
        }
      }

      // Success
      setRequestStatus('success');
      onConfirm(finalMessage, selectedOption || undefined);

      // Auto close after showing success
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error sending request:', error);
      setRequestStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 z-[80]" style={swipe.getBackdropStyle()} onClick={onClose} />

      {/* Bottom Sheet */}
      <div
        className="bg-theme-bg-elevated fixed bottom-0 left-0 right-0 z-[90] max-h-[85vh] select-none overflow-hidden rounded-t-3xl shadow-2xl"
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
        <div className="flex justify-center pb-2 pt-3">
          <div className="bg-theme-bg-tertiary h-1.5 w-12 rounded-full" />
        </div>

        {/* Header */}
        <div className="border-theme-bg-tertiary border-b px-6 pb-4 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-theme-text-primary text-2xl font-bold">{t.callStaff.title}</h2>
            <button
              onClick={onClose}
              className="hover:bg-theme-bg-tertiary rounded-full p-2 transition-colors"
              aria-label={t.callStaff.close}
            >
              <svg
                className="text-theme-text-secondary h-6 w-6"
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
        </div>

        {/* Content */}
        <div className="max-h-[calc(85vh-200px)] overflow-y-auto px-6 py-6">
          {/* Main Options */}
          <div className="space-y-4">
            {/* Option 1: Chiama Personale */}
            <div
              onClick={() => setSelectedOption('staff')}
              className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-200 ${
                selectedOption === 'staff'
                  ? 'bg-theme-brand-secondary border-theme-brand-primary shadow-md'
                  : 'bg-theme-bg-secondary border-theme-bg-tertiary hover:border-theme-brand-accent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">🙋</div>
                <h3 className="text-theme-text-primary text-lg font-bold">
                  {t.callStaff.callStaff}
                </h3>
              </div>

              {/* Custom Reason - shown only when selected */}
              {selectedOption === 'staff' && (
                <div className="mt-4">
                  <label className="text-theme-text-primary mb-2 block text-sm font-semibold">
                    {t.callStaff.reasonLabel}
                  </label>
                  <textarea
                    value={customReason}
                    onChange={(e) => setCustomReason(e.target.value)}
                    placeholder={t.callStaff.reasonPlaceholder}
                    rows={3}
                    className="border-theme-bg-tertiary focus:border-theme-brand-primary text-theme-text-primary placeholder-theme-text-tertiary w-full resize-none rounded-xl border-2 px-4 py-3 transition-colors focus:outline-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
            </div>

            {/* Option 2: Richiedi Conto */}
            <div
              onClick={() => setSelectedOption('bill')}
              className={`cursor-pointer rounded-2xl border-2 p-5 transition-all duration-200 ${
                selectedOption === 'bill'
                  ? 'bg-theme-brand-secondary border-theme-brand-primary shadow-md'
                  : 'bg-theme-bg-secondary border-theme-bg-tertiary hover:border-theme-brand-accent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="text-3xl">💳</div>
                <h3 className="text-theme-text-primary text-lg font-bold">
                  {t.callStaff.requestBill}
                </h3>
              </div>

              {/* Payment Method - shown only when selected */}
              {selectedOption === 'bill' && (
                <div className="mt-4">
                  <label className="text-theme-text-primary mb-2 block text-sm font-semibold">
                    {t.callStaff.paymentMethodLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-3" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() =>
                        setPaymentMethod(
                          paymentMethod === t.callStaff.cash ? null : t.callStaff.cash
                        )
                      }
                      className={`rounded-xl border-2 px-4 py-3 font-medium transition-all duration-200 ${
                        paymentMethod === t.callStaff.cash
                          ? 'bg-theme-brand-primary border-theme-brand-primary text-white shadow-md'
                          : 'bg-theme-bg-secondary border-theme-bg-tertiary text-theme-text-primary hover:border-theme-brand-accent'
                      }`}
                    >
                      💵 {t.callStaff.cash}
                    </button>
                    <button
                      onClick={() =>
                        setPaymentMethod(
                          paymentMethod === t.callStaff.card ? null : t.callStaff.card
                        )
                      }
                      className={`rounded-xl border-2 px-4 py-3 font-medium transition-all duration-200 ${
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

        {/* Footer - Status Messages & Confirm Button */}
        <div className="bg-theme-bg-elevated border-theme-bg-tertiary sticky bottom-0 space-y-3 border-t p-6">
          {/* Status Messages */}
          {requestStatus === 'success' && (
            <div className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/20 p-3 text-green-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="font-medium">{t.callStaff.successMessage}</span>
            </div>
          )}

          {requestStatus === 'cooldown' && (
            <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/20 p-3 text-amber-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">
                {t.callStaff.cooldownMessage || 'Please wait a few minutes before requesting again'}
              </span>
            </div>
          )}

          {requestStatus === 'error' && (
            <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/20 p-3 text-red-400">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-medium">{t.callStaff.errorMessage}</span>
            </div>
          )}

          {/* Confirm Button */}
          {requestStatus !== 'success' && (
            <button
              onClick={handleConfirm}
              disabled={!selectedOption || isLoading || requestStatus === 'cooldown'}
              className={`active:scale-98 flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-lg font-bold shadow-lg transition-all duration-200 ${
                selectedOption && !isLoading && requestStatus !== 'cooldown'
                  ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                  : 'bg-theme-bg-tertiary text-theme-text-tertiary cursor-not-allowed'
              }`}
            >
              {isLoading ? (
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
                  <span>{t.callStaff.sending}</span>
                </>
              ) : (
                t.callStaff.sendRequest
              )}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
