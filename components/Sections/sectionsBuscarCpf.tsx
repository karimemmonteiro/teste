import { ArrowRightOutlined, IdcardOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tooltip } from "antd";

export default function SectionsBuscarCpf() {
    type FieldType = {
        cpf: string;
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <section className="w-svw flex flex-row justify-center ">
            <Form
                name="formularioBuscarCpf"
                className="w-full flex flex-row justify-center gap-4"
                style={{ maxWidth: 1200 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div className="w-full">
                    <Form.Item<FieldType >
                        name="cpf"
                        rules={[{ required: true, message: 'Por favor insira o CPF!' }]}
                    >
                        <Input className="h-16 rounded text-2xl hover:border-azulSebrae focus:border-azulSebrae" placeholder="CPF" suffix={
                            <Tooltip title="Digite o CPF da pessoa que deseja fazer o atendimento">
                                <IdcardOutlined style={{ color: 'rgba(0,0,0,.45)', fontSize: "2rem" }} />
                            </Tooltip>
                        } />
                    </Form.Item>
                </div>
                <div>
                    <Form.Item >
                        <Button className="bg-azulSebrae  rounded h-16 text-2xl flex flex-row items-center gap-2 w-36 " type="primary" htmlType="submit">
                            Buscar <SearchOutlined />
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </section>
    )
}