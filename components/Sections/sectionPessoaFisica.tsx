import { GiftFilled, IdcardOutlined, MailFilled, PhoneFilled, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, CheckboxProps, Form, Input, Tag } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import ModalPoliticaPrivacidade from "../Modais/modalTermos";
import { useDispatch } from "react-redux";
import { updatePessoaFisica } from "../../Redux/actions/dadosPessoaFisicaAction";
import { DatePicker, Space } from 'antd';
import { useSelector } from "react-redux";




export default function SectionPessoaFisica() {
    const dispatch = useDispatch();
    const [nome, setNome] = useState("")
    const [dataNacimento, setData] = useState("05/05/1994")
    const [estudante, setEstudante] = useState(false);
    const [produtorRural, setProdutorRural] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const dadosPessoaFisica = useSelector((state: any) => state.dadosPessoaFisica)
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY']
    const verificacaoFormulario = nome


    const toggleEstudante = () => {
        setEstudante(!estudante);
    };
    const toggleProdutorRural = () => {
        setProdutorRural(!produtorRural);
    };

    function OnchangeName(event) {
        setNome(event.target.value)
    }
   
    function OnchangeData(event) {
        console.log("data", event.$d)
         setData(event.$d)
    }

    const onChange: CheckboxProps['onChange'] = (e) => {
        console.log('checked = ', e.target.checked);
        setEstudante(e.target.checked);
    };

    const onFinish = (values: any) => {
        const data = {
            pfCpf: "01424657202",
            pfNome: nome,
            pfDataNascimento: dataNacimento,
            pfAceiteTermo: dadosPessoaFisica.pfAceiteTermo,
            pfEstudante: estudante,
            pfProdutorRural: produtorRural
        }
        if (dadosPessoaFisica.pfAceiteTermo) {
            dispatch(updatePessoaFisica(
                data
            ));
        }


    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <section className="w-svw flex flex-row items-start h-full">
            <Form
                name="formularioDadosPessoaFisica"
                layout="vertical"
                className="w-full gap-4 px-10"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                initialValues={
                    {
                        cpf: "014.246.572-02",
                        nome: "",
                        nascimento: ""
                    }}
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
                        <Input onChange={(event) => OnchangeName(event)} className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite nome completo" />
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
                        <DatePicker onChange={(event) => OnchangeData(event)} defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae w-full" />
                    </Form.Item>

                    {/* <Form.Item
                        name="telefone"
                        label={
                            <div className="text-azulSebrae gap-1 flex">
                                <PhoneFilled />
                                <span>Telefone</span>
                            </div>
                        }>
                        <Input onChange={(event) => OnchangeTelefone(event)} className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite o Telefone" />
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
                        <Input onChange={(event) => OnchangeEmail(event)} className="h-11 rounded text-lg hover:border-azulSebrae focus:border-azulSebrae" placeholder="Digite o Email" />
                    </Form.Item> */}
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
                <div className={verificacaoFormulario ? "w-full flex flex-row justify-end fixed bottom-0 right-0 p-10 gap-4" : " invisible"}>
                    <Form.Item>
                        <div onClick={onFinish}>
                            <ModalPoliticaPrivacidade />
                        </div>
                    </Form.Item>
                </div>

            </Form>
        </section>
    )
}