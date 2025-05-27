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
  Badge
} from 'antd'
import {
  EllipsisOutlined,
  PlusOutlined,
  SearchOutlined,
  EditOutlined,
  StopOutlined,
  DeleteOutlined
} from '@ant-design/icons'
import './ListaSucursales.css'
import SucursalModal from './SucursalModal'

const { Title, Text } = Typography

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
  const [form] = SucursalModal.useFormInstance ? SucursalModal.useFormInstance() : []
  const [isFormValid, setIsFormValid] = useState(false)

  const filteredData = data.filter(suc =>
    suc.nombre.toLowerCase().includes(search.toLowerCase()) ||
    suc.empresa.toLowerCase().includes(search.toLowerCase()) ||
    suc.telefono.toLowerCase().includes(search.toLowerCase()) ||
    suc.id.toLowerCase().includes(search.toLowerCase())
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
    }
  }

  const columns = [
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
                icon: <DeleteOutlined style={{ color: 'red' }} />,
                label: <span style={{ color: 'red' }}>Eliminar sucursal</span>,
              },
            ]}
          />
        )
        return (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="text" icon={<EllipsisOutlined />}>
              Acciones
            </Button>
          </Dropdown>
        )
      },
    },
  ]

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

  return (
    <div className="ls-container">
      <div className="ls-content">
        <Title level={3} style={{ marginBottom: 8, textAlign: 'left', width: '100%', fontWeight: 600 }}>
          Lista de sucursales
        </Title>
        <Row justify="space-between" align="middle" style={{ marginBottom: 16 }} gutter={[16, 16]}>
          <Col xs={24} sm={24} md={12} lg={12}>
            <Input
              placeholder="Buscar sucursal"
              prefix={<SearchOutlined />}
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} style={{ textAlign: 'right', marginTop: 8 }}>
            <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
              <Text type="secondary">
                {data.length} sucursales encontradas
              </Text>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                  setEditingSucursal(null)
                  setModalVisible(true)
                }}
              >
                Crear sucursal
              </Button>
            </Space>
          </Col>
        </Row>
        <div className="ls-table-wrapper">
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 5, responsive: true }}
            bordered
            className="tabla-sucursales"
            scroll={{ x: 900 }}
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
    </div>
  )
}

export default ListaSucursales
