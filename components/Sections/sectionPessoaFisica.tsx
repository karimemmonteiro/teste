import { ArrowRightOutlined, GiftFilled, IdcardOutlined, InfoCircleOutlined, MailFilled, PhoneFilled, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, CheckboxProps, DatePicker, Form, Input, Tag } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import ModalPoliticaPrivacidade from "../Modais/modalTermos";

type RequiredMark = boolean | 'optional' | 'customize';
const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
    <>
        {required ? <Tag color="error">Required</Tag> : <Tag color="warning">optional</Tag>}
        {label}
    </>
);
export default function SectionPessoaFisica() {
    const [form] = Form.useForm();
    const [estudante, setEstudante] = useState(false);
    const [produtorRural, setProdutorRural] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [requiredMark, setRequiredMarkType] = useState<RequiredMark>('optional');
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']

    const onRequiredTypeChange = ({ requiredMarkValue }: { requiredMarkValue: RequiredMark }) => {
        setRequiredMarkType(requiredMarkValue);
    };



    const toggleEstudante = () => {
        setEstudante(!estudante);
    };
    const toggleProdutorRural = () => {
        setProdutorRural(!produtorRural);
    };

    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log('checked = ', e.target.checked);
        setEstudante(e.target.checked);
    };
    return (
        <section className="w-svw flex flex-row items-start h-full">
            <Form
                form={form}
                layout="vertical"
                className=" w-svw  p-10 justify-start flex flex-col "
                initialValues={
                    {
                        cpf: "014.246.572-02",
                        nome: "Karimem Monteiro Cavalcante",
                        dataDeNascimento: "21/05/1994",
                        telefone: "92982540365",
                        email: "contatokarimem@gmail.com"
                    }}
                onValuesChange={onRequiredTypeChange}
                requiredMark={requiredMark === 'customize' ? customizeRequiredMark : requiredMark}
            >
                <Form.Item
                    label={
                        <div className="text-azulSebrae gap-1 flex">
                            <IdcardOutlined style={{ fontSize: "1rem" }} />
                            <span>CPF</span>
                            <span className="text-red">*</span>
                        </div>
                    }
                    name="cpf"
                    required
                >
                    <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" disabled placeholder="Digite o CPF" />
                </Form.Item>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="nome"
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <UserOutlined />
                                <span>Nome Completo</span>
                                <span className="text-red">*</span>
                            </div>
                        }
                        required>
                        <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite nome completo" />
                    </Form.Item>

                    <Form.Item
                        name="nascimento"
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <GiftFilled />
                                <span>Data de Nascimento</span>
                                <span className="text-red">*</span>
                            </div>
                        }
                        required
                    >
                        <DatePicker className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae w-full" defaultValue={dayjs('21/05/1994', dateFormatList[0])} format={dateFormatList} />
                    </Form.Item>

                    <Form.Item
                        name="telefone"
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <PhoneFilled />
                                <span>Telefone</span>
                            </div>
                        }>
                        <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite nome completo" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <MailFilled />
                                <span>E-mail</span>
                            </div>
                        }
                    >
                        <Input className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite nome completo" />
                    </Form.Item>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <div>
                        <Checkbox style={{ display: "none" }} className=" flex-none " checked={estudante} disabled={disabled} onChange={onChange} />
                        <Button className={estudante ? "bg-azulSebrae  text-white " : "bg-white text-azulSebrae"} onClick={toggleEstudante}>
                            Sou Estudante
                        </Button>
                    </div>
                    <div>
                        <Checkbox style={{ display: "none" }} className=" flex-none " checked={produtorRural} disabled={disabled} onChange={onChange} />
                        <Button className={produtorRural ? "bg-azulSebrae  text-white " : "bg-white text-azulSebrae"} onClick={toggleProdutorRural}>
                            Sou Produtor Rural
                        </Button>
                    </div>

                </div>
                <div className="w-full flex flex-row justify-end fixed bottom-0 right-0 p-10 gap-4">
                    <Button className=" bg-redEscuro text-white h-11 flex flex-row items-center hover:text-cinzaSebrae">Cancelar</Button>
                    <Form.Item>
                        <ModalPoliticaPrivacidade/>
                    </Form.Item>
                </div>

            </Form>
        </section>
    )
}