'use client';

/**
 * PasskeyRegister - Add new passkey to account
 *
 * Button/card to register a new passkey for the authenticated user.
 * Prompts for device name and triggers WebAuthn registration.
 */

import { useState, useEffect } from 'react';
import { Fingerprint, Plus, Loader2, X, Check } from 'lucide-react';
import { isPasskeySupported, isPasskeyEnabled, registerPasskey } from '@/lib/passkey-service';

interface PasskeyRegisterProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
  showCard?: boolean;
}

export function PasskeyRegister({
  onSuccess,
  onError,
  className = '',
  showCard = true,
}: PasskeyRegisterProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [deviceName, setDeviceName] = useState('');
  const [success, setSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check support on mount (client-side only)
  useEffect(() => {
    setMounted(true);
    setIsSupported(isPasskeySupported() && isPasskeyEnabled());
  }, []);

  // Don't render on server or if not supported
  if (!mounted || !isSupported) {
    return null;
  }

  const handleRegister = async () => {
    setIsLoading(true);
    setSuccess(false);

    try {
      const result = await registerPasskey(deviceName || undefined);

      if (result.success) {
        setSuccess(true);
        setShowNameInput(false);
        setDeviceName('');
        onSuccess?.();

        // Reset success state after animation
        setTimeout(() => setSuccess(false), 2000);
      } else {
        onError?.(result.error || 'Registrazione fallita');
      }
    } catch (err) {
      onError?.('Si è verificato un errore');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowNameInput(false);
    setDeviceName('');
  };

  // Simple button variant
  if (!showCard) {
    return (
      <button
        type="button"
        onClick={() => setShowNameInput(true)}
        disabled={isLoading}
        className={`inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50 ${className}`}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : success ? (
          <Check className="h-5 w-5" />
        ) : (
          <Plus className="h-5 w-5" />
        )}
        <span>Aggiungi Passkey</span>
      </button>
    );
  }

  // Card variant with name input
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
          <Fingerprint className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-gray-900 dark:text-white">Aggiungi Passkey</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Usa Face ID, Touch ID o Windows Hello per accedere senza password.
          </p>

          {!showNameInput ? (
            <button
              type="button"
              onClick={() => setShowNameInput(true)}
              disabled={isLoading}
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
            >
              {success ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Aggiunta!</span>
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4" />
                  <span>Configura</span>
                </>
              )}
            </button>
          ) : (
            <div className="mt-3 space-y-3">
              <div>
                <label
                  htmlFor="deviceName"
                  className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Nome dispositivo (opzionale)
                </label>
                <input
                  type="text"
                  id="deviceName"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  placeholder="es. iPhone di Marco"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleRegister}
                  disabled={isLoading}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Fingerprint className="h-4 w-4" />
                  )}
                  <span>Registra</span>
                </button>

                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PasskeyRegister;
