export const SET_CPF = 'SET_CPF';

export const setCpf = (cpf: string) => ({
  type: SET_CPF,
  payload: cpf,
});
