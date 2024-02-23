import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const Atendimento = await prisma.atendimento.findMany({
        include: {
          TemaSubtema: true
        }
      })
      const clientes = await prisma.cliente.findMany({
        include: {
          Telefone: true,
          Email: true,
          Endereco: true,
          Pfpj: true,
        },
      });

      const data: any[] = clientes.map(cliente => ({
        ...cliente,
        Atendimento: Atendimento
      }));


      res.status(200).json(data);
    } catch (error) {
      console.error("Erro:", error);
      res.status(500).json({ message: 'Erro ao obter clientes' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
