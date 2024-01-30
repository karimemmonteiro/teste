const CACHE_NAME = 'my-cache';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/login',
  'atendiemnto'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        // Use Promise.all para garantir que todas as solicitações de cache sejam concluídas com sucesso
        return Promise.all(
          urlsToCache.map((url) => {
            return fetch(url)
              .then((response) => cache.put(url, response))
              .catch((error) => console.error('Falha ao fazer cache de', url, error));
          })
        );
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Se a resposta estiver no cache, retorne-a; senão, faça uma solicitação de rede e a coloque em cache
        return response || fetch(event.request)
          .then((response) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            });
          })
          .catch(() => caches.match('/offline.html'));  // Adicione esta linha para servir a página offline
      })
  );
});
