import { PESSOA_FISICA } from '../actions/dadosPessoaFisicaAction';

const initialState = {
    pfCpf: '',
    pfNome: '',
    pfDataNascimento: '',
    // pfTelefone: '',
    // pfEmail: '',
    pfAceiteTermo: false,
    pfEstudante: false,
    pfProdutorRural: false
};

export const pessoaFisicaReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PESSOA_FISICA:
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};
