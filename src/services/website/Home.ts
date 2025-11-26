import api from '@/services/api';
export const getData = async () => {
  const response = await api.get('/home');
  return response.data;
};