const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html'];

const self = this;

// intalling SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

// listen for requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html'));
    }),
  );
});

// activate SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      const promises = [];
      cacheNames.forEach((cacheName) => {
        if (!cacheWhitelist.includes(cacheName)) {
          promises.push(caches.delete(cacheName));
        }
      });
      Promise.all(promises);
    }),
  );
});
