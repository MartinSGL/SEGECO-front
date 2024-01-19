export interface MobileMCService {
  _id?: string;
  no_order: string;
  init_date: string;
  area: Area | '';
  fleet: string;
  concept: string;
  material_repairment: MaterialRepairment[];
  import_a?: number;
  manpower: ManPower[];
  import_b?: number;
  days: Days[];
  end_date: string;
  observations: string;
  sign: string;
  images: string[];
}

export interface MaterialRepairment {
  uuid: string;
  description: string;
  amount: number;
  unit: string;
  unit_price?: number;
  total?: number;
}

export interface ManPower {
  uuid: string;
  name: string;
  amount: number;
  date: string;
  unit_price?: number;
  total?: number;
}

export interface Days {
  uuid: string;
  date: string;
  init_hour: string;
  end_hour: string;
  status: 'pending' | 'done';
}

export type CMserviceProp = 'material_repairment' | 'manpower' | 'days';
export type MCItem = MaterialRepairment | ManPower | Days;
export type addItem = (data: MCItem, mc_service_prop: CMserviceProp) => void;
export type removeItem = (uuid: string, mc_service_prop: CMserviceProp) => void;

export type HandleOnFinish = <T extends MCItem>(
  data: T,
  mc_service_prop: CMserviceProp,
  closeModal: () => void
) => void;

export type AddModalFormProps = {
  handleOnFinish: HandleOnFinish;
  closeModal: () => void;
};
