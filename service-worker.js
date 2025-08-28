const CACHE_NAME = 'dui-prevention-cache-v5';
// Add URLs of ALL assets to cache for offline functionality
const urlsToCache = [
  '.',
  './index.html',
  './manifest.json',
  './index.js',
  './App.js',
  './types.js',
  './components/Header.js',
  './components/Footer.js',
  './components/InfoCard.js',
  './components/BACCalculator.js',
  './components/Pledge.js',
  './components/ExcuseGenerator.js',
  './services/geminiService.js',
  './icons/icon-192x192.png',
  './icons/icon-512x512.png'
];

// Install a service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // Use addAll to fetch and cache all the assets.
        // It's atomic - if one file fails, the whole operation fails.
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache resources during install:', error);
      })
  );
});

// Cache and return requests
self.addEventListener('fetch', event => {
    // We only want to cache GET requests
    if (event.request.method !== 'GET') {
        return;
    }
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // Not in cache - fetch from network
        return fetch(event.request);
      }
    )
  );
});

// Update a service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});