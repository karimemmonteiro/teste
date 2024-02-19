import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { cpf, ...dados } = req.body;

      // Verifique se o cliente existe
      const existingCliente = await prisma.cliente.findUnique({
        where: { cpf: cpf },
      });

      if (!existingCliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      // Atualize os registros relacionados (telefones, emails, endereços)
      const telefones = Array.isArray(dados.telefones) ? dados.telefones : [];
      const emails = Array.isArray(dados.emails) ? dados.emails : [];
      const enderecos = Array.isArray(dados.enderecos) ? dados.enderecos : [];

      const updatedUser = await prisma.cliente.upsert({
        where: { cpf: cpf },
        update: {
          ...dados,
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
          ...dados,
          cpf: cpf,
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

      res.status(200).json({ message: 'Usuário atualizado', user: updatedUser, status: 200 });
    } catch (error) {
      console.error("Erro:", error);
      res.status(500).json({ message: 'Erro ao atualizar usuário' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
