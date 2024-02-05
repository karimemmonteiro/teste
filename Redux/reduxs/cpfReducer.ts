import { SET_CPF } from '../actions/cpfActions';

const initialState = {
  cpf: '',
};



export const cpfReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CPF:
      return {
        ...state,
        cpf: action.payload,
      };
    default:
      return state;
  }
};

