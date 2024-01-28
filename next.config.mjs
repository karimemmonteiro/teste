import withPWA from "@ducanh2912/next-pwa";

export default withPWA({
  pwa: {
    dest: 'public',
    disable: false,
    workboxOptions: {
      disableDevLogs: true,
    },
  },
  experimental: {
    modern: true,
  },
});
