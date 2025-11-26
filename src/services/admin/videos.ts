import api from '@/services/api';
import { PaginationParams } from '@/types/common';

export const videosList = async ({currentPage,pageSize} : PaginationParams) => {
  const response = await api.get(`/admin/courses?page=${currentPage}&limit=${pageSize}`);
  return response.data;
};