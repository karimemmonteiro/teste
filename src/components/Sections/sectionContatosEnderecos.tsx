import { Button, Card, Checkbox, CheckboxProps, Divider, Form, Input, InputNumber, Select, SelectProps, Space } from "antd";
import { useState } from "react";
import { RequiredMark } from "antd/es/form/Form";
import { CloseOutlined } from '@ant-design/icons';
import InputMask from "react-input-mask";

export default function SectionContatosEnderecos() {
    const [form] = Form.useForm();
    const [, setRequiredMarkType] = useState<RequiredMark>('optional');
    const [principal, setPrincipal] = useState(false);
    const [recebeContato, setRecebeContato] = useState(false);
    const [autorizaMensagem, setAutorizaMensagem] = useState(false);
    const [autorizaLigacao, setAutorizaLigacao] = useState(false);

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
    const onChange: CheckboxProps['onChange'] = (e) => {
        setPrincipal(e.target.checked);
    };
    
    return (
        <section className="w-svw flex flex-col justify-start items-center p-5">
            <Divider orientation="left" plain>
                <h1 className=" text-azulSebrae font-bold text-lg ">Telefone(s) & E-mail(s)</h1>
            </Divider>
            <div className="w-full grid grid-cols-2  gap-x-2 ">
                <Form.List name="telefone">
                    {(fields, { add, remove }) => (

                        <div style={{ display: 'flex', rowGap: 4, flexDirection: 'column' }}>
                            {fields.map((field, index) => (
                                <Card
                                    size="small"
                                    title={`Telefone ${index + 1}`}
                                    key={field.key}
                                    extra={
                                        <CloseOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    }
                                >
                                    <Form.Item
                                        name={[field.name, 'numero']}
                                        rules={[{ required: true, message: 'Obrigatorio digitar o Numero' }]}
                                    >
                                        <InputMask
                                            mask="(99)99999-9999"
                                            className="w-full h-8 flex flex-row items-center border-0 rounded border-neutralSebrae px-2 hover:border-azulSebrae  focus:border-azulSebrae focus:outline-azulSebrae focus:ring focus:ring-azulSebrae"
                                        />
                                    </Form.Item>
                                    <div className="wfull flex flex-row ">

                                        <Form.Item
                                            name={[field.name, 'principal']}
                                            valuePropName="checked"
                                        >
                                            <Checkbox
                                                className="flex-none"
                                                checked={principal}
                                                onChange={onChange}
                                            >
                                                Principal
                                            </Checkbox>
                                        </Form.Item>
                                        <Form.Item
                                            name={[field.name, 'autorizaMensagem']}
                                            valuePropName="checked"
                                        >
                                            <Checkbox
                                                className="flex-none"
                                                checked={autorizaMensagem}
                                                onChange={onChange}
                                            >
                                                Autorizo Mensagem
                                            </Checkbox>
                                        </Form.Item>
                                        <Form.Item
                                            name={[field.name, 'autorizaLigacao']}
                                            valuePropName="checked"
                                        >
                                            <Checkbox
                                                className="flex-none"
                                                checked={autorizaLigacao}
                                                onChange={onChange}
                                            >
                                                Autorizo Ligações
                                            </Checkbox>
                                        </Form.Item>
                                    </div>
                                </Card>
                            ))}

                            <Button type="dashed" onClick={() => add()} block>
                                + Telefone
                            </Button>
                        </div>
                    )}
                </Form.List>
              
                <Form.List name="email">
                    {(fields, { add, remove }) => (
                        <div style={{ display: 'flex', rowGap: 4, flexDirection: 'column' }}>
                            {fields.map((field, index) => (
                                <Card
                                    size="small"
                                    title={`Email ${index + 1}`}
                                    key={field.key}
                                    extra={
                                        <CloseOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    }
                                >
                                    <Form.Item name={[field.name, 'numero']} rules={[{ type: 'email' }]}>
                                        <Input />
                                    </Form.Item>
                                    <div className="wfull flex flex-row ">
                                        <Form.Item
                                            name={[field.name, 'recebeContato']}
                                            valuePropName="checked"
                                        >
                                            <Checkbox
                                                className="flex-none"
                                                checked={recebeContato}
                                                onChange={onChange}
                                            >
                                                Autorizo E-mails
                                            </Checkbox>
                                        </Form.Item>
                                    </div>
                                </Card>
                            ))}

                            <Button type="dashed" onClick={() => add()} block>
                                + Email
                            </Button>
                        </div>
                    )}
                </Form.List>
            </div>
            <Divider orientation="left" plain>
                <h1 className=" text-azulSebrae font-bold text-lg ">Endereços</h1>
            </Divider>
            <div className="w-full">
                <Form.List name="clienteEnderecos">
                    {(fields, { add, remove }) => (
                        <div style={{ display: 'flex', rowGap: 4, flexDirection: 'column' }}>
                            {fields.map((field, index) => (
                                <Card
                                    size="small"
                                    title={`Endereço ${index + 1}`}
                                    key={field.key}
                                    extra={
                                        <CloseOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    }
                                >
                                    <div className="grid grid-cols-12 gap-2">
                                        <Form.Item
                                            className="col-span-2"
                                            name={[field.name, 'cep']}
                                            rules={[{ required: true, message: 'Obrigatorio digitar o CEP' }]}
                                        >
                                            <InputMask
                                                mask="99999-999"
                                                maskChar={null}
                                                placeholder="CEP"
                                                className="w-full h-8 flex flex-row items-center border-0 rounded border-neutralSebrae px-2 hover:border-azulSebrae  focus:border-azulSebrae focus:outline-azulSebrae focus:ring focus:ring-azulSebrae"

                                            />
                                        </Form.Item>
                                        <Form.Item
                                            className="col-span-2"
                                            name={[field.name, 'descBairro']}
                                            rules={[{ required: true, message: 'Obrigatorio digitar o Bairro' }]}
                                        >
                                            <Input
                                                placeholder="Bairro"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            className="col-span-7"
                                            name={[field.name, 'descEndereco']}
                                            rules={[{ required: true, message: 'Obrigatorio digitar o Bairro' }]}
                                        >
                                            <Input
                                                placeholder="Endereço"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            className="col-span-1"
                                            name={[field.name, 'numero']}
                                            rules={[{ required: true, message: 'Obrigatorio digitar o numero' }]}
                                        >
                                            <InputNumber
                                                placeholder="Numero"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            className="col-span-2"
                                            name={[field.name, 'descEst']}
                                            rules={[{ required: true, message: 'Obrigatorio digitar o Estado' }]}
                                        >
                                            <Input
                                                placeholder="Estado"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            className="col-span-2"
                                            name={[field.name, 'descCid']}
                                            rules={[{ required: true, message: 'Obrigatorio digitar o Município' }]}
                                        >
                                            <Input
                                                placeholder="Município"
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            className="col-span-8"
                                            name={[field.name, 'complemento']}
                                        >
                                            <Input
                                                placeholder="Complemento"
                                            />
                                        </Form.Item>
                                    </div>

                                </Card>
                            ))}

                            <Button type="dashed" onClick={() => add()} block>
                                + Endereço
                            </Button>
                        </div>
                    )}
                </Form.List>
            </div>
            <div className="w-full flex flex-row justify-end items-center  ">
                <Button htmlType="submit" className="bg-green text-white flex flex-row items-center h-10 font-bold">
                    Salvar e Proceguir
                    {/* <DoubleRightOutlined /> */}
                </Button>
            </div>

        </section>
    )
}