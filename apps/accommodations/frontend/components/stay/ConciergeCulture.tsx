'use client';

import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  DeviceMobileCamera,
  AppleLogo,
  GooglePlayLogo,
} from '@phosphor-icons/react';
import { getConciergeData } from '@/lib/concierge-data';

interface ConciergeCultureProps {
  country: string;
  city?: string;
  onBack: () => void;
}

export default function ConciergeCulture({ country, city, onBack }: ConciergeCultureProps) {
  const data = getConciergeData(country);

  const dos = data?.culture.filter((c) => c.category === 'do') ?? [];
  const donts = data?.culture.filter((c) => c.category === 'dont') ?? [];
  const apps = data?.apps ?? [];

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
          <h2 className="text-base font-semibold text-[#2D2016]">Culture & Tips</h2>
          {city && <p className="text-xs text-[#8B7355]">{city}</p>}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-5">
          {/* Do's */}
          {dos.length > 0 && (
            <section>
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle size={16} weight="fill" className="text-emerald-600" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                  Do&apos;s
                </h3>
              </div>
              <div className="rounded-2xl border border-emerald-100 bg-white shadow-sm">
                {dos.map((tip, i) => (
                  <div
                    key={tip.id}
                    className={`flex items-start gap-3 px-4 py-3 ${i < dos.length - 1 ? 'border-b border-[#E8E2D9]' : ''}`}
                  >
                    <CheckCircle
                      size={16}
                      weight="fill"
                      className="mt-0.5 shrink-0 text-emerald-500"
                    />
                    <div>
                      <p className="text-sm font-medium text-[#2D2016]">{tip.title}</p>
                      <p className="mt-0.5 text-xs text-[#8B7355]">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Don'ts */}
          {donts.length > 0 && (
            <section>
              <div className="mb-2 flex items-center gap-2">
                <XCircle size={16} weight="fill" className="text-red-500" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-red-500">
                  Don&apos;ts
                </h3>
              </div>
              <div className="rounded-2xl border border-red-100 bg-white shadow-sm">
                {donts.map((tip, i) => (
                  <div
                    key={tip.id}
                    className={`flex items-start gap-3 px-4 py-3 ${i < donts.length - 1 ? 'border-b border-[#E8E2D9]' : ''}`}
                  >
                    <XCircle size={16} weight="fill" className="mt-0.5 shrink-0 text-red-400" />
                    <div>
                      <p className="text-sm font-medium text-[#2D2016]">{tip.title}</p>
                      <p className="mt-0.5 text-xs text-[#8B7355]">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Recommended Apps */}
          {apps.length > 0 && (
            <section>
              <div className="mb-2 flex items-center gap-2">
                <DeviceMobileCamera size={16} weight="bold" className="text-[#8B7355]" />
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8B7355]">
                  Recommended Apps
                </h3>
              </div>
              <div className="flex flex-col gap-2">
                {apps.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center gap-3 rounded-2xl border border-[#E8E2D9] bg-white px-4 py-3 shadow-sm"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-[#2D2016]">{app.name}</p>
                      <p className="mt-0.5 text-xs text-[#8B7355]">{app.description}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      {(app.platform === 'ios' || app.platform === 'both') && (
                        <span className="flex items-center gap-0.5 rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                          <AppleLogo size={10} weight="fill" />
                          iOS
                        </span>
                      )}
                      {(app.platform === 'android' || app.platform === 'both') && (
                        <span className="flex items-center gap-0.5 rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">
                          <GooglePlayLogo size={10} weight="fill" />
                          Android
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
