import { Button, Form, Input, Select } from 'antd';
import { AddModalFormProps, MaterialRepairment } from '../../../interfaces';

export const MCMaterialRepairmentForm = ({
  handleOnFinish,
  closeModal,
}: AddModalFormProps) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      onFinish={(values: MaterialRepairment) => {
        form.resetFields();
        handleOnFinish(values, 'material_repairment', closeModal);
      }}
      style={{ marginTop: '20px' }}
    >
      <Form.Item
        name='description'
        rules={[{ required: true, message: 'Este campo es requerido' }]}
      >
        <Select placeholder='Material y/o reparacion' size='large'>
          <Select.Option value={'GAS 1134'}>GAS 1134</Select.Option>
          <Select.Option value={'GAS 141'}>GAS 141</Select.Option>
          <Select.Option value={'GAS 22'}>GAS 1134</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name='amount'
        rules={[{ required: true, message: 'Este campo es requerido' }]}
      >
        <Input type='number' size='large' placeholder='Cantidad' />
      </Form.Item>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <Button htmlType='submit' type='primary'>
          Agregar
        </Button>
      </div>
    </Form>
  );
};
