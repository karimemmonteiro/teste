import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    const api = process.env.APIONLINE
    const { cpf } = req.query;
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!cpf || !token) {
      res.status(400).json({ error: 'Parâmetros inválidos. Certifique-se de fornecer CPF e token.' });
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response: AxiosResponse = await axios.get(`${api}${cpf}`, {
      headers,
    });

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Erro ao buscar dados externos:', error);
    res.status(204).json({ error: 'Erro ao buscar dados externos.' });
  }
};
