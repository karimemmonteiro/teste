export const CONTATOS_ENDERECOS = 'CONTATOS_ENDERECOS';
export const updateContatosEnderecos = (data: {
  clienteEnderecos: [
    {
      id: Number,
      idCliente: number,
      numSeqEnd: null,
      endCorresp: null,
      codLogr: null,
      descEndereco: string,
      numero: number,
      complemento: string,
      codBairro: number,
      descBairro: string,
      codCid: number,
      descCid: string,
      codEst: number,
      descEst: string,
      codPais: number,
      descPais: string,
      cep: number,
      endInternacional: null,
      indCorrespond: null,
      principal: number,
      codigoMunicipioRM: null,
      tpOperacao: null,
      autorizaCorrespondencia: null,
      isEmptyCep: boolean,
      isEmptyDescEndereco: boolean,
      isEmptyDescBairro: boolean,
      isEmptyMunicipio: boolean
    }
  ],
  clienteContatos: [
    {
      id: number,
      cpf: number,
      numSeqCom: null,
      codComunic: number,
      descComunic: string,
      numero: number,
      indInternet: number,
      recebeContato: number,
      recebeSMS: number,
      principal: number,
      inputVazio: boolean,
      tpContato: null,
      tpOperacao: null,
      autorizaLigacao: number,
      autorizaMensagem: number
    }
  ],
}) => ({
  type: CONTATOS_ENDERECOS,
  payload: data,
});
