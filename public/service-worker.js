const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/manifest.json',
  '/favicon.ico',
  '/icons/mask-icon.svg',
  '/icons/touch-icon-iphone.png',
  '/icons/twitter.png',
  '/Sebrae.png',  // Certifique-se de ter o arquivo Sebrae.png na pasta raiz ou ajuste o caminho conforme necessário
  // Adicione outros recursos estáticos e páginas aqui
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .catch((error) => console.error('Erro durante a instalação:', error))
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.match(event.request)
          .then((response) => {
            return response || fetch(event.request)
              .then((networkResponse) => {
                cache.put(event.request, networkResponse.clone());
                return networkResponse;
              })
              .catch((error) => console.error('Erro durante o fetch:', error));
          })
          .catch((error) => console.error('Erro durante o match:', error));
      })
  );
});
