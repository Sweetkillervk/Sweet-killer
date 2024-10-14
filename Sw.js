// Service Worker Installation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('smartkyp-cache-v1').then((cache) => {
      return cache.addAll([
        'https://smartkyp.blogspot.com/?m=1#', // Start page
        '/index.html', // Main page (replace with actual path if different)
        'https://smartkyp.blogspot.com/', // Home page
        'https://smartkyp.blogspot.com/styles.css', // Example stylesheet (replace with actual path)
        'https://smartkyp.blogspot.com/script.js', // Example JavaScript file (replace with actual path)
        'https://raw.githubusercontent.com/Sweetkillervk/Sweet-killer/refs/heads/main/Manifest.json', // Manifest file
        'https://smartkyp.blogspot.com/favicon.ico', // Favicon (if you have one)
        // Add any other assets or files here that you want to cache
      ]);
    })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== 'smartkyp-cache-v1') {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event to Serve Cached Content
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((response) => {
        // Optionally cache the fetched response
        return caches.open('smartkyp-cache-v1').then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
