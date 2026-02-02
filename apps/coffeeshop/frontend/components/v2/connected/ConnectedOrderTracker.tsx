'use client';

/**
 * ConnectedOrderTracker
 *
 * Connected component che integra OrderTracker e OrderETA
 * con gli hooks per il tracking real-time.
 */

import { OrderTracker } from '../OrderTracker';
import { OrderETA } from '../OrderETA';
import { useOrderTracking } from '@/hooks/useOrderTracking';
import { useOrderETA } from '@/hooks/useOrderETA';

interface ConnectedOrderTrackerProps {
  /** Order ID to track */
  orderId: string;
  /** Order code for display */
  orderCode?: string;
  /** Show ETA component */
  showETA?: boolean;
  /** Compact mode (inline display) */
  compact?: boolean;
}

export function ConnectedOrderTracker({
  orderId,
  orderCode,
  showETA = true,
  compact = false,
}: ConnectedOrderTrackerProps) {
  const {
    status,
    isLoading: statusLoading,
    progress,
    statusLabel,
    isActive,
  } = useOrderTracking(orderId);

  const {
    eta,
    isLoading: etaLoading,
    formattedTime,
    confidenceColor,
    refresh: refreshETA,
  } = useOrderETA(orderId, {
    // Only poll ETA if order is still active
    enabled: isActive,
  });

  if (compact) {
    return (
      <div className="space-y-2">
        <OrderTracker
          status={status}
          progress={progress}
          statusLabel={statusLabel}
          isLoading={statusLoading}
          compact
          orderCode={orderCode}
        />
        {showETA && isActive && (
          <OrderETA
            eta={eta}
            isLoading={etaLoading}
            formattedTime={formattedTime}
            confidenceColor={confidenceColor}
            compact
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <OrderTracker
        status={status}
        progress={progress}
        statusLabel={statusLabel}
        isLoading={statusLoading}
        orderCode={orderCode}
      />
      {showETA && isActive && (
        <OrderETA
          eta={eta}
          isLoading={etaLoading}
          formattedTime={formattedTime}
          confidenceColor={confidenceColor}
          onRefresh={refreshETA}
        />
      )}
    </div>
  );
}

export default ConnectedOrderTracker;
