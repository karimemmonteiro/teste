import { ATENDIMENTO } from '../actions/dadosAtendimentoAction';

const initialState = {
    workflows: null,
    id: null,
    tituloEleitor: null,
    rg: null,
    sexo: null,
    escolaridade: null,
    statusReceita: null,
    statusSebrae: null,
    possuiDeficiencia: null,
    lgpd: null,
    codUfLgpd: null,
    descUfLgpd: null,
    codParcLgpd: null,
    nomeParceiroLgpd: null,
    tipoPessoaFisica: null,
    verificado: null,
    qtdTentativas: null,
    dataNascimnetoString: "",
    dataNascimnetoRelatorio: "",
    codcfo: null,
    atendimentos: null,
};

export const atendimentoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ATENDIMENTO:
            console.info("Ação Despachada:", action);
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};
