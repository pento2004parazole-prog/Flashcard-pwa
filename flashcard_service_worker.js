const CACHE_NAME = 'flashcard-app-v1';
const urlsToCache = [
    '/',
    'index.html',
    'flashcard_manifest.json',
    // We don't cache external resources like Firebase or Tailwind,
    // as those are loaded from CDNs and are usually highly reliable.
];

// Install event: caches the core files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event: serves files from the cache if available
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response