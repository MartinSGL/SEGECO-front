import { Button } from 'antd';
import { ManPower, MaterialRepairment, removeItem } from './MCServiceForm';
import { getDateFromDatePicker } from '../../../helpers/manageDates';

export const setMaterialRepairment = (removeItem: removeItem) => {
  const colums = [
    {
      title: '#',
      render: (_: string, __: MaterialRepairment, index: number) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: 'Material y/o Reparacion',
      dataIndex: 'description',
    },
    {
      title: 'Cantidad',
      dataIndex: 'amount',
    },
    {
      title: 'Unidad',
      dataIndex: 'unit',
    },
    {
      title: 'P. Unitario',
      dataIndex: 'unit_price',
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },
    {
      title: 'Acciones',
      render: (_: string, item: MaterialRepairment) => {
        return (
          <Button
            onClick={() => removeItem(item.uuid, 'material_repairment')}
            className='table_remove_button'
          >
            -
          </Button>
        );
      },
    },
  ];

  return colums;
};

export const setManpower = (removeItem: removeItem) => {
  const colums = [
    {
      title: '#',
      render: (_: string, __: ManPower, index: number) => {
        return <div>{index + 1}</div>;
      },
    },
    {
      title: 'Mano de Obra',
      dataIndex: 'name',
    },
    {
      title: 'Cantidad',
      dataIndex: 'amount',
    },
    {
      title: 'Fecha',
      render: (item: ManPower) => {
        return getDateFromDatePicker(item.date);
      },
    },
    {
      title: 'P. Unitario',
      dataIndex: 'unit_price',
    },
    {
      title: 'Total',
      dataIndex: 'total',
    },
    {
      title: 'Acciones',
      render: (_: string, item: ManPower) => {
        return (
          <Button
            onClick={() => removeItem(item.uuid, 'manpower')}
            className='table_remove_button'
          >
            -
          </Button>
        );
      },
    },
  ];

  return colums;
};
