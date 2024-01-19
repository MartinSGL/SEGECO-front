import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Select } from 'antd';
import './Services.css';
import { Area } from '../../interfaces';

export interface FormSearchService {
  servicio: 'movil' | 'fijo' | null;
  mantenimiento: 'mp' | 'mc' | null;
  area: Area | null;
  ubicacion: string | null;
}

const initialForm: FormSearchService = {
  servicio: null,
  mantenimiento: null,
  area: null,
  ubicacion: null,
};

const Services = () => {
  const [form] = useState(initialForm);
  const [isFijo, setFijo] = useState(false);
  const navigate = useNavigate();

  const onChangeService = (value: FormSearchService['servicio']) => {
    if (value === 'fijo') setFijo(true);
    else setFijo(false);
  };

  const createService = ({
    servicio,
    mantenimiento,
    area,
    ubicacion,
  }: FormSearchService) => {
    const search = `?servicio=${servicio}&mantenimiento=${mantenimiento}&area=${area}${
      isFijo ? `ubicacion=${ubicacion}` : ''
    }`;
    const pathname = './crear';
    navigate({ pathname, search });
  };

  return (
    <Form onFinish={createService} className='service_input_container'>
      <Form.Item
        name='servicio'
        rules={[{ required: true, message: 'Este campo es requerido' }]}
      >
        <Select
          onChange={(value) => onChangeService(value)}
          value={form.servicio}
          placeholder='Tipo de servicio'
        >
          <Select.Option value='movil'>Movil</Select.Option>
          <Select.Option value='fijo'>Fijo</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name='mantenimiento'
        rules={[
          {
            required: true,
            message: 'Este campo es requerido',
          },
        ]}
      >
        <Select value={form.servicio} placeholder='Tipo de mantemiento'>
          <Select.Option value='mp'>MP</Select.Option>
          <Select.Option value='mc'>MC</Select.Option>
        </Select>
      </Form.Item>
      {isFijo ? (
        <>
          <Form.Item
            name='area'
            rules={[
              {
                required: true,
                message: 'el campo area es requerido',
              },
            ]}
          >
            <Select value={form.area} placeholder='Area'>
              <Select.Option value='demo'>Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name='ubicacion'
            rules={[
              {
                required: true,
                message: 'Este campo es requerido',
              },
            ]}
          >
            <Select value={form.ubicacion} placeholder='Ubicacion del equipo'>
              <Select.Option value='demo'>Demo</Select.Option>
            </Select>
          </Form.Item>
        </>
      ) : (
        <Form.Item
          name='area'
          rules={[{ required: true, message: 'Este campo es requerido' }]}
        >
          <Select value={form.area} placeholder='Area'>
            <Select.Option value='carga'>Carga</Select.Option>
            <Select.Option value='acarreo'>Acarreo</Select.Option>
            <Select.Option value='barrenacion'>Barrenacion</Select.Option>
          </Select>
        </Form.Item>
      )}{' '}
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          +
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Services;
