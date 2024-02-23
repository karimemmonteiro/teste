import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import useOnline from '../../../ultils/contants/onlineOffline';
import RestruturacaoDadosOffline from '../../../ultils/functions/restruturarDadosOffline';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isOnline = true;
  if (req.method === 'GET') {
    try {
      const { cpf } = req.query;
      const token = req.headers.authorization?.replace('Bearer ', '');

      if (!cpf || !token) {
        res.status(400).json({ error: 'Parâmetros inválidos. Certifique-se de fornecer CPF e token.' });
        return;
      }

      const data = await prisma.cliente.findUnique({
        where: {
          cpf: String(cpf),
        },
        include: {
          Telefone: true,
          Email: true,
          Endereco: true,
          Pfpj: true,
          Atendimento: false
        },
      });

      if (data) {
        res.status(200).json({ mensagem: "offline", data });
      } else {
        if (isOnline) {
          const api = process.env.APIONLINE;
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response = await axios.get(`${api}${cpf}`, { headers });
          let data = response.data;
          const dados = await RestruturacaoDadosOffline(data)
          const { Pfpj, Endereco, Telefone, Email, ...dadosRestante } = dados


          data = await prisma.cliente.create({
            data: {
              ...dadosRestante,
              Pfpj: {
                create: Pfpj.map(item => ({
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
                create: Telefone.map(item => ({
                  codComunic: item.codComunic,
                  descComunic: item.descComunic,
                  numero: item.numero,
                  recebeContato: item.recebeContato,
                  recebeSMS: item.recebeSMS,
                  principal: item.principal,
                  autorizaLigacao: item.autorizaLigacao,
                  autorizaMensagem: item.autorizaMensagem,
                }))
              },
              Email: {
                create: Email.map(item => ({
                  codComunic: item.codComunic,
                  descComunic: item.descComunic,
                  numero: item.numero,
                  recebeContato: item.recebeContato,
                  recebeSMS: item.recebeSMS,
                  principal: item.principal,
                  autorizaLigacao: item.autorizaLigacao,
                  autorizaMensagem: item.autorizaMensagem,
                }
                ))
              },
              Endereco: {
                create: Endereco.map(item => ({
                  cep: item.cep,
                  descBairro: item.descBairro,
                  codBairro: item.codBairro,
                  descEndereco: item.descEndereco,
                  numero: item.numero,
                  descEst: item.descEst,
                  codEst: item.codEst,
                  descCid: item.descCid,
                  codCid: item.codCid,
                  codPais: item.codPais,
                  descPais: item.descPais,
                  autorizaCorrespondencia: item.autorizaCorrespondencia,
                  complemento: item.complemento,
                  principal: item.principal
                }))
              }
            },
            include: {
              Telefone: true,
              Email: true,
              Endereco: true,
              Pfpj: true,
              Atendimento: false
            },
          });
          res.status(response.status).json({ mensagem: "online", data });
        } else {
          res.status(503).json({ error: 'Voce nao tem acesso a internet para Buscar os dados online' });
        }

      }
    } catch (error) {
      console.error('Erro ao buscar dados externos:', error);
      res.status(500).json({ error: 'Erro ao buscar dados externos.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
