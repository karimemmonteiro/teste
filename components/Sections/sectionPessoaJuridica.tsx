import { Button, DatePicker, Form, Input, InputNumber, Select, SelectProps } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { RequiredMark } from "antd/es/form/Form";
import { useDispatch } from "react-redux";

export default function SectionPessoaJuridica() {
    const dataCriacao = typeof window !== 'undefined' ? localStorage.getItem('dataCriacao') : null;
    const dispatch = useDispatch();
    const [, setRequiredMarkType] = useState<RequiredMark>('optional');
    const dateFormat = 'DD/MM/YYYY';

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


    };

    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed:', errorInfo);
    };
    return (
        <div className="w-svw flex flex-col h-full p-5">
            <header className="w-full pb-5">
                <h1 className=" text-azulSebrae font-bold ">Dados do CNPJ Vinculado</h1>
            </header>
            <div>
                <div className="text-azulSebrae gap-1 flex">
                    <h3>Razão Social</h3>
                </div>
                <Form.Item
                    name="razaoSocial"
                    required
                >
                    <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite a Razão Social" />
                </Form.Item>
            </div>
            <div className="grid grid-cols-2  gap-x-4 ">
                <div>
                    <div className="text-azulSebrae gap-1 flex">
                        <h3>CNPJ</h3>
                    </div>
                    <Form.Item
                        name="cnpj"
                        required>
                        <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite o CNPJ" />
                    </Form.Item>
                </div>
                <div>
                    <div className="text-azulSebrae gap-1 flex">
                        <h3>Nome Fantasia</h3>
                    </div>
                    <Form.Item
                        name="nomeFantasia"
                        required>
                        <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite nome fantasia" />
                    </Form.Item>
                </div>
                <div>
                    <div className="text-azulSebrae gap-1 flex">
                        <h3>Data de Criação</h3>
                    </div>
                    <Form.Item
                        name="dataCriacaoRelatorio"
                        required
                    >
                        <DatePicker defaultValue={dayjs(dataCriacao, dateFormat)} format={dateFormat} className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae w-full" />
                    </Form.Item>
                </div>
                <div>
                    <div className="text-azulSebrae gap-1 flex">
                        <h3>Situação Receita</h3>
                    </div>
                    <Form.Item
                        name="descricaoStatusReceita"
                        required
                    >
                        <Select
                            className=" w-full h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae"
                            onChange={handleChange}
                            options={[{
                                label: "Validado", value: "Validado"
                            }, {
                                label: "Invalido", value: "Invalido"
                            }]}
                        />
                    </Form.Item>
                </div>
                <div>
                    <div className="text-azulSebrae gap-1 flex">
                        <h3>Porte da Empresa</h3>
                    </div>
                    <Form.Item
                        name="descPorte"
                        required
                    >
                        <Select
                            className=" w-full h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae"
                            defaultValue="a1"
                            onChange={handleChange}
                            options={options}
                        />
                    </Form.Item>

                </div>
                <div>
                    <div className="text-azulSebrae gap-1 flex">
                        <h3>Quantidade Funcionários</h3>
                    </div>
                    <Form.Item
                        name="quantidadeFuncionarios"
                        required>
                        <InputNumber className=" w-full h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Quantidade de Funcionários" />
                    </Form.Item>
                </div>
                <div>
                    <div className="text-azulSebrae gap-1 flex">
                        <h3>Natureza da Empresa</h3>
                    </div>
                    <Form.Item
                        name="descNaturezaJuridica"
                        required>
                        <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite a Natureza da Empresa" />
                    </Form.Item>
                </div>
                <div>
                    <div className="text-azulSebrae gap-1 flex">
                        <h3>Atividade Econômica</h3>
                    </div>
                    <Form.Item name="atividade" className="h-auto min-h-11" required>
                        <Select
                            mode="multiple"
                            className="w-full h-auto rounded text-lg"
                            placeholder="Digite as atividades Econômicas"
                            options={[
                                { value: 'teste01', label: 'teste01' },
                                { value: 'teste02', label: 'teste02' },
                                { value: 'teste03', label: 'teste03' },
                                { value: "Comércio varejista especializado de equipamentos e suprimentos de informática", label: "Comércio varejista especializado de equipamentos e suprimentos de informática" }
                            ]}
                        />
                    </Form.Item>

                </div>
                <div className="fixed right-5 bottom-5 flex flex-row  p-0 m-0 gap-5">

                    <Button
                        htmlType="submit"
                        className="bg-green text-white flex flex-row items-center h-10 font-bold"
                    >
                        Salvar e Prosseguir
                    </Button>
                </div>
            </div>

        </div>
    )
}