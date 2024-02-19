export type PessoaFisicaType = {
    cpf: string,
    nome: string,
    dataNascimento: string,
    produtorRural: boolean,
    estudante: boolean,
    lgpd: boolean,
}

export type TelefoneEmaiType = {
    numero: string,
    descComunic: string,
    principal: number,
    codComunic: string,
    autorizaMensagem: number,
    recebeContato: number,
    recebeSMS: number
}

export type EnderecosType = {
    descEndereco: string,
    numero: string,
    complemento: string,
    codBairro: number,
    descBairro: string,
    codCid: number,
    isEmptyCep:boolean,
    isEmptyDescBairro: boolean,
    isEmptyDescEndereco: boolean,
    isEmptyMunicipio: boolean,
    descCid: string,
    codEst: number,
    descEst: string,
    codPais: number,
    descPais: string,
    cep: number,
    principal: number,
    autorizaCorrespondencia: boolean,
    codLogr: number,
    codigoMunicipioRM: number,
    endCorresp: string
}