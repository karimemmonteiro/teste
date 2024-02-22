import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { apiNext } from "../../config/connection";
import removeNonNumericChars from "./removePontosCpf";
import moment from 'moment';

export default async function GetDadosPorCpfOffline(data) {
    dayjs.locale('pt-br');
    dayjs.extend(utc);
    dayjs.extend(timezone);

    const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
    const user = typeof window !== 'undefined' ? localStorage.getItem('userName') : null;
    console.log("teste cpf", data)
    const cpfWithoutMask = removeNonNumericChars(data);

    
    const dadosOffline = {
        cpf: cpfWithoutMask,
        nome: "",
        dataNascimento: "",
        produtorRural: false,
        estudante: false,
        lgpd: false,
        // dados atendimento
        atendente: "",
        tempoAtendimento: "",
        unidadeOrganizacional: "",
        tema: "",
        projetoAcao: "",
        tipoAtendimento: "",
        canalAtendimento: "",
        descricaoAtendimento: "",
        pendencias: "",
        //Pessoa Juridica
        pjpf: [
            {
                razaoSocial: "",
                cnpj: "",
                nomeFantasia: "",
                dataCriacaoRelatorio: "",
                descricaoStatusReceita: "",
                descPorte: "",
                quantidadeFuncionarios: 0,
                descNaturezaJuridica: "",
                atividade: "",
            }
        ],

        //contatos e endereços
        telefone: [],
        email: [],
        clienteEnderecos: []
    }
    try {
        const response = await apiNext.get(`/atendimento/buscar-por-cpf?cpf=${cpfWithoutMask}`);
        const data = response.data
        console.log("teste dados", data);
        localStorage.setItem('dataNascimento', data?.dataNascimento);
        localStorage.setItem('dataCriacao', data?.Pfpj[0]?.dataCriacaoRelatorio);
        const dadosPfpjSemDataCriacao = data.Pfpj.map(({ dataCriacaoRelatorio, ...restoDoObjeto }) => restoDoObjeto);
        const dadosReturn = {
            cpf: data.cpf,
            nome: data.nome,
            produtorRural: data.produtorRural,
            estudante: data.estudante,
            lgpd: data.lgpd,
            atendente: data.atendente,
            tempoAtendimento: data.tempoAtendimento,
            unidadeOrganizacional: data.unidadeOrganizacional,
            tema: data.tema,
            projetoAcao: data.projetoAcao,
            tipoAtendimento: data.tipoAtendimento,
            canalAtendimento: data.canalAtendimento,
            pendencias: data.pendencias,
            descricao: data.descricao,
            status: data.status,
            Pfpj: dadosPfpjSemDataCriacao,
            telefones: data.telefones,
            emails: data.emails,
            enderecos: data.enderecos
        }

        return (dadosReturn)
    } catch (error) {
        console.error('Erro :', error.message);
        return (dadosOffline)
    }
}