import dayjs from 'dayjs';
import { date_format } from '../constants/constants';

export const setTodayDayPicker = () => {
  return dayjs();
};

export const getDateFromDatePicker = (date: string) => {
  return dayjs(date).format(date_format);
};
