import locale from 'antd/es/date-picker/locale/es_ES';
import 'dayjs/locale/es';
import { DatePicker } from 'antd';
import { date_format } from '../../constants/constants';

export const DatePickerEs = ({ ...args }) => {
  return (
    <DatePicker
      format={date_format}
      locale={locale}
      name='date'
      placeholder='fecha'
      size='large'
      style={{ width: '100%' }}
      {...args}
    />
  );
};
