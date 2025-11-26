import api from '@/services/api';
export const superadminlogin = async (email: string, password: string) => {
  const response = await api.post('/superadmin/auth/login', { email, password });
  return response.data;
};