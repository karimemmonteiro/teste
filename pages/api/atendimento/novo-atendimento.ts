import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {
        clienteId,
        status,
        funoIfAtendente,
        atendente,
        tempoAtendimento,
        projetoAcao,
        tipoAtendimento,
        canalAtendimento,
        descricao,
        pendencias,
        TemaSubtema
      } = req.body;
      const createdAttendance = await prisma.atendimento.create({
        data: {
          status,
          funoIfAtendente,
          atendente,
          tempoAtendimento,
          projetoAcao,
          tipoAtendimento,
          canalAtendimento,
          descricao,
          pendencias,
          cliente: {
            connect: { id: clienteId }
          },
          TemaSubtema: {
            create: TemaSubtema.map(item => ({
              tema: item.tema,
              codTema: item.codTema,
              subTema: item.subTema,
              codSubTema: item.codSubTema
            }))
          }
        },
        include: { TemaSubtema: true }
      });

      res.status(200).json({ message: 'Atendimento criado com sucesso', atendimento: createdAttendance });
    } catch (error) {
      console.error('Erro:', error);
      res.status(500).json({ message: 'Erro ao criar atendimento' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
