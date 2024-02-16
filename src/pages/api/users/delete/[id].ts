import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.id;

  if (req.method === 'DELETE') {
    try {
      await prisma.user.delete({
        where: { id: Number(userId) },
      });

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
