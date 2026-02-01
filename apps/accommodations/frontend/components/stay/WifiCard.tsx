'use client';

import { useState, useCallback, useEffect } from 'react';
import {
  Bed,
  ForkKnife,
  SwimmingPool,
  Buildings,
  Tree,
  CloudSun,
  Laptop,
  WifiHigh,
  Eye,
  EyeSlash,
  CopySimple,
  Check,
  QrCode,
} from '@phosphor-icons/react';
import QRCodeLib from 'qrcode';
import { generateWiFiString } from '@shared/utils/qr/wifi';
import type { WifiInfo, WifiZoneInfo } from '@/types/stay';
import type { Icon as PhosphorIcon } from '@phosphor-icons/react';

// Zone icon mapping
const ZONE_ICONS: Record<string, PhosphorIcon> = {
  Bed,
  ForkKnife,
  SwimmingPool,
  Buildings,
  Tree,
  CloudSun,
  Laptop,
  WifiHigh,
};

function getZoneIcon(iconName: string): PhosphorIcon {
  return ZONE_ICONS[iconName] || WifiHigh;
}

/** Generate a QR code data URL for a WiFi network. */
function useWifiQR(ssid: string, password: string) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!ssid || !password) return;
    const wifiString = generateWiFiString({ ssid, password, security: 'WPA' });
    QRCodeLib.toDataURL(wifiString, {
      width: 256,
      margin: 2,
      errorCorrectionLevel: 'M',
      color: { dark: '#2D7A76', light: '#FFFFFF' },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(null));
  }, [ssid, password]);

  return qrDataUrl;
}

interface WifiCardProps {
  wifi: WifiInfo;
}

export default function WifiCard({ wifi }: WifiCardProps) {
  // Determine display mode
  const zones = wifi.zones;
  const hasZones = zones && zones.length > 0;
  const isMultiZone = zones && zones.length >= 2;

  // Legacy mode: no zones, use network/password
  if (!hasZones) {
    if (!wifi.network || !wifi.password) return null;
    return (
      <section className="px-4 py-3">
        <SingleNetworkCard ssid={wifi.network} password={wifi.password} />
      </section>
    );
  }

  // Single zone mode
  if (!isMultiZone) {
    const zone = zones[0];
    return (
      <section className="px-4 py-3">
        <SingleNetworkCard
          ssid={zone.ssid}
          password={zone.password}
          subtitle={zone.label !== 'Property WiFi' ? zone.label : undefined}
        />
      </section>
    );
  }

  // Multi-zone mode
  const roomZone = zones.find((z) => z.isRoomNetwork);
  const otherZones = zones.filter((z) => !z.isRoomNetwork);

  return (
    <section className="space-y-2 px-4 py-3">
      {/* Room network as highlighted gradient card */}
      {roomZone && (
        <SingleNetworkCard ssid={roomZone.ssid} password={roomZone.password} badge="Your Room" />
      )}

      {/* Other zones as compact rows */}
      {otherZones.length > 0 && (
        <div className="divide-y divide-zinc-100 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {otherZones.map((zone) => (
            <ZoneRow key={zone.zoneId} zone={zone} />
          ))}
        </div>
      )}

      {/* If no room zone, show all zones equally as compact rows */}
      {!roomZone && (
        <div className="divide-y divide-zinc-100 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
          {zones.map((zone) => (
            <ZoneRow key={zone.zoneId} zone={zone} />
          ))}
        </div>
      )}
    </section>
  );
}

// --- Sub-components ---

function SingleNetworkCard({
  ssid,
  password,
  subtitle,
  badge,
}: {
  ssid: string;
  password: string;
  subtitle?: string;
  badge?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const qrDataUrl = useWifiQR(ssid, password);

  const copyPassword = useCallback(() => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  return (
    <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#3D8B87] to-[#2D7A76]">
      <div className="flex items-center gap-3 p-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
          <WifiHigh size={20} weight="bold" className="text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-[10px] uppercase tracking-wider text-white/70">WiFi</p>
            {badge && (
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white">
                {badge}
              </span>
            )}
          </div>
          {subtitle && <p className="text-[11px] text-white/60">{subtitle}</p>}
          <div className="flex items-center gap-2">
            <span className="truncate font-semibold text-white">{ssid}</span>
            <span className="text-white/40">&bull;</span>
            <span className="font-mono text-sm text-white">{password}</span>
          </div>
        </div>
        <div className="flex flex-shrink-0 items-center gap-1.5">
          {qrDataUrl && (
            <button
              onClick={() => setShowQR(!showQR)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white transition-all hover:bg-white/30"
              aria-label={showQR ? 'Hide QR code' : 'Show QR code'}
            >
              <QrCode size={18} weight="bold" />
            </button>
          )}
          <button
            onClick={copyPassword}
            className="rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-white/30"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* QR Code expandable section */}
      {showQR && qrDataUrl && (
        <div className="flex justify-center border-t border-white/10 bg-white/10 px-3 py-3">
          <div className="overflow-hidden rounded-xl bg-white p-2 shadow-lg">
            <img src={qrDataUrl} alt="WiFi QR Code" className="h-32 w-32 rounded-lg" />
          </div>
        </div>
      )}
    </div>
  );
}

function ZoneRow({ zone }: { zone: WifiZoneInfo }) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const IconComponent = getZoneIcon(zone.icon);
  const qrDataUrl = useWifiQR(zone.ssid, zone.password);

  const copyPassword = useCallback(() => {
    navigator.clipboard.writeText(zone.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [zone.password]);

  return (
    <div>
      <div className="flex items-center gap-3 px-3 py-2.5">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-teal-50">
          <IconComponent size={18} weight="duotone" className="text-teal-700" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-zinc-500">{zone.label}</p>
          <div className="flex items-center gap-1.5">
            <span className="truncate text-sm font-semibold text-zinc-900">{zone.ssid}</span>
            <span className="text-zinc-300">&bull;</span>
            <span className="font-mono text-xs text-zinc-600">
              {showPassword ? zone.password : '••••••••'}
            </span>
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="ml-0.5 flex-shrink-0 p-0.5 text-zinc-400 hover:text-zinc-600"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeSlash size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {qrDataUrl && (
            <button
              onClick={() => setShowQR(!showQR)}
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-all hover:bg-zinc-200"
              aria-label={showQR ? 'Hide QR code' : 'Show QR code'}
            >
              <QrCode size={16} />
            </button>
          )}
          <button
            onClick={copyPassword}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-500 transition-all hover:bg-zinc-200"
            aria-label="Copy password"
          >
            {copied ? (
              <Check size={16} weight="bold" className="text-teal-600" />
            ) : (
              <CopySimple size={16} />
            )}
          </button>
        </div>
      </div>

      {/* QR Code expandable section */}
      {showQR && qrDataUrl && (
        <div className="flex justify-center border-t border-zinc-100 bg-zinc-50 px-3 py-3">
          <div className="overflow-hidden rounded-xl bg-white p-2 shadow-sm">
            <img
              src={qrDataUrl}
              alt={`WiFi QR for ${zone.label}`}
              className="h-28 w-28 rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
