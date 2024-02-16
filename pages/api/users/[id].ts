import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userCpf = req.query.id;
  const userSenha = req.query.senha;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { cpf: String(userCpf), senha: String(userSenha) },
      });

      if (user) {
        res.status(200).json({ message: 'Usuário Encontrado', user: user, status: 200 });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
