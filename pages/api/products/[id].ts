// pages/api/products/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  try {
    if (req.method === 'PUT') {
      const { name, price, quantity } = req.body;
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: { name, price, quantity },
      });
      res.status(200).json(updatedProduct);
    } else if (req.method === 'DELETE') {
      await prisma.product.delete({ where: { id: Number(id) } });
      res.status(204).end();
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } finally {
    await prisma.$disconnect();
  }
}
