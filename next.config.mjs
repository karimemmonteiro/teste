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
      // Certifique-se de que o Prisma Client seja gerado corretamente
      const originalEntry = config.entry;

      config.entry = async () => {
        const entries = { ...(await originalEntry()) };

        // Certifique-se de que o caminho do Prisma Client esteja correto
        entries['./prisma/client'] = require.resolve('./prisma/client');

        return entries;
      };
    }
    return config;
  },
});
