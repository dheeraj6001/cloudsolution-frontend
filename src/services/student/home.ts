import api from '@/services/api';
export const packageList = async () => {
  const response = await api.get('/student/packages');
  return response.data;
};