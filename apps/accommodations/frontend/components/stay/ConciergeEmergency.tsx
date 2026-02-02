'use client';

import { ArrowLeft, Phone, Buildings, Headset } from '@phosphor-icons/react';
import { getConciergeData, type EmergencyContact } from '@/lib/concierge-data';

interface ConciergeEmergencyProps {
  country: string;
  city?: string;
  onBack: () => void;
}

export default function ConciergeEmergency({ country, city, onBack }: ConciergeEmergencyProps) {
  const data = getConciergeData(country);

  const emergencyNumbers = data?.emergency.filter((c) => c.type === 'emergency') ?? [];
  const hotlines = data?.emergency.filter((c) => c.type === 'hotline') ?? [];
  const embassies = data?.emergency.filter((c) => c.type === 'embassy') ?? [];

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#FAF8F5]">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-[#E8E2D9] bg-white px-4 py-3">
        <button
          onClick={onBack}
          className="rounded-full p-1.5 transition-colors hover:bg-[#F5F0EB]"
        >
          <ArrowLeft size={20} weight="bold" className="text-[#2D2016]" />
        </button>
        <div>
          <h2 className="text-base font-semibold text-[#2D2016]">Emergency Contacts</h2>
          {city && <p className="text-xs text-[#8B7355]">{city}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-5">
          {/* Emergency Numbers */}
          {emergencyNumbers.length > 0 && (
            <section>
              <div className="mb-2 flex items-center gap-2">
                <Phone size={16} weight="bold" className="text-red-600" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-red-600">
                  Emergency Numbers
                </h3>
              </div>
              <div className="rounded-2xl border border-red-100 bg-white shadow-sm">
                {emergencyNumbers.map((contact, i) => (
                  <EmergencyRow
                    key={contact.id}
                    contact={contact}
                    color="red"
                    isLast={i === emergencyNumbers.length - 1}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Tourist Hotlines */}
          {hotlines.length > 0 && (
            <section>
              <div className="mb-2 flex items-center gap-2">
                <Headset size={16} weight="bold" className="text-amber-600" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-600">
                  Tourist Hotlines
                </h3>
              </div>
              <div className="rounded-2xl border border-amber-100 bg-white shadow-sm">
                {hotlines.map((contact, i) => (
                  <EmergencyRow
                    key={contact.id}
                    contact={contact}
                    color="amber"
                    isLast={i === hotlines.length - 1}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Embassies */}
          {embassies.length > 0 && (
            <section>
              <div className="mb-2 flex items-center gap-2">
                <Buildings size={16} weight="bold" className="text-blue-600" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Embassies & Consulates
                </h3>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-white shadow-sm">
                {embassies.map((contact, i) => (
                  <EmergencyRow
                    key={contact.id}
                    contact={contact}
                    color="blue"
                    isLast={i === embassies.length - 1}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Emergency row with click-to-call
// ---------------------------------------------------------------------------

const COLOR_MAP = {
  red: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    hover: 'hover:bg-red-100',
  },
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    hover: 'hover:bg-amber-100',
  },
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-100',
  },
};

function EmergencyRow({
  contact,
  color,
  isLast,
}: {
  contact: EmergencyContact;
  color: 'red' | 'amber' | 'blue';
  isLast: boolean;
}) {
  const colors = COLOR_MAP[color];

  return (
    <div
      className={`flex items-center justify-between px-4 py-3 ${!isLast ? 'border-b border-[#E8E2D9]' : ''}`}
    >
      <div className="min-w-0 flex-1 pr-3">
        <p className="truncate text-sm font-medium text-[#2D2016]">{contact.name}</p>
        {contact.note && <p className="text-[11px] text-[#8B7355]">{contact.note}</p>}
      </div>
      <a
        href={`tel:${contact.number.replace(/\s/g, '')}`}
        className={`flex items-center gap-1.5 rounded-xl ${colors.bg} ${colors.hover} px-3 py-1.5 transition-colors`}
      >
        <Phone size={14} weight="bold" className={colors.text} />
        <span className={`text-sm font-semibold ${colors.text} whitespace-nowrap`}>
          {contact.number}
        </span>
      </a>
    </div>
  );
}
