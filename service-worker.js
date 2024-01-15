const CACHE_NAME = `bar-code-reader-v1`;

// Use the install event to pre-cache all initial resources.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll([
      '/',
      '/index.js',
      '/style.css',
      '/quagga.min.js',
    ]);
  })());
});