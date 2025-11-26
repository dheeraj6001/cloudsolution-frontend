import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('superadminToken');
  if (token && config.headers) {
    config.headers.set?.('Authorization', `Bearer ${token}`);
  }
  return config;
});

export default axiosClient;
