'use client';

/**
 * PasskeyList - Display and manage registered passkeys
 *
 * Shows a list of the user's registered passkeys with options to rename or delete.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  DeviceMobile,
  Key,
  Shield,
  Trash,
  PencilSimple,
  Check,
  X,
  SpinnerGap,
  ArrowsClockwise,
} from '@phosphor-icons/react';
import {
  isPasskeySupported,
  isPasskeyEnabled,
  getPasskeys,
  deletePasskey,
  updatePasskeyName,
  getDeviceTypeLabel,
  type PasskeyInfo,
} from '@/lib/passkey-service';
import { formatDateTime } from '@gudbro/utils';

interface PasskeyListProps {
  onPasskeyDeleted?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export function PasskeyList({ onPasskeyDeleted, onError, className = '' }: PasskeyListProps) {
  const [isSupported, setIsSupported] = useState(false);
  const [passkeys, setPasskeys] = useState<PasskeyInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const loadPasskeys = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await getPasskeys();

      if (result.success && result.passkeys) {
        setPasskeys(result.passkeys);
      } else {
        onError?.(result.error || 'Errore durante il caricamento');
      }
    } catch (err) {
      onError?.('Si è verificato un errore');
    } finally {
      setIsLoading(false);
    }
  }, [onError]);

  // Check support and load passkeys on mount
  useEffect(() => {
    setMounted(true);
    const supported = isPasskeySupported() && isPasskeyEnabled();
    setIsSupported(supported);

    if (supported) {
      loadPasskeys();
    } else {
      setIsLoading(false);
    }
  }, [loadPasskeys]);

  // Don't render on server
  if (!mounted) {
    return null;
  }

  if (!isSupported) {
    return (
      <div className={`text-sm text-gray-500 dark:text-gray-400 ${className}`}>
        Passkey non supportato su questo dispositivo.
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Sei sicuro di voler eliminare questa passkey?')) {
      return;
    }

    setDeletingId(id);

    try {
      const result = await deletePasskey(id);

      if (result.success) {
        setPasskeys((prev) => prev.filter((p) => p.id !== id));
        onPasskeyDeleted?.();
      } else {
        onError?.(result.error || "Errore durante l'eliminazione");
      }
    } catch (err) {
      onError?.('Si è verificato un errore');
    } finally {
      setDeletingId(null);
    }
  };

  const handleStartEdit = (passkey: PasskeyInfo) => {
    setEditingId(passkey.id);
    setEditName(passkey.friendlyName || '');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleSaveEdit = async (id: string) => {
    try {
      const result = await updatePasskeyName(id, editName);

      if (result.success) {
        setPasskeys((prev) =>
          prev.map((p) => (p.id === id ? { ...p, friendlyName: editName } : p))
        );
        setEditingId(null);
        setEditName('');
      } else {
        onError?.(result.error || "Errore durante l'aggiornamento");
      }
    } catch (err) {
      onError?.('Si è verificato un errore');
    }
  };

  const getIcon = (deviceType: string | null) => {
    switch (deviceType) {
      case 'platform':
        return DeviceMobile;
      case 'cross-platform':
        return Key;
      default:
        return Shield;
    }
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center py-8 ${className}`}>
        <SpinnerGap className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  if (passkeys.length === 0) {
    return (
      <div className={`py-8 text-center ${className}`}>
        <Shield className="mx-auto mb-3 h-12 w-12 text-gray-300 dark:text-gray-600" />
        <p className="text-gray-500 dark:text-gray-400">Nessuna passkey registrata</p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
          Aggiungi una passkey per accedere senza password
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          Le tue Passkey ({passkeys.length})
        </h3>
        <button
          type="button"
          onClick={loadPasskeys}
          className="p-2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
          title="Aggiorna"
        >
          <ArrowsClockwise className="h-4 w-4" />
        </button>
      </div>

      {passkeys.map((passkey) => {
        const Icon = getIcon(passkey.deviceType);
        const isEditing = editingId === passkey.id;
        const isDeleting = deletingId === passkey.id;

        return (
          <div
            key={passkey.id}
            className="flex items-center gap-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50"
          >
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
              <Icon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>

            <div className="min-w-0 flex-1">
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveEdit(passkey.id)}
                    className="p-1 text-green-600 hover:text-green-700"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="p-1 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <>
                  <p className="truncate font-medium text-gray-900 dark:text-white">
                    {passkey.friendlyName || 'Passkey'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {getDeviceTypeLabel(passkey.deviceType)} &middot;{' '}
                    {passkey.lastUsedAt
                      ? `Usata: ${formatDateTime(passkey.lastUsedAt, { locale: 'it-IT' })}`
                      : passkey.createdAt
                        ? `Creata: ${formatDateTime(passkey.createdAt, { locale: 'it-IT' })}`
                        : 'Mai usata'}
                  </p>
                </>
              )}
            </div>

            {!isEditing && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleStartEdit(passkey)}
                  className="p-2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                  title="Rinomina"
                >
                  <PencilSimple className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(passkey.id)}
                  disabled={isDeleting}
                  className="p-2 text-gray-400 transition-colors hover:text-red-600 disabled:opacity-50 dark:hover:text-red-400"
                  title="Elimina"
                >
                  {isDeleting ? (
                    <SpinnerGap className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash className="h-4 w-4" />
                  )}
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default PasskeyList;
