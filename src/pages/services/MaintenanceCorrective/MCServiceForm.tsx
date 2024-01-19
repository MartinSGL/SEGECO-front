import { useState } from 'react';
import { Button, Form, Input, Select, Table } from 'antd';
import { setManpower, setMaterialRepairment } from './MCTables';
import {
  CMserviceProp,
  HandleOnFinish,
  MobileMCService,
  addItem,
} from '../../../interfaces';
import './MCServiceForm.css';
import { useMCServicesForm } from './useCMServiceForm';
import { AddCMItem } from '../../../components/modal/AddCMItem';
import { v4 as uuid4 } from 'uuid';
import { Loader, Uploader } from '../../../components';
import TextArea from 'antd/es/input/TextArea';
import { MCMaterialRepairmentForm } from './MCMaterialRepairmentForm';
import { MCManpowerForm } from './MCManpowerForm';
import { DatePickerEs } from '../../../components/date-picker-es/DatePicketEs';

const initForm: MobileMCService = {
  no_order: '',
  init_date: '',
  area: '',
  fleet: '',
  concept: '',
  material_repairment: [],
  import_a: 0,
  manpower: [],
  import_b: 0,
  days: [],
  end_date: '',
  observations: '',
  sign: '',
  images: [],
};

const ServicesForm = () => {
  const [form, setForm] = useState(initForm);
  const { isLoading, fleets, service, area } = useMCServicesForm();
  const [modalRepairMaterialOpen, setModalRepairMaterial] = useState(false);
  const [modalManpowerOpen, setModalManpowerOpen] = useState(false);

  const handleSubmit = (data: MobileMCService) => {
    console.log(data);
  };

  const addItem: addItem = (data, mc_service_prop) => {
    setForm({
      ...form,
      [mc_service_prop]: [...form[mc_service_prop], data],
    });
  };

  const removeItem = (uuid: string, mc_service_prop: CMserviceProp) => {
    setForm({
      ...form,
      [mc_service_prop]: form[mc_service_prop].filter(
        (item) => item.uuid !== uuid
      ),
    });
  };

  const handleOnFinish: HandleOnFinish = (
    data,
    mc_service_prop,
    closeModal
  ) => {
    addItem({ ...data, uuid: uuid4() }, mc_service_prop);
    closeModal();
  };

  const repair_material_colums = setMaterialRepairment(removeItem);
  const manpower_colums = setManpower(removeItem);

  return (
    <>
      <Loader show={isLoading} />
      <Form onFinish={handleSubmit}>
        <div className='form_service_row'>
          <Form.Item
            name='no_orden'
            rules={[{ required: true, message: 'Este campo es requerido' }]}
          >
            <Input
              name='no_orden'
              size='large'
              placeholder='No de Orden Interna'
            />
          </Form.Item>
          <Form.Item
            name='fecha'
            rules={[{ required: true, message: 'Este campo es requerido' }]}
            className='rd'
          >
            <DatePickerEs />
          </Form.Item>
          <Form.Item
            className='third'
            name='area'
            initialValue={area}
            rules={[{ required: true, message: 'Este campo es requerido' }]}
          >
            <Input name='area' size='large' placeholder='area' />
          </Form.Item>
          <Form.Item
            name='no_economico'
            rules={[{ required: true, message: 'Este campo es requerido' }]}
          >
            <Select placeholder='No economico' size='large'>
              {fleets.map((fleet) => (
                <Select.Option key={fleet._id} value={fleet.name}>
                  {fleet.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {service === 'fijo' && (
            <>
              <Form.Item
                name='ubicacion'
                rules={[{ required: true, message: 'Este campo es requerido' }]}
              >
                <Input
                  name='ubicacion'
                  size='large'
                  placeholder='ubicacion del equipo'
                />
              </Form.Item>
              <Form.Item
                name='lugar'
                rules={[{ required: true, message: 'Este campo es requerido' }]}
              >
                <Input name='lugar' size='large' placeholder='Lugar exacto' />
              </Form.Item>
            </>
          )}
        </div>
        <Form.Item
          name='concepto'
          rules={[{ required: true, message: 'Este campo es requerido' }]}
        >
          <TextArea
            name='concepto'
            placeholder='Concepto'
            autoSize={{ minRows: 4, maxRows: 5 }}
          />
        </Form.Item>
        <div className='container_service_table'>
          <div className='container_table_add_button'>
            <Button
              type='primary'
              className='table_add_button'
              onClick={() => setModalRepairMaterial(true)}
            >
              +
            </Button>
          </div>
          <Table
            dataSource={form.material_repairment}
            columns={repair_material_colums}
            pagination={false}
          />

          <div className='container_table_add_button'>
            <Button
              type='primary'
              className='table_add_button'
              onClick={() => setModalManpowerOpen(true)}
            >
              +
            </Button>
          </div>
          <Table
            dataSource={form.manpower}
            columns={manpower_colums}
            pagination={false}
          />
          <div className='uploader_container'>
            <Uploader />
          </div>
          <Form.Item
            name='observations'
            rules={[{ required: true, message: 'Este campo es requerido' }]}
          >
            <TextArea
              name='observations'
              placeholder='Observaciones'
              autoSize={{ minRows: 4, maxRows: 5 }}
            />
          </Form.Item>
        </div>
      </Form>

      {/* --------------------------- Modals -------------------------------- */}
      <AddCMItem
        title='Material y/o Reparacion'
        isOpen={modalRepairMaterialOpen}
        setIsOpen={setModalRepairMaterial}
      >
        <MCMaterialRepairmentForm
          handleOnFinish={handleOnFinish}
          closeModal={() => setModalRepairMaterial(false)}
        />
      </AddCMItem>

      <AddCMItem
        title='Mano de obra'
        isOpen={modalManpowerOpen}
        setIsOpen={setModalManpowerOpen}
      >
        <MCManpowerForm
          handleOnFinish={handleOnFinish}
          closeModal={() => setModalManpowerOpen(false)}
        />
      </AddCMItem>
    </>
  );
};

export default ServicesForm;
