import { PrismaClient, Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import https from 'https';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { cpf, senha, idSistema, token } = req.body;
      const externalApiResponse = await axios.post(
        'https://localhost:7179/Usuarios/Logar',
        {
          cpf: cpf,
          senha: senha,
          idSistema: idSistema,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          httpsAgent: new https.Agent({ rejectUnauthorized: false }),
        }
      );

      if (externalApiResponse.data.statusResponse === 200 && externalApiResponse.data.textResponse === "Usuário Encontrado") {
        const updatedUser = await prisma.user.upsert({
          where: {
            cpf: cpf,
          },
          update: {
            token: externalApiResponse.data.token,
            senha: senha,
            refreshToken: "30",
            idSistema: idSistema,
            statusResponse: externalApiResponse.status,
            textResponse: externalApiResponse.statusText,
          },
          create: {
            cpf: cpf,
            token: externalApiResponse.data.token,
            senha: senha,
            refreshToken: "30",
            idSistema: idSistema,
            statusResponse: externalApiResponse.status,
            textResponse: externalApiResponse.statusText,
          },
        });

        res.status(200).json({ message: 'Usuário atualizado', user: updatedUser, status: 200 });
      } else {
        res.status(401).json({ message: 'Falha na autenticação' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
