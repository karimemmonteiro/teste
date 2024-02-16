export const PESSOA_FISICA = 'PESSOA_FISICA';
export const updatePessoaFisica = (data: {
  pfCpf: string;
  pfNome: string;
  pfDataNascimento: string;
  // pfTelefone: string;
  // pfEmail: string;
  pfAceiteTermo: boolean,
  pfEstudante: boolean,
  pfProdutorRural: boolean
}) => ({
  type: PESSOA_FISICA,
  payload: data,
});
