import React, {  useRef } from 'react';
import 'moment/locale/pt-br';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { Form, Steps,} from "antd";
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
import useOnline from '../ultils/contants/onlineOffline';

export default function Atendimento(props) {
  const isOnline = useOnline();
  dayjs.locale('pt-br');
  const [current, setCurrent] = useState(0);
  const formRef = useRef(null);

  const dadosCpf = async (data) => {
      const dados = await GetDadosPorCpf(data);
      formRef.current.setFieldsValue(dados);
      // setCurrent(current + 1);
  };


  const dadosPf = (data) => {
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
      if (current === 4) {
        await salvarDados(formData.dados)
      }
    }

    setCurrent(current + 1)

  }
  async function salvarDados(params: any) {
    try {
      const response = await apiNext.post("/atendimento/create", params
      );
      const responseData = response.data;
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
