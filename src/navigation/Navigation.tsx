import { createBrowserRouter, Outlet, redirect } from 'react-router-dom';
import { Login } from '../pages';
import { AuthProvider } from '../context/AuthContext';
import { Auth } from '../components/auth/Auth';
import Companies from '../pages/companies/Companies';
import Services from '../pages/services/Services';
import ServicesForm from '../pages/services/MaintenanceCorrective/MCServiceForm';
import { ConfigProvider } from 'antd';
import esEs from 'antd/locale/es_ES';

const AuthContext = () => (
  <AuthProvider>
    <ConfigProvider locale={esEs}>
      <Outlet />
    </ConfigProvider>
  </AuthProvider>
);

export const router = createBrowserRouter([
  {
    element: <AuthContext />,
    children: [
      {
        path: '/',
        loader: () => {
          throw redirect('/login');
        },
      },
      {
        path: '/login',
        element: <Login />,
      },

      {
        path: '/home',
        element: (
          <Auth>
            <>hola</>
          </Auth>
        ),
      },
      {
        path: '/empresas',
        element: (
          <Auth>
            <Companies />
          </Auth>
        ),
      },
      {
        path: '/empresas/:name',
        element: (
          <Auth>
            <Services />
          </Auth>
        ),
      },
      {
        path: '/empresas/:name/crear',
        element: (
          <Auth>
            <ServicesForm />
          </Auth>
        ),
      },
    ],
  },
]);
