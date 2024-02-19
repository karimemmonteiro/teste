import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const clientes = await prisma.cliente.findMany({
        include: {
          telefones: true,
          emails: true,
          enderecos: true,
        },
      });

      res.status(200).json(clientes);
    } catch (error) {
      console.error("Erro:", error);
      res.status(500).json({ message: 'Erro ao obter clientes' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
