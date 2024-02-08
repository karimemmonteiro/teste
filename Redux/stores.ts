import { combineReducers } from "redux";
import { cpfReducer } from "./reduxs/cpfReducer";
import { stepReducer } from "./reduxs/stepReducer";
import { pessoaFisicaReducer } from "./reduxs/dadosPessoaFisica";
import { dadosLoginReducer } from "./reduxs/dadoLogin";
import { pessoaJuridicaReducer } from "./reduxs/dadosPessoaJuridica";
import { contatosEnderecosReducer } from "./reduxs/dadosContatosEnderecos";
import { atendimentoReducer } from "./reduxs/dadosAtendimento";

export const rootReducer = combineReducers({
    cpf: cpfReducer,
    step: stepReducer,
    dadosLogin: dadosLoginReducer,
    dadosPessoaFisica: pessoaFisicaReducer,
    dadosPessoaJuridica: pessoaJuridicaReducer,
    dadosContatosEnderecos: contatosEnderecosReducer,
    atendimento: atendimentoReducer,
  });