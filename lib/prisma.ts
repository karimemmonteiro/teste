// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import path from 'path';

// Use path.resolve para obter um caminho absoluto
const dbFilePath = path.resolve(__dirname, 'prisma', 'dev.db');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${dbFilePath}`,
    },
  },
});

export default prisma;
