var staticCacheName = 'portfolio-static-v2.1';

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        '/views/index.html',
        '/styles/bootstrap.css',
        '/images/bg.png',
        '/images/mikel.png',
        '/images/favicon.ico',
        '/images/github.png',
        '/images/linkedin.png',
        '/images/twitter.png'
      ]);
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
