import { Progress } from "antd";
import { useState } from "react";
import { motion } from "framer-motion";
import SectionsBuscarCpf from "../components/Sections/sectionsBuscarCpf";
import SectionPessoaFisica from "../components/Sections/sectionPessoaFisica";
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export default function Atendimento() {
  const [activeSection, setActiveSection] = useState("SectionsBuscarCpf");

  return (
    <div>
      <header className="w-12/12 border-b border-neutralSebrae flex flex-row justify-between">
        <div className="w-4/12 p-2">
          <div onClick={() => setActiveSection("SectionPessoaFisica")} className="flex flex-row gap-2 items-center text-textAzulSebrae font-bold">
            <Progress size={[30, 10]} type="circle" percent={100} />
            Pessoa fisica
          </div>
          <Progress percent={100} showInfo={false} />
        </div>
        <div className="w-4/12 p-2">
          <div className="flex flex-row gap-2 items-center">
            <Progress size={[30, 10]} type="circle" percent={0} />
            Pessoa Juridica
          </div>
          <Progress percent={0} showInfo={false} />
        </div>
        <div className="w-4/12 p-2">
          <div className="flex flex-row gap-2 items-center">
            <Progress size={[30, 10]} type="circle" percent={0} />
            Contatos e endereços
          </div>
          <Progress percent={0} showInfo={false} />
        </div>
        <div className="w-4/12 p-2">
          <div className="flex flex-row gap-2 items-center">
            <Progress size={[30, 10]} type="circle" percent={0} />
            Atendimento
          </div>
          <Progress percent={0} showInfo={false} />
        </div>
      </header>
      <div className="flex flex-row w-full justify-center items-center h-[48rem] ">
        {activeSection === "SectionsBuscarCpf" && (
          <motion.div
            key="SectionsBuscarCpf"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <SectionsBuscarCpf />
          </motion.div>
        )}
        {activeSection === "SectionPessoaFisica" && (
          <motion.div
            key="SectionPessoaFisica"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <SectionPessoaFisica />
          </motion.div>
        )}
      </div>
    </div>
  );
};
