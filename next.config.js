//@type {import('next').NextConfig}
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: false,
  register: true,
  scope: '/app',
  sw: 'service-worker.js',
  dynamicStartUrl: true,
  cacheStartUrl:true,
})

module.exports = withPWA({
  // output: 'export',
  pwa: {
    dest: 'public',
    workbox: {
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
        {
          urlPattern: /^\/(login|atendimento)/,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages',
            expiration: {
              maxEntries: 10,
            },
          },
        },
        // ...outros padrões de caching
      ],
    },
  },
})