
import React, { useEffect } from 'react';
import { Button, Steps, message, theme } from "antd";
import { useState } from "react";
import SectionsBuscarCpf from "../components/Sections/sectionsBuscarCpf";
import SectionPessoaFisica from "../components/Sections/sectionPessoaFisica";
import SectionPessoaJuridica from "../components/Sections/sectionPessoaJuridica";
import SectionContatosEnderecos from "../components/Sections/sectionContatosEnderecos";
import SectionAtendimento from "../components/Sections/sectionAtendimento";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setStep } from '../Redux/actions/stepAtendimentoAction';

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
  const dispatch = useDispatch();
  const { token } = theme.useToken();
  const storedCpf = useSelector((state: any) => state.cpf);
  const storedStep = useSelector((state: any) => state.step);
  const [current, setCurrent] = useState(storedStep.step);
  const dadosPessoaFisica = useSelector((state: any)=> state.dadosPessoaFisica)

  const next = () => {
    setCurrent(storedStep.step + 1);
    dispatch(setStep(storedStep.step + 1))
  };

  const prev = () => {
    setCurrent(storedStep.step - 1);
    dispatch(setStep(storedStep.step - 1))
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
    console.log("teste cpf reduz", storedStep, storedCpf)
    if(storedCpf !== ""){
      setCurrent(storedStep.step)
    }
  },[storedStep])

  console.log("teste current", current)


  return (
    <div className="px-5 py-5 overflow-y-hidden overflow-x-hidden over">
      <Steps current={storedStep.step} items={items} />
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
      <div style={contentStyle}>{steps[current].content}</div>
    </div>
  );
};
