import { PrismaClient, UserUpdateInput } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.id;

  if (req.method === 'PUT') {
    try {
      // Obtenha os mesmos dados do corpo da solicitação do POST
      const { cpf, token, refreshToken, idSistema, statusResponse, textResponse } = req.body;

      // Atualize o usuário existente com base no userId
      const updatedUser = await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          cpf,
          token,
          refreshToken,
          idSistema,
          statusResponse,
          textResponse,
        } as UserUpdateInput,
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
