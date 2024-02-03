import { Button, Divider, Form, Input, InputNumber, Select, SelectProps } from "antd";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { useState } from "react";
import { RequiredMark } from "antd/es/form/Form";
import InputMask from "react-input-mask";

export default function SectionContatosEnderecos() {
    const [form] = Form.useForm();
    const [, setRequiredMarkType] = useState<RequiredMark>('optional');

    const options: SelectProps['options'] = [];

    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    const handleChange = (value: string | string[]) => {
        console.log(`Selected: ${value}`);
    };

    const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
        setRequiredMarkType(requiredMarkValue);
    };
    return (
        <section className="w-svw flex flex-col justify-start items-start h-[48rem] ">

            <Form
                form={form}
                layout="vertical"
                className=" w-svw  px-10 justify-start flex flex-col "
                initialValues={
                    {
                        cpf: "014.246.572-02",
                        nome: "Karimem Monteiro Cavalcante",
                        dataDeNascimento: "21/05/1994",
                        telefone: "92982540365",
                        email: "contatokarimem@gmail.com"
                    }}
                onValuesChange={onRequiredTypeChange}
            >
                <Divider orientation="left" plain>
                    <h1 className=" text-azulSebrae font-bold text-2xl ">Telefone(s) & E-mail(s)</h1>
                </Divider>
                <div className="grid grid-cols-2  gap-x-4 ">
                    <Form.Item
                        name="telefone"
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>Telefone</span>
                            </div>
                        }
                        required>
                        <div className="flex flex-row items-center border-0 rounded border-neutralSebrae px-2 hover:border-azulSebrae  focus:border-azulSebrae focus:outline-azulSebrae focus:ring focus:ring-azulSebrae">

                            <InputMask
                                mask="(99)99999-9999"
                                maskChar={null}
                                className="w-full h-10 rounded text-lg bg-violet-500 hover:bg-transparent active:bg-transparent focus:outline-none focus:ring focus:ring-transparent"
                                placeholder="Digite o Telefone"
                            />
                        </div>
                    </Form.Item>

                    <Form.Item
                        name="email"
                        required
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>E-mail</span>
                            </div>
                        }>
                        <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite um email" />
                    </Form.Item>
                </div>
                <Divider orientation="left" plain>
                    <h1 className=" text-azulSebrae font-bold text-2xl ">Endereços</h1>
                </Divider>
                <div className="grid grid-cols-12  gap-x-4 ">
                    <Form.Item
                        className="col-span-3"
                        name="cep"
                        required
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>CEP</span>
                            </div>
                        }>
                        <div className="flex flex-row items-center border-0 rounded border-neutralSebrae px-2 hover:border-azulSebrae  focus:border-azulSebrae focus:outline-azulSebrae focus:ring focus:ring-azulSebrae">

                            <InputMask
                                mask="99999-999"
                                maskChar={null}
                                className="w-full h-10 rounded text-lg bg-violet-500 hover:bg-transparent active:bg-transparent focus:outline-none focus:ring focus:ring-transparent"
                                placeholder="Digite o CEP"
                            />
                        </div>
                    </Form.Item>
                    <Form.Item
                        className="col-span-3"
                        name="bairro"
                        required
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>Bairro</span>
                            </div>
                        }>
                        <InputNumber className=" w-full h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite o Bairro" />
                    </Form.Item>

                    <Form.Item
                        className="col-span-4"
                        name="rua"
                        required
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>Rua</span>
                            </div>
                        }>
                        <InputNumber className=" w-full h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite a Rua" />
                    </Form.Item>

                    <Form.Item
                        className="col-span-2"
                        name="numero"
                        required
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>Numero</span>
                            </div>
                        }>
                        <InputNumber className=" w-full h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite Numero" />
                    </Form.Item>

                    <Form.Item
                        className="col-span-3"
                        name="estado"
                        required
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>Estado</span>
                            </div>
                        }>
                        <InputNumber className=" w-full h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite o Estado" />
                    </Form.Item>

                    <Form.Item
                        className="col-span-3"
                        name="municipio"
                        required
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>Município</span>
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
                        className="col-span-6"
                        name="complemento"
                        required
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <span>Complemento</span>
                            </div>
                        }>
                        <InputNumber className=" w-full h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite um complemento" />
                    </Form.Item>
                </div>
                <div className="w-full flex flex-row justify-between items-center  ">
                    <Button className="bg-azulSebrae text-white flex flex-row items-center h-10 font-bold">
                        <DoubleLeftOutlined />
                        Pessoa Juridica
                    </Button>

                    <Button className="bg-green text-white flex flex-row items-center h-10 font-bold">
                        Salvar e Proceguir
                        <DoubleRightOutlined />
                    </Button>
                </div>

            </Form>
        </section>
    )
}