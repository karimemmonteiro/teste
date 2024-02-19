
import { Button, Form, Tooltip } from "antd";
import { useState } from "react";
import InputMask from "react-input-mask";

export default function SectionsBuscarCpf({ dadosCpf }) {
    const [cpf, setCpf] = useState('')
    type FieldType = {
        cpf: string;
    };

    
    const validacaoBusca = cpf.length === 14


    return (
        <div className="w-svw flex flex-row justify-center p-5 gap-4">

            <div className="w-full">
                <Form.Item
                    name="cpf"
                    rules={[{ required: true, message: 'Obrigatorio digitar o CPF!' }]}
                >
                    <div className="flex flex-row items-center border-0 rounded border-neutralSebrae px-2 hover:border-azulSebrae  focus:border-azulSebrae focus:outline-azulSebrae focus:ring focus:ring-azulSebrae">
                        <InputMask
                            onChange={(event) => setCpf(event.target.value)}
                            mask="999.999.999-99"
                            maskChar={null}
                            className="w-full h-16 rounded text-2xl bg-violet-500 hover:bg-transparent active:bg-transparent focus:outline-none focus:ring focus:ring-transparent"
                            placeholder="CPF"
                        />
                        <Tooltip title="Extra information">
                            {/* <IdcardOutlined style={{ color: 'rgba(0,0,0,.45)', fontSize: '2rem' }} /> */}
                        </Tooltip>
                    </div>
                </Form.Item>
            </div>
            <div>
                <Button disabled={!validacaoBusca} onClick={() => dadosCpf(cpf)} className="bg-azulSebrae  rounded h-16 text-2xl flex flex-row items-center gap-2 w-36 " type="primary" htmlType="submit">
                    Buscar
                </Button>
            </div>
        </div>
    )
}