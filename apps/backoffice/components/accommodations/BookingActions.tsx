'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, SignIn, SignOut, SpinnerGap } from '@phosphor-icons/react';

interface BookingActionsProps {
  bookingId: string;
  currentStatus: string;
  onAction: (action: string, reason?: string) => Promise<void>;
  loading: boolean;
}

export default function BookingActions({
  bookingId: _bookingId,
  currentStatus,
  onAction,
  loading,
}: BookingActionsProps) {
  const [expandedAction, setExpandedAction] = useState<'decline' | 'cancel' | null>(null);
  const [reason, setReason] = useState('');

  const handleAction = async (action: string) => {
    if (action === 'decline' || action === 'cancel') {
      if (!expandedAction) {
        setExpandedAction(action);
        return;
      }
      // For decline, reason is required
      if (action === 'decline' && !reason.trim()) return;
      await onAction(action, reason.trim() || undefined);
      setExpandedAction(null);
      setReason('');
    } else {
      await onAction(action);
    }
  };

  const handleCancelExpand = () => {
    setExpandedAction(null);
    setReason('');
  };

  // Read-only statuses
  if (currentStatus === 'checked_out' || currentStatus === 'cancelled') {
    return (
      <p className="text-sm italic text-gray-500">
        No actions available for {currentStatus.replace(/_/g, ' ')} bookings.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {/* Pending / Pending payment */}
        {(currentStatus === 'pending' || currentStatus === 'pending_payment') && (
          <>
            <button
              onClick={() => handleAction('confirm')}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? (
                <SpinnerGap size={16} className="animate-spin" weight="bold" />
              ) : (
                <CheckCircle size={16} weight="bold" />
              )}
              Confirm
            </button>
            <button
              onClick={() => handleAction('decline')}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              <XCircle size={16} weight="bold" />
              Decline
            </button>
          </>
        )}

        {/* Confirmed */}
        {currentStatus === 'confirmed' && (
          <>
            <button
              onClick={() => handleAction('checkin')}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? (
                <SpinnerGap size={16} className="animate-spin" weight="bold" />
              ) : (
                <SignIn size={16} weight="bold" />
              )}
              Check In
            </button>
            <button
              onClick={() => handleAction('cancel')}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              <XCircle size={16} weight="bold" />
              Cancel
            </button>
          </>
        )}

        {/* Checked in */}
        {currentStatus === 'checked_in' && (
          <>
            <button
              onClick={() => handleAction('checkout')}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg bg-gray-600 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50"
            >
              {loading ? (
                <SpinnerGap size={16} className="animate-spin" weight="bold" />
              ) : (
                <SignOut size={16} weight="bold" />
              )}
              Check Out
            </button>
            <button
              onClick={() => handleAction('cancel')}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              <XCircle size={16} weight="bold" />
              Cancel
            </button>
          </>
        )}
      </div>

      {/* Expanded reason input for decline/cancel */}
      {expandedAction && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            {expandedAction === 'decline'
              ? 'Reason for declining (required)'
              : 'Reason for cancellation (optional)'}
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={
              expandedAction === 'decline'
                ? 'e.g. No availability for those dates...'
                : 'e.g. Guest requested cancellation...'
            }
            rows={2}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => handleAction(expandedAction)}
              disabled={loading || (expandedAction === 'decline' && !reason.trim())}
              className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
            >
              {loading
                ? 'Processing...'
                : `Confirm ${expandedAction === 'decline' ? 'Decline' : 'Cancellation'}`}
            </button>
            <button
              onClick={handleCancelExpand}
              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
