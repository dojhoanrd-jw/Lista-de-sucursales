import React, { useEffect } from 'react'
import { Modal, Button, Form, Input, Typography, ConfigProvider } from 'antd'
import './SucursalModal.css'

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
          <div className="modal-footer">
            <Button 
              key="cancel" 
              onClick={() => {
                onCancel()
                form.resetFields()
                setIsFormValid(false)
              }}
            >
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
        title={<span className="modal-title">Crear sucursal de una empresa</span>}
        width={667}
        bodyStyle={{ padding: 0, minHeight: 400, height: 400 }}
        style={{ top: 64 }}
        className="sucursal-modal"
      >
        <div className="sucursal-modal-frame">
          <div className="modal-subtitle">
            <Title level={4} className="modal-subtitle-text">
              {editingSucursal ? 'Editar sucursal' : 'Nueva sucursal'}
            </Title>
          </div>
          
          <Form
            form={form}
            layout="vertical"
            onFieldsChange={handleFormChange}
            className="modal-form"
          >
            <div className="form-fields">
              <Form.Item
                label="Nombre"
                name="nombre"
                rules={[{ required: true, message: 'Ingrese el nombre de la sucursal' }]}
                className="form-item"
              >
                <Input placeholder="Escribir nombre" className="form-input" />
              </Form.Item>
              <Form.Item
                label="Dirección"
                name="direccion"
                rules={[{ required: true, message: 'Ingrese la dirección' }]}
                className="form-item"
              >
                <Input placeholder="Escribir dirección" className="form-input" />
              </Form.Item>
              <Form.Item
                label="Teléfono"
                name="telefono"
                rules={[{ required: true, message: 'Ingrese el teléfono' }]}
                className="form-item form-item-last"
              >
                <Input placeholder="Escribir teléfono" className="form-input" />
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>
    </ConfigProvider>
  )
}

export default SucursalModal
