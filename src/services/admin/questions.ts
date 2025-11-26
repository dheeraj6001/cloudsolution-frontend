import api from '@/services/api';
import { PaginationParams } from '@/types/common';

export const qsList = async ({currentPage,pageSize}:PaginationParams) => {
  const response = await api.get(`/admin/questions?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};
