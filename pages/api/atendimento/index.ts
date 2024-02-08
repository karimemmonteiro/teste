import localforage from 'localforage';

interface Usuario {
  nome: string;
  email: string;
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const usuariosLocal: Usuario[] = await localforage.getItem('usuarios') || [];
      res.status(200).json({ data: usuariosLocal });
    } catch (error) {
      console.error('Erro ao obter usuários localmente:', error);
      res.status(500).json({ error: 'Erro interno do servidor ao obter usuários' });
    }
  } else if (req.method === 'POST') {
    try {
      const novoUsuario: Usuario = req.body;

      if (!novoUsuario || typeof novoUsuario !== 'object') {
        res.status(400).json({ error: 'Dados de usuário inválidos' });
        return;
      }

      const usuariosLocal: Usuario[] = (await localforage.getItem('usuarios')) || [];
      usuariosLocal.push(novoUsuario);
      await localforage.setItem('usuarios', usuariosLocal);

      res.status(201).json({ data: novoUsuario });
    } catch (error) {
      console.error('Erro ao criar usuário localmente:', error);
      res.status(500).json({ error: 'Erro interno do servidor ao criar usuário' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido' });
  }
}
