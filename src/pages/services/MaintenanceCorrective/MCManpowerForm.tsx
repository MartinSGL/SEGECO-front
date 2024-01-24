import { Button, Form, Input, Select } from 'antd';
import { DatePickerEs } from '../../../components/date-picker-es/DatePicketEs';
import dayjs from 'dayjs';
import { AddModalFormProps, ManPower } from '../../../interfaces';

export const MCManpowerForm = ({
  handleOnFinish,
  closeModal,
}: AddModalFormProps) => {
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      onFinish={(values: ManPower) => {
        form.resetFields();
        handleOnFinish(values, 'manpower', closeModal);
      }}
      style={{ marginTop: '20px' }}
      initialValues={{
        ['date']: dayjs(),
      }}
    >
      <Form.Item
        name='name'
        rules={[{ required: true, message: 'Este campo es requerido' }]}
      >
        <Select placeholder='Nombre' size='large'>
          <Select.Option value={'Ricardo Francisco'}>
            Ricardo Francisco
          </Select.Option>
          <Select.Option value={'Salinas de Gortari'}>
            Salinas de Gortari
          </Select.Option>
          <Select.Option value={'Vicente Fox Francisco'}>
            Ricardo Francisco
          </Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name='amount'
        rules={[{ required: true, message: 'Este campo es requerido' }]}
      >
        <Input type='number' size='large' placeholder='Cantidad' />
      </Form.Item>
      <Form.Item
        name='date'
        rules={[{ required: true, message: 'Este campo es requerido' }]}
      >
        <DatePickerEs />
      </Form.Item>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
        <Button htmlType='submit' type='primary'>
          Agregar
        </Button>
      </div>
    </Form>
  );
};
