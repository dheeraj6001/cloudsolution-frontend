import api from '@/services/api';
export const adminlogin = async (email: string, password: string) => {
  const response = await api.post('/auth/admin/login', {
    email,
    password,
  });
  return response.data;
};