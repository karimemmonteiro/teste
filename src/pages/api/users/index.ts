import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
