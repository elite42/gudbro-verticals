'use client';

import { useRouter } from 'next/navigation';

interface AccountHeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export function AccountHeader({
  title = 'Il mio Account',
  showBackButton = true
}: AccountHeaderProps) {
  const router = useRouter();

  return (
    <div className="bg-theme-bg-elevated border-b border-theme-border-light sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left: Back button */}
        {showBackButton ? (
          <button
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-theme-bg-tertiary transition-colors"
            aria-label="Torna indietro"
          >
            <svg className="w-6 h-6 text-theme-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        ) : (
          <div className="w-10" />
        )}

        {/* Center: Title */}
        <h1 className="text-lg font-semibold text-theme-text-primary">
          {title}
        </h1>

        {/* Right: Placeholder for balance */}
        <div className="w-10" />
      </div>
    </div>
  );
}
