'use client';

import { useState, useCallback } from 'react';
import { ForkKnife, Copy, ArrowSquareOut, Check } from '@phosphor-icons/react';
import { getDeliveryApps } from '@/lib/delivery-apps-data';
import type { DeliveryApp } from '@/lib/delivery-apps-data';

interface DeliveryAppsSectionProps {
  countryCode: string;
  propertyAddress: string;
  propertyCity?: string;
}

/**
 * Delivery Apps Section — shows branded cards for local food delivery platforms.
 *
 * Phase 38: Guest Lifecycle
 *
 * Renders country-appropriate delivery app cards with universal deep-links
 * and a copyable property address for guest convenience.
 * Returns null when no apps are configured for the country (self-hides).
 */
export default function DeliveryAppsSection({
  countryCode,
  propertyAddress,
  propertyCity,
}: DeliveryAppsSectionProps) {
  const apps = getDeliveryApps(countryCode);
  const [copied, setCopied] = useState(false);

  const fullAddress = propertyCity ? `${propertyAddress}, ${propertyCity}` : propertyAddress;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = fullAddress;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [fullAddress]);

  // Self-hide when no apps available for this country
  if (apps.length === 0) return null;

  return (
    <div>
      {/* Section header */}
      <div className="mb-3 flex items-center gap-2">
        <ForkKnife size={20} weight="duotone" className="text-[#E07A5F]" />
        <div>
          <h3 className="text-sm font-semibold text-[#2D2016]">Order Food Delivery</h3>
          <p className="text-[11px] text-[#8B7355]">Get food delivered to your accommodation</p>
        </div>
      </div>

      {/* Copyable address card */}
      <button
        type="button"
        onClick={handleCopy}
        className="mb-3 flex w-full items-center gap-3 rounded-xl bg-[#FAF8F5] px-3 py-2.5 text-left transition-colors active:bg-[#F0EBE3]"
      >
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-medium uppercase tracking-wide text-[#8B7355]">
            Your address
          </p>
          <p className="mt-0.5 truncate text-xs text-[#2D2016]">{fullAddress}</p>
        </div>
        <div className="flex flex-shrink-0 items-center gap-1 rounded-lg bg-white px-2 py-1 shadow-sm">
          {copied ? (
            <>
              <Check size={14} weight="bold" className="text-emerald-600" />
              <span className="text-[10px] font-medium text-emerald-600">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} weight="regular" className="text-[#8B7355]" />
              <span className="text-[10px] font-medium text-[#8B7355]">Copy</span>
            </>
          )}
        </div>
      </button>

      {/* Delivery app cards grid */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {apps.map((app: DeliveryApp) => (
          <a
            key={app.id}
            href={app.universalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl border border-[#E8E2D9] bg-white px-3 py-3 shadow-sm transition-transform active:scale-[0.98]"
            style={{ borderLeftWidth: '3px', borderLeftColor: app.color }}
          >
            <span className="text-xl" role="img" aria-label={app.name}>
              {app.iconEmoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#2D2016]">{app.name}</p>
              <p className="text-[11px] text-[#8B7355]">{app.description}</p>
            </div>
            <ArrowSquareOut size={18} weight="regular" className="flex-shrink-0 text-[#8B7355]" />
          </a>
        ))}
      </div>

      {/* Tip text */}
      <p className="mt-2 text-center text-[10px] text-[#8B7355]/70">
        Tip: Copy your address above, then paste it in the app
      </p>
    </div>
  );
}
