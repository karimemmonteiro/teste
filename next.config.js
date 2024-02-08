const withPWA = require('next-pwa')({
  dest: 'public',
  disable: false,
  register: true,
  scope: '/app',
  sw: 'service-worker.js',
  dynamicStartUrl: true,
  cacheStartUrl: true,
});

module.exports = withPWA({
  reactStrictMode: false,
});
