export const SET_CPF = 'SET_CPF';
export const SET_STEP = 'SET_STEP'; 

export const setCpf = (cpf: string, step: number) => ({
  type: SET_CPF,
  payload: cpf,
  step: SET_STEP,
  payloadStep: step,
});
