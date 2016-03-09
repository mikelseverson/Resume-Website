var staticCacheName = 'portfolio-static-v2.31';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/views/index.html',
        '/styles/stylesheet.css',
        '/images/bg.png',
        '/images/mikel.png',
        '/images/favicon.ico',
        '/images/github.png',
        '/images/linkedin.png',
        '/images/twitter.png',
        '/images/resume-icon.png'
      ]);
    })
  );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('portfolio-') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});



self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) return response;
      return fetch(event.request)
      }
    )
  );
});
