export default async function RestruturacaoDadosOffline(values: any) {
    const data = values
    console.log("teste dados ", values)
    let dadosEmail = data.clienteContatos.filter(item => item.descComunic === "E-MAIL");
    let dadosTelefone = data.clienteContatos.filter(item => item.descComunic === "TELEFONE CELULAR");

    const dadosPj = await data.pfPj.map((item) => {
        return ({
            razaoSocial: item.pessoaJuridicaVM.razaoSocial,
            cnpj: item.pessoaJuridicaVM.cnpj,
            nomeFantasia: item.pessoaJuridicaVM.nomeFantasia,
            dataCriacaoRelatorio: item.pessoaJuridicaVM.dataCriacaoRelatorio,
            descricaoStatusReceita: item.pessoaJuridicaVM.descricaoStatusReceita,
            descPorte: item.pessoaJuridicaVM.descPorte,
            quantidadeFuncionarios: item.pessoaJuridicaVM.quantidadeFuncionarios,
            descNaturezaJuridica: item.pessoaJuridicaVM.descNaturezaJuridica,
            atividade: item.pessoaJuridicaVM.atividade
        })
    })
    const dadosEndereco = await data.clienteEnderecos.map((
        { id, idCliente, numSeqEnd, endCorresp, codLogr, endInternacional, indCorrespond, codigoMunicipioRM, tpOperacao, isEmptyCep, isEmptyDescEndereco, isEmptyDescBairro, isEmptyMunicipio,
            ...restoDoObjeto
        }) => restoDoObjeto);
    dadosEmail = await dadosEmail.map(({ id,clienteId,numSeqCom,indInternet,inputVazio,tpContato, tpOperacao,cpf, ...restoDoObjeto }) => restoDoObjeto);
    dadosTelefone = await dadosTelefone.map(({ id,clienteId,numSeqCom,indInternet,inputVazio,tpContato, tpOperacao,cpf, ...restoDoObjeto }) => restoDoObjeto);
    const dados = {
        cpf: data.cpf,
        nome: data.nome,
        dataNascimento: data.dataNascimnetoRelatorio,
        produtorRural: data.produtorRural,
        estudante: data.estudante,
        lgpd: data.lgpd,
        Pfpj: dadosPj,
        Endereco: dadosEndereco,
        Telefone: dadosTelefone,
        Email: dadosEmail
    }

    return dados;
}
