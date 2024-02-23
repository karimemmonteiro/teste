import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { cpf } = req.query;

      if (!cpf) {
        return res.status(400).json({ message: 'O parâmetro CPF é obrigatório.' });
      }

      const cliente = await prisma.cliente.findUnique({
        where: {
          cpf: String(cpf),
        },
        include: {
          telefones: true,
          emails: true,
          enderecos: true,
          Pfpj: true,
        },
      });

      if (!cliente) {
        return res.status(404).json({ message: 'Cliente não encontrado.' });
      }

      res.status(200).json(cliente);
    } catch (error) {
      console.error('Erro:', error);
      res.status(500).json({ message: 'Erro ao obter cliente por CPF.' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
