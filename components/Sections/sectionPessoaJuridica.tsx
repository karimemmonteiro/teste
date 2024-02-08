import { Button, DatePicker, Form, Input, InputNumber, Select, SelectProps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { RequiredMark } from "antd/es/form/Form";
import { useDispatch } from "react-redux";
import { setStep } from "../../Redux/actions/stepAtendimentoAction";

export default function SectionPessoaJuridica() {
    const dispatch = useDispatch();
    const [, setRequiredMarkType] = useState<RequiredMark>('optional');
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']

    const options: SelectProps['options'] = [];

    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    const handleChange = (value: string | string[]) => {
    };

    const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
        setRequiredMarkType(requiredMarkValue);
    };

    const onFinish = (values: any) => {
        dispatch(setStep(3));
        // const data = {
        //     pfCpf: "01424657202",
        //     pfNome: nome,
        //     pfDataNascimento: dataNacimento,
        //     pfTelefone: telefone,
        //     pfEmail: email,
        //     pfAceiteTermo: dadosPessoaFisica.pfAceiteTermo,
        //     pfEstudante: estudante,
        //     pfProdutorRural: produtorRural
        // }
        // if (dadosPessoaFisica.pfAceiteTermo) {
        //     dispatch(updatePessoaFisica(
        //         data
        //     ));
        // }


    };

    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed:', errorInfo);
    };
    return (
        <section className="w-svw flex flex-col items-center justify-start h-full">
            <header className="w-full px-10  ">
                <h1 className=" text-azulSebrae font-bold ">Dados do CNPJ Vinculado</h1>
            </header>
            <Form
                name="formularioDadosPessoajuridica"
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className=" w-svw  p-10 justify-start flex flex-col "
                initialValues={
                    {
                        razaoSocial: "",
                        cnpj: "",
                        nomeFantasia: "",
                        dataCriacao: "",
                        situação: "",
                        porte: "",
                        funcionarios: 0,
                        natureza: "",
                        atividade: []
                    }}
                onValuesChange={onRequiredTypeChange}
            >
                <Form.Item
                    name="razaoSocial"
                    required
                    label={
                        <div className="text-azulSebrae gap-1 flex">
                            <span>Razão Social</span>
                        </div>
                    }

                >
                    <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite a Razão Social" />
                </Form.Item>

                <div className="grid grid-cols-2  gap-x-4 ">
                    <Form.Item
                        name="cnpj"
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>CNPJ</span>
                            </div>
                        }
                        required>
                        <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite o CNPJ" />
                    </Form.Item>

                    <Form.Item
                        name="nomeFantasia"
                        required
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>Nome Fantasia</span>
                            </div>
                        }>
                        <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite nome fantasia" />
                    </Form.Item>

                    <Form.Item
                        name="dataDeCriacao"
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>Data de Criação</span>
                            </div>
                        }
                        required
                    >
                        <DatePicker defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae w-full" />
                    </Form.Item>

                    <Form.Item
                        name="situacaoReceita"
                        required
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>Situação Receita</span>
                            </div>
                        }
                    >
                        <Select
                            className=" w-full h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae"
                            defaultValue="a1"
                            onChange={handleChange}
                            options={options}
                        />
                    </Form.Item>

                    <Form.Item
                        name="porteDaEmpresa"
                        required
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>Porte da Empresa</span>
                            </div>
                        }
                    >
                        <Select
                            className=" w-full h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae"
                            defaultValue="a1"
                            onChange={handleChange}
                            options={options}
                        />
                    </Form.Item>

                    <Form.Item
                        name="quantidadeFuncionario"
                        required
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>Quantidade Funcionários</span>
                            </div>
                        }>
                        <InputNumber className=" w-full h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Quantidade de Funcionários" />
                    </Form.Item>

                    <Form.Item
                        name="naturezaJuridica"
                        required
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>Natureza da Empresa</span>
                            </div>
                        }>
                        <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite a Natureza da Empresa" />
                    </Form.Item>
                    <Form.Item
                        name="atividadeEconomica"
                        required
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>Atividade Econômica</span>
                            </div>
                        }>
                        <Select
                            mode="multiple"
                            className=" w-full h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae"
                            defaultValue={['teste01']}
                            placeholder="Digite as atividades Econômicas"
                            style={{ flex: 1 }}
                            options={[
                                { value: 'teste01', label: 'teste01' },
                                { value: 'teste02', label: 'teste02' },
                                { value: 'teste03', label: 'teste03' },
                            ]}
                        />
                    </Form.Item>

                </div>
                <div className="w-full flex flex-row justify-end items-center  ">

                    <Button htmlType="submit" className="bg-green text-white flex flex-row items-center h-10 font-bold">
                        Salvar e Proceguir
                        {/* <DoubleRightOutlined /> */}
                    </Button>
                </div>

            </Form>
        </section>
    )
}