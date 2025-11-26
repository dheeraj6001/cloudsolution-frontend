import axios from '../axiosClient';

interface LoginPayload {
  username: string;
  password: string;
}

export const superAdminLogin = async (payload: LoginPayload) => {
  const res = await axios.post('/superadmin/login', payload);
  return res.data;
};
