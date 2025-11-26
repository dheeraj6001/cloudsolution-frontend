import api from '@/services/api';
export const studentlogin = async (username: string, password: string) => {
  const response = await api.post('/student/auth/login', {
    username,
    password,
  });
  return response.data;
};