import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined, DeleteOutlined, EyeOutlined, ExclamationCircleOutlined, PlusSquareOutlined, EditOutlined, IssuesCloseOutlined } from '@ant-design/icons';
import type { GetRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space, Table, notification } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Sidebar from '../components/SideBar';
// import Highlighter from 'react-highlight-words';

type InputRef = GetRef<typeof Input>;
type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface DataType {
  id: string;
  name: string;
  cpf: string;
  status: boolean;
  porte: string,
  data: string,
  dadosCliente: string,
  categoria: string,
  duracao: string
}

type DataIndex = keyof DataType;

const data: DataType[] = [
  {
    id: '1',
    name: 'Karimem Monteiro Cavalcante',
    porte: "Micro empreendedor individual",
    data: "31/07/2023",
    dadosCliente: "24041750253 - MARISTELA CAMPELO DE CARVALHO / 12600762000108 - MARISTELA CAMPELO DE CARVALHO 24041750253",
    categoria: "Consultoria	",
    duracao: "01:12:49",
    cpf: "014.246.572-02",
    status: false,
  },
  {
    id: '2',
    name: 'Karimem Monteiro Cavalcante',
    porte: "Micro empreendedor individual",
    data: "31/07/2023",
    dadosCliente: "24041750253 - MARISTELA CAMPELO DE CARVALHO / 12600762000108 - MARISTELA CAMPELO DE CARVALHO 24041750253",
    categoria: "Consultoria	",
    duracao: "01:12:49",
    cpf: "014.246.572-02",
    status: true,
  },
  {
    id: '3',
    name: 'Karimem Monteiro Cavalcante',
    porte: "Micro empreendedor individual",
    data: "31/07/2023",
    dadosCliente: "24041750253 - MARISTELA CAMPELO DE CARVALHO / 12600762000108 - MARISTELA CAMPELO DE CARVALHO 24041750253",
    categoria: "Consultoria	",
    duracao: "01:12:49",
    cpf: "014.246.572-02",
    status: false,
  },
  {
    id: '4',
    name: 'Karimem Monteiro Cavalcante',
    porte: "Micro empreendedor individual",
    data: "31/07/2023",
    dadosCliente: "24041750253 - MARISTELA CAMPELO DE CARVALHO / 12600762000108 - MARISTELA CAMPELO DE CARVALHO 24041750253",
    categoria: "Consultoria	",
    duracao: "01:12:49",
    cpf: "014.246.572-02",
    status: true,
  },
  {
    id: '5',
    name: 'Karimem Monteiro Cavalcante',
    porte: "Micro empreendedor individual",
    data: "31/07/2023",
    dadosCliente: "24041750253 - MARISTELA CAMPELO DE CARVALHO / 12600762000108 - MARISTELA CAMPELO DE CARVALHO 24041750253",
    categoria: "Consultoria	",
    duracao: "01:12:49",
    cpf: "014.246.572-02",
    status: false,
  },
  {
    id: '6',
    name: 'Karimem Monteiro Cavalcante',
    porte: "Micro empreendedor individual",
    data: "31/07/2023",
    dadosCliente: "24041750253 - MARISTELA CAMPELO DE CARVALHO / 12600762000108 - MARISTELA CAMPELO DE CARVALHO 24041750253",
    categoria: "Consultoria	",
    duracao: "01:12:49",
    cpf: "014.246.572-02",
    status: true,
  },
  {
    id: '7',
    name: 'Karimem Monteiro Cavalcante',
    porte: "Micro empreendedor individual",
    data: "31/07/2023",
    dadosCliente: "24041750253 - MARISTELA CAMPELO DE CARVALHO / 12600762000108 - MARISTELA CAMPELO DE CARVALHO 24041750253",
    categoria: "Consultoria	",
    duracao: "01:12:49",
    cpf: "014.246.572-02",
    status: false,
  },
  {
    id: '8',
    name: 'Karimem Monteiro Cavalcante',
    porte: "Micro empreendedor individual",
    data: "31/07/2023",
    dadosCliente: "24041750253 - MARISTELA CAMPELO DE CARVALHO / 12600762000108 - MARISTELA CAMPELO DE CARVALHO 24041750253",
    categoria: "Consultoria	",
    duracao: "01:12:49",
    cpf: "014.246.572-02",
    status: true,
  },
];
export default function ListaAtendimentos() {
  const [online, setOnline] = useState(false);
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

  useEffect(() => {
    // Check if navigator is defined (client-side)
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
      title: 'Data',
      dataIndex: 'data',
      key: 'data',
      width: '1%',
      ...getColumnSearchProps('data'),
    },
    {
      title: 'Dados Cliente',
      dataIndex: 'dadosCliente',
      key: 'dadosCliente',
      width: '20%',
      ...getColumnSearchProps('dadosCliente'),
    },
    {
      title: 'Porte',
      dataIndex: 'porte',
      key: 'porte',
      width: '5%',
      ...getColumnSearchProps('porte'),
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',
      width: '5%',
      ...getColumnSearchProps('categoria'),
    },

    {
      title: 'Duração',
      dataIndex: 'duracao',
      key: 'duracao',
      width: '5%',
      ...getColumnSearchProps('duracao'),
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

  return (
    <div>
      {contextHolder}
      <header className='flex flex-col '>
        <Sidebar />
        <div className='w-full flex flex-row justify-end px-10 py-5'>
          <h1>{online}</h1>
          <Button onClick={() => novoAtendimento()} className=' h-10 flex flex-row items-center bg-azulSebrae text-white'><PlusSquareOutlined /> Novo Atendimento</Button>
        </div>
      </header>
      <main>
        <Table columns={columns} dataSource={data} rowKey="id" />
      </main>
    </div>
  )
}