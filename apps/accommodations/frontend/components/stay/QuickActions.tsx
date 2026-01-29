'use client';

import type { QuickAction } from '@/types/stay';

/** Default quick actions when property doesn't define custom ones */
const DEFAULT_ACTIONS: QuickAction[] = [
  {
    id: 'room-service',
    name: 'Room Service',
    icon: 'room-service',
    whatsappMessage: 'Room Service request',
  },
  {
    id: 'concierge',
    name: 'Concierge',
    icon: 'concierge',
    whatsappMessage: 'Concierge request',
  },
  {
    id: 'housekeeping',
    name: 'Housekeeping',
    icon: 'housekeeping',
    whatsappMessage: 'Housekeeping request',
  },
  {
    id: 'report',
    name: 'Report Issue',
    icon: 'report',
    whatsappMessage: 'I would like to report an issue',
  },
];

/** Map icon id to emoji for display */
const ICON_MAP: Record<string, { emoji: string; bg: string }> = {
  'room-service': { emoji: '🛎️', bg: 'bg-[#E07A5F]/10' },
  concierge: { emoji: '💁', bg: 'bg-[#3D8B87]/10' },
  housekeeping: { emoji: '🧹', bg: 'bg-amber-500/10' },
  report: { emoji: '⚠️', bg: 'bg-red-50' },
};

interface QuickActionsProps {
  actions?: QuickAction[];
  phone: string;
  roomNumber: string;
  propertyName: string;
}

export default function QuickActions({
  actions,
  phone,
  roomNumber,
  propertyName,
}: QuickActionsProps) {
  const displayActions = actions && actions.length > 0 ? actions : DEFAULT_ACTIONS;

  // Clean phone number for WhatsApp (remove spaces, dashes, leading +)
  const cleanPhone = phone.replace(/[\s\-+]/g, '');

  const buildWhatsAppUrl = (action: QuickAction) => {
    const message = `${action.whatsappMessage} - Room ${roomNumber}, ${propertyName}`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="mb-5 px-4">
      <div className="grid grid-cols-4 gap-2">
        {displayActions.map((action) => {
          const iconInfo = ICON_MAP[action.icon] || { emoji: '📋', bg: 'bg-gray-100' };

          return (
            <a
              key={action.id}
              href={buildWhatsAppUrl(action)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 rounded-xl border border-[#E8E2D9] bg-white p-3 shadow-sm transition-all hover:shadow-md active:scale-95"
            >
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${iconInfo.bg}`}
              >
                {iconInfo.emoji}
              </div>
              <span className="text-center text-[10px] font-medium leading-tight text-[#2D2016]">
                {action.name}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
