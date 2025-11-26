import axios from '../axiosClient';

export const getUsers = async () => {
  const res = await axios.get('/superadmin/users');
  return res.data;
};

export const createUser = async (userData: {
  name: string;
  email: string;
  role: 'admin' | 'editor';
  password: string;
}) => {
  const res = await axios.post('/superadmin/users', userData);
  return res.data;
};

export const deleteUser = async (id: number) => {
  const res = await axios.delete(`/superadmin/users/${id}`);
  return res.data;
};
