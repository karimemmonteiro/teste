import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cpf } = req.body;

  if (req.method === 'DELETE') {
    try {
      const existingCliente = await prisma.cliente.findUnique({
        where: { cpf: String(cpf) },
      });

      if (!existingCliente) {
        return res.status(404).json({ message: 'Cliente não encontrado' });
      }

      await prisma.endereco.deleteMany({ where: { clienteId: existingCliente.id } });
      await prisma.email.deleteMany({ where: { clienteId: existingCliente.id } });
      await prisma.telefone.deleteMany({ where: { clienteId: existingCliente.id } });
      await prisma.pfpj.deleteMany({ where: { clienteId: existingCliente.id } });
      await prisma.atendimento.deleteMany({ where: { clienteId: existingCliente.id } });
      await prisma.cliente.delete({
        where: { cpf: String(cpf) },
      });

      res.status(200).json({ message: 'Cliente e registros relacionados excluídos com sucesso' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao excluir cliente e registros relacionados' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
