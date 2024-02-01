// next.config.js
const withOffline = require('next-offline');
const withPWA = require('next-pwa');

module.exports = withOffline(
  withPWA({
    // Suas outras configurações aqui

    // Configuração do next-offline
    generateInDevMode: true,
    workboxOpts: {
      swDest: 'static/service-worker.js',
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

    // Configuração do next-pwa
    pwa: {
      dest: 'public',
    },
  })
);
