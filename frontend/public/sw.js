self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Network-first for API, cache-first for static
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api')) return;
  event.respondWith(
    caches.open('forgepilot-cache').then(async (cache) => {
      const cached = await cache.match(event.request);
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        try { cache.put(event.request, networkResponse.clone()); } catch (e) {}
        return networkResponse;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});