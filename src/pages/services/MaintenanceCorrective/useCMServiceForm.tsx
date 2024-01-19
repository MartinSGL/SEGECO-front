import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ApiSegeco } from '../../../api/ApiSegeco';
import { Fleet } from '../../../interfaces';
import { regex } from '../../../components/layout/OperatorLayout';

export const useMCServicesForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const area = searchParams.get('area');
  const { pathname } = useLocation();
  const company = pathname.split('/')[2].replace(regex, 'ñ');
  const service = searchParams.get('servicio');

  const [fleets, setFleets] = useState<Fleet[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  // const [error, setError] = useState<"">([]);

  useEffect(() => {
    if (!area) return navigate(`/empresas/${company}/${area}`);
    getFleets();
  }, []);

  const getFleets = async () => {
    try {
      setIsloading(true);
      const res = await ApiSegeco.get(`/fleets/${company}/${area}`);
      res.data && setFleets(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };

  return {
    fleets,
    isLoading,
    service,
    area,
  };
};
