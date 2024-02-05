import { SET_STEP } from '../actions/stepAtendimentoAction';

const initialState = {
  step: 0
};



export const stepReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_STEP:
      return {
        ...state,
        step: action.payload,
      };
    default:
      return state;
  }
};

