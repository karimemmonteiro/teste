const CACHE_NAME = 'my-cache';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/favicon.ico',
        '/icons/mask-icon.svg',
        '/icons/touch-icon-iphone.png',
        '/icons/twitter.png',
        '/service-worker.js',
        // Adicione outras páginas estáticas aqui
        '/atendimento',
        '/login',
        // Adicione todas as suas páginas .tsx aqui
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Não encontrou no cache - faz a requisição à rede
      return fetch(event.request).then((response) => {
        // Verifica se a resposta é válida
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clona a resposta para evitar consumir a resposta original
        const responseToCache = response.clone();

        // Armazena a resposta no cache
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      }).catch(() => {
        // Caso ocorra um erro na rede, tenta recuperar do cache
        return caches.match('/offline.html');  // Substitua pelo caminho de uma página offline real
      });
    })
  );
});
