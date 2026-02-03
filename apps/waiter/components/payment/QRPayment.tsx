'use client';

/**
 * QR Payment Component
 *
 * Self-service payment via QR code shown to customer.
 */

import { useState, useEffect } from 'react';
import { QrCode, CheckCircle, Spinner, DeviceMobile } from '@phosphor-icons/react';
import { formatPrice as _fp } from '@gudbro/utils';

interface QRPaymentProps {
  total: number;
  tableNumber: string;
  orderId?: string;
  onConfirm: (details?: Record<string, unknown>) => void;
}

export function QRPayment({ total, tableNumber, orderId, onConfirm }: QRPaymentProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [paymentReceived, setPaymentReceived] = useState(false);

  const formatCurrency = (amount: number) => _fp(amount, 'EUR');

  const handleGenerateQR = async () => {
    setIsGenerating(true);
    // Simulate QR generation
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsGenerating(false);
    setQrGenerated(true);
    setIsWaiting(true);
  };

  // Simulate payment polling (in production, use websocket)
  useEffect(() => {
    if (!isWaiting) return;

    // In production, this would be a websocket subscription
    // For demo, we just show the waiting state
    return () => {};
  }, [isWaiting]);

  const handleSimulatePayment = () => {
    setIsWaiting(false);
    setPaymentReceived(true);
  };

  const handleConfirm = () => {
    onConfirm({
      method: 'qr_self_service',
      tableNumber,
      orderId,
    });
  };

  if (paymentReceived) {
    return (
      <div className="space-y-6 py-8 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
          <CheckCircle size={48} weight="fill" className="text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-green-700 dark:text-green-300">
            Pagamento ricevuto!
          </h3>
          <p className="text-theme-text-secondary mt-1">
            Il cliente ha pagato {formatCurrency(total)}
          </p>
        </div>
        <button
          onClick={handleConfirm}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-4 text-lg font-bold text-white"
        >
          <CheckCircle size={24} weight="bold" />
          Chiudi tavolo
        </button>
      </div>
    );
  }

  if (qrGenerated) {
    return (
      <div className="space-y-6">
        {/* QR Code display */}
        <div className="text-center">
          <div className="inline-block rounded-2xl bg-white p-4 shadow-lg">
            {/* Placeholder QR - in production use actual QR library */}
            <div className="relative flex h-56 w-56 items-center justify-center rounded-xl bg-gray-100">
              <QrCode size={140} weight="duotone" className="text-gray-800" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white shadow">
                  <DeviceMobile size={24} weight="duotone" className="text-indigo-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center">
          <h3 className="text-theme-text-primary mb-1 font-semibold">Mostra al cliente</h3>
          <p className="text-theme-text-secondary text-sm">
            Il cliente scansiona il QR e paga dal suo telefono
          </p>
        </div>

        {/* Payment details */}
        <div className="bg-theme-bg-secondary rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-theme-text-secondary">Importo</span>
            <span className="text-theme-text-primary text-2xl font-bold">
              {formatCurrency(total)}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-theme-text-tertiary">Tavolo</span>
            <span className="text-theme-text-secondary">{tableNumber}</span>
          </div>
        </div>

        {/* Waiting status */}
        {isWaiting && (
          <div className="py-4 text-center">
            <Spinner
              size={32}
              weight="bold"
              className="mx-auto mb-2 animate-spin text-indigo-500"
            />
            <p className="text-theme-text-secondary">In attesa del pagamento...</p>
            <p className="text-theme-text-tertiary mt-1 text-xs">
              Riceverai una notifica quando il cliente paga
            </p>
            {/* Dev button */}
            <button
              onClick={handleSimulatePayment}
              className="text-theme-text-tertiary mt-4 text-xs underline"
            >
              (Dev: Simula pagamento ricevuto)
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Explanation */}
      <div className="rounded-2xl bg-indigo-50 py-6 text-center dark:bg-indigo-900/20">
        <QrCode
          size={48}
          weight="duotone"
          className="mx-auto mb-3 text-indigo-600 dark:text-indigo-400"
        />
        <h3 className="mb-2 font-semibold text-indigo-800 dark:text-indigo-200">
          Pagamento self-service
        </h3>
        <p className="mx-auto max-w-xs text-sm text-indigo-700 dark:text-indigo-300">
          Genera un QR code che il cliente può scansionare per pagare direttamente dal suo telefono
        </p>
      </div>

      {/* Total */}
      <div className="bg-theme-bg-secondary rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <span className="text-theme-text-secondary">Totale da pagare</span>
          <span className="text-theme-text-primary text-2xl font-bold">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-2">
        <p className="text-theme-text-tertiary text-xs font-medium uppercase tracking-wide">
          Vantaggi
        </p>
        <ul className="text-theme-text-secondary space-y-1 text-sm">
          <li className="flex items-center gap-2">
            <CheckCircle size={16} weight="fill" className="text-green-500" />
            Nessun contatto con contanti
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={16} weight="fill" className="text-green-500" />
            Il cliente sceglie il metodo
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle size={16} weight="fill" className="text-green-500" />
            Notifica automatica al completamento
          </li>
        </ul>
      </div>

      {/* Generate button */}
      <button
        onClick={handleGenerateQR}
        disabled={isGenerating}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 py-4 text-lg font-bold text-white transition-colors hover:bg-indigo-600 disabled:opacity-50"
      >
        {isGenerating ? (
          <>
            <Spinner size={24} weight="bold" className="animate-spin" />
            Generazione...
          </>
        ) : (
          <>
            <QrCode size={24} weight="bold" />
            Genera QR Code
          </>
        )}
      </button>
    </div>
  );
}
