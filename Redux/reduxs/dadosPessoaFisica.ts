import { PESSOA_FISICA } from '../actions/dadosPessoaFisicaAction';

const initialState = {
    cpf: '',
    nome: '',
    dataNascimneto: '',
    dtAceiteLgpd: false,
    estudante: false,
    produtorRural: false
};

export const pessoaFisicaReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PESSOA_FISICA:
            console.info("Ação Despachada:", action);
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};
