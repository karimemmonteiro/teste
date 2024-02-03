import { combineReducers } from "redux";
import { cpfReducer } from "./reduxs/cpfReducer";
import { pessoaFisicaReducer } from "./reduxs/dadosPessoaFisica";

export const rootReducer = combineReducers({
    cpf: cpfReducer,
    step: cpfReducer,
    dadosPessoaFisica: pessoaFisicaReducer,
  });