import axios from 'axios';

export const ApiSegeco = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

// middleware que intercepta el token
ApiSegeco.interceptors.request.use(async (config) => {
  // busca el token, si hay agregalo en la request
  const token = localStorage.getItem('token');

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});