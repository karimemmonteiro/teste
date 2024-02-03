import { SET_CPF } from '../actions/cpfActions';
import { combineReducers } from 'redux';

const initialState = {
  cpf: '',
  step: 0
};



export const cpfReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CPF:
      return {
        ...state,
        cpf: action.payload,
        step: action.payloadStep,
      };
    default:
      return state;
  }
};

