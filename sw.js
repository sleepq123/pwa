self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('fox-store').then((cache) => cache.addAll([
      '/pwa/',
      '/pwa/index.html',
      '/pwa/index.js',
      '/pwa/style.css',
      '/pwa/images/fox1.jpg',
      '/pwa/images/fox2.jpg',
      '/pwa/images/fox3.jpg',
      '/pwa/images/fox4.jpg',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
