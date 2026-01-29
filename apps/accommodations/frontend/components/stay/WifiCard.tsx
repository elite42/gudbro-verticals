'use client';

import { useState } from 'react';
import type { WifiInfo } from '@/types/stay';

interface WifiCardProps {
  wifi: WifiInfo;
}

export default function WifiCard({ wifi }: WifiCardProps) {
  const [copied, setCopied] = useState(false);

  if (!wifi.network || !wifi.password) return null;

  const copyPassword = () => {
    navigator.clipboard.writeText(wifi.password!);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="px-4 py-3">
      <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#3D8B87] to-[#2D7A76] p-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/20">
          <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3C7.03 3 2.89 5.67 1 9.5l1.83 1.83C4.48 8.5 7.98 6.5 12 6.5s7.52 2 9.17 4.83L23 9.5C21.11 5.67 16.97 3 12 3zm0 7c-2.76 0-5.19 1.45-6.55 3.63L7.28 15.5c.92-1.44 2.6-2.5 4.72-2.5s3.8 1.06 4.72 2.5l1.83-1.87C17.19 11.45 14.76 10 12 10zm0 5c-1.38 0-2.5 1.12-2.5 2.5S10.62 20 12 20s2.5-1.12 2.5-2.5S13.38 15 12 15z" />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[10px] uppercase tracking-wider text-white/70">WiFi</p>
          <div className="flex items-center gap-2">
            <span className="truncate font-semibold text-white">{wifi.network}</span>
            <span className="text-white/40">&bull;</span>
            <span className="font-mono text-sm text-white">{wifi.password}</span>
          </div>
        </div>
        <button
          onClick={copyPassword}
          className="flex-shrink-0 rounded-lg bg-white/20 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-white/30"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </section>
  );
}
