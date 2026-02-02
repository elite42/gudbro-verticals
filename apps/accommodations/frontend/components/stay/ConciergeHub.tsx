'use client';

import { useEffect, useState } from 'react';
import {
  X,
  MapPin,
  Phone,
  ShieldCheck,
  Globe,
  Bus,
  WifiHigh,
  IdentificationCard,
  ChatDots,
  CallBell,
  SpinnerGap,
  PhoneList,
} from '@phosphor-icons/react';
import type { ConciergeSection, ConciergeSections } from '@/types/stay';
import { DEFAULT_CONCIERGE_SECTIONS } from '@/types/stay';
import { getConciergeData, type CountryConciergeData } from '@/lib/concierge-data';
import ConciergeDiscover from '@/components/stay/ConciergeDiscover';
import ConciergeEmergency from './ConciergeEmergency';
import ConciergeSafety from './ConciergeSafety';
import ConciergeCulture from './ConciergeCulture';
import ConciergeTransport from './ConciergeTransport';
import UsefulNumbersPage from './UsefulNumbersPage';

interface ConciergeHubProps {
  bookingCode: string;
  token: string;
  onClose: () => void;
  onOpenServices: () => void;
}

interface SectionCardConfig {
  id: ConciergeSection;
  label: string;
  description: string;
  Icon: typeof MapPin;
  color: string;
  bgColor: string;
  getCount?: (data: CountryConciergeData) => number;
}

const SECTION_CARDS: SectionCardConfig[] = [
  {
    id: 'discover',
    label: 'Discover',
    description: 'Places of interest nearby',
    Icon: MapPin,
    color: '#D97706',
    bgColor: 'bg-amber-50',
  },
  {
    id: 'emergency',
    label: 'Emergency',
    description: 'Emergency numbers & embassies',
    Icon: Phone,
    color: '#DC2626',
    bgColor: 'bg-red-50',
    getCount: (data) => data.emergency.length,
  },
  {
    id: 'safety',
    label: 'Safety Tips',
    description: 'Scam alerts & practical advice',
    Icon: ShieldCheck,
    color: '#059669',
    bgColor: 'bg-emerald-50',
    getCount: (data) => data.safety.reduce((sum, cat) => sum + cat.tips.length, 0),
  },
  {
    id: 'culture',
    label: 'Culture',
    description: 'Local customs & etiquette',
    Icon: Globe,
    color: '#7C3AED',
    bgColor: 'bg-purple-50',
    getCount: (data) => data.culture.length,
  },
  {
    id: 'transport',
    label: 'Transport',
    description: 'How to get around safely',
    Icon: Bus,
    color: '#2563EB',
    bgColor: 'bg-blue-50',
    getCount: (data) => data.transport.length,
  },
];

export default function ConciergeHub({
  bookingCode,
  token,
  onClose,
  onOpenServices,
}: ConciergeHubProps) {
  const [sections, setSections] = useState<ConciergeSections>(DEFAULT_CONCIERGE_SECTIONS);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<ConciergeSection | 'useful-numbers' | null>(
    null
  );

  // Fetch concierge config on mount
  useEffect(() => {
    let cancelled = false;

    async function loadConfig() {
      try {
        const res = await fetch(`/api/stay/${bookingCode}/concierge`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to load concierge config');
        const json = await res.json();
        if (cancelled) return;
        if (json.data) {
          setSections(json.data.sections);
          setCity(json.data.city);
          setCountry(json.data.country);
        }
      } catch (err) {
        console.error('ConciergeHub: failed to load config', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadConfig();
    return () => {
      cancelled = true;
    };
  }, [bookingCode, token]);

  const conciergeData = getConciergeData(country);

  // Visible sections based on merchant toggles
  const visibleCards = SECTION_CARDS.filter((card) => sections[card.id]);

  const handleBack = () => setActiveSection(null);

  // ---------------------------------------------------------------------------
  // Render active sub-view
  // ---------------------------------------------------------------------------
  if (activeSection) {
    switch (activeSection) {
      case 'discover':
        return (
          <div className="fixed inset-0 z-[60] flex flex-col bg-[#FAF8F5]">
            <div className="flex-1 overflow-y-auto">
              <ConciergeDiscover country={country} onBack={handleBack} />
            </div>
          </div>
        );
      case 'emergency':
        return <ConciergeEmergency country={country} city={city} onBack={handleBack} />;
      case 'safety':
        return <ConciergeSafety country={country} city={city} onBack={handleBack} />;
      case 'culture':
        return <ConciergeCulture country={country} city={city} onBack={handleBack} />;
      case 'transport':
        return <ConciergeTransport country={country} city={city} onBack={handleBack} />;
      case 'useful-numbers':
        return <UsefulNumbersPage bookingCode={bookingCode} token={token} onBack={handleBack} />;
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-[#FAF8F5]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E8E2D9] bg-white px-4 py-3">
        <div>
          <h2 className="text-lg font-semibold text-[#2D2016]">Concierge</h2>
          {city && <p className="text-xs text-[#8B7355]">{city}</p>}
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1.5 transition-colors hover:bg-[#F5F0EB]"
        >
          <X size={20} weight="bold" className="text-[#2D2016]" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <SpinnerGap size={28} className="animate-spin text-[#8B7355]" />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Section cards */}
            <div className="grid grid-cols-2 gap-3">
              {visibleCards.map((card) => {
                const count = conciergeData && card.getCount ? card.getCount(conciergeData) : null;
                return (
                  <button
                    key={card.id}
                    onClick={() => setActiveSection(card.id)}
                    className={`flex flex-col items-start rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm transition-all active:scale-[0.98]`}
                  >
                    <div
                      className={`mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${card.bgColor}`}
                    >
                      <card.Icon size={22} weight="duotone" style={{ color: card.color }} />
                    </div>
                    <span className="text-sm font-semibold text-[#2D2016]">{card.label}</span>
                    <span className="mt-0.5 text-left text-[11px] leading-tight text-[#8B7355]">
                      {card.description}
                    </span>
                    {count !== null && (
                      <span
                        className="mt-1.5 rounded-full px-2 py-0.5 text-[10px] font-medium"
                        style={{ backgroundColor: `${card.color}15`, color: card.color }}
                      >
                        {count} {count === 1 ? 'item' : 'items'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Useful Numbers card */}
            <button
              onClick={() => setActiveSection('useful-numbers')}
              className="flex items-center gap-3 rounded-2xl border border-[#E8E2D9] bg-white px-4 py-3 shadow-sm transition-all active:scale-[0.98]"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50">
                <PhoneList size={22} weight="duotone" style={{ color: '#0D9488' }} />
              </div>
              <div className="text-left">
                <span className="text-sm font-semibold text-[#2D2016]">Useful Numbers</span>
                <span className="mt-0.5 block text-[11px] leading-tight text-[#8B7355]">
                  Emergency, city services & property contacts
                </span>
              </div>
            </button>

            {/* Quick links */}
            <div className="mt-2">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#8B7355]">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <QuickLink
                  icon={WifiHigh}
                  label="WiFi"
                  onClick={() => {
                    onClose();
                    setTimeout(() => {
                      document
                        .getElementById('wifi-section')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                />
                <QuickLink
                  icon={IdentificationCard}
                  label="Documents"
                  onClick={() => {
                    onClose();
                    setTimeout(() => {
                      document
                        .getElementById('documents-section')
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                  }}
                />
                <QuickLink icon={ChatDots} label="Contact Host" onClick={onClose} />
                <QuickLink icon={CallBell} label="Room Service" onClick={onOpenServices} />
              </div>
            </div>

            {/* Disclaimer */}
            {conciergeData?.disclaimer && (
              <div className="mt-2 rounded-xl bg-[#F5F0EB] px-4 py-3">
                <p className="text-xs leading-relaxed text-[#8B7355]">{conciergeData.disclaimer}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Quick link button
// ---------------------------------------------------------------------------

function QuickLink({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof WifiHigh;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-xl border border-[#E8E2D9] bg-white px-3 py-2.5 transition-all active:scale-[0.98]"
    >
      <Icon size={18} weight="duotone" className="text-[#8B7355]" />
      <span className="text-xs font-medium text-[#2D2016]">{label}</span>
    </button>
  );
}
