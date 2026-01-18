'use client';

/**
 * PasskeyButton - Login with Passkey button
 *
 * Shows a button to authenticate using Face ID, Touch ID, Windows Hello, etc.
 * Only renders if passkeys are supported and enabled.
 */

import { useState, useEffect } from 'react';
import { Fingerprint, Loader2 } from 'lucide-react';
import {
  isPasskeySupported,
  isPasskeyEnabled,
  authenticateWithPasskey,
} from '@/lib/passkey-service';

interface PasskeyButtonProps {
  email?: string;
  onSuccess?: (user: { id: string; email: string }) => void;
  onError?: (error: string) => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function PasskeyButton({
  email,
  onSuccess,
  onError,
  className = '',
  variant = 'secondary',
}: PasskeyButtonProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleClick = async () => {
    setIsLoading(true);

    try {
      const result = await authenticateWithPasskey(email);

      if (result.success && result.user) {
        onSuccess?.(result.user);
      } else {
        onError?.(result.error || 'Autenticazione fallita');
      }
    } catch (err) {
      onError?.('Si è verificato un errore');
    } finally {
      setIsLoading(false);
    }
  };

  const baseStyles =
    'inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary:
      'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700',
    outline:
      'border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800',
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : (
        <Fingerprint className="h-5 w-5" />
      )}
      <span>Accedi con Passkey</span>
    </button>
  );
}

export default PasskeyButton;
