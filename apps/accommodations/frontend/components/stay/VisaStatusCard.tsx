'use client';

import { differenceInCalendarDays } from 'date-fns';

/** Visa exemption days for common nationalities in Vietnam */
const VISA_EXEMPTIONS: Record<string, number> = {
  US: 45,
  GB: 45,
  DE: 45,
  FR: 45,
  IT: 45,
  ES: 45,
  JP: 45,
  KR: 45,
  AU: 45,
  SE: 45,
  NO: 45,
  DK: 45,
  FI: 45,
  BY: 15,
  RU: 15,
};

const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  GB: 'United Kingdom',
  DE: 'Germany',
  FR: 'France',
  IT: 'Italy',
  ES: 'Spain',
  JP: 'Japan',
  KR: 'South Korea',
  AU: 'Australia',
  SE: 'Sweden',
  NO: 'Norway',
  DK: 'Denmark',
  FI: 'Finland',
  BY: 'Belarus',
  RU: 'Russia',
};

interface VisaStatusCardProps {
  guestCountry: string;
  checkInDate: string;
  /** When provided, uses the actual uploaded visa expiry instead of estimated visa-free exemption. */
  uploadedVisaExpiry?: string | null;
}

export default function VisaStatusCard({
  guestCountry,
  checkInDate,
  uploadedVisaExpiry,
}: VisaStatusCardProps) {
  const exemptionDays = VISA_EXEMPTIONS[guestCountry];
  const countryName = COUNTRY_NAMES[guestCountry] || guestCountry;
  const today = new Date();
  const entryDate = new Date(checkInDate);

  // If guest uploaded an actual visa, use that expiry date
  if (uploadedVisaExpiry) {
    const expiryDate = new Date(uploadedVisaExpiry);
    const totalDays = Math.max(1, differenceInCalendarDays(expiryDate, entryDate));
    const daysRemaining = differenceInCalendarDays(expiryDate, today);
    const percentage = Math.min(100, Math.max(0, (daysRemaining / totalDays) * 100));

    return (
      <section className="mb-4 px-4">
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛂</span>
              <span className="font-semibold text-[#2D2016]">Visa Status</span>
            </div>
            <span className="rounded-full bg-[#3D8B87]/10 px-2 py-0.5 text-[10px] font-semibold text-[#3D8B87]">
              Uploaded
            </span>
          </div>

          <p className="mb-3 text-xs text-[#8B7355]">
            Visa expires:{' '}
            {expiryDate.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>

          <div className="mb-2 flex items-center gap-3">
            <div className="flex-1">
              <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full transition-all ${
                    daysRemaining > 14
                      ? 'bg-emerald-500'
                      : daysRemaining > 7
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            <span
              className={`min-w-[40px] text-right text-sm font-bold ${
                daysRemaining > 14
                  ? 'text-emerald-600'
                  : daysRemaining > 7
                    ? 'text-amber-600'
                    : 'text-red-600'
              }`}
            >
              {daysRemaining > 0 ? `${daysRemaining}d` : 'Expired'}
            </span>
          </div>

          {daysRemaining <= 7 && daysRemaining > 0 && (
            <p className="text-xs text-amber-600">
              Consider extending your visa. Overstay penalty: ~$25/day.
            </p>
          )}
        </div>
      </section>
    );
  }

  // If country has exemption, calculate days remaining (estimated)
  if (exemptionDays) {
    const expiryDate = new Date(entryDate);
    expiryDate.setDate(expiryDate.getDate() + exemptionDays);
    const daysRemaining = differenceInCalendarDays(expiryDate, today);
    const percentage = Math.min(100, Math.max(0, (daysRemaining / exemptionDays) * 100));

    return (
      <section className="mb-4 px-4">
        <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">🛂</span>
              <span className="font-semibold text-[#2D2016]">Visa Status</span>
            </div>
            <span className="rounded-full bg-[#3D8B87]/10 px-2 py-0.5 text-[10px] font-semibold text-[#3D8B87]">
              Visa-free
            </span>
          </div>

          <p className="mb-3 text-xs text-[#8B7355]">
            {countryName} citizens: {exemptionDays}-day visa exemption
          </p>

          <div className="mb-2 flex items-center gap-3">
            <div className="flex-1">
              <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full rounded-full transition-all ${
                    daysRemaining > 14
                      ? 'bg-emerald-500'
                      : daysRemaining > 7
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
            <span
              className={`min-w-[40px] text-right text-sm font-bold ${
                daysRemaining > 14
                  ? 'text-emerald-600'
                  : daysRemaining > 7
                    ? 'text-amber-600'
                    : 'text-red-600'
              }`}
            >
              {daysRemaining > 0 ? `${daysRemaining}d` : 'Expired'}
            </span>
          </div>

          {daysRemaining <= 7 && daysRemaining > 0 && (
            <p className="text-xs text-amber-600">
              Consider extending your visa. Overstay penalty: ~$25/day.
            </p>
          )}
        </div>
      </section>
    );
  }

  // Country not in lookup — show general info
  return (
    <section className="mb-4 px-4">
      <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          <span className="text-lg">🛂</span>
          <span className="font-semibold text-[#2D2016]">Visa Information</span>
        </div>
        <p className="mb-3 text-sm text-[#8B7355]">
          Check visa requirements for your nationality at the official portal.
        </p>
        <a
          href="https://evisa.xuatnhapcanh.gov.vn"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-[#3D8B87]/10 px-3 py-2 text-sm font-medium text-[#3D8B87] transition-colors hover:bg-[#3D8B87]/20"
        >
          <span>🌐</span>
          Vietnam E-Visa Portal
        </a>
      </div>
    </section>
  );
}
