export const PESSOA_FISICA = 'PESSOA_FISICA';
export const updatePessoaFisica = (data: {
  cpf: string;
  nome: string;
  dataNascimneto: string;
  dtAceiteLgpd: boolean,
  estudante: boolean,
  produtorRural: boolean
}) => ({
  type: PESSOA_FISICA,
  payload: data,
});
