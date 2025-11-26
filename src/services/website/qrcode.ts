import api from '@/services/api';
import { QrPayload } from '@/types/interface';

export const generateqrcode = async (data:QrPayload) => {
  return api.post(`/public/qrcode/generateqrcode`, data);
};