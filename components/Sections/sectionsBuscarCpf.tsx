import { IdcardOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Form, Tooltip } from "antd";
import InputMask from "react-input-mask";
import { useDispatch } from 'react-redux';
import { setCpf } from '../../Redux/actions/cpfActions';
import { setStep } from '../../Redux/actions/stepAtendimentoAction';

export default function SectionsBuscarCpf() {
    type FieldType = {
        cpf: string;
    };
    const dispatch = useDispatch();

    const onFinish = (values: any) => {
        console.log('Success:', values);

        // Dispatch the action to update the CPF in the Redux store
        dispatch(setCpf(values.cpf));
        dispatch(setStep(1));
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