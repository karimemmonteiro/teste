import { PESSOA_JURIDICA } from '../actions//dadosPessoaJuridicaAction';

const initialState = {
    clienteVM: null,
    idCliente: null,
    idPessoaJuridica: null,
    pessoaJuridicaVM: {
        id: null,
        cnpj: null,
        nomeFantasia: "",
        dataCriacao: "",
        dataCriacaoString: "",
        dataCriacaoRelatorio: "",
        razaoSocial: "",
        cep: null,
        endereco: "",
        porte: null,
        descPorte: "",
        atividade: "",
        descricaoStatusReceita: "",
        descricaoStatusSebrae: "",
        preenchidoManualmente: null,
        cnaeId: null,
        cnaeDesc: "",
        descNaturezaJuridica: "",
        codNaturezaJuridicaConcla: null,
        quantidadeFuncionarios: null,
        email: "",
        codNaturezaJuridicaSas: null,
        telefone: null,
        statusSincronismoSas: null,
        codConstTipoEmpreendimento: null,
        codParceiroSas: null
    }
};

export const pessoaJuridicaReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PESSOA_JURIDICA:
            console.info("Ação Despachada:", action);
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};
