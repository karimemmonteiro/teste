import { UPDATE_PESSOA_FISICA } from '../actions/dadosPessoaFisica';

const initialState = {
    pfCpf: '',
    pfNome: '',
    pfDataNascimento: '',
    pfTelefone: '',
    pfEmail: '',
    pfAceiteTermo: false,
    pfEstudante: false,
    pfProdutorRural: false
};

export const pessoaFisicaReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_PESSOA_FISICA:
            console.log("Ação Despachada:", action);
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};
