// pages/api/products/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === 'GET') {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } else if (req.method === 'POST') {
      const { name, price, quantity } = req.body;
      const product = await prisma.product.create({
        data: {
          name,
          price,
          quantity,
        },
      });
      res.status(201).json(product);
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  } finally {
    await prisma.$disconnect();
  }
}
