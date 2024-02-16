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
import { apiNext } from '../../config/connection';
import InitialValuesOffline from '../ultils/contants/dadosIniciaisOffline';
import { PessoaFisicaType } from '../ultils/types/typesAtendimento';

export default function Atendimento(props) {
  const userToken = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null;
  const [dadosOnline, setDadosOnline] = useState<PessoaFisicaType[]>([]);
  const [pf, setPf] = useState<PessoaFisicaType[]>([]);
  const formRef = useRef(null);
  dayjs.locale('pt-br');
  const dateFormat = 'DD/MM/YYYY';
  const [current, setCurrent] = useState(0);
  const [cpf, setCpf] = useState("");
  function removeNonNumericChars(cpf: string) {
    return cpf.replace(/\D/g, '');
  }

  const dadosCpf = (data) => {
    setCpf(data)
    GetDadosPorCpf(data)
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
      const responseData = response?.data;
      console.log("teste dados buscar", responseData)
      setDadosOnline(responseData)

      formRef.current.setFieldsValue({
        cpf: responseData.cpf,
        nome: responseData.nome,
        dataNascimneto: dayjs(responseData.dataNascimnetoRelatorio, dateFormat),
        produtorRural: responseData.produtorRural,
        estudante: responseData.estudante,
        lgpd: responseData.lgpd,

      });
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
    }
    setCurrent(current + 1);
  }
  const dadosPf = (data) => {
    // setCurrent(current + 1);
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
    console.log("teste dados mult", values)
  }


  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo);
  };
  console.log("teste pessoa fisica", pf[0])


  return (
    <div suppressHydrationWarning={true} className="px-5 py-5 overflow-y-hidden overflow-x-hidden over">

      <Steps current={current} items={items} />
      <div className="w-full flex flex-row justify-between items-center py-5">
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

      </div>
      <Form
        ref={formRef}
        name="multi"
        className="w-full flex flex-col"
        // initialValues={
        //   {
        //     //pessoa Fisicca
        //     cpf: pf[0]?.cpf,
        //     nome: pf[0]?.nome,
        //     dataNascimneto: dayjs(pf[0]?.dataNascimneto, dateFormat),
        //     produtorRural:  pf[0]?.produtorRural,
        //     estudante: pf[0]?.estudante,
        //     lgpd: pf[0]?.lgpd,
        //     //Pessoa Juridica
        //     razaoSocial: "ANDRE UCHOA MESQUITA 02195679212",
        //     cnpj: "39850648000192",
        //     nomeFantasia: "UCHOA MESQUITA",
        //     dataCriacaoRelatorio: dayjs('19/11/2020', dateFormat),
        //     descricaoStatusReceita: "Validado",
        //     descPorte: "Micro empreendedor individual",
        //     quantidadeFuncionarios: 1,
        //     descNaturezaJuridica: "Empresário (Individual)",
        //     atividade: "Comércio varejista especializado de equipamentos e suprimentos de informática",
        //     clienteContatos: [
        //       {
        //         id: 22672,
        //         cpf: "02195679212",
        //         numSeqCom: null,
        //         codComunic: 5,
        //         descComunic: "TELEFONE CELULAR",
        //         numero: 92981659417,
        //         indInternet: 0,
        //         recebeContato: 1,
        //         recebeSMS: 0,
        //         principal: 1,
        //         inputVazio: false,
        //         tpContato: null,
        //         tpOperacao: null,
        //         autorizaLigacao: 1,
        //         autorizaMensagem: 1
        //       },
        //       {
        //         id: 22673,
        //         cpf: "02195679212",
        //         numSeqCom: null,
        //         codComunic: 25,
        //         descComunic: "E-MAIL",
        //         numero: "twigandre@gmail.com",
        //         indInternet: 0,
        //         recebeContato: 1,
        //         recebeSMS: null,
        //         principal: 0,
        //         inputVazio: false,
        //         tpContato: null,
        //         tpOperacao: null,
        //         autorizaLigacao: null,
        //         autorizaMensagem: 1
        //       },
        //     ],
        //     //Telefone
        //     telefone: [
        //       {
        //         id: 22672,
        //         cpf: "02195679212",
        //         numSeqCom: null,
        //         codComunic: 5,
        //         descComunic: "TELEFONE CELULAR",
        //         numero: 92981659417,
        //         indInternet: 0,
        //         recebeContato: 1,
        //         recebeSMS: 0,
        //         principal: 1,
        //         inputVazio: false,
        //         tpContato: null,
        //         tpOperacao: null,
        //         autorizaLigacao: 1,
        //         autorizaMensagem: 1
        //       },
        //     ],
        //     //email
        //     email: [
        //       {
        //         id: 22673,
        //         cpf: "02195679212",
        //         numSeqCom: null,
        //         codComunic: 25,
        //         descComunic: "E-MAIL",
        //         numero: "twigandre@gmail.com",
        //         indInternet: 0,
        //         recebeContato: 1,
        //         recebeSMS: null,
        //         principal: 0,
        //         inputVazio: false,
        //         tpContato: null,
        //         tpOperacao: null,
        //         autorizaLigacao: null,
        //         autorizaMensagem: 1
        //       },
        //     ],
        //     // Endereços
        //     clienteEnderecos: [
        //       {
        //         id: 21304,
        //         idCliente: 21285,
        //         numSeqEnd: null,
        //         endCorresp: null,
        //         codLogr: null,
        //         descEndereco: "BECO FERNANDO SABINO",
        //         numero: 26,
        //         complemento: "PROXIMO A CASA MESQUITA 2",
        //         codBairro: 149,
        //         descBairro: "ALVORADA",
        //         codCid: 243,
        //         descCid: "MANAUS",
        //         codEst: 4,
        //         descEst: "Amazonas",
        //         codPais: 31,
        //         descPais: "BRASIL",
        //         cep: 69043790,
        //         endInternacional: null,
        //         indCorrespond: null,
        //         principal: 1,
        //         codigoMunicipioRM: null,
        //         tpOperacao: null,
        //         autorizaCorrespondencia: null,
        //         isEmptyCep: false,
        //         isEmptyDescEndereco: false,
        //         isEmptyDescBairro: false,
        //         isEmptyMunicipio: false
        //       }
        //     ],
        //     //Atendimento
        //     atendente: "Karimem Monteiro Cavalcante",
        //     unidade: "",
        //     tema: "",
        //     projeto: "",
        //     tipoAtendimento: "",
        //     canaAtendimento: "",
        //     descAtendimento: "",
        //     pendencias: ""


        //   }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >

        <div style={contentStyle}>{steps[current].content}</div>
      </Form>
    </div>
  );
};
