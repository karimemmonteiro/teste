
import { Button, Form, Tooltip } from "antd";
import InputMask from "react-input-mask";
import { useDispatch, useSelector } from 'react-redux';
import { setCpf } from '../../Redux/actions/cpfActions';
import { setStep } from '../../Redux/actions/stepAtendimentoAction';
import { apiNext } from "../../config/connection";
import { updatePessoaFisica } from "../../Redux/actions/dadosPessoaFisicaAction";
import { updatePessoaJuridica } from "../../Redux/actions/dadosPessoaJuridicaAction";
import { updateContatosEnderecos } from "../../Redux/actions/dadosContatosEnderecosAction";
import { updateAtendimento } from "../../Redux/actions/dadosAtendimentoAction";

export default function SectionsBuscarCpf() {
    const dispatch = useDispatch();
    const dadosLogin = useSelector((state: any) => state.dadosLogin)
    console.log("Sessao Buscar Dados")

    type FieldType = {
        cpf: string;
    };

    function removeNonNumericChars(cpf) {
        return cpf.replace(/\D/g, '');
    }
    async function GetDadosPorCpf(params: FieldType) {
        const cpfWithoutMask = removeNonNumericChars(params.cpf);
        const token = dadosLogin?.token
        try {
            const response = await apiNext.get(`/atendimento/buscar-dados/?cpf=${cpfWithoutMask}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const responseData = response?.data;
            const responsePJ = responseData?.pfPj[0]
            const responseContatos = responseData?.clienteContatos
            const responseEnderecos = responseData?.clienteEnderecos
            const responseAtendimento = {
                workflows: responseData.workflows,
                id: responseData.id,
                tituloEleitor: responseData.tituloEleitor,
                rg: responseData.rg,
                sexo: responseData.sexo,
                escolaridade: responseData.escolaridade,
                statusReceita: responseData.statusReceita,
                statusSebrae: responseData.statusSebrae,
                possuiDeficiencia: responseData.possuiDeficiencia,
                lgpd: responseData.lgpd,
                codUfLgpd: responseData.codUfLgpd,
                descUfLgpd: responseData.descUfLgpd,
                codParcLgpd: responseData.codParcLgpd,
                nomeParceiroLgpd: responseData.nomeParceiroLgpd,
                tipoPessoaFisica: responseData.tipoPessoaFisica,
                verificado: responseData.verificado,
                qtdTentativas: responseData.qtdTentativas,
                dataNascimnetoString: responseData.dataNascimnetoString,
                dataNascimnetoRelatorio: responseData.dataNascimnetoRelatorio,
                codcfo: responseData.codcfo,
                atendimentos: responseData.atendimentos,
            }
            const dadaContatoEnderecos = {
                clienteEnderecos: responseEnderecos,
                clienteContatos: responseContatos
            }
            const dataPF = {
                cpf: responseData?.cpf || "",
                nome: responseData?.nome || "",
                dataNascimneto: responseData?.dataNascimneto || null,
                dtAceiteLgpd: responseData?.dtAceiteLgpd || null,
                estudante: responseData?.estudante || null,
                produtorRural: responseData?.produtorRural || null
            }
            const dataPJ = responsePJ
            dispatch(updatePessoaFisica(
                dataPF
            ));
            dispatch(updatePessoaJuridica(
                dataPJ
            ));
            dispatch(updateContatosEnderecos(
                dadaContatoEnderecos
            ));
            dispatch(updateAtendimento(
                responseAtendimento
            ));

        } catch (error) {
            console.error('Erro ao fazer login:', error.message);
        }
    }

    const onFinish = (values: any) => {
        GetDadosPorCpf(values)
        dispatch(setCpf(values.cpf));
        dispatch(setStep(1));
    };

    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed:', errorInfo);
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
                                {/* <IdcardOutlined style={{ color: 'rgba(0,0,0,.45)', fontSize: '2rem' }} /> */}
                            </Tooltip>
                        </div>
                    </Form.Item>
                </div>
                <div>
                    <Form.Item >
                        <Button className="bg-azulSebrae  rounded h-16 text-2xl flex flex-row items-center gap-2 w-36 " type="primary" htmlType="submit">
                            Buscar
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </section>
    )
}