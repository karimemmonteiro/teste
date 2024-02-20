import { Button, Card, Checkbox, Divider, Form, Input, Select, SelectProps, Tabs, TabsProps } from "antd";
import { CloseOutlined, FileTextFilled, FieldTimeOutlined } from "@ant-design/icons";

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
                        <div className="flex flex-col w-full">
                            <div className="text-azulSebrae gap-1 flex">
                                <label>Atendente</label>
                                <label className="text-red">*</label>
                            </div>
                            <Form.Item
                                name="atendente"
                            >
                                <Input disabled className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" />
                            </Form.Item>
                        </div>
                        {/* <div className="flex flex-col w-full">
                            <div className="text-azulSebrae gap-1 flex">
                                <label>Unidade Organizacional</label>
                            </div>
                            <Form.Item
                                name="unidadeOrganizacional"
                                required

                            >
                                <Select
                                    className=" w-full h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae"
                                    defaultValue="a1"
                                    onChange={handleChange}
                                    options={options}
                                />
                            </Form.Item>
                        </div> */}
                        <div className="flex flex-col w-full">
                            <div className="text-azulSebrae gap-1 flex">
                                <label>Tema</label>
                            </div>
                            <Form.Item
                                name="tema"
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
                        <div className="flex flex-col w-full">
                            <div className="text-azulSebrae gap-1 flex">
                                <label>Projeto | Ação</label>
                                <label className="text-red">*</label>
                            </div>
                            <Form.Item
                                name="projetoAcao"
                            >
                                <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite o Projeto ou ação" />
                            </Form.Item>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="text-azulSebrae gap-1 flex">
                                <label>Tipo de Atendimento</label>
                            </div>
                            <Form.Item
                                name="tipoAtendimento"
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
                        <div className="flex flex-col w-full">
                            <div className="text-azulSebrae gap-1 flex">
                                <label>Canal de Atendimento</label>
                            </div>
                            <Form.Item
                                name="canalAtendimento"
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
                    </div>
                    <div className="pb-10">
                        <Form.List name="temaSubtema">
                            {(fields, { add, remove }) => (
                                <div style={{ display: 'flex', rowGap: 4, flexDirection: 'column' }}>
                                    {fields.map((field, index) => (
                                        <Card
                                            size="small"
                                            title={`Tema / Subtema`}
                                            key={field.key}
                                            extra={
                                                <CloseOutlined
                                                    onClick={() => {
                                                        remove(field.name);
                                                    }}
                                                />
                                            }
                                        >
                                            <div className="flex flex-row justify-between items-center gap-4">

                                                <Form.Item
                                                    name="tema"
                                                    className="w-full"
                                                    required
                                                >
                                                    <Select
                                                        className=" w-full h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae"
                                                        defaultValue="a1"
                                                        onChange={handleChange}
                                                        options={options}
                                                    />
                                                </Form.Item>
                                                <Form.Item
                                                    name="subtema"
                                                    className="w-full"
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

                                        </Card>
                                    ))}

                                    <Button type="dashed" onClick={() => add()} block>
                                        + Adicionar Tema / Subtema 
                                    </Button>
                                </div>
                            )}
                        </Form.List>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        <div className="flex flex-col w-full">
                            <div className="text-azulSebrae gap-1 flex">
                                <label>Descrição do Atendimento</label>
                                {/* <IdcardFilled /> */}
                            </div>
                            <Form.Item
                                name="descricao"
                                required
                            >
                                <TextArea showCount className=" hover:border-azulSebrae focus:border-azulSebrae" rows={3} placeholder="Insira a Descrição do Atendimento" maxLength={254} />
                            </Form.Item>
                        </div>
                        <div className="flex flex-col w-full">
                            <div className="text-azulSebrae gap-1 flex">
                                <label>Pendencias</label>
                                {/* <InfoCircleFilled /> */}
                            </div>
                            <Form.Item
                                name="pendencias"
                            >
                                <TextArea showCount className=" hover:border-azulSebrae focus:border-azulSebrae" rows={3} placeholder="Insira as pendencias" maxLength={254} />
                            </Form.Item>
                        </div>

                    </div>
                    <Divider orientation="center" plain>
                        <h1 className=" text-azulSebrae font-bold text-2xl ">Anexos do Atendimento</h1>
                    </Divider>
                    <div className="fixed right-5 bottom-5 flex flex-row  p-0 m-0 gap-5">

                        <Button
                            htmlType="submit"
                            className="bg-green text-white flex flex-row items-center h-10 font-bold"
                        >
                            Salvar o Atendimento
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
            icon: <FileTextFilled /> 
        },
        {
            key: '3',
            label: '',
            children: 'Content of Tab Pane 3',
            icon: <FieldTimeOutlined /> 
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