// next.config.mjs
import withPWA from "@ducanh2912/next-pwa";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Adicione a geração do Prisma Client aqui
      require('./prisma/client').PrismaClientPromise;
    }
    return config;
  },
});
