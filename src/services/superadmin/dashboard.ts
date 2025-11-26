import api from '@/services/api';
export const totalStudents = async () => {
  const response = await api.get('/superadmin/dashboard');
  return response.data; // Make sure your backend returns { status, data }
};