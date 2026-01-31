'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { CheckCircle, SpinnerGap } from '@phosphor-icons/react';
import type { VerificationMethod } from '@/types/stay';
import type { UpgradeResult } from '@/hooks/useRoomSession';

interface InlineVerificationProps {
  isOpen: boolean;
  onClose: () => void;
  onVerified: () => void;
  verificationMethod: VerificationMethod;
  upgradeSession: (method: VerificationMethod, value: string) => Promise<UpgradeResult>;
}

export default function InlineVerification({
  isOpen,
  onClose,
  onVerified,
  verificationMethod,
  upgradeSession,
}: InlineVerificationProps) {
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldownEnd, setCooldownEnd] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Animate in on open
  useEffect(() => {
    if (isOpen) {
      // Small delay for CSS transition to trigger
      requestAnimationFrame(() => setVisible(true));
      // Reset state on each open
      setValue('');
      setError(null);
      setShowSuccess(false);
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  // Auto-focus input when sheet opens
  useEffect(() => {
    if (isOpen && visible && !cooldownEnd) {
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, visible, cooldownEnd]);

  // Cooldown countdown timer
  useEffect(() => {
    if (!cooldownEnd) return;

    const interval = setInterval(() => {
      if (Date.now() >= cooldownEnd) {
        setCooldownEnd(null);
        setError(null);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldownEnd]);

  const formatCooldown = useCallback(() => {
    if (!cooldownEnd) return '';
    const remaining = Math.max(0, Math.ceil((cooldownEnd - Date.now()) / 1000));
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  }, [cooldownEnd]);

  const handleSubmit = async () => {
    if (isSubmitting || !value.trim()) return;

    setIsSubmitting(true);
    setError(null);

    const result = await upgradeSession(verificationMethod, value.trim());

    setIsSubmitting(false);

    if (result.success) {
      setShowSuccess(true);
      setTimeout(() => {
        onVerified();
      }, 800);
      return;
    }

    if (result.error === 'too_many_attempts' && result.retryAfter) {
      setCooldownEnd(Date.now() + result.retryAfter * 1000);
      setError('too_many_attempts');
      return;
    }

    if (result.error === 'verification_failed') {
      setError("That doesn't match. Please try again.");
      setValue('');
      // Re-focus input for quick retry
      setTimeout(() => inputRef.current?.focus(), 100);
      return;
    }

    setError('Something went wrong. Please try again.');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleBackdropClick = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const isPin = verificationMethod === 'pin';
  const isCooldown = !!cooldownEnd;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          visible ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={handleBackdropClick}
      />

      {/* Bottom sheet */}
      <div
        className={`absolute inset-x-0 bottom-0 rounded-t-3xl bg-white shadow-2xl transition-transform duration-300 ease-out ${
          visible ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ maxHeight: '60vh' }}
      >
        {/* Drag handle */}
        <div className="flex justify-center pb-2 pt-3">
          <div className="h-1 w-10 rounded-full bg-gray-300" />
        </div>

        <div className="px-5 pb-8">
          {/* Success state */}
          {showSuccess ? (
            <div className="flex flex-col items-center py-8">
              <div className="animate-scale-in">
                <CheckCircle size={56} weight="fill" className="text-[#3D8B87]" />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[#2D2016]">Verified!</h3>
              <p className="mt-1 text-sm text-[#8B7355]">Loading your services...</p>

              <style jsx>{`
                @keyframes scale-in {
                  0% {
                    transform: scale(0);
                    opacity: 0;
                  }
                  60% {
                    transform: scale(1.15);
                  }
                  100% {
                    transform: scale(1);
                    opacity: 1;
                  }
                }
                .animate-scale-in {
                  animation: scale-in 0.4s ease-out;
                }
              `}</style>
            </div>
          ) : (
            <>
              {/* Title + subtitle */}
              <h3 className="text-lg font-semibold text-[#2D2016]">Verify to continue</h3>
              <p className="mt-1 text-sm text-[#8B7355]">
                {isPin
                  ? 'Enter the room PIN to access services'
                  : 'Enter your last name to access services'}
              </p>

              {/* Cooldown state */}
              {isCooldown ? (
                <div className="mt-6 rounded-xl bg-[#FAF8F5] p-6 text-center">
                  <p className="text-sm font-medium text-[#E07A5F]">Too many attempts</p>
                  <p className="mt-2 text-2xl font-bold tabular-nums text-[#2D2016]">
                    {formatCooldown()}
                  </p>
                  <p className="mt-1 text-xs text-[#8B7355]">Please wait before trying again</p>
                </div>
              ) : (
                <>
                  {/* Input field */}
                  <div className="mt-5">
                    {isPin ? (
                      <input
                        ref={inputRef}
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={4}
                        value={value}
                        onChange={(e) => {
                          // Only allow digits
                          const digits = e.target.value.replace(/\D/g, '');
                          setValue(digits);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="----"
                        autoComplete="off"
                        className="w-full rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] px-4 py-4 text-center text-2xl font-bold tracking-[0.5em] text-[#2D2016] placeholder-[#C4B9A8] focus:border-[#3D8B87] focus:outline-none"
                      />
                    ) : (
                      <input
                        ref={inputRef}
                        type="text"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Last name"
                        autoCapitalize="words"
                        autoComplete="off"
                        className="w-full rounded-xl border border-[#E8E2D9] bg-[#FAF8F5] px-4 py-3.5 text-[#2D2016] placeholder-[#C4B9A8] focus:border-[#3D8B87] focus:outline-none"
                      />
                    )}
                  </div>

                  {/* Error message */}
                  {error && error !== 'too_many_attempts' && (
                    <p className="mt-2 text-sm text-[#E07A5F]">{error}</p>
                  )}

                  {/* Submit button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !value.trim()}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#3D8B87] py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2D6B68] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <SpinnerGap size={18} weight="bold" className="animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      'Verify'
                    )}
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
