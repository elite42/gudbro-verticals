/* eslint-env serviceworker */
/* eslint-disable no-undef */
/**
 * ROOTS Coffee & Kitchen - Service Worker
 *
 * Provides:
 * - Offline support for static assets
 * - Cache-first strategy for images
 * - Network-first for API calls
 * - Background sync for orders (future)
 * - Push notifications for order ready
 */

const CACHE_NAME = 'roots-pwa-v2';
const STATIC_CACHE = 'roots-static-v2';
const IMAGE_CACHE = 'roots-images-v2';

// Static assets to cache on install
const STATIC_ASSETS = ['/', '/menu', '/cart', '/orders', '/account', '/offers', '/offline.html'];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS.filter((url) => url !== '/offline.html'));
      })
      .then(() => {
        console.log('[SW] Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              return (
                name.startsWith('roots-') &&
                name !== CACHE_NAME &&
                name !== STATIC_CACHE &&
                name !== IMAGE_CACHE
              );
            })
            .map((name) => {
              console.log('[SW] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[SW] Service worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // API calls - Network first, no cache
  if (url.pathname.startsWith('/api/') || url.hostname.includes('supabase')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Images - Cache first
  if (
    request.destination === 'image' ||
    url.pathname.match(/\.(png|jpg|jpeg|gif|webp|svg|ico)$/i)
  ) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // Static assets - Stale while revalidate
  if (url.pathname.match(/\.(js|css|woff|woff2|ttf)$/i)) {
    event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
    return;
  }

  // HTML pages - Network first with offline fallback
  if (request.destination === 'document' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirstWithOffline(request));
    return;
  }

  // Default - Network first
  event.respondWith(networkFirst(request));
});

// Cache strategies

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('[SW] Cache first fetch failed:', error);
    return new Response('', { status: 408, statusText: 'Request Timeout' });
  }
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

async function networkFirstWithOffline(request) {
  try {
    const response = await fetch(request);

    // Cache successful HTML responses
    if (response.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, response.clone());
    }

    return response;
  } catch (_error) {
    // Try to return cached version
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }

    // Return offline page if available
    const offlinePage = await caches.match('/offline.html');
    if (offlinePage) {
      return offlinePage;
    }

    // Return a basic offline response
    return new Response(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Offline - ROOTS</title>
        <style>
          body {
            font-family: system-ui, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: #1E293B;
            color: white;
            text-align: center;
            padding: 20px;
          }
          h1 { font-size: 2rem; margin-bottom: 1rem; }
          p { color: #94A3B8; margin-bottom: 2rem; }
          button {
            background: #DC2626;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
          }
        </style>
      </head>
      <body>
        <h1>You're Offline</h1>
        <p>Please check your internet connection and try again.</p>
        <button onclick="window.location.reload()">Retry</button>
      </body>
      </html>`,
      {
        headers: { 'Content-Type': 'text/html' },
      }
    );
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(() => cached);

  return cached || fetchPromise;
}

// Listen for messages from the app
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

// Background sync for orders (future implementation)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-orders') {
    console.log('[SW] Syncing orders...');
    // Future: Sync queued orders when back online
  }
});

// Push notification event - handle incoming push messages
self.addEventListener('push', (event) => {
  console.log('[SW] Push notification received');

  let data = {
    title: 'ROOTS Coffee & Kitchen',
    body: 'Your order is ready!',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    tag: 'order-ready',
    data: {},
  };

  // Parse push data if available
  if (event.data) {
    try {
      const payload = event.data.json();
      data = {
        ...data,
        ...payload,
      };
    } catch (_e) {
      // If not JSON, use text as body
      data.body = event.data.text() || data.body;
    }
  }

  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
    tag: data.tag,
    vibrate: [200, 100, 200], // Vibration pattern
    requireInteraction: true, // Keep notification until user interacts
    actions: [
      { action: 'view', title: 'View Order' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
    data: data.data,
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

// Notification click event - handle user interaction
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event.action);

  event.notification.close();

  if (event.action === 'dismiss') {
    return;
  }

  // Default action or 'view' action - open orders page
  const orderId = event.notification.data?.orderId;
  const urlToOpen = orderId ? `/orders?id=${orderId}` : '/orders';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Try to focus existing window
      for (const client of clientList) {
        if (client.url.includes('/orders') && 'focus' in client) {
          return client.focus();
        }
      }
      // Open new window if none found
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Notification close event - track dismissed notifications
self.addEventListener('notificationclose', (_event) => {
  console.log('[SW] Notification closed without interaction');
});

console.log('[SW] Service worker loaded');
