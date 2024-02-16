import React, { useState } from 'react';
import { Button, List, Modal, Typography } from 'antd';
import { ArrowRightOutlined, RightCircleFilled } from '@ant-design/icons';

export default function ModalPoliticaPrivacidade() {
    const [open, setOpen] = useState(false);
    const datosUtilizados = [
        'CPF: identificação do cliente em nossos canais de atendimento, com chave de autenticação ao acessar as áreas restritas de nossos canais digitais e como referência para o enriquecimento e atualização de seu cadastro (controle de atendimento, por exemplo e histórico).',
        'Nome: identificação em nossos canais de atendimento.',
        'Nome de tratamento: garantia de um atendimento mais personalizado.',
        'Data de Nascimento: confirmação da identidade e garantia da segurança infantil, de acordo com a legislação.',
        'Gênero: personalização do contato e do atendimento e esclarecimento quando o nome não identifica o gênero.',
        'Deficiente físico: referência para a realização do atendimento adequado.',
        'Cargo: verificação de qual público de nossos serviços você pertence.',
        'Telefone/E-mail: ações de divulgação de produtos e serviços, para realização de pesquisas por meio de ligação ou de mensagem de texto, para responder às suas solicitações ou pedidos feitos em nossos canais ou para informá-lo de questões transacionais, como mudança de horário do atendimento ou de um evento, por exemplo (agora, desde que tenha o consentimento do cliente);',
        'Informações de localidade (CEP, UF, cidade, bairro e endereço):identificação de como podemos apoiá-lo localmente, para trazer informações importantes sobre a cidade em que você está para apoiar em nosso processo de entendimento de suas necessidades, para envio de material de qualificação de alguns de nossos eventos, como destinatário em mala direta, para envio de cobrança judicial, direcionamento do atendimento em grandes cidades, para permitir o seu direcionamento ao atendimento por equipes de seu estado e para permitir um melhor planejamento do Sebrae na atuação em sua região.'
    ];


    return (
        <>
            <h1 onClick={() => setOpen(true)} className=" text-azulSebrae h-11 flex flex-row items-center">
                Aceitar política de privacidade e avançar para Pessoa Jurídica
            </h1>
            <Modal
                title={<h1 className=' bg-azulSebrae mt-5 text-white pl-5 text-center'>TERMO DE CONSENTIMENTO LGPD</h1>}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                width={1800}
                footer={null}
            >
                <div >
                    <span className=' text-azulSebrae font-bold '>Autorização</span>
                    <p>
                        Em observância à Lei nº. 13.709/18 – Lei Geral de Proteção de Dados Pessoais e seus dispositivos aplicáveis à proteção de Dados Pessoais e Sensíveis, manifesto-me de forma expressa, livre e consciente, no sentido de autorizar o SISTEMA SEBRAE a realizar o tratamento de meus Dados Pessoais para a seguinte finalidade:
                    </p>
                    <li className='pl-5'>
                        1. Manter banco de dados de clientes na modalidade ATIVO ou INATIVO, de acordo com o CONSENTIMENTO ou RESTRIÇÃO manifesta no presente TERMO DE CONSENTIMENTO, a fim de comprovar os atendimentos realizados pela instituição perante os órgãos de fiscalização. No caso de pessoas jurídicas, os dados pessoais ficam vinculados ao CNPJ da empresa como sócio, proprietário ou representantes.
                        Confidencialidade
                        Estou ciente do compromisso assumido pelo SISTEMA SEBRAE de tratar os meus Dados Pessoais de forma sigilosa e confidencial, mantendo-os em ambiente seguro e não utilizando-os para qualquer fim que não o descrito acima ou àqueles por mim autorizado.
                    </li>
                    <span className=' text-azulSebrae font-bold '>Revogação</span>

                    <p>
                        Estou ciente que, a qualquer tempo, posso rever o consentimento usando os canais eletrônicos ou de forma presencial em qualquer dos escritórios regionais do SEBRAE.
                    </p>

                    <span className=' text-azulSebrae font-bold '>Canal de Atendimento</span>
                    <p>
                        Estou ciente que posso utilizar a Ouvidoria do SEBRAE, por meio do endereço www.sebrae.com.br/LGPD, para tirar dúvidas e/ou realizar solicitações relacionadas ao tratamento dos meus Dados Pessoais (acesso, restrição ao uso, atualização, exclusão), de acordo com os procedimentos internos estabelecidos para este fim.

                        Por fim, declaro ter lido o presente TERMO DE CONSENTIMENTO e ter sido suficientemente informado sobre o conteúdo deste, bem como sobre as normas protetivas ao meu direito de acesso, uso e compartilhamento de dados pessoais, asseguradas pela à Lei nº. 13.709/18 – Lei Geral de Proteção de Dados Pessoais e estou apto a responder às questões abaixo relacionadas:

                        Para atendimento dos empreendedores e dos pequenos negócios brasileiros, o Sebrae não faz uso de dados pessoais e serviços do tipo: partido político, religião, pendências tributárias/financeiras, raça, entre outros de cunho estritamente privado.

                        Abaixo listamos os dados utilizados e sua finalidade:
                    </p>
                    <List
                        dataSource={datosUtilizados}
                        renderItem={(item) => (
                            <List.Item >
                                <div className='flex flex-row gap-2'>
                                    <RightCircleFilled />{item}
                                </div>
                            </List.Item>
                        )}
                    />
                </div>
                <div className='w-full flex flex-row justify-end gap-4'>
                    <Button onClick={() => setOpen(false)} className='bg-green text-white'>OK</Button>
                </div>
            </Modal>
        </>
    );
};
