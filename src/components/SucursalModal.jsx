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
            colorPrimary: '#262776',
            colorPrimaryHover: '#353593',
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
          <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', gap: 8, padding: '0 24px 24px 24px' }}>
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
        title={<span style={{ fontWeight: 400, color: '#000', fontSize: 18 }}>Crear sucursal de una empresa</span>}
        width={667}
        bodyStyle={{ padding: 0, minHeight: 400, height: 400 }}
        style={{ top: 64 }}
        className="sucursal-modal"
      >
        <div
          className="sucursal-modal-frame"
          style={{
            width: 476,
            height: 200,
            margin: '64px auto 0 auto', 
            background: '#fff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            borderRadius: 12,
            boxSizing: 'border-box',
            padding: 0
          }}
        >
          <div className="modal-subtitle" style={{ margin: '16px 0 16px 0', textAlign: 'center', width: '100%' }}>
            <Title level={4} style={{ margin: 0, fontSize: 24, fontWeight: 500, color: '#555' }}>
              {editingSucursal ? 'Editar sucursal' : 'Nueva sucursal'}
            </Title>
          </div>
          <Form
            form={form}
            layout="vertical"
            onFieldsChange={handleFormChange}
            style={{ margin: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div style={{ width: '100%' }}>
              <Form.Item
                label="Nombre"
                name="nombre"
                rules={[{ required: true, message: 'Ingrese el nombre de la sucursal' }]}
                style={{ marginBottom: 16 }}
              >
                <Input placeholder="Escribir nombre" style={{ height: 32, fontSize: 16, width: '100%' }} />
              </Form.Item>
              <Form.Item
                label="Dirección"
                name="direccion"
                rules={[{ required: true, message: 'Ingrese la dirección' }]}
                style={{ marginBottom: 16 }}
              >
                <Input placeholder="Escribir dirección" style={{ height: 32, fontSize: 16, width: '100%' }} />
              </Form.Item>
              <Form.Item
                label="Teléfono"
                name="telefono"
                rules={[{ required: true, message: 'Ingrese el teléfono' }]}
                style={{ marginBottom: 0 }}
              >
                <Input placeholder="Escribir teléfono" style={{ height: 32, fontSize: 16, width: '100%' }} />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  )
}

export default SucursalModal
