/**
 * usePreferenceSync Hook
 *
 * ACC-SYNC-PREFS: React hook for syncing consumer preferences
 *
 * Features:
 * - Auto-sync on mount when authenticated
 * - Manual sync trigger
 * - Sync status tracking
 * - Re-sync on auth state change
 */

import { useState, useEffect, useCallback } from 'react';
import {
  syncPreferences,
  uploadPreferences,
  downloadPreferences,
  clearSyncState,
  type SyncResult
} from '../preference-sync-service';
import { onAuthStateChange, getCurrentUser, type AuthUser } from '../auth-service';

export interface UsePreferenceSyncResult {
  /** Whether sync is in progress */
  isSyncing: boolean;
  /** Last sync result */
  lastSync: SyncResult | null;
  /** Current authenticated user */
  user: AuthUser | null;
  /** Trigger manual sync */
  sync: () => Promise<SyncResult>;
  /** Force upload local preferences to cloud */
  upload: () => Promise<boolean>;
  /** Force download preferences from cloud */
  download: () => Promise<boolean>;
}

/**
 * Hook for managing preference sync between local and cloud
 *
 * @param autoSync - Whether to automatically sync on mount (default: true)
 * @returns Sync state and controls
 *
 * @example
 * ```tsx
 * function PreferencesPage() {
 *   const { isSyncing, lastSync, sync, upload } = usePreferenceSync();
 *
 *   const handleSave = async (prefs) => {
 *     preferencesStore.set(prefs);
 *     await upload(); // Force upload after save
 *   };
 *
 *   return (
 *     <div>
 *       {isSyncing && <Spinner />}
 *       {lastSync?.direction === 'download' && <Badge>Updated from cloud</Badge>}
 *     </div>
 *   );
 * }
 * ```
 */
export function usePreferenceSync(autoSync: boolean = true): UsePreferenceSyncResult {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<SyncResult | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  // Sync function
  const sync = useCallback(async (): Promise<SyncResult> => {
    setIsSyncing(true);
    try {
      const result = await syncPreferences();
      setLastSync(result);
      return result;
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Upload function
  const upload = useCallback(async (): Promise<boolean> => {
    setIsSyncing(true);
    try {
      const success = await uploadPreferences();
      if (success) {
        setLastSync({ success: true, direction: 'upload' });
      }
      return success;
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Download function
  const download = useCallback(async (): Promise<boolean> => {
    setIsSyncing(true);
    try {
      const success = await downloadPreferences();
      if (success) {
        setLastSync({ success: true, direction: 'download' });
      }
      return success;
    } finally {
      setIsSyncing(false);
    }
  }, []);

  // Get current user on mount
  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);

  // Subscribe to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChange((authUser) => {
      setUser(authUser);

      if (authUser) {
        // User logged in - sync preferences
        sync();
      } else {
        // User logged out - clear sync state
        clearSyncState();
        setLastSync(null);
      }
    });

    return unsubscribe;
  }, [sync]);

  // Auto-sync on mount if enabled and user is authenticated
  useEffect(() => {
    if (autoSync && user) {
      sync();
    }
  }, [autoSync, user, sync]);

  return {
    isSyncing,
    lastSync,
    user,
    sync,
    upload,
    download,
  };
}

export default usePreferenceSync;
