
import React, { useEffect } from 'react';
import { Button, Steps, message, theme } from "antd";
import { useState } from "react";
import SectionsBuscarCpf from "../components/Sections/sectionsBuscarCpf";
import SectionPessoaFisica from "../components/Sections/sectionPessoaFisica";
import SectionPessoaJuridica from "../components/Sections/sectionPessoaJuridica";
import SectionContatosEnderecos from "../components/Sections/sectionContatosEnderecos";
import SectionAtendimento from "../components/Sections/sectionAtendimento";
import { FieldTimeOutlined, FileTextFilled, IdcardFilled, InfoCircleFilled } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const steps = [
  {
    title: 'Buscar CPF',
    content: <SectionsBuscarCpf />,
  },
  {
    title: 'Pessoa Fisica',
    content: <SectionPessoaFisica />,
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

export default function Atendimento2() {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const storedCpf = useSelector((state: any) => state.cpf);
  const dadosPessoaFisica = useSelector((state: any)=> state.dadosPessoaFisica)

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
    justifyContent: "center",
    alignItems: "center"
  };
  useEffect(() => {
    console.log("teste cpf reduz", storedCpf)
    if (storedCpf !== "" && current === 0){
      setCurrent(storedCpf.step);
    }
  },[storedCpf])


  return (
    <div className="px-5 py-5 overflow-y-hidden overflow-x-hidden over">
      <Steps current={current} items={items} />
      <div className="w-full flex flex-row justify-between items-center py-5">
        {current > 0 && (

          <Button className="bg-azulSebrae text-white" onClick={() => prev()}>
            Voltar
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Salvar
          </Button>
        )}
        {current > 1 - 1 && (
          <Button className="bg-azulSebrae text-white" onClick={() => next()}>
            Proxima
          </Button>
        )}

      </div>
      <div style={contentStyle}>{steps[current].content}</div>
    </div>
  );
};
