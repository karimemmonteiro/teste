type TelefoneEmailType = {
    descComunic: string;
    numero: string;
    autorizaMensagem: number;
    recebeContato: number;
    principal: number;
    recebeSMS: number;
  };
  
  type EnderecoType = {
    descBairro: string;
    descEndereco: string;
    numero: string;
    descEst: string;
    descCid: string;
    autorizaCorrespondencia: boolean;
    complemento: string;
    principal: number;
  };
  
  type PfpjType = {
    razaoSocial: string;
    cnpj: string;
    nomeFantasia: string;
    dataCriacaoRelatorio: string;
    descricaoStatusReceita: string;
    descPorte: string;
    quantidadeFuncionarios: number;
    descNaturezaJuridica: string;
    atividade: string;
  };
  
  type DadosType = {
    cpf: string;
    nome: string;
    dataNascimento: string;
    produtorRural: boolean;
    estudante: boolean;
    lgpd: boolean;
    status: string;
    atendente: string;
    tempoAtendimento: string;
    unidadeOrganizacional: string;
    tema: string;
    projetoAcao: string;
    tipoAtendimento: string;
    canalAtendimento: string;
    descricao: string;
    pendencias: string;
    telefones: TelefoneEmailType[];
    emails: TelefoneEmailType[];
    enderecos: EnderecoType[];
    Pfpj: PfpjType[];
  };