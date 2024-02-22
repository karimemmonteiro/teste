import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined, DeleteOutlined, EyeOutlined, ExclamationCircleOutlined, PlusSquareOutlined, EditOutlined, IssuesCloseOutlined } from '@ant-design/icons';
import type { GetRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, notification } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Sidebar from '../components/SideBar';
import { apiNext } from '../config/connection';
import { PfpjType } from '../ultils/types/typesAtendimento';

type InputRef = GetRef<typeof Input>;
type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface DataType {
  id: string;
  nome: string;
  cpf: string;
  status: boolean;
  descPorte: string,
  dataCriacaoRelatorio: string,
  dadosCliente: string,
  categoria: string,
  tempoAtendimento: string,
  projetoAcao: string,
  descricao: string
  pfpj: PfpjType
}

type DataIndex = keyof DataType;

export default function ListaAtendimentos() {
  const [online, setOnline] = useState(false);
  const [dados, setDados] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [api, contextHolder] = notification.useNotification();

  

  function openNotificationWithIcon(type: NotificationType) {
    api[type]({
      message: 'Error de alguma',
      description:
        'Error de algum documento',
    });
  };

  async function obterDadosAtendimentos() {
    try {
      const response = await apiNext.get('/atendimento/');
      console.log('Dados recebidos:', response.data);
      setDados(response.data)
    } catch (error) {
      console.error('Erro ao receber os dados:', error);
      throw error;
    }
  }

  useEffect(() => {
    obterDadosAtendimentos()
    if (typeof navigator !== 'undefined') {
      setOnline(navigator.onLine);

      // Add event listener to update online status
      const handleOnlineStatusChange = () => {
        setOnline(navigator.onLine);
      };

      window.addEventListener('online', handleOnlineStatusChange);
      window.addEventListener('offline', handleOnlineStatusChange);

      return () => {
        // Remove event listeners on component unmount
        window.removeEventListener('online', handleOnlineStatusChange);
        window.removeEventListener('offline', handleOnlineStatusChange);
      };
    }
  }, []); //

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        //   <Highlighter
        //     highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        //     searchWords={[searchText]}
        //     autoEscape
        //     textToHighlight={text ? text.toString() : ''}
        //   />
        <></>
      ) : (
        text
      ),
  });

  function novoAtendimento() {
    window.location.href = "/atendimento";
  }

  const columns: TableColumnsType<DataType> = [
    {
      title: 'Projeto/Ação',
      dataIndex: 'projetoAcao',
      key: 'projetoAcao',
      width: '1%',
      ...getColumnSearchProps('projetoAcao'),
    },
    {
      title: 'Dados Cliente',
      dataIndex: 'nome',
      key: 'nome',
      width: '20%',
      ...getColumnSearchProps('nome'),
    },
    {
      title: 'Descricao',
      dataIndex: 'descricao',
      key: 'descricao',
      width: '5%',
      ...getColumnSearchProps('descricao'),
    },
    // {
    //   title: 'Categoria',
    //   dataIndex: 'categoria',
    //   key: 'categoria',
    //   width: '5%',
    //   ...getColumnSearchProps('categoria'),
    // },

    {
      title: 'Duração',
      dataIndex: 'tempoAtendimento',
      key: 'tempoAtendimento',
      width: '5%',
      ...getColumnSearchProps('tempoAtendimento'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: '5%',
      key: 'status',
      ...getColumnSearchProps('status'),
      render: (_, { status }) => (
        <>
          {
            status ? <h1 onClick={() => openNotificationWithIcon('error')} className=' border-none text-red font-bold gap-2 text-md cursor-pointer'><ExclamationCircleOutlined /> Error</h1>
              : <h1 className=' text-orange font-bold gap-2 text-md'><IssuesCloseOutlined /> Pendente</h1>
          }
        </>
      ),
    },
    {
      title: 'Ação',
      dataIndex: 'id, status',
      width: '5%',
      key: 'id',
      render: (_, { id, status }) => (
        <div className='flex flex-row items-center justify-start'>
          <Button className=' border-none text-red '><DeleteOutlined /></Button>
          <Button className=' border-none'><EyeOutlined /></Button>
          {
            status ?
              <Button className=' border-none flex flex-row items-center'><EditOutlined /></Button>
              : null
          }

        </div>
      ),
    },
  ];

  console.log("teste online", online)
  return (
    <div>
      {contextHolder}
      <header className='flex flex-col '>
        <Sidebar />
        <div className='w-full flex flex-row justify-end px-10 py-5'>
          {/* <DemoLiquid /> */}
          <Button onClick={() => novoAtendimento()} className=' h-10 flex flex-row items-center bg-azulSebrae text-white'><PlusSquareOutlined /> Novo Atendimento</Button>
        </div>
      </header>
      <main>
        <Table columns={columns} dataSource={dados} />
      </main>
    </div>
  )
}