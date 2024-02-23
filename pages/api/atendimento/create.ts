import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const {
        cpf,
        nome,
        dataNascimento,
        produtorRural,
        estudante,
        lgpd,
        pfpj,
        telefones,
        emails,
        enderecos
      } = req.body;

      const createdCliente = await prisma.cliente.create({
        data: {
          cpf,
          nome,
          dataNascimento,
          produtorRural,
          estudante,
          lgpd,
          Pfpj: {
            create: pfpj.map(item => ({
              razaoSocial: item.razaoSocial,
              cnpj: item.cnpj,
              nomeFantasia: item.nomeFantasia,
              dataCriacaoRelatorio: item.dataCriacaoRelatorio,
              descricaoStatusReceita: item.descricaoStatusReceita,
              descPorte: item.descPorte,
              quantidadeFuncionarios: item.quantidadeFuncionarios,
              descNaturezaJuridica: item.descNaturezaJuridica,
              atividade: item.atividade
            }))
          },
          Telefone: {
            create: telefones.map(item => ({
              descComunic: item.descComunic,
              numero: item.numero,
              autorizaMensagem: item.autorizaMensagem,
              recebeContato: item.recebeContato,
              principal: item.principal,
              recebeSMS: item.recebeSMS
            }))
          },
          Email: {
            create: emails.map(item => ({
              descComunic: item.descComunic,
              numero: item.numero,
              autorizaMensagem: item.autorizaMensagem,
              recebeContato: item.recebeContato,
              principal: item.principal,
              recebeSMS: item.recebeSMS
            }))
          },
          Endereco: {
            create: enderecos.map(item => ({
              cep: item.cep,
              descBairro: item.descBairro,
              codBairro: item.codBairro,
              descEndereco: item.descEndereco,
              codEndereco: item.codEndereco,
              numero: item.numero,
              descEst: item.descEst,
              codEst: item.codEst,
              descCid: item.descCid,
              codCid: item.codCid,
              autorizaCorrespondencia: item.autorizaCorrespondencia,
              complemento: item.complemento,
              principal: item.principal
            }))
          }
        }
      });

      res.status(200).json({ message: 'Cliente criado com sucesso', cliente: createdCliente });
    } catch (error) {
      console.error('Erro:', error);
      res.status(500).json({ message: 'Erro ao criar cliente' });
    }
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
