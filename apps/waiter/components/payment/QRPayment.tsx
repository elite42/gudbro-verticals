'use client';

/**
 * QR Payment Component
 *
 * Self-service payment via QR code shown to customer.
 */

import { useState, useEffect } from 'react';
import { QrCode, CheckCircle, Spinner, DeviceMobile } from '@phosphor-icons/react';

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

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
      <div className="space-y-6 text-center py-8">
        <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
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
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg bg-green-500 text-white"
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
          <div className="inline-block p-4 bg-white rounded-2xl shadow-lg">
            {/* Placeholder QR - in production use actual QR library */}
            <div className="w-56 h-56 bg-gray-100 rounded-xl flex items-center justify-center relative">
              <QrCode size={140} weight="duotone" className="text-gray-800" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow">
                  <DeviceMobile size={24} weight="duotone" className="text-indigo-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center">
          <h3 className="font-semibold text-theme-text-primary mb-1">
            Mostra al cliente
          </h3>
          <p className="text-sm text-theme-text-secondary">
            Il cliente scansiona il QR e paga dal suo telefono
          </p>
        </div>

        {/* Payment details */}
        <div className="p-4 bg-theme-bg-secondary rounded-2xl">
          <div className="flex justify-between items-center">
            <span className="text-theme-text-secondary">Importo</span>
            <span className="text-2xl font-bold text-theme-text-primary">
              {formatCurrency(total)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2 text-sm">
            <span className="text-theme-text-tertiary">Tavolo</span>
            <span className="text-theme-text-secondary">{tableNumber}</span>
          </div>
        </div>

        {/* Waiting status */}
        {isWaiting && (
          <div className="text-center py-4">
            <Spinner size={32} weight="bold" className="animate-spin text-indigo-500 mx-auto mb-2" />
            <p className="text-theme-text-secondary">In attesa del pagamento...</p>
            <p className="text-xs text-theme-text-tertiary mt-1">
              Riceverai una notifica quando il cliente paga
            </p>
            {/* Dev button */}
            <button
              onClick={handleSimulatePayment}
              className="mt-4 text-xs text-theme-text-tertiary underline"
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
      <div className="text-center py-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl">
        <QrCode size={48} weight="duotone" className="mx-auto text-indigo-600 dark:text-indigo-400 mb-3" />
        <h3 className="font-semibold text-indigo-800 dark:text-indigo-200 mb-2">
          Pagamento self-service
        </h3>
        <p className="text-sm text-indigo-700 dark:text-indigo-300 max-w-xs mx-auto">
          Genera un QR code che il cliente può scansionare per pagare direttamente dal suo telefono
        </p>
      </div>

      {/* Total */}
      <div className="p-4 bg-theme-bg-secondary rounded-2xl">
        <div className="flex justify-between items-center">
          <span className="text-theme-text-secondary">Totale da pagare</span>
          <span className="text-2xl font-bold text-theme-text-primary">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* Benefits */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-theme-text-tertiary uppercase tracking-wide">
          Vantaggi
        </p>
        <ul className="space-y-1 text-sm text-theme-text-secondary">
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
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-lg bg-indigo-500 text-white hover:bg-indigo-600 disabled:opacity-50 transition-colors"
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
