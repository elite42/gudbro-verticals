'use client';

import { useState, useCallback } from 'react';
import { Shield, Copy, Check, AlertTriangle, RefreshCw, Key } from 'lucide-react';

interface TwoFactorSetupProps {
  onSetupComplete?: () => void;
  onCancel?: () => void;
}

type SetupStep = 'initial' | 'scan-qr' | 'verify' | 'recovery-codes' | 'complete';

export default function TwoFactorSetup({ onSetupComplete, onCancel }: TwoFactorSetupProps) {
  const [step, setStep] = useState<SetupStep>('initial');
  const [qrCode, setQrCode] = useState<string>('');
  const [manualKey, setManualKey] = useState<string>('');
  const [verifyCode, setVerifyCode] = useState<string>('');
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [showManualKey, setShowManualKey] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  // Start 2FA setup
  const handleStartSetup = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/2fa/setup', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to start 2FA setup');
      }

      setQrCode(data.qrCode);
      setManualKey(data.manualEntryKey);
      setStep('scan-qr');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start setup');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Verify the code and enable 2FA
  const handleVerify = useCallback(async () => {
    if (verifyCode.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/2fa/verify-setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: verifyCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to verify code');
      }

      setRecoveryCodes(data.recoveryCodes);
      setStep('recovery-codes');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  }, [verifyCode]);

  // Copy a single recovery code
  const copyCode = useCallback((code: string, index: number) => {
    navigator.clipboard.writeText(code.replace('-', ''));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  }, []);

  // Copy all recovery codes
  const copyAllCodes = useCallback(() => {
    const allCodes = recoveryCodes.join('\n');
    navigator.clipboard.writeText(allCodes);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  }, [recoveryCodes]);

  // Complete setup
  const handleComplete = useCallback(() => {
    setStep('complete');
    onSetupComplete?.();
  }, [onSetupComplete]);

  // Copy manual key
  const copyManualKey = useCallback(() => {
    navigator.clipboard.writeText(manualKey);
  }, [manualKey]);

  // Render based on current step
  return (
    <div className="space-y-6">
      {/* Step: Initial */}
      {step === 'initial' && (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Enable Two-Factor Authentication</h3>
          <p className="mx-auto max-w-md text-gray-600">
            Add an extra layer of security to your account. You&apos;ll need an authenticator app
            like Google Authenticator or Authy.
          </p>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex justify-center gap-3 pt-2">
            {onCancel && (
              <button
                onClick={onCancel}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleStartSetup}
              disabled={isLoading}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Starting...
                </>
              ) : (
                'Get Started'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step: Scan QR Code */}
      {step === 'scan-qr' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Scan QR Code</h3>
          <p className="text-gray-600">Open your authenticator app and scan this QR code.</p>

          <div className="flex justify-center">
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              {qrCode && <img src={qrCode} alt="QR Code for 2FA setup" className="h-48 w-48" />}
            </div>
          </div>

          {/* Manual Entry Option */}
          <div className="text-center">
            <button
              onClick={() => setShowManualKey(!showManualKey)}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              {showManualKey ? 'Hide manual entry key' : "Can't scan? Enter manually"}
            </button>
          </div>

          {showManualKey && (
            <div className="space-y-2 rounded-lg bg-gray-50 p-4">
              <p className="text-sm text-gray-600">Enter this key in your authenticator app:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 break-all rounded border border-gray-200 bg-white px-3 py-2 font-mono text-sm">
                  {manualKey}
                </code>
                <button
                  onClick={copyManualKey}
                  className="rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  title="Copy key"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          <button
            onClick={() => setStep('verify')}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step: Verify Code */}
      {step === 'verify' && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Verify Setup</h3>
          <p className="text-gray-600">
            Enter the 6-digit code from your authenticator app to complete setup.
          </p>

          <div>
            <input
              type="text"
              value={verifyCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                setVerifyCode(value);
                setError('');
              }}
              placeholder="000000"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-center font-mono text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={6}
              autoFocus
            />
          </div>

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              onClick={() => setStep('scan-qr')}
              className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={handleVerify}
              disabled={isLoading || verifyCode.length !== 6}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & Enable'
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step: Recovery Codes */}
      {step === 'recovery-codes' && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600" />
            <div>
              <h4 className="font-medium text-yellow-800">Save Your Recovery Codes</h4>
              <p className="mt-1 text-sm text-yellow-700">
                These codes can be used to access your account if you lose your authenticator
                device. Each code can only be used once.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {recoveryCodes.map((code, index) => (
              <button
                key={index}
                onClick={() => copyCode(code, index)}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 font-mono text-sm transition-colors hover:bg-gray-100"
              >
                <span>{code}</span>
                {copiedIndex === index ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 text-gray-400" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={copyAllCodes}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
          >
            {copiedAll ? (
              <>
                <Check className="h-4 w-4 text-green-600" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy All Codes
              </>
            )}
          </button>

          <button
            onClick={handleComplete}
            className="w-full rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            I&apos;ve Saved My Codes
          </button>
        </div>
      )}

      {/* Step: Complete */}
      {step === 'complete' && (
        <div className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Two-Factor Authentication Enabled</h3>
          <p className="text-gray-600">
            Your account is now protected with two-factor authentication.
          </p>
        </div>
      )}
    </div>
  );
}
