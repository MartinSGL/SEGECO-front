import { NotificationPlacement } from 'antd/es/notification/interface';
import { AxiosError } from 'axios';

interface Params {
  error: AxiosError | null;
  openNotification: (placemente: NotificationPlacement, data: string) => void;
  logOut: () => void;
}
/**
 * 400: bad request
 * 401: unauthenticated
 * 500: server error
 */
export const handleErrorHttp = ({
  error,
  openNotification,
  logOut,
}: Params) => {
  const errorMessage = (error?.response?.data as { message: string }).message;
  if (error?.response?.status === 400) {
    return openNotification('top', errorMessage);
  }
  if (error?.response?.status === 401) {

    return error?.config?.url === "/users/login" 
    ? openNotification('top', errorMessage)   
    : logOut()
  }
  if (error?.response?.status === 500) {
    return openNotification('top', errorMessage);
  }
};