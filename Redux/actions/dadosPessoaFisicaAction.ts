export const UPDATE_PESSOA_FISICA = 'UPDATE_PESSOA_FISICA';
export const updatePessoaFisica = (data: {
  pfCpf: string;
  pfNome: string;
  pfDataNascimento: string;
  pfTelefone: string;
  pfEmail: string;
  pfAceiteTermo: boolean,
  pfEstudante: boolean,
  pfProdutorRural: boolean
}) => ({
  type: UPDATE_PESSOA_FISICA,
  payload: data,
});
