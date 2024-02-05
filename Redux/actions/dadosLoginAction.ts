export const DADOS_LOGIN = 'DADOS_LOGIN';
export const dadosLogin = (data: {
    cpf: string,
    senha: string ,
    token: string,
    refreshToken: string,
    idSistema: number,
    statusResponse: number,
    textResponse: string,
    id: number
}) => ({
  type: DADOS_LOGIN,
  payload: data,
});
