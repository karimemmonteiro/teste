import { DADOS_LOGIN } from '../actions/dadosLoginAction';

const initialState = {
    cpf: "",
    senha: "" ,
    token: "",
    refreshToken: "",
    idSistema: 0,
    statusResponse: 0,
    textResponse: "",
    id: 0
};

export const dadosLogin = (state = initialState, action: any) => {
    switch (action.type) {
        case DADOS_LOGIN:
            console.log("Ação Despachada:", action);
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};
