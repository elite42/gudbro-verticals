'use client';

import { useState } from 'react';
import { useTranslation } from '@/lib/use-translation';

interface QuickActionsBarProps {
  venueName: string;
  venueAddress?: string;
  showShareLocation?: boolean;
  showCallStaff?: boolean;
  onCallStaff?: () => void;
}

/**
 * QuickActionsBar Component
 *
 * Provides quick access buttons for common customer needs:
 * - Share location with friends (WhatsApp, Telegram, Copy link)
 * - Call staff for assistance
 */
export function QuickActionsBar({
  venueName,
  venueAddress,
  showShareLocation = true,
  showCallStaff = true,
  onCallStaff,
}: QuickActionsBarProps) {
  const { t } = useTranslation();
  const [staffCalled, setStaffCalled] = useState(false);

  /**
   * Share location via WhatsApp
   */
  const shareViaWhatsApp = () => {
    const message = `I'm at ${venueName}! Join me 😊${venueAddress ? '\n' + venueAddress : ''}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  /**
   * Share location via Telegram
   */
  const shareViaTelegram = () => {
    const message = `I'm at ${venueName}! Join me 😊${venueAddress ? '\n' + venueAddress : ''}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  /**
   * Copy location link to clipboard
   */
  const copyLocation = async () => {
    const message = `I'm at ${venueName}!${venueAddress ? '\n' + venueAddress : ''}\n${window.location.href}`;
    try {
      await navigator.clipboard.writeText(message);
      alert('Link copiato! 📋');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  /**
   * Call staff button handler
   */
  const handleCallStaff = () => {
    setStaffCalled(true);
    setTimeout(() => setStaffCalled(false), 3000);

    // Trigger callback (will integrate with WebSocket/API later)
    if (onCallStaff) {
      onCallStaff();
    } else {
      // Mock notification
      console.log('Staff called - table notification sent');
    }
  };

  return (
    <div>
      {/* Share Location - Simplified single action */}
      {showShareLocation && (
        <button
          onClick={shareViaWhatsApp}
          className="w-full flex items-center justify-center gap-3 p-3.5 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border border-green-200 rounded-xl transition-all active:scale-[0.98] shadow-sm"
          aria-label="Share location via WhatsApp"
        >
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white text-xl shadow-md">
            📍
          </div>
          <div className="flex-1 text-left">
            <div className="text-sm font-semibold text-gray-900">Share Location</div>
            <div className="text-xs text-gray-600">Invite friends via WhatsApp</div>
          </div>
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
