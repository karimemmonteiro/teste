import { Button, Divider, Form, Input, Select, SelectProps, Tabs, TabsProps } from "antd";

export default function SectionAtendimento() {
    const { TextArea } = Input;
    type FieldType = {
        cpf: string;
    };

    const onFinish = (values: any) => {
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed:', errorInfo);
    };
    function Atendimento() {
        const options: SelectProps['options'] = [];

        for (let i = 10; i < 36; i++) {
            options.push({
                value: i.toString(36) + i,
                label: i.toString(36) + i,
            });
        }

        const handleChange = (value: string | string[]) => {
        };
        return (
            <section className="w-full p-5 h-full">

                <div className="w-full">
                    <div className="grid grid-cols-3 gap-x-4 gap-y-1">
                        <Form.Item
                            label={
                                <div className="text-azulSebrae gap-1 flex">
                                    <label>Atendente</label>
                                    <label className="text-red">*</label>
                                </div>
                            }
                            name="atendente"

                        >
                            <Input disabled className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" />
                        </Form.Item>

                        <Form.Item
                            name="unidadeOrganizacional"
                            required
                            label={
                                <div className="text-azulSebrae gap-1 flex">
                                    <label>Unidade Organizacional</label>
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
                            name="tema"
                            required
                            label={
                                <div className="text-azulSebrae gap-1 flex">
                                    <label>Tema</label>
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
                            name="projetoAcao"
                            label={
                                <div className="text-azulSebrae gap-1 flex">
                                    <label>Projeto | Ação</label>
                                    <label className="text-red">*</label>
                                </div>
                            }
                        >
                            <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite o Projeto ou ação" />
                        </Form.Item>

                        <Form.Item
                            name="tipoAtendimento"
                            required
                            label={
                                <div className="text-azulSebrae gap-1 flex">
                                    <label>Tipo de Atendimento</label>
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
                            name="canalAtendimento"
                            required
                            label={
                                <div className="text-azulSebrae gap-1 flex">
                                    <label>Canal de Atendimento</label>
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
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <Form.Item
                            name="descricao"
                            required
                            label={
                                <div className="text-azulSebrae gap-1 flex">
                                    <label>Descrição do Atendimento</label>
                                    {/* <IdcardFilled /> */}
                                </div>
                            }
                        >
                            <TextArea showCount className="h-11 rounded  hover:border-azulSebrae focus:border-azulSebrae" rows={3} placeholder="Insira a Descrição do Atendimento" maxLength={254} />
                        </Form.Item>
                        <Form.Item
                            name="pendencias"
                            label={
                                <div className="text-azulSebrae gap-1 flex">
                                    <label>Pendencias</label>
                                    {/* <InfoCircleFilled /> */}
                                </div>
                            }
                        >
                            <TextArea showCount className="h-11 rounded  hover:border-azulSebrae focus:border-azulSebrae" rows={3} placeholder="Insira as pendencias" maxLength={254} />
                        </Form.Item>

                    </div>
                    <Divider orientation="center" plain>
                        <h1 className=" text-azulSebrae font-bold text-2xl ">Anexos do Atendimento</h1>
                    </Divider>
                    <div className="w-full flex flex-row justify-end items-center  ">
                        <Button htmlType="submit" className="bg-green text-white flex flex-row items-center h-10 font-bold">
                            Salvar e Proceguir
                            {/* <DoubleRightOutlined /> */}
                        </Button>
                    </div>
                </div>
            </section>
        )
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Atendimento',
            children: <Atendimento />,
            // icon: <IdcardFilled /> 
        },
        {
            key: '2',
            label: '',
            children: 'Content of Tab Pane 2',
            // icon: <FileTextFilled /> 
        },
        {
            key: '3',
            label: '',
            children: 'Content of Tab Pane 3',
            // icon: <FieldTimeOutlined /> 
        },
    ];
    return (
        <section className=" w-full flex flex-row items-start h-[48rem] ">
            <Tabs
                type="card"
                className="w-svw flex flex-col"
                defaultActiveKey="1"
                items={items}
            />
        </section>
    )
}