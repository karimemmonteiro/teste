import { PrismaClient, UserCreateInput } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { cpf, token, refreshToken, idSistema, statusResponse, textResponse } = req.body;

      const newUser = await prisma.user.create({
        data: {
          cpf,
          token,
          refreshToken,
          idSistema,
          statusResponse,
          textResponse,
        } as UserCreateInput,
      });

      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
