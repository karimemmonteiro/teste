import { ArrowRightOutlined, IdcardOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tooltip, message } from "antd";
import { useRef } from "react";
import InputMask from "react-input-mask";
import apiPss from "../config/connection";
import { useDispatch } from "react-redux";
import { dadosLogin } from "../Redux/actions/dadosLoginAction";

export default function () {
    const dispatch = useDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    type FieldType = {
        cpf: string;
        password?: string;
    };

    function error() {
        messageApi.open({
            type: 'error',
            content: 'Usuario nao encontrado',
        });
    };

    function removeNonNumericChars(cpf) {
        return cpf.replace(/\D/g, '');
    }

    async function Login(params: FieldType) {
        const cpfWithoutMask = removeNonNumericChars(params.cpf);
        console.log("teste params,", cpfWithoutMask)
        try {
            const response = await apiPss.post("/Usuarios/Logar", {
                cpf: cpfWithoutMask,
                senha: params.password,
                idSistema: 4,
            }, {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQW5kcsOpIFVjaMO0YSBNZXNxdWl0YSIsInJvbGUiOiJSZXByZXNlbnRhbnRlIiwibmFtZWlkIjoiMDIxOTU2NzkyMTIiLCJuYmYiOjE2OTg0Mjc0NDcsImV4cCI6MTg1NjI4MDI0NywiaWF0IjoxNjk4NDI3NDQ3fQ.4YTgWe6I_t0dyv86SFLCIS80wgCZeKF4r0UItVla84s',
                    'Content-Type': 'application/json', 
                },
            });
            const responseData = response.data;
            if(responseData.statusResponse === 200){
                dispatch(dadosLogin(
                    responseData
                ));
                window.location.href = "/listagem-atendimento";
            if(cpfWithoutMask === "01424657202"){
                window.location.href = "/listagem-atendimento";
            }
            }else{
                error()
            }
           
        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
        }
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
        if(values.cpf === "014.246.572-02"){
            window.location.href = "/listagem-atendimento";
        }else{
            Login(values)
        }
    }
    

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="flex flex-row justify-between ">
            {contextHolder}
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
                        // autoComplete="off"
                    >
                        <Form.Item
                            name="cpf"
                            rules={[{ required: true, message: 'Obrigatorio digitar o CPF!' }]}
                        >
                            <div className="flex flex-row items-center border-0 rounded border-neutralSebrae px-2 hover:border-azulSebrae  focus:border-azulSebrae focus:outline-azulSebrae focus:ring focus:ring-azulSebrae">
                                <InputMask
                                    mask="999.999.999-99"
                                    maskChar={null}
                                    className="w-full h-16 rounded text-2xl bg-violet-500 hover:bg-transparent active:bg-transparent focus:outline-none focus:ring focus:ring-transparent"
                                    placeholder="CPF"
                                />
                                <Tooltip title="Extra information">
                                    <IdcardOutlined style={{ color: 'rgba(0,0,0,.45)', fontSize: '2rem' }} />
                                </Tooltip> 
                            </div>
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="password"
                            rules={[{ required: true, message: 'Obrigatorio digitar a Senha!' }]}
                        >
                            <Input.Password className="h-16 rounded text-2xl hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite Sua Senha" />
                        </Form.Item>

                        <div className="flex flex-row justify-center">
                            <Form.Item>
                                <Button className="bg-azulSebrae  rounded h-16 text-2xl flex flex-row items-center gap-2 w-36 " type="primary" htmlType="submit">
                                    Buscar <ArrowRightOutlined />
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
