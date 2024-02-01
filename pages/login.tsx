import { ArrowRightOutlined, IdcardOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tooltip } from "antd";

export default function () {

    type FieldType = {
        cpf: string;
        password?: string;
    };

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="flex flex-row justify-between ">
            <div className="bg-azulSebrae h-svh w-3/12 flex flex-row items-center p-5">
                <img className="text-white" src="./sebraeLogin2.png" alt="Sebrae Login" />
            </div>
            <div className="flex flex-col h-svh w-9/12 justify-start items-center bg-white pt-32">
                <div className="flex flex-col gap-2">
                    <h1 className="text-azulSebrae font-bold text-4xl">BEM-VINDO AO ATENDIMENTO EXTERNO SEBRAE-AM</h1>
                    <label className="text-cinzaSebrae font-bold text-xl">Por favor, informe seu CPF abaixo</label>
                </div>
                <div className="flex w-full p-10 pt-36 flex-row justify-center">
                    <Form
                        name="basic"
                        className="w-full "
                        style={{ maxWidth: 1000 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item<FieldType>
                            name="cpf"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input className="h-16 rounded text-2xl hover:border-azulSebrae focus:border-azulSebrae " placeholder="CPF" suffix={
                                <Tooltip title="Extra information">
                                    <IdcardOutlined style={{ color: 'rgba(0,0,0,.45)', fontSize: "2rem" }} />
                                </Tooltip>
                            } />
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password className="h-16 rounded text-2xl hover:border-azulSebrae focus:border-azulSebrae"  placeholder="Digite Sua Senha" />
                        </Form.Item>

                        <div className="flex flex-row justify-center">
                        <Form.Item >
                            <Button className="bg-azulSebrae  rounded h-16 text-2xl flex flex-row items-center gap-2 w-36 " type="primary" htmlType="submit">
                                Buscar <ArrowRightOutlined />
                            </Button>
                        </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>

        </div>
    )
}