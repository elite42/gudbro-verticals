'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Shield, Key, RefreshCw, AlertCircle } from 'lucide-react';

interface TwoFactorVerifyProps {
  onVerified?: () => void;
  onCancel?: () => void;
  accountId?: string;
}

type VerifyMode = 'totp' | 'recovery';

export default function TwoFactorVerify({ onVerified, onCancel, accountId }: TwoFactorVerifyProps) {
  const [mode, setMode] = useState<VerifyMode>('totp');
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [remainingAttempts, setRemainingAttempts] = useState<number | null>(null);
  const [remainingRecoveryCodes, setRemainingRecoveryCodes] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, [mode]);

  // Verify TOTP code
  const handleVerifyTotp = useCallback(async () => {
    if (code.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/2fa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, accountId }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.remainingAttempts !== undefined) {
          setRemainingAttempts(data.remainingAttempts);
        }
        throw new Error(data.error || 'Verification failed');
      }

      onVerified?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
      setCode('');
    } finally {
      setIsLoading(false);
    }
  }, [code, accountId, onVerified]);

  // Verify recovery code
  const handleVerifyRecovery = useCallback(async () => {
    if (code.length < 8) {
      setError('Please enter a valid recovery code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/2fa/recovery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, accountId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Invalid recovery code');
      }

      if (data.remainingRecoveryCodes !== undefined) {
        setRemainingRecoveryCodes(data.remainingRecoveryCodes);
      }

      onVerified?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid recovery code');
      setCode('');
    } finally {
      setIsLoading(false);
    }
  }, [code, accountId, onVerified]);

  // Handle form submit
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (mode === 'totp') {
        handleVerifyTotp();
      } else {
        handleVerifyRecovery();
      }
    },
    [mode, handleVerifyTotp, handleVerifyRecovery]
  );

  // Handle code input change
  const handleCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (mode === 'totp') {
        // TOTP: only digits, max 6
        setCode(value.replace(/\D/g, '').slice(0, 6));
      } else {
        // Recovery: alphanumeric with dashes, max 9 (XXXX-XXXX)
        setCode(
          value
            .toUpperCase()
            .replace(/[^A-F0-9-]/g, '')
            .slice(0, 9)
        );
      }
      setError('');
    },
    [mode]
  );

  // Switch mode
  const handleSwitchMode = useCallback(() => {
    setMode(mode === 'totp' ? 'recovery' : 'totp');
    setCode('');
    setError('');
  }, [mode]);

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
            {mode === 'totp' ? (
              <Shield className="h-7 w-7 text-blue-600" />
            ) : (
              <Key className="h-7 w-7 text-blue-600" />
            )}
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'totp' ? 'Two-Factor Authentication' : 'Use Recovery Code'}
          </h2>
          <p className="mt-1 text-gray-600">
            {mode === 'totp'
              ? 'Enter the 6-digit code from your authenticator app'
              : 'Enter one of your recovery codes'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              ref={inputRef}
              type="text"
              value={code}
              onChange={handleCodeChange}
              placeholder={mode === 'totp' ? '000000' : 'XXXX-XXXX'}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center font-mono text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={mode === 'totp' ? 6 : 9}
              autoComplete="one-time-code"
              inputMode={mode === 'totp' ? 'numeric' : 'text'}
            />
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
              <div>
                <p className="text-sm text-red-700">{error}</p>
                {remainingAttempts !== null && remainingAttempts > 0 && (
                  <p className="mt-1 text-xs text-red-600">
                    {remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} remaining
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading || (mode === 'totp' ? code.length !== 6 : code.length < 8)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              'Verify'
            )}
          </button>
        </form>

        {/* Switch mode link */}
        <div className="mt-4 text-center">
          <button onClick={handleSwitchMode} className="text-sm text-blue-600 hover:text-blue-700">
            {mode === 'totp' ? 'Use a recovery code instead' : 'Use authenticator app instead'}
          </button>
        </div>

        {/* Cancel button */}
        {onCancel && (
          <div className="mt-4 text-center">
            <button onClick={onCancel} className="text-sm text-gray-500 hover:text-gray-700">
              Cancel and sign out
            </button>
          </div>
        )}

        {/* Warning about recovery codes */}
        {mode === 'recovery' && remainingRecoveryCodes !== null && (
          <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <p className="text-sm text-yellow-700">
              You have {remainingRecoveryCodes} recovery code
              {remainingRecoveryCodes !== 1 ? 's' : ''} remaining.
              {remainingRecoveryCodes <= 2 && ' Consider regenerating your codes after signing in.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
