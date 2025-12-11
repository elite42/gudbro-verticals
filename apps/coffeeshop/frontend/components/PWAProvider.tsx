'use client';

import { useEffect } from 'react';

export function PWAProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((registration) => {
            console.log('[PWA] Service Worker registered:', registration.scope);

            // Check for updates
            registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // New content available, notify user
                    console.log('[PWA] New content available, refresh to update');
                    // Could show a toast here to prompt user to refresh
                  }
                });
              }
            });
          })
          .catch((error) => {
            console.error('[PWA] Service Worker registration failed:', error);
          });
      });
    }

    // Handle install prompt
    let deferredPrompt: Event | null = null;

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      console.log('[PWA] Install prompt ready');

      // Could dispatch a custom event to show install button
      window.dispatchEvent(new CustomEvent('pwa-install-ready', { detail: deferredPrompt }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Track if app is installed
    const handleAppInstalled = () => {
      console.log('[PWA] App installed successfully');
      deferredPrompt = null;
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  return <>{children}</>;
}

// Hook to trigger install prompt
export function usePWAInstall() {
  const triggerInstall = async () => {
    // This would need to be connected to the deferred prompt
    console.log('[PWA] Install triggered');
  };

  return { triggerInstall };
}
