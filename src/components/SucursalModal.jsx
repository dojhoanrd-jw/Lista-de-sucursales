import React, { useEffect } from 'react'
import { Modal, Button, Form, Input, Typography, ConfigProvider } from 'antd'

const { Title } = Typography

const SucursalModal = ({
  visible,
  onCancel,
  onSubmit,
  editingSucursal
}) => {
  const [form] = Form.useForm()
  const [isFormValid, setIsFormValid] = React.useState(false)

  useEffect(() => {
    if (editingSucursal) {
      form.setFieldsValue({
        nombre: editingSucursal.nombre,
        direccion: editingSucursal.direccion || '',
        telefono: editingSucursal.telefono,
      })
      setIsFormValid(true)
    } else {
      form.resetFields()
      setIsFormValid(false)
    }
  }, [editingSucursal, visible, form])

  const handleFormChange = () => {
    const values = form.getFieldsValue()
    const allFilled = values.nombre && values.direccion && values.telefono
    setIsFormValid(!!allFilled)
  }

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        onSubmit(values)
        form.resetFields()
        setIsFormValid(false)
      })
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            paddingMD: 24,
            paddingContentHorizontalLG: 24,
            titleFontSize: 20,
          },
          Button: {
            colorTextDisabled: '#00000040',
            colorBgContainerDisabled: '#f5f5f5',
          }
        }
      }}
    >
      <Modal
        open={visible}
        onCancel={() => {
          onCancel()
          form.resetFields()
          setIsFormValid(false)
        }}
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', gap: 8 }}>
            <Button key="cancel" onClick={() => {
              onCancel()
              form.resetFields()
              setIsFormValid(false)
            }}>
              Cancelar
            </Button>
            <Button
              key="submit"
              type="primary"
              onClick={handleOk}
              disabled={!isFormValid}
            >
              {editingSucursal ? 'Guardar cambios' : 'Crear sucursal'}
            </Button>
          </div>
        }
        title="Crear sucursal de una empresa"
        width={520}
      >
        <div className="sucursal-modal-content">
          <div className="modal-subtitle">
            <Title level={4}>
              {editingSucursal ? 'Editar sucursal' : 'Nueva sucursal'}
            </Title>
          </div>
          <Form
            form={form}
            layout="vertical"
            onFieldsChange={handleFormChange}
            style={{ marginTop: 24 }}
          >
            <Form.Item
              label="Nombre"
              name="nombre"
              rules={[{ required: true, message: 'Ingrese el nombre de la sucursal' }]}
            >
              <Input placeholder="Nombre de la sucursal" />
            </Form.Item>
            <Form.Item
              label="Dirección"
              name="direccion"
              rules={[{ required: true, message: 'Ingrese la dirección' }]}
            >
              <Input placeholder="Dirección" />
            </Form.Item>
            <Form.Item
              label="Teléfono"
              name="telefono"
              rules={[{ required: true, message: 'Ingrese el teléfono' }]}
            >
              <Input placeholder="Teléfono" />
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  )
}

export default SucursalModal
