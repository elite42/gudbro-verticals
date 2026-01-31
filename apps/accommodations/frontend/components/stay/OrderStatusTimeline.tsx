'use client';

import { Check, X as XIcon } from '@phosphor-icons/react';

const ORDER_STEPS = [
  { status: 'pending', label: 'Submitted' },
  { status: 'confirmed', label: 'Confirmed' },
  { status: 'preparing', label: 'Preparing' },
  { status: 'ready', label: 'Ready' },
  { status: 'delivered', label: 'Delivered' },
] as const;

interface OrderStatusTimelineProps {
  status: string;
  createdAt: string;
}

function getStepIndex(status: string): number {
  const idx = ORDER_STEPS.findIndex((s) => s.status === status);
  return idx >= 0 ? idx : 0;
}

function formatRelativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin} min ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${Math.floor(diffHr / 24)}d ago`;
}

export default function OrderStatusTimeline({ status, createdAt }: OrderStatusTimelineProps) {
  // Cancelled state
  if (status === 'cancelled') {
    return (
      <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2">
        <XIcon size={16} weight="bold" className="text-[#E07A5F]" />
        <span className="text-sm font-medium text-[#E07A5F]">Cancelled</span>
        <span className="ml-auto text-xs text-[#8B7355]">{formatRelativeTime(createdAt)}</span>
      </div>
    );
  }

  const currentIdx = getStepIndex(status);

  return (
    <div className="py-1">
      <div className="flex items-center justify-between">
        {ORDER_STEPS.map((step, i) => {
          const isCompleted = i < currentIdx;
          const isCurrent = i === currentIdx;
          const isFuture = i > currentIdx;

          return (
            <div key={step.status} className="flex flex-1 items-center">
              {/* Step dot */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-colors ${
                    isCompleted
                      ? 'bg-[#3D8B87] text-white'
                      : isCurrent
                        ? 'bg-[#3D8B87] text-white ring-2 ring-[#3D8B87]/30'
                        : 'bg-[#E8E2D9] text-[#8B7355]'
                  }`}
                >
                  {isCompleted ? <Check size={12} weight="bold" /> : i + 1}
                </div>
                <span
                  className={`mt-1 text-[9px] leading-tight ${
                    isFuture ? 'text-[#C4B9A8]' : 'font-medium text-[#2D2016]'
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {/* Connector line (except last) */}
              {i < ORDER_STEPS.length - 1 && (
                <div
                  className={`mx-0.5 h-0.5 flex-1 rounded ${
                    i < currentIdx ? 'bg-[#3D8B87]' : 'bg-[#E8E2D9]'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-1.5 text-right text-[10px] text-[#8B7355]">
        {formatRelativeTime(createdAt)}
      </p>
    </div>
  );
}
