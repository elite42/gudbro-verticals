'use client';

/**
 * Offline Banner Component
 *
 * Shows a persistent banner when the device is offline.
 * Indicates that actions will be queued and synced later.
 */

import { useState, useEffect } from 'react';
import { WifiSlash, CloudArrowUp } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

interface OfflineBannerProps {
  pendingActions?: number;
}

export function OfflineBanner({ pendingActions = 0 }: OfflineBannerProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-amber-500 text-amber-950 overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2 px-4 py-2">
            <WifiSlash size={18} weight="bold" />
            <span className="text-sm font-medium">
              Modalita offline
              {pendingActions > 0 && (
                <span className="inline-flex items-center gap-1 ml-2">
                  <CloudArrowUp size={16} weight="bold" />
                  {pendingActions} azioni in attesa
                </span>
              )}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
