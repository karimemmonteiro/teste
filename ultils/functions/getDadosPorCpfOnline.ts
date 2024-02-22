import { useRef } from "react";
import { apiNext } from "../../config/connection";
import removeNonNumericChars from "./removePontosCpf";

export default async function GetDadosPorCpf(data) {
    const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
    const user = typeof window !== 'undefined' ? localStorage.getItem('userName') : null;
    console.log("teste cpf", data)
    const cpfWithoutMask = removeNonNumericChars(data);
    try {
        const response = await apiNext.get(`/atendimento/buscar-dados/?cpf=${cpfWithoutMask}`, {
            headers: {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            },
        });
        console.log("teste dados", response)
        if (response.status === 200) {
            console.log("teste ok", response.status)
            const responseData = response?.data;
            const dadosContatos = responseData.clienteContatos
            if (responseData.pfpj !== null) { }
            const dadosPJ = responseData?.pfPj[0]?.pessoaJuridicaVM || []

            const pfpj = responseData.pfpj !== null ? {
                razaoSocial: dadosPJ?.razaoSocial || "",
                cnpj: dadosPJ?.cnpj || "",
                nomeFantasia: dadosPJ?.nomeFantasia || "",
                dataCriacaoRelatorio: null,
                descricaoStatusReceita: dadosPJ?.descricaoStatusReceita || "",
                descPorte: dadosPJ?.descPorte || "",
                quantidadeFuncionarios: dadosPJ?.quantidadeFuncionarios || "",
                descNaturezaJuridica: dadosPJ?.descNaturezaJuridica || "",
                atividade: dadosPJ?.atividade || "",
            } : {
                razaoSocial: "",
                cnpj: "",
                nomeFantasia: "",
                dataCriacaoRelatorio: null,
                descricaoStatusReceita: "",
                descPorte: "",
                quantidadeFuncionarios: "",
                descNaturezaJuridica: "",
                atividade: "",
            }

            const dadosEnderecos = responseData.clienteEnderecos.map(endereco => ({
                cep: endereco.cep,
                descBairro: endereco.descBairro,
                descEndereco: endereco.descEndereco,
                numero: endereco.numero,
                descEst: endereco.descEst,
                descCid: endereco.descCid,
                autorizaCorrespondencia: endereco.autorizaCorrespondencia,
                complemento: endereco.complemento,
                principal: endereco.principal
            }));
            const telefonesCelulares = dadosContatos.filter(item => item.descComunic === "TELEFONE CELULAR");
            const telefone = telefonesCelulares.map(telefone => ({
                numero: telefone.numero,
                descComunic: telefone.descComunic,
                principal: telefone?.principal || 0,
                autorizaMensagem: telefone?.autorizaMensagem || 0,
                recebeContato: telefone?.recebeContato || 0,
                recebeSMS: email?.recebeSMS || 0,
            }));
            const emailArray = dadosContatos.filter(item => item.descComunic === "E-MAIL");
            const email = emailArray.map(email => ({
                numero: email.numero,
                descComunic: email.descComunic,
                principal: telefone?.principal || 0,
                autorizaMensagem: telefone?.autorizaMensagem || 0,
                recebeContato: telefone?.recebeContato || 0,
                recebeSMS: email?.recebeSMS || 0,
            }));

            const formValues = {
                cpf: responseData.cpf,
                nome: responseData.nome,
                tempoAtendimento: "10min",
                dataNascimento: "",
                produtorRural: responseData?.produtorRural,
                estudante: responseData.estudante,
                lgpd: responseData.lgpd,
                //Pessoa Juridica
                pfpj: pfpj,
                //contatos e endereços
                atendente: user,
                telefones: telefone,
                emails: email,
                enderecos: dadosEnderecos
            };

            console.log("teste form ================", formValues);
        } else {
            console.error("cpf invalido")
        }
        return (response.data)
    } catch (error) {

        console.error('Erro ao fazer login:', error.message);
        // formRef.current.setFieldsValue(dadosOffline);
    }
}