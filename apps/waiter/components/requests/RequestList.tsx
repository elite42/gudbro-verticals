'use client';

/**
 * Request List Component
 *
 * Displays a list of customer requests grouped by status.
 */

import { AnimatePresence } from 'framer-motion';
import { RequestCard } from './RequestCard';
import { Bell, CheckCircle } from '@phosphor-icons/react';
import type { CustomerRequest } from '@/lib/stores/requests-store';

interface RequestListProps {
  requests: CustomerRequest[];
  onAcknowledge?: (id: string) => Promise<void>;
  onComplete?: (id: string) => Promise<void>;
  onPress?: (request: CustomerRequest) => void;
  emptyMessage?: string;
  showCompleted?: boolean;
}

export function RequestList({
  requests,
  onAcknowledge,
  onComplete,
  onPress,
  emptyMessage = 'Nessuna richiesta',
  showCompleted = false,
}: RequestListProps) {
  const pendingRequests = requests.filter(r => r.status === 'pending');
  const acknowledgedRequests = requests.filter(r => r.status === 'acknowledged' || r.status === 'in_progress');
  const completedRequests = requests.filter(r => r.status === 'completed');

  const hasRequests = pendingRequests.length > 0 || acknowledgedRequests.length > 0 || (showCompleted && completedRequests.length > 0);

  if (!hasRequests) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 mb-4 bg-theme-bg-tertiary rounded-full flex items-center justify-center">
          <Bell size={40} weight="duotone" className="text-theme-text-tertiary" />
        </div>
        <h3 className="text-lg font-semibold text-theme-text-primary">Nessuna richiesta</h3>
        <p className="text-theme-text-secondary mt-1 max-w-xs">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pending requests */}
      {pendingRequests.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <h3 className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wide">
              In attesa ({pendingRequests.length})
            </h3>
          </div>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {pendingRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onAcknowledge={onAcknowledge}
                  onComplete={onComplete}
                  onPress={onPress}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Acknowledged requests */}
      {acknowledgedRequests.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <h3 className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wide">
              In gestione ({acknowledgedRequests.length})
            </h3>
          </div>
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {acknowledgedRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onComplete={onComplete}
                  onPress={onPress}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Completed requests (optional) */}
      {showCompleted && completedRequests.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle size={16} weight="bold" className="text-green-500" />
            <h3 className="text-sm font-semibold text-theme-text-secondary uppercase tracking-wide">
              Completate ({completedRequests.length})
            </h3>
          </div>
          <div className="space-y-3 opacity-60">
            <AnimatePresence mode="popLayout">
              {completedRequests.slice(0, 5).map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  onPress={onPress}
                />
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}
    </div>
  );
}
