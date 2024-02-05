import { combineReducers } from "redux";
import { cpfReducer } from "./reduxs/cpfReducer";
import { stepReducer } from "./reduxs/stepReducer";
import { pessoaFisicaReducer } from "./reduxs/dadosPessoaFisica";
import { dadosLogin } from "./reduxs/dadoLogin";

export const rootReducer = combineReducers({
    cpf: cpfReducer,
    step: stepReducer,
    dadosPessoaFisica: pessoaFisicaReducer,
    dadosLogin: dadosLogin,
  });