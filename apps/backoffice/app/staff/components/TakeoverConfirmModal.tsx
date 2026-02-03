'use client';

interface TakeoverConfirmModalProps {
  isOpen: boolean;
  tableNumber: string;
  assignedToName: string;
  onThisRequestOnly: () => void;
  onTakeoverTable: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

/**
 * Modal shown when a staff member tries to acknowledge a request
 * for a table that's assigned to another staff member.
 *
 * Offers two choices:
 * 1. Handle just this request (table stays with original staff)
 * 2. Take over the table entirely
 */
export default function TakeoverConfirmModal({
  isOpen,
  tableNumber,
  assignedToName,
  onThisRequestOnly,
  onTakeoverTable,
  onCancel,
  isLoading,
}: TakeoverConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center">
      <div className="animate-slide-up w-full max-w-sm rounded-2xl bg-gray-800 shadow-xl">
        {/* Header */}
        <div className="border-b border-gray-700 p-4 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/20">
            <span className="text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold">Tavolo {tableNumber}</h3>
          <p className="mt-1 text-sm text-gray-400">
            Questo tavolo è assegnato a{' '}
            <span className="font-medium text-white">{assignedToName}</span>
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3 p-4">
          <button
            onClick={onThisRequestOnly}
            disabled={isLoading}
            className="flex w-full items-center gap-3 rounded-xl border border-gray-600 bg-gray-700 p-4 text-left transition-colors hover:bg-gray-600 disabled:opacity-50"
          >
            <span className="text-2xl">🙋</span>
            <div>
              <p className="font-medium">Solo questa richiesta</p>
              <p className="text-sm text-gray-400">
                Gestisci la richiesta, il tavolo resta a {assignedToName}
              </p>
            </div>
          </button>

          <button
            onClick={onTakeoverTable}
            disabled={isLoading}
            className="flex w-full items-center gap-3 rounded-xl border border-blue-500/30 bg-blue-500/10 p-4 text-left transition-colors hover:bg-blue-500/20 disabled:opacity-50"
          >
            <span className="text-2xl">📋</span>
            <div>
              <p className="font-medium text-blue-400">Prendi in carico il tavolo</p>
              <p className="text-sm text-gray-400">
                Diventa responsabile del tavolo per il resto del turno
              </p>
            </div>
          </button>
        </div>

        {/* Cancel */}
        <div className="border-t border-gray-700 p-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="w-full rounded-lg py-2 text-sm text-gray-400 hover:text-white disabled:opacity-50"
          >
            Annulla
          </button>
        </div>

        {/* Loading overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-800/80">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}
