import { Button, Checkbox, CheckboxProps, Form, Input, } from "antd";
import 'moment/locale/pt-br';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import { useState, useEffect, useRef } from "react";
import ModalPoliticaPrivacidade from "../Modais/modalTermos";
import { DatePicker, Space } from 'antd';

export default function SectionPessoaFisica({ dadosPf, form }) {
    const [todosCamposPreenchidos, setTodosCamposPreenchidos] = useState(false);
    const dataNascimento = typeof window !== 'undefined' ? localStorage.getItem('dataNascimento') : null;
    const [lgpd, setLgpd] = useState(false)
    const [nome, setNome] = useState("")
    const [estudante, setEstudante] = useState(false);
    const [produtorRural, setProdutorRural] = useState(false);
    const dateFormat = 'DD/MM/YYYY'
    useEffect(() => {
        // const camposObrigatorios = ["lgpt"];
        // const todosPreenchidos = camposObrigatorios.every(campo => form?.getFieldValue(campo));

        if (form) {
            const dadosForm = form?.getFieldValue()
            const validador = true
            
            setTodosCamposPreenchidos(validador);
        }
    }, [])
    const toggleEstudante = () => {
        setEstudante(!estudante);
    };
    const toggleProdutorRural = () => {
        setProdutorRural(!produtorRural);
    };

    function OnchangeName(event) {
        setNome(event.target.value)
    }

    const onChange: CheckboxProps['onChange'] = (e) => {
        setEstudante(e.target.checked);
    };
    return (
        <div className="w-svw flex flex-col items-center h-full p-5 relative">
            <div className="flex flex-col w-full">
                <div className="text-azulSebrae gap-1 flex">
                    {/* <IdcardOutlined style={{ fontSize: "1rem" }} /> */}
                    <h3>CPF</h3>
                    <h3 className="text-red">*</h3>
                </div>
                <Form.Item
                    className="w-full flex flex-col"

                    name="cpf"
                    required
                >
                    <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" disabled placeholder="Digite o CPF" />
                </Form.Item>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full">
                <div className="flex flex-col w-full">
                    <div className="text-azulSebrae gap-1 flex">
                        {/* <UserOutlined /> */}
                        <h3>Nome Completo</h3>
                        <h3 className="text-red">*</h3>
                    </div>
                    <Form.Item
                        name="nome"
                        required>
                        <Input onChange={(event) => OnchangeName(event)} className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite nome completo" />
                    </Form.Item>
                </div>
                <div className="flex flex-col w-full">
                    <div className="text-azulSebrae gap-1 flex">
                        {/* <GiftFilled /> */}
                        <h3>Data de Nascimento</h3>
                        <h3 className="text-red">*</h3>
                    </div>
                    <Form.Item
                        name="dataNascimento"
                        required
                    >
                        <DatePicker format={dateFormat} defaultValue={dayjs(dataNascimento, dateFormat)} className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae w-full" />
                    </Form.Item>
                </div>
            </div>
            <div className="w-full flex flex-row items-center gap-4">
                <div>
                    <Form.Item name="estudante"
                        valuePropName="checked">
                        <Checkbox
                            className="flex-none"
                            checked={estudante}
                            onChange={onChange}
                        >
                            Sou Estudante
                        </Checkbox>
                    </Form.Item>

                </div>
                <div>
                    <Form.Item
                        name="produtorRural"
                        valuePropName="checked"
                    >
                        <Checkbox
                            className="flex-none"
                            checked={produtorRural}
                            onChange={onChange}
                        >
                            Sou Produtor Rural
                        </Checkbox>
                    </Form.Item>
                </div>

            </div>

            {/* <div className={verificacaoFormulario ? "w-full flex flex-row justify-end fixed bottom-0 right-0 p-10 gap-4" : " invisible"}>
                <Form.Item>
                    <ModalPoliticaPrivacidade />
                </Form.Item>
            </div> */}
            <div className="fixed right-5 bottom-0 flex flex-row  p-0 m-0 gap-5">
                <Form.Item
                    name="lgpd"
                    valuePropName="checked"
                >
                    <Checkbox onChange={() => setLgpd(!lgpd)}>
                        <ModalPoliticaPrivacidade />
                    </Checkbox>
                </Form.Item>
                <Button
                    disabled={!todosCamposPreenchidos}
                    htmlType="submit"
                    className="bg-green text-white flex flex-row items-center h-10 font-bold"
                >
                    Salvar e Prosseguir
                </Button>
            </div>
        </div>
    )
}