const InitialValuesOffline = [

    {
        //pessoa Fisicca
        cpf: "",
        nome: "",
        dataNascimneto: "",
        produtorRural: false,
        estudante: false,
        lgpd: false,
        //Pessoa Juridica
        razaoSocial: "",
        cnpj: "",
        nomeFantasia: "",
        dataCriacaoRelatorio: "",
        descricaoStatusReceita: "",
        descPorte: "",
        quantidadeFuncionarios: null,
        descNaturezaJuridica: "",
        atividade: "",
        //Telefone
        telefone: [
            {
                id: null,
                cpf: "",
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
            },
        ],
        //email
        email: [
            {
                id: null,
                cpf: "",
                numSeqCom: null,
                codComunic: null,
                descComunic: "",
                numero: "",
                indInternet: null,
                recebeContato: null,
                recebeSMS: null,
                principal: null,
                inputVazio: false,
                tpContato: null,
                tpOperacao: null,
                autorizaLigacao: null,
                autorizaMensagem: null
            },
        ],
        // Endereços
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
                principal: 1,
                codigoMunicipioRM: null,
                tpOperacao: null,
                autorizaCorrespondencia: null,
                isEmptyCep: false,
                isEmptyDescEndereco: false,
                isEmptyDescBairro: false,
                isEmptyMunicipio: false
            }
        ],
        //Atendimento
        atendente: "",
        unidade: "",
        tema: "",
        projeto: "",
        tipoAtendimento: "",
        canaAtendimento: "",
        descAtendimento: "",
        pendencias: ""

    }
]

export default InitialValuesOffline