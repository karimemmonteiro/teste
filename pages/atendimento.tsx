import React, { useEffect, useRef } from 'react';
import 'moment/locale/pt-br';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { Button, Form, Steps, message } from "antd";
import { useState } from "react";
import SectionsBuscarCpf from "../components/Sections/sectionsBuscarCpf";
import SectionPessoaJuridica from '../components/Sections/sectionPessoaJuridica';
import SectionContatosEnderecos from '../components/Sections/sectionContatosEnderecos';
import SectionAtendimento from '../components/Sections/sectionAtendimento';
import { apiNext } from '../config/connection';
import GetDadosPorCpf from '../ultils/functions/getDadosPorCpfOnline';
import SectionPessoaFisica from '../components/Sections/sectionPessoaFisica';
import GetDadosPorCpfOffline from '../ultils/functions/getDadosOffline';
import MontagemObjetoForm from '../ultils/functions/formSections';

export default function Atendimento(props) {
  dayjs.locale('pt-br');
  const [current, setCurrent] = useState(0);
  const formRef = useRef(null);
  const [cpf, setCpf] = useState("");

  const dadosCpf = async (data) => {
    setCpf(data)
    if (navigator.onLine) {
      const dados = await GetDadosPorCpf(data);
      formRef.current.setFieldsValue(dados);
      // setCurrent(current + 1);
    } else {
      const dadosOffline = await GetDadosPorCpfOffline(data)
      await formRef.current.setFieldsValue(dadosOffline);
      setCurrent(current + 1);
    }
  };


  const dadosPf = (data) => {
    console.log("teste current", current)
  };

  const steps = [
    {
      title: 'Buscar CPF',
      content: <SectionsBuscarCpf dadosCpf={dadosCpf} />,
    },
    {
      title: 'Pessoa Fisica',
      content: <SectionPessoaFisica form={formRef.current} dadosPf={dadosPf} />,
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


  const onFinish = async (values: any) => {
    if (current > 0) {
      const form = formRef.current
      const formData = await MontagemObjetoForm(form, values)
      console.log("teste dados=======", formData)
      if (current === 4) {

        salvarDados(formData.dados)
      }
    }

    setCurrent(current + 1)

  }
  async function salvarDados(params: any) {
    try {
      const response = await apiNext.post("/atendimento/create", params
      );
      const responseData = response.data;
      console.log("teste post", responseData)
      if (responseData.status === 200) {
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
      >

        <div style={contentStyle}>{steps[current]?.content}</div>
      </Form>
    </div>
  );
};
