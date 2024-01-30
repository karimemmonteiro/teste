// next.config.mjs
import { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } from "next/constants.js";

const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: "/login", // Adapte conforme a estrutura do seu AppRouter
        permanent: true,
      },
    ];
  },
};

const exportPathMap = async function (
  defaultPathMap,
  { dev, dir, outDir, distDir, buildId }
) {
  return {
    '/': { page: '/' },
    '/login': { page: '/login' },
    '/atendimento': { page: '/atendimento' },
  };
};

const nextConfigFunction = async (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER || phase === PHASE_PRODUCTION_BUILD) {
    const withPWA = (await import("@ducanh2912/next-pwa")).default({
      dest: "public",
      fallbacks: {
        image: '/offline.png',
        document: '/pages/_offline.tsx',
      },
    });
    return withPWA({ ...nextConfig, exportPathMap });
  }
  return { ...nextConfig, exportPathMap };
};

export default nextConfigFunction;
