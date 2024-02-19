import React, { useEffect, useRef } from 'react';
import { Button, Form, Steps, message } from "antd";
import { useState } from "react";
import dayjs from "dayjs";
import 'dayjs/locale/pt-br';
import SectionsBuscarCpf from "../components/Sections/sectionsBuscarCpf";
import SectionPessoaFisica from "../components/Sections/sectionPessoaFisica";
import SectionPessoaJuridica from '../components/Sections/sectionPessoaJuridica';
import SectionContatosEnderecos from '../components/Sections/sectionContatosEnderecos';
import SectionAtendimento from '../components/Sections/sectionAtendimento';
import { apiNext } from '../config/connection';
import { PessoaFisicaType } from '../ultils/types/typesAtendimento';
import moment from 'moment';

export default function Atendimento(props) {
  const [current, setCurrent] = useState(0);
  const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
  const user = typeof window !== 'undefined' ? localStorage.getItem('userName') : null;
  const [dadosOnline, setDadosOnline] = useState<PessoaFisicaType[]>([]);
  const [pf, setPf] = useState<PessoaFisicaType[]>([]);
  const [pj, setPj] = useState<any[]>([]);
  const formRef = useRef(null);
  dayjs.locale('pt-br');
  const dateFormat = 'DD/MM/YYYY';
  const [cpf, setCpf] = useState("");
  const dadosOffline = {
    cpf: cpf,
    nome: "",
    dataNascimento: "",
    produtorRural: false,
    estudante: false,
    lgpd: false,
    //Pessoa Juridica
    razaoSocial: "",
    cnpj: "",
    nomeFantasia: "",
    dataCriacaoRelatorio: dayjs("", dateFormat),
    descricaoStatusReceita: "",
    descPorte: "",
    quantidadeFuncionarios: 0,
    descNaturezaJuridica: "",
    atividade: "",
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
    //contatos e endereços
    telefone: [],
    email: [],
    clienteEnderecos: []
  }
  function removeNonNumericChars(cpf: string) {
    return cpf.replace(/\D/g, '');
  }


  const dadosCpf = (data) => {
    setCpf(data)
    if (navigator.onLine) {
      GetDadosPorCpf(data)
    } else {
      formRef.current.setFieldsValue(dadosOffline);
      setCurrent(current + 1);
    }
  };
  async function GetDadosPorCpf(data) {
    const cpfWithoutMask = removeNonNumericChars(data);
    try {
      const response = await apiNext.get(`/atendimento/buscar-dados/?cpf=${cpfWithoutMask}`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {

        const responseData = response?.data;
        setDadosOnline(responseData)


        console.log("teste data", responseData)
        const dadosContatos = responseData.clienteContatos
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
        const dadosPJ = responseData.pfPj[0].pessoaJuridicaVM
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
          dataNascimento: null,
          produtorRural: responseData?.produtorRural,
          estudante: responseData.estudante,
          lgpd: responseData.lgpd,
          //Pessoa Juridica
          razaoSocial: dadosPJ.razaoSocial,
          cnpj: dadosPJ.cnpj,
          nomeFantasia: dadosPJ.nomeFantasia,
          dataCriacaoRelatorio: null,
          descricaoStatusReceita: dadosPJ.descricaoStatusReceita,
          descPorte: dadosPJ.descPorte,
          quantidadeFuncionarios: dadosPJ.quantidadeFuncionarios,
          descNaturezaJuridica: dadosPJ.descNaturezaJuridica,
          atividade: dadosPJ.atividade,
          //contatos e endereços
          atendente: user,
          telefones: telefone,
          emails: email,
          enderecos: dadosEnderecos
        };

        console.log("teste form ================", formValues);

        formRef.current.setFieldsValue(formValues);
        setCurrent(current + 1);
      } else {
        console.error("cpf invalido")
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      formRef.current.setFieldsValue(dadosOffline);

    }
  }
  const dadosPf = (data) => {
    console.log("teste current", current)
    setPf(data)
    setCurrent(current + 1);
  };

  const steps = [
    {
      title: 'Buscar CPF',
      content: <SectionsBuscarCpf dadosCpf={dadosCpf} />,
    },
    {
      title: 'Pessoa Fisica',
      content: <SectionPessoaFisica dadosPf={dadosPf} />,
    },
    {
      title: 'Pessoa Jurídica',
      content: <SectionPessoaJuridica />,
    },
    {
      title: 'Contatos e Endereços',
      content: <SectionContatosEnderecos />,
    },
    {
      title: 'Atendimento',
      content: <SectionAtendimento />,
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };



  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    width: "100%",
    height: "80svh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "start",
    alignItems: "center"
  };


  const onFinish = (values: any) => {
    const validacaoFormContatosEnderecos = values?.telefones?.length > 0 || values?.emails?.length > 0 && values?.enderecos?.length > 0;
    
    const dataNascimento = moment.utc(values.dataNascimentoRelatorio).local().format('DD/MM/YYYY');
    if (values.lgpd) {
      const dados = {
        cpf: values.cpf,
        nome: values.nome,
        dataNascimento: dataNascimento,
        produtorRural: values.produtorRural,
        estudante: values.estudante,
        lgpd: values.lgpd,
      }
      console.log("teste dados mult", dados)
      setPf(values)
      setCurrent(current + 1)
    }
    if (values.cnpj) {
      setPf(pf => ({
        ...pf,
        ...values,
      }));
      console.log("teste dados mult", values)
      setCurrent(current + 1)
    }
    if (validacaoFormContatosEnderecos) {
      setPf(pf => ({
        ...pf,
        ...values
      }));
      console.log("teste dados mult", values)
      setCurrent(current + 1)
    } if (values.tema) {
      console.log("teste valor", values.descricao)
      const status = { status: "PENDENTE" };
      const dadosAtendimento = {
        atendente: user,
        tempoAtendimento: "10 minutos",
        unidadeOrganizacional: values.unidadeOrganizacional,
        tema: values.tema,
        projetoAcao: values.projetoAcao,
        tipoAtendimento: values.tipoAtendimento,
        canalAtendimento: values.canalAtendimento,
        descricao: values.descricao,
        pendencias: values.pendencias,
      }
      const novoEstado = {
        ...pf,
        ...values,
        ...status,
        ...dadosAtendimento
      };
      setPf(novoEstado);
    
      console.log("teste dados mult", novoEstado);
      salvarDados(novoEstado)
    }
  }
  async function salvarDados(params: any) {
    try {
      const response = await apiNext.post("/atendimento/create", params
      );
      const responseData = response.data;
      console.log("teste post", responseData)
      if(responseData.status === 200){
        setCurrent(0)
        window.location.href = "/listagem-atendimento";
      }
    }
    catch {
      console.error("error de alguma coisa na request")
    }
  }

  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo);
  };


  return (
    <div suppressHydrationWarning={true} className="px-5 py-5 overflow-y-hidden overflow-x-hidden over">

      <Steps current={current} items={items} />
      {/* <div className="w-full flex flex-row justify-between items-center py-5">
        {current > 0 && (

          <Button className="bg-azulSebrae text-white" onClick={() => prev()}>
            Voltar
          </Button>
        )}
        {current === 5 - 1 && (
          <Button className='bg-green text-white' onClick={() => message.success('Processing complete!')}>
            Salvar
          </Button>
        )}
        {current > 1 - 1 && (
          <Button className="bg-azulSebrae text-white" onClick={() => next()}>
            Proxima
          </Button>
        )}

      </div> */}
      <Form
        ref={formRef}
        name="multi"
        className="w-full flex flex-col"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ cpf: cpf }}
      >

        <div style={contentStyle}>{steps[current].content}</div>
      </Form>
    </div>
  );
};
