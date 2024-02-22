export default async function MontagemObjetoForm(form: any, values: any) {
    const criacao = typeof window !== 'undefined' ? localStorage.getItem('dataCriacao') : null;
    const nascimento = typeof window !== 'undefined' ? localStorage.getItem('dataNascimento') : null;
    console.log("teste", values)
    const dadosForm = form?.getFieldValue()
    let dataCriacao = ""
    let dataNascimento = ""
    if(dadosForm?.Pfpj[0]?.dataCriacaoRelatorio !== undefined){
        dataCriacao = dadosForm?.Pfpj[0]?.dataCriacaoRelatorio
    }else{
        dataCriacao = criacao
    }
    if(values.dataNascimento !== undefined){
        dataNascimento = values.dataNascimento
    }else{
        dataNascimento = nascimento
    }
    let validacaoReturn = true
    let telefone = dadosForm.telefones
    telefone = telefone.map(({ id,clienteId, ...restoDoObjeto }) => restoDoObjeto);
    let email =  dadosForm.emails
    email = email.map(({ id,clienteId, ...restoDoObjeto }) => restoDoObjeto);
    let endereco = dadosForm.enderecos
    endereco = endereco.map(({ id,clienteId, ...restoDoObjeto }) => restoDoObjeto);
    const pj = [
        {
            razaoSocial: dadosForm?.Pfpj[0]?.razaoSocial,
            cnpj: dadosForm?.Pfpj[0]?.cnpj,
            nomeFantasia: dadosForm?.Pfpj[0]?.nomeFantasia,
            dataCriacaoRelatorio: dataCriacao,
            descricaoStatusReceita: dadosForm?.Pfpj[0]?.descricaoStatusReceita,
            descPorte: dadosForm?.Pfpj[0]?.descPorte,
            quantidadeFuncionarios: dadosForm?.Pfpj[0]?.quantidadeFuncionarios,
            descNaturezaJuridica: dadosForm?.Pfpj[0]?.descNaturezaJuridica,
            atividade: dadosForm?.Pfpj[0]?.atividade
        }
    ]
    const dados = {
        cpf: dadosForm.cpf,
        nome: dadosForm.nome,
        dataNascimento: dataNascimento,
        produtorRural: dadosForm.produtorRural,
        estudante: dadosForm.estudante,
        lgpd: dadosForm.lgpd,
        status: "Pendente",
        atendente: dadosForm.atendente,
        tempoAtendimento: "10min",
        unidadeOrganizacional: dadosForm.unidadeOrganizacional,
        tema: dadosForm.tema,
        projetoAcao: dadosForm.projetoAcao,
        tipoAtendimento: dadosForm.tipoAtendimento,
        canalAtendimento: dadosForm.canalAtendimento,
        descricao: dadosForm.descricao,
        pendencias: dadosForm.pendencias,
        telefones: telefone,
        emails: email,
        enderecos: endereco,
        Pfpj: pj
    }


    return { validacaoReturn, dados };
}
