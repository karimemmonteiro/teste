// next.config.js
const withPWA = require('next-pwa');
const withOffline = require('next-offline');

module.exports = withOffline(
  withPWA({
    pwa: {
      dest: 'public', // Este é o diretório onde os arquivos do Service Worker serão colocados
      runtimeCaching: [
        {
          urlPattern: /^https?.*/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'offlineCache',
            expiration: {
              maxEntries: 200,
            },
          },
        },
      ],
    },
    // outras configurações...
  })
);
