'use client';

import { useState, useEffect } from 'react';
import { passes } from '@/config/gym.config';
import { formatVNDPrice } from '@/lib/currency';

interface DayPassDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const STORAGE_KEY = 'gudbro-gym-daypass-form';

const quickPasses = passes.filter((p) => ['day', 'week', '10entry'].includes(p.id));

export default function DayPassDrawer({ isOpen, onClose }: DayPassDrawerProps) {
  const [selectedPass, setSelectedPass] = useState('day');
  const [showConvention, setShowConvention] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // Restore from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.selectedPass) setSelectedPass(parsed.selectedPass);
        if (parsed.showConvention) setShowConvention(parsed.showConvention);
      }
    } catch {
      /* ignore */
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedPass, showConvention }));
    } catch {
      /* ignore */
    }
  }, [selectedPass, showConvention]);

  if (!isOpen) return null;

  const currentPass = quickPasses.find((p) => p.id === selectedPass) || quickPasses[0];
  const price = showConvention ? currentPass.conventionPrice : currentPass.price;

  const whatsappMsg = encodeURIComponent(
    `Hi! I'd like to purchase a ${currentPass.name} for ${selectedDate}. ${showConvention ? '(Convention rate)' : ''}`
  );
  const zaloMsg = encodeURIComponent(
    `Xin chào! Tôi muốn mua ${currentPass.name} cho ngày ${selectedDate}.`
  );

  return (
    <>
      {/* Backdrop */}
      <div className="overlay-backdrop fixed inset-0 z-[60]" onClick={onClose} />

      {/* Drawer */}
      <div className="animate-slide-up pb-safe fixed bottom-0 left-0 right-0 z-[70] max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white shadow-2xl">
        {/* Handle */}
        <div className="flex justify-center pb-2 pt-3">
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        <div className="px-5 pb-6">
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold" style={{ color: 'var(--navy)' }}>
              Quick Day Pass
            </h2>
            <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Pass Type Selector */}
          <div className="mb-4 flex gap-2">
            {quickPasses.map((pass) => (
              <button
                key={pass.id}
                onClick={() => setSelectedPass(pass.id)}
                className="flex-1 rounded-xl border-2 px-3 py-2.5 text-sm font-medium transition-all"
                style={{
                  borderColor: selectedPass === pass.id ? 'var(--orange)' : 'var(--cloud-dark)',
                  background: selectedPass === pass.id ? 'var(--orange-light)' : 'white',
                  color: selectedPass === pass.id ? 'var(--orange-dark)' : 'var(--charcoal-light)',
                }}
              >
                {pass.shortName}
              </button>
            ))}
          </div>

          {/* Price Display */}
          <div className="mb-4 rounded-2xl bg-gradient-to-br from-[var(--navy)] to-[#2a3f6e] p-4 text-white">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm opacity-80">{currentPass.name}</span>
              <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                {currentPass.duration}
              </span>
            </div>
            <div className="flex items-end gap-2">
              <span className="font-display text-3xl font-bold">{formatVNDPrice(price)}</span>
              {showConvention && (
                <span className="mb-1 text-sm line-through opacity-50">
                  {formatVNDPrice(currentPass.price)}
                </span>
              )}
            </div>
            {currentPass.entries && (
              <p className="mt-1 text-xs opacity-70">{currentPass.entries} entries, no expiry</p>
            )}
          </div>

          {/* Convention Toggle */}
          <button
            onClick={() => setShowConvention(!showConvention)}
            className="mb-4 flex w-full items-center justify-between rounded-xl border p-3"
            style={{
              borderColor: showConvention ? 'var(--orange)' : 'var(--cloud-dark)',
              background: showConvention ? 'var(--orange-light)' : 'white',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Convention / Partner Rate</span>
              <span className="rounded bg-green-100 px-1.5 py-0.5 text-xs font-semibold text-green-700">
                -20%
              </span>
            </div>
            <div
              className="relative h-6 w-10 rounded-full transition-colors"
              style={{ background: showConvention ? 'var(--orange)' : '#D1D5DB' }}
            >
              <div
                className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all"
                style={{ left: showConvention ? '18px' : '2px' }}
              />
            </div>
          </button>

          {/* Date Selector */}
          <div className="mb-5">
            <label
              className="mb-1.5 block text-sm font-medium"
              style={{ color: 'var(--charcoal-light)' }}
            >
              Start Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 text-sm"
              style={{ borderColor: 'var(--cloud-dark)' }}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-3">
            <a
              href={`https://wa.me/84935456789?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: '#25D366' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={`https://zalo.me/84935456789?text=${zaloMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ background: '#0068FF' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248h-1.5c-.178 0-.33.106-.4.258l-2.064 4.46-2.064-4.46c-.07-.152-.222-.258-.4-.258h-1.5c-.276 0-.5.224-.5.5 0 .068.014.132.038.19l3.124 6.374c.07.152.222.258.4.258h1.804c.178 0 .33-.106.4-.258l3.124-6.374c.024-.058.038-.122.038-.19 0-.276-.224-.5-.5-.5zM7.5 8.248c-1.933 0-3.5 1.567-3.5 3.5s1.567 3.5 3.5 3.5 3.5-1.567 3.5-3.5-1.567-3.5-3.5-3.5zm0 5.5c-1.105 0-2-.895-2-2s.895-2 2-2 2 .895 2 2-.895 2-2 2z" />
              </svg>
              Zalo
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
