import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { cpf, ...dados } = req.body;
      const { telefones, emails, enderecos, Pfpj, ...clienteDados } = dados;
      console.log("teste api", Pfpj)

      const updatedCliente = await prisma.cliente.upsert({
        where: {
          cpf: cpf,
        },
        update: {
          ...clienteDados,
          Pfpj: {
            upsert: Pfpj.map(t => ({
              where: { id: t.id || -1 },
              update: t,
              create: t,
            }))
          },
          telefones: {
            upsert: telefones.map(t => ({
              where: { id: t.id || -1 },
              update: t,
              create: t,
            }))
          },
          emails: {
            upsert: emails.map(e => ({
              where: { id: e.id || -1 },
              update: e,
              create: e,
            }))
          },
          enderecos: {
            upsert: enderecos.map(end => ({
              where: { id: end.id || -1 },
              update: end,
              create: end,
            }))
          },
        },
        create: {
          ...clienteDados,
          cpf: cpf,
          Pfpj: {
            create: Pfpj,
          },
          telefones: {
            create: telefones,
          },
          emails: {
            create: emails,
          },
          enderecos: {
            create: enderecos,
          },
        }
      });

      res.status(200).json({ message: 'Cadastrado com Sucesso', cliente: updatedCliente, status: 200 });
    } catch (error) {
      console.error("Erro:", error);
      res.status(401).json({ message: 'Falha na autenticação' });
    }

  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
