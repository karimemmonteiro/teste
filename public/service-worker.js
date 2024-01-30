const CACHE_NAME = 'my-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  // Adicione outros recursos estáticos aqui
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
      .catch(() => caches.match('/offline.html'))  // Adicione esta linha para servir a página offline
  );
});
