import React, { useState } from 'react'
import {
  Table,
  Dropdown,
  Button,
  Menu,
  Typography,
  Input,
  Row,
  Col,
  Space,
  Badge,
  Pagination
} from 'antd'
import {
  EllipsisOutlined,
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  StopOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import SucursalModal from './SucursalModal'
import './ListaSucursales.css'

const { Title, Text } = Typography

const columns = (handleAction) => [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Nombre de sucursal',
    dataIndex: 'nombre',
    key: 'nombre',
  },
  {
    title: 'Empresa',
    dataIndex: 'empresa',
    key: 'empresa',
  },
  {
    title: 'Teléfono',
    dataIndex: 'telefono',
    key: 'telefono',
  },
  {
    title: 'Estado de oficina',
    dataIndex: 'estado',
    key: 'estado',
    render: (estado) => (
      <Badge color={estado === 'Activa' ? 'green' : 'red'} text={estado} />
    ),
  },
  {
    title: 'Acciones',
    key: 'acciones',
    render: (_, record) => {
      const menu = (
        <Menu
          onClick={({ key }) => handleAction(key, record)}
          items={[
            {
              key: 'editar',
              icon: <EditOutlined />,
              label: 'Editar sucursal'
            },
            {
              key: 'desactivar',
              icon: <StopOutlined />,
              label: 'Desactivar sucursal'
            },
            {
              key: 'eliminar',
              icon: <DeleteOutlined className="delete-icon" />,
              label: <span className="delete-text">Eliminar sucursal</span>,
            },
          ]}
        />
      )
      return (
        <Dropdown overlay={menu} trigger={['click']}>
          <Button type="text" className="action-button">
            <span className="action-text">Acciones</span>
            <span className="action-icon">
              <EllipsisOutlined />
            </span>
          </Button>
        </Dropdown>
      )
    },
  },
]

const ListaSucursales = () => {
  const [data, setData] = useState([
    {
      key: '1',
      id: '001',
      nombre: 'Sucursal Santo Domingo',
      empresa: 'Tech Dominicana',
      telefono: '809-555-1234',
      estado: 'Activa',
    },
    {
      key: '2',
      id: '002',
      nombre: 'Sucursal Santiago',
      empresa: 'Innovatech SRL',
      telefono: '809-555-5678',
      estado: 'Inactiva',
    },
    {
      key: '3',
      id: '003',
      nombre: 'Sucursal La Vega',
      empresa: 'Tech Dominicana',
      telefono: '809-555-9999',
      estado: 'Activa',
    },
  ])
  const [editingSucursal, setEditingSucursal] = useState(null)
  const [search, setSearch] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [isFormValid, setIsFormValid] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(5)

  const filteredData = data.filter(suc =>
    suc.nombre.toLowerCase().includes(search.toLowerCase()) ||
    suc.empresa.toLowerCase().includes(search.toLowerCase()) ||
    suc.telefono.toLowerCase().includes(search.toLowerCase()) ||
    suc.id.toLowerCase().includes(search.toLowerCase())
  )

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  const handleAction = (action, record) => {
    if (action === 'editar') {
      setEditingSucursal(record)
      setModalVisible(true)
      setIsFormValid(true)
    } else if (action === 'desactivar') {
      setData(data.map(suc =>
        suc.key === record.key ? { ...suc, estado: 'Inactiva' } : suc
      ))
    } else if (action === 'eliminar') {
      setData(data.filter(suc => suc.key !== record.key))
      const maxPage = Math.ceil((filteredData.length - 1) / pageSize) || 1
      if (currentPage > maxPage) {
        setCurrentPage(maxPage)
      }
    }
  }

  const handleCreateSucursal = (values) => {
    if (editingSucursal) {
      setData(data.map(suc =>
        suc.key === editingSucursal.key
          ? { ...suc, ...values }
          : suc
      ))
    } else {
      const newKey = (data.length + 1).toString()
      const newId = (parseInt(data[data.length - 1]?.id || '0', 10) + 1)
        .toString()
        .padStart(3, '0')
      const nuevaSucursal = {
        key: newKey,
        id: newId,
        nombre: values.nombre,
        empresa: 'Empresa Demo',
        telefono: values.telefono,
        estado: 'Activa',
        direccion: values.direccion,
      }
      setData([...data, nuevaSucursal])
    }
    setModalVisible(false)
    setIsFormValid(false)
    setEditingSucursal(null)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  return (
    <div className="lista-sucursales-container">
      <Title level={3} className="lista-sucursales-title">
        Lista de sucursales
      </Title>
      
      <Row justify="space-between" align="middle" className="header-row" gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Input
            placeholder="Buscar sucursal por nombre"
            prefix={<SearchOutlined />}
            value={search}
            onChange={handleSearch}
            className="search-input"
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} className="header-actions">
          <Space className="header-space">
            <Text type="secondary" className="count-text">
              {filteredData.length} empresas
            </Text>
            <Button
              type="primary"
              onClick={() => {
                setEditingSucursal(null)
                setModalVisible(true)
              }}
              className="create-button"
            >
              Crear nueva sucursal <PlusOutlined />
            </Button>
          </Space>
        </Col>
      </Row>
      
      <div className="table-wrapper">
        <Table
          columns={columns(handleAction)}
          dataSource={paginatedData}
          pagination={false}
          scroll={{ x: 900 }}
        />
      </div>
      
      <div className="pagination-wrapper">
        <Pagination
          current={currentPage}
          total={filteredData.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
          showQuickJumper={false}
        />
      </div>
      
      <SucursalModal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          setIsFormValid(false)
          setEditingSucursal(null)
        }}
        onSubmit={handleCreateSucursal}
        editingSucursal={editingSucursal}
      />
    </div>
  )
}

export default ListaSucursales
