import { CONTATOS_ENDERECOS } from '../actions/dadosContatosEnderecosAction';

const initialState = {
    clienteEnderecos: [
        {
          id: null,
          idCliente: null,
          numSeqEnd: null,
          endCorresp: null,
          codLogr: null,
          descEndereco: "",
          numero: null,
          complemento: "",
          codBairro: null,
          descBairro: "",
          codCid: null,
          descCid: "",
          codEst: null,
          descEst: "",
          codPais: null,
          descPais: "",
          cep: null,
          endInternacional: null,
          indCorrespond: null,
          principal: null,
          codigoMunicipioRM: null,
          tpOperacao: null,
          autorizaCorrespondencia: null,
          isEmptyCep: false,
          isEmptyDescEndereco: false,
          isEmptyDescBairro: false,
          isEmptyMunicipio: false
        }
      ],
      clienteContatos: [
        {
          id: null,
          cpf: null,
          numSeqCom: null,
          codComunic: null,
          descComunic: "",
          numero: null,
          indInternet: null,
          recebeContato: null,
          recebeSMS: null,
          principal: null,
          inputVazio: false,
          tpContato: null,
          tpOperacao: null,
          autorizaLigacao: null,
          autorizaMensagem: null
        }
      ],
};

export const contatosEnderecosReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case CONTATOS_ENDERECOS:
            console.info("Ação Despachada:", action);
            return {
                ...state,
                ...action.payload,
            };

        default:
            return state;
    }
};
