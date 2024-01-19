import { useEffect, useState } from 'react';
import { Company } from '../../interfaces';
import { ApiSegeco } from '../../api/ApiSegeco';

export const useCompanies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  //   const [error, setError] = useState<"">([]);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = async () => {
    try {
      setIsloading(true);
      const res = await ApiSegeco.get('/companies');
      res.data && setCompanies(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsloading(false);
    }
  };

  return {
    companies,
    isLoading,
    // error
  };
};
